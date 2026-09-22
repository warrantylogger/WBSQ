"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import styles from "./brands.module.css";
import { brands, getBrandLogo } from "./brand-data";

const filters = [
  "All",
  "Home appliances",
  "Tech & robotics",
  "Construction",
  "Logistics",
  "Wellness & education",
  "Marketing services",
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
    () => displayedFilter === "All" ? brands : brands.filter((brand) => brand.categories.includes(displayedFilter)),
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

  useEffect(() => {
    const requestedFilter = new URLSearchParams(window.location.search).get("sector");
    if (!requestedFilter || !filters.includes(requestedFilter)) return;

    setActiveFilter(requestedFilter);
    setDisplayedFilter(requestedFilter);
    const frame = requestAnimationFrame(() => {
      document.getElementById("brand-directory")?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
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
    <div className={styles.page} id="top">
      <SiteHeader theme="light" active="brands" />

      <main>
        <section className={styles.intro}>
          <p className={`${styles.eyebrow} ${styles.fadeUp}`} data-motion>Brand directory</p>
          <h1 className={styles.fadeUp} data-motion style={{ "--delay": "110ms" } as CSSProperties}>Twenty-three brands, each with its own customers and craft.</h1>
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

        <section id="brand-directory" className={styles.directory} aria-live="polite">
          <div className={styles.gridViewport} ref={viewportRef}>
            <div className={`${styles.grid} ${phaseClass}`} ref={gridRef}>
              {visibleBrands.map((brand, index) => (
                <article
                  className={styles.card}
                  style={{ "--card-delay": `${Math.floor(index / 3) * 105 + (index % 3) * 35}ms` } as CSSProperties}
                  key={brand.name}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.logoBadge} data-brand-logo={brand.largeLogo ? brand.slug : undefined}>
                      {brand.logoPending ? (
                        <span className={styles.logoPlaceholder}>{brand.name}</span>
                      ) : (
                        <Image
                          src={getBrandLogo(brand.slug)}
                          alt={`${brand.name} logo`}
                          width={320}
                          height={180}
                        />
                      )}
                    </div>
                    <p className={styles.category}>{brand.categories.join(" · ")}</p>
                  </div>
                  <h2><a href={`/brands/${brand.slug}`}>{brand.name}</a></h2>
                  <p className={styles.description}>{brand.summary}</p>
                  <div className={styles.cardFooter}>
                    <p className={styles.location}>{brand.location}</p>
                    <a className={styles.detailLink} href={`/brands/${brand.slug}`} aria-label={`View ${brand.name} brand description`}>
                      <span>View brand</span>
                      <i aria-hidden="true">↗</i>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter active="brands" />
    </div>
  );
}
