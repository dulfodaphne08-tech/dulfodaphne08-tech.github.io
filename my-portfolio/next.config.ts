import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const basePath = "";
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  outputFileTracingRoot: projectRoot,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
