"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const article = document.querySelector("[data-article-body]");
        if (!(article instanceof HTMLElement)) {
          frame = 0;
          return;
        }

        const start = article.offsetTop;
        const total = article.offsetHeight - window.innerHeight;
        const current = window.scrollY - start;
        setProgress(total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0);
        frame = 0;
      });
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-16 z-30 h-px bg-border">
      <div
        className="h-full origin-left bg-accent transition-transform duration-150"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
