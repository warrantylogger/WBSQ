"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const enabled = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!cursor || !enabled.matches) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
        cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
        cursor.classList.add("isActive");
      });
    };
    const leave = () => cursor.classList.remove("isActive");
    const hover = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      cursor.classList.toggle(
        "cursorHover",
        Boolean(target.closest("a, button, summary, article, figure, blockquote, h1, h2, h3, [data-cursor-hover]")),
      );
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", hover, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", hover);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="customCursor" ref={cursorRef} aria-hidden="true">
      <i className="cursorArm cursorTop" />
      <i className="cursorArm cursorRight" />
      <i className="cursorArm cursorBottom" />
      <i className="cursorArm cursorLeft" />
    </div>
  );
}
