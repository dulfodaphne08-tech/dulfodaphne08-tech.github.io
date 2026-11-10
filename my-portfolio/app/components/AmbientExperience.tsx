"use client";

import { useEffect } from "react";

const particles = Array.from({ length: 10 }, (_, index) => index);

export default function AmbientExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reducedMotion.matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;
    let touchTimeout = 0;
    let magneticElement: HTMLElement | null = null;
    let magneticX = 0;
    let magneticY = 0;
    let magneticTargetX = 0;
    let magneticTargetY = 0;
    let lastMoveTime = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      magneticX += (magneticTargetX - magneticX) * 0.16;
      magneticY += (magneticTargetY - magneticY) * 0.16;

      root.style.setProperty("--pointer-x", `${currentX.toFixed(1)}px`);
      root.style.setProperty("--pointer-y", `${currentY.toFixed(1)}px`);
      root.style.setProperty(
        "--ambient-shift-x",
        `${-((targetX / window.innerWidth) - 0.5) * 12}px`,
      );
      root.style.setProperty(
        "--ambient-shift-y",
        `${-((targetY / window.innerHeight) - 0.5) * 12}px`,
      );

      if (magneticElement) {
        magneticElement.style.translate = `${magneticX.toFixed(2)}px ${magneticY.toFixed(2)}px`;
      }

      const pointerSettled =
        Math.abs(targetX - currentX) < 0.2 && Math.abs(targetY - currentY) < 0.2;
      const magneticSettled = Math.abs(magneticX) < 0.1 && Math.abs(magneticY) < 0.1;

      if (pointerSettled && magneticSettled) {
        frame = 0;
        if (magneticElement && !magneticTargetX && !magneticTargetY) {
          magneticElement.style.translate = "";
          magneticElement = null;
        }
        return;
      }

      frame = window.requestAnimationFrame(animate);
    };

    const requestFrame = () => {
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      // Throttle to ~60fps max — prevent flooding on high-Hz mice
      const now = performance.now();
      if (now - lastMoveTime < 16) return;
      lastMoveTime = now;

      targetX = event.clientX;
      targetY = event.clientY;
      root.dataset.pointerActive = "true";

      const target = event.target instanceof Element ? event.target : null;
      const nextMagnetic = (finePointer.matches
        ? target?.closest<HTMLElement>("[data-magnetic]")
        : null) ?? null;

      if (nextMagnetic !== magneticElement) {
        if (magneticElement) {
          magneticElement.style.translate = "";
          magneticTargetX = 0;
          magneticTargetY = 0;
        }
        magneticElement = nextMagnetic;
        magneticX = 0;
        magneticY = 0;
      }

      if (magneticElement) {
        const bounds = magneticElement.getBoundingClientRect();
        magneticTargetX = Math.max(-4, Math.min(4, (event.clientX - bounds.left - bounds.width / 2) * 0.07));
        magneticTargetY = Math.max(-4, Math.min(4, (event.clientY - bounds.top - bounds.height / 2) * 0.07));
      }
      requestFrame();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      targetX = currentX = event.clientX;
      targetY = currentY = event.clientY;
      root.style.setProperty("--pointer-x", `${currentX}px`);
      root.style.setProperty("--pointer-y", `${currentY}px`);
      root.dataset.touchActive = "true";
      window.clearTimeout(touchTimeout);
      touchTimeout = window.setTimeout(() => {
        delete root.dataset.touchActive;
      }, 1100);
    };

    const handlePointerLeave = () => {
      delete root.dataset.pointerActive;
      if (magneticElement) {
        magneticTargetX = 0;
        magneticTargetY = 0;
        requestFrame();
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) handlePointerLeave();
    };

    const handleVisibilityChange = () => {
      root.dataset.pageHidden = String(document.hidden);
    };

    const handleResize = () => {
      targetX = Math.min(targetX, window.innerWidth);
      targetY = Math.min(targetY, window.innerHeight);
      requestFrame();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(touchTimeout);
      delete root.dataset.pointerActive;
      delete root.dataset.touchActive;
      delete root.dataset.pageHidden;
      if (magneticElement) magneticElement.style.translate = "";
    };
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb--large" />
      <div className="ambient-orb ambient-orb--outline" />
      <div className="ambient-orb ambient-orb--small" />
      <div className="ambient-line ambient-line--one" />
      <div className="ambient-line ambient-line--two" />
      <div className="ambient-particles">
        {particles.map((particle) => (
          <span key={particle} />
        ))}
      </div>
      <div className="ambient-glow" />
    </div>
  );
}