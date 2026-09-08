"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

export default function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 450 : 2300;
    const startedAt = performance.now();
    let animationFrame = 0;
    let leaveTimer = 0;
    let removeTimer = 0;

    document.body.classList.add("isSiteLoading");

    const tick = (now: number) => {
      const amount = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - amount, 3);
      setProgress(Math.round(eased * 100));

      if (amount < 1) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      leaveTimer = window.setTimeout(() => setLeaving(true), reducedMotion ? 50 : 260);
      removeTimer = window.setTimeout(() => {
        setVisible(false);
        document.body.classList.remove("isSiteLoading");
      }, reducedMotion ? 180 : 820);
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove("isSiteLoading");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`siteLoader${leaving ? " siteLoaderLeaving" : ""}`}
      style={{ "--loader-progress": `${progress}%` } as CSSProperties}
      aria-hidden="true"
    >
      <div className="siteLoaderInner">
        <div className="siteLoaderLogo">
          <img className="siteLoaderLogoFrame" src="/wbsq-holdings-white.png" alt="" />
          <img className="siteLoaderLogoFill" src="/wbsq-holdings-white.png" alt="" />
        </div>
        <div className="siteLoaderStatus">
          <span>Loading WBSQ</span>
          <strong>{String(progress).padStart(3, "0")}%</strong>
        </div>
        <div className="siteLoaderTrack"><i /></div>
      </div>
    </div>
  );
}
