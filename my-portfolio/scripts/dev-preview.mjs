import { spawn } from "node:child_process";
import { watch, existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const exportRoot = join(projectRoot, "out");
const port = Number(process.env.PORT ?? 3000);
const reloadClients = new Set();
const watchers = [];
let buildProcess;
let buildPending = false;
let buildTimer;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function notifyReload() {
  for (const client of reloadClients) {
    client.write("event: reload\ndata: {}\n\n");
  }
}

function build() {
  if (buildProcess) {
    buildPending = true;
    return;
  }

  console.log("Building the static portfolio preview...");
  const npmCli = process.env.npm_execpath;
  const args = npmCli ? [npmCli, "run", "build"] : ["run", "build"];
  const command = npmCli ? process.execPath : "npm.cmd";
  buildProcess = spawn(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    shell: !npmCli,
    windowsHide: true,
  });

  buildProcess.on("error", (error) => {
    console.error("Could not start the portfolio build:", error);
    buildProcess = undefined;
  });

  buildProcess.on("close", (code) => {
    buildProcess = undefined;
    if (code === 0) {
      console.log("Preview updated.");
      notifyReload();
    } else {
      console.error(`Portfolio build failed with exit code ${code}. The previous preview is still available.`);
    }

    if (buildPending) {
      buildPending = false;
      build();
    }
  });
}

function scheduleBuild() {
  clearTimeout(buildTimer);
  buildTimer = setTimeout(build, 500);
}

async function serveFile(request, response, pathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  const requestedPath = decodedPath === "/" ? "/index.html" : decodedPath;
  let filePath = resolve(exportRoot, `.${requestedPath}`);
  const exportPrefix = `${resolve(exportRoot)}${sep}`;
  if (filePath !== resolve(exportRoot) && !filePath.startsWith(exportPrefix)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const fileInfo = await stat(filePath);
    if (fileInfo.isDirectory()) filePath = join(filePath, "index.html");
  } catch {
    response.writeHead(404).end("Not found");
    return;
  }

  try {
    const body = await readFile(filePath);
    const headers = {
      "Content-Type": contentTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream",
      "Cache-Control": extname(filePath) === ".html" ? "no-cache" : "no-cache",
    };

    if (extname(filePath).toLowerCase() === ".html") {
      const liveReload = '<script>new EventSource("/__dev_events").addEventListener("reload",()=>location.reload())</script>';
      const html = body.toString("utf8").replace(/<\/body>/i, `${liveReload}</body>`);
      response.writeHead(200, headers);
      response.end(request.method === "HEAD" ? undefined : html);
      return;
    }

    response.writeHead(200, headers);
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    console.error(`Could not serve ${relative(exportRoot, filePath)}:`, error);
    response.writeHead(500).end("Could not read the preview file");
  }
}

const server = createServer((request, response) => {
  const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
  if (pathname === "/__dev_events") {
    response.writeHead(200, {
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
    });
    response.write("retry: 1000\n\n");
    reloadClients.add(response);
    request.on("close", () => reloadClients.delete(response));
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed");
    return;
  }

  void serveFile(request, response, pathname);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Live preview: http://localhost:${port}`);
  if (!existsSync(join(exportRoot, "index.html"))) {
    console.log("No static export was found; creating the first preview build.");
    build();
  } else {
    console.log("Saving changes in app/ or public/ rebuilds the preview and reloads the browser.");
  }
});

for (const directory of ["app", "public"]) {
  const directoryPath = join(projectRoot, directory);
  try {
    watchers.push(watch(directoryPath, { recursive: true }, scheduleBuild));
  } catch (error) {
    console.error(`Could not watch ${directoryPath}:`, error);
    process.exitCode = 1;
  }
}

function shutdown() {
  clearTimeout(buildTimer);
  for (const watcher of watchers) watcher.close();
  if (buildProcess) buildProcess.kill();
  server.close(() => process.exit());
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
