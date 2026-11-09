"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      // Smoother interpolation for fluid feel
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        frame = window.requestAnimationFrame(render);
      } else {
        cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
        frame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.dataset.visible = "true";
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle("hovered", Boolean(target?.closest("a, button, [role='button']")));
    };

    const hideCursor = () => {
      delete cursor.dataset.visible;
      cursor.classList.remove("hovered");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("blur", hideCursor);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("blur", hideCursor);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />;
}