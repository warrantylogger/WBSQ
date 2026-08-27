"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./brands.module.css";

const filters = [
  "All",
  "Home appliances",
  "Tech & robotics",
  "Construction",
  "Logistics",
  "Wellness & education",
  "Marketing services",
];

const brands = [
  { initials: "AC", name: "The Appliances Co.", category: "Home appliances", description: "Multi-brand retail and distribution of premium kitchen and living appliances.", location: "Singapore, Malaysia" },
  { initials: "HH", name: "Hobs and Hoods", category: "Home appliances", description: "Specialist cooking hardware — hobs, hoods, ovens — with in-house installation.", location: "Singapore" },
  { initials: "AL", name: "Aquara Living", category: "Home appliances", description: "Water filtration and indoor air systems for homes and light commercial spaces.", location: "Singapore, Indonesia" },
  { initials: "KR", name: "KeenOn Robotics", category: "Tech & robotics", description: "Service robotics for F&B, hospitality and healthcare floor operations.", location: "Singapore, Malaysia, Thailand" },
  { initials: "NS", name: "Nexal Systems", category: "Tech & robotics", description: "Automation integration, IoT monitoring and after-sales technical support.", location: "Regional" },
  { initials: "BB", name: "Bluemark Build", category: "Construction", description: "Fit-out and renovation contracting for residential and retail projects.", location: "Singapore" },
  { initials: "CI", name: "Corestone Interiors", category: "Construction", description: "Design-and-build interiors with in-house joinery and project management.", location: "Singapore, Vietnam" },
  { initials: "SL", name: "Swiftlane Logistics", category: "Logistics", description: "Last-mile delivery and white-glove installation for bulky goods.", location: "Singapore, Malaysia" },
  { initials: "PF", name: "Portside Freight", category: "Logistics", description: "Regional freight forwarding, customs clearance and bonded warehousing.", location: "ASEAN" },
  { initials: "VS", name: "Vitalis Studio", category: "Wellness & education", description: "Recovery and wellness studios with equipment retail and clinical partners.", location: "Singapore" },
  { initials: "BP", name: "Bright Path Learning", category: "Wellness & education", description: "Enrichment and vocational programmes for students and working adults.", location: "Singapore, Malaysia" },
  { initials: "SS", name: "Sixth Signal", category: "Marketing services", description: "Performance marketing, content and CRM for the group’s consumer brands.", location: "Regional" },
];

type Phase = "idle" | "out" | "prepare" | "in";

export default function BrandsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [displayedFilter, setDisplayedFilter] = useState("All");
  const [phase, setPhase] = useState<Phase>("idle");
  const viewportRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleBrands = useMemo(
    () => displayedFilter === "All" ? brands : brands.filter((brand) => brand.category === displayedFilter),
    [displayedFilter],
  );

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-motion]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -7%" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const selectFilter = (filter: string) => {
    if (filter === activeFilter || phase !== "idle") return;

    const viewport = viewportRef.current;
    const grid = gridRef.current;
    if (viewport && grid) viewport.style.height = `${grid.offsetHeight}px`;

    setActiveFilter(filter);
    setPhase("out");

    timerRef.current = setTimeout(() => {
      setDisplayedFilter(filter);
      setPhase("prepare");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const nextViewport = viewportRef.current;
          const nextGrid = gridRef.current;
          if (nextViewport && nextGrid) nextViewport.style.height = `${nextGrid.offsetHeight}px`;
          setPhase("in");

          timerRef.current = setTimeout(() => {
            if (viewportRef.current) viewportRef.current.style.height = "auto";
            setPhase("idle");
          }, 560);
        });
      });
    }, 240);
  };

  const phaseClass = phase === "out" ? styles.gridOut : phase === "prepare" ? styles.gridPrepare : phase === "in" ? styles.gridIn : "";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="/" aria-label="WBSQ home">
          <Image src="/wbsq-wordmark.png" alt="WBSQ" width={424} height={112} priority />
        </a>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <a href="/about">About</a>
          <a className={styles.active} href="/brands">Brands</a>
          <a href="/contact">Contact</a>
        </nav>
        <span className={styles.headerIndex}>SG / 2012</span>
        <details className={styles.mobileNav}>
          <summary aria-label="Open navigation"><i /><i /></summary>
          <nav aria-label="Mobile navigation">
            <a href="/about">About</a>
            <a href="/brands">Brands</a>
            <a href="/contact">Contact</a>
          </nav>
        </details>
      </header>

      <main>
        <section className={styles.intro}>
          <p className={`${styles.eyebrow} ${styles.fadeUp}`} data-motion>Brand directory</p>
          <h1 className={styles.fadeUp} data-motion style={{ "--delay": "110ms" } as CSSProperties}>Twelve brands, each with its own customers and craft.</h1>
          <div className={`${styles.filters} ${styles.fadeUp}`} data-motion style={{ "--delay": "220ms" } as CSSProperties} aria-label="Filter brands by category">
            {filters.map((filter) => (
              <button
                type="button"
                className={activeFilter === filter ? styles.selected : ""}
                aria-pressed={activeFilter === filter}
                onClick={() => selectFilter(filter)}
                disabled={phase !== "idle" && activeFilter !== filter}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className={`${styles.directory} ${styles.fadeUp}`} data-motion aria-live="polite">
          <div className={styles.gridViewport} ref={viewportRef}>
            <div className={`${styles.grid} ${phaseClass}`} ref={gridRef}>
              {visibleBrands.map((brand, index) => (
                <article
                  className={styles.card}
                  style={{ "--card-delay": `${Math.floor(index / 3) * 105 + (index % 3) * 35}ms` } as CSSProperties}
                  key={brand.name}
                >
                  <div className={styles.badge}>{brand.initials}</div>
                  <h2>{brand.name}</h2>
                  <p className={styles.category}>{brand.category}</p>
                  <p className={styles.description}>{brand.description}</p>
                  <p className={styles.location}>{brand.location}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerName}>WBSQ Holdings Pte Ltd</p>
          <nav aria-label="Footer navigation">
            <a href="/about">About</a>
            <a className={styles.active} href="/brands">Brands</a>
            <a href="/contact">Contact</a>
            <span>© 2026</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
