"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];
    let pointerX = -1000;
    let pointerY = -1000;
    let touchTimeout = 0;
    let dotColor = "";
    let lineColor = "";
    let pointerColor = "";

    const readTheme = () => {
      const styles = getComputedStyle(root);
      dotColor = styles.getPropertyValue("--starfield-dot-rgb").trim() || "255, 51, 102";
      lineColor = styles.getPropertyValue("--starfield-line-rgb").trim() || "120, 120, 130";
      pointerColor = styles.getPropertyValue("--starfield-pointer-rgb").trim() || dotColor;
    };

    const createParticles = () => {
      const count = Math.min(90, Math.max(32, Math.round((width * height) / 14000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: 1.2 + Math.random() * 1,
      }));
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createParticles();
      draw(false);
    };

    const draw = (moveParticles: boolean) => {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        if (moveParticles) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        }

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 150) continue;

          context.beginPath();
          context.strokeStyle = `rgba(${lineColor}, ${(1 - distance / 150) * 0.3})`;
          context.lineWidth = 0.8;
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }

        const pointerDistance = Math.hypot(particle.x - pointerX, particle.y - pointerY);
        if (pointerDistance < 210) {
          context.beginPath();
          context.strokeStyle = `rgba(${pointerColor}, ${(1 - pointerDistance / 210) * 0.44})`;
          context.lineWidth = 1;
          context.moveTo(particle.x, particle.y);
          context.lineTo(pointerX, pointerY);
          context.stroke();
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${dotColor}, 0.82)`;
        context.fill();
      }
    };

    const animate = () => {
      draw(true);
      frame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (frame || document.hidden || reducedMotion.matches) return;
      frame = window.requestAnimationFrame(animate);
    };

    const stop = () => {
      if (!frame) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
      draw(false);
    };

    const updateMotion = () => {
      if (reducedMotion.matches || document.hidden) stop();
      else start();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      draw(false);
      window.clearTimeout(touchTimeout);
      touchTimeout = window.setTimeout(() => {
        pointerX = -1000;
        pointerY = -1000;
        draw(false);
      }, 1100);
    };

    const handlePointerLeave = () => {
      pointerX = -1000;
      pointerY = -1000;
      draw(false);
    };

    const handleThemeChange = () => {
      readTheme();
      draw(false);
    };

    readTheme();
    resize();
    
    // DELAY THE CANVAS ANIMATION BY 1.5 SECONDS so the Hero animates smoothly first
    const startDelay = window.setTimeout(() => start(), 1500);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("portfolio-theme-change", handleThemeChange);
    document.addEventListener("visibilitychange", updateMotion);
    reducedMotion.addEventListener("change", updateMotion);

    return () => {
      window.clearTimeout(startDelay);
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("portfolio-theme-change", handleThemeChange);
      document.removeEventListener("visibilitychange", updateMotion);
      reducedMotion.removeEventListener("change", updateMotion);
      window.clearTimeout(touchTimeout);
    };
  }, []);

  return (
    <div className="starfield-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}