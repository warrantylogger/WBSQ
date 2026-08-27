"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const sectors = [
  {
    number: "01",
    name: "Appliances",
    count: "7 brands",
    brands: ["The Appliances Co.", "Hobs and Hoods", "Fridge", "Wine Fridge", "DryBox", "AirDry", "Cadenza"],
  },
  {
    number: "02",
    name: "Robotics & Tech",
    count: "2 brands",
    brands: ["Smart Watch", "KeenOn Robotics"],
  },
  {
    number: "03",
    name: "Construction",
    count: "3 brands",
    brands: ["Boh Beh Zao Construction", "Hightech & Waterproofing", "Cadenza"],
  },
  {
    number: "04",
    name: "Logistics",
    count: "1 brand",
    brands: ["niveken Logistics"],
  },
  {
    number: "05",
    name: "Wellness & Education",
    count: "2 brands",
    brands: ["Better with Age", "Science Kits"],
  },
  {
    number: "06",
    name: "Marketing Services",
    count: "1 brand",
    brands: ["Calm Desk Co."],
  },
  {
    number: "07",
    name: "Product",
    count: "1 brand",
    brands: ["DewPoint"],
  },
];

const metrics = [
  ["16", "Distinct brands"],
  ["07", "Operating sectors"],
  ["05", "Regional markets"],
  ["100k+", "Customers served"],
];

function AnimatedMetric({ value, label, index }: { value: string; label: string; index: number }) {
  const metricRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value === "100k+" ? "0k+" : "00");

  useEffect(() => {
    const node = metricRef.current;
    if (!node) return;

    const target = value === "100k+" ? 100 : Number(value);
    const suffix = value === "100k+" ? "k+" : "";
    const initialValue = suffix ? "0k+" : "00";
    let animationFrame = 0;
    let readyToPlay = true;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        cancelAnimationFrame(animationFrame);
        setDisplay(initialValue);
        readyToPlay = true;
        return;
      }

      if (entry.intersectionRatio < 0.45 || !readyToPlay) return;
      readyToPlay = false;
      cancelAnimationFrame(animationFrame);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(value);
        return;
      }

      const startedAt = performance.now();
      const duration = 1450 + index * 140;
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(target * eased);
        setDisplay(suffix ? `${current}${suffix}` : String(current).padStart(2, "0"));
        if (progress < 1) animationFrame = requestAnimationFrame(tick);
      };
      animationFrame = requestAnimationFrame(tick);
    }, { threshold: [0, 0.45] });

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [index, value]);

  return (
    <div className="metric" ref={metricRef} style={{ "--metric-delay": `${index * 90}ms` } as CSSProperties}>
      <strong aria-label={value}>{display}</strong>
      <span>{label}</span>
    </div>
  );
}

function CustomCursor() {
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
      cursor.classList.toggle("cursorHover", Boolean(target.closest("a, button, summary, .sectorCard")));
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

export default function Home() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("isVisible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <CustomCursor />
      <section className="hero" id="top">
        <Image
          className="heroImage"
          src="/wbsq-office.jpg"
          alt="WBSQ team at the Singapore office"
          fill
          priority
          sizes="100vw"
        />
        <div className="heroShade" />
        <header className="siteHeader">
          <a href="#top" aria-label="WBSQ home">
            <Image
              className="wordmark"
              src="/wbsq-wordmark.png"
              alt="WBSQ"
              width={424}
              height={112}
              priority
            />
          </a>
          <span className="headerIndex">SG / 2012</span>
          <details className="mobileNav">
            <summary aria-label="Open navigation"><span /><span /></summary>
            <nav aria-label="Mobile navigation">
              <a href="/about">About</a>
              <a href="/brands">Brands</a>
              <a href="/contact">Contact</a>
            </nav>
          </details>
        </header>

        <div className="heroContent">
          <p className="kicker">WBSQ Holdings · Singapore</p>
          <h1>
            <span>One enterprise.</span>
            <br />
            <span>Sixteen ways forward.</span>
          </h1>
          <div className="heroFooter">
            <p>
              We build and operate consumer and industrial businesses across
              Southeast Asia.
            </p>
            <a className="circleLink" href="#about" aria-label="Discover WBSQ">
              <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      <section className="statement" id="about" data-reveal>
        <p className="sideLabel">Why WBSQ</p>
        <div>
          <p className="displayStatement">
            Built as a house of <em>operators</em>, not a holding company on
            paper.
          </p>
          <div className="statementDetails">
            <p>
              Since 2012, WBSQ has grown from a single appliance business into
              a group spanning everyday consumer needs and essential industrial
              services.
            </p>
            <p>
              Each brand keeps its own identity and customer promise. Logistics,
              service, marketing and finance work together behind the scenes.
            </p>
          </div>
        </div>
      </section>

      <section className="metrics" aria-label="WBSQ at a glance" data-reveal>
        {metrics.map(([value, label], index) => (
          <AnimatedMetric value={value} label={label} index={index} key={label} />
        ))}
      </section>

      <section className="sectors" id="sectors" data-reveal>
        <div className="sectionHeading">
          <p className="sideLabel light">Our portfolio</p>
          <h2>Seven sectors.<br />One operating model.</h2>
          <p className="sectionIntro">
            Different crafts, connected by a shared standard of service and a
            long-term approach to building value.
          </p>
        </div>

        <div className="sectorGrid">
          {sectors.map((sector, index) => (
            <details
              className="sectorCard"
              key={sector.number}
              style={{ "--sector-delay": `${index * 80}ms` } as CSSProperties}
            >
              <summary>
                <div className="sectorCardTop">
                  <span className="sectorNumber">{sector.number}</span>
                  <span className="sectorCount">{sector.count}</span>
                </div>
                <h3>{sector.name}</h3>
                <span className="sectorControl">
                  <span className="showMore">Show brands</span>
                  <span className="showLess">Show less</span>
                  <i aria-hidden="true"><b /><b /></i>
                </span>
              </summary>
              <div className="sectorBrands">
                <div className="sectorBrandsInner">
                  <ul aria-label={`${sector.name} brands`}>
                    {sector.brands.map((brand) => <li key={brand}>{brand}</li>)}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="operations" data-reveal>
        <div className="operationsImage">
          <Image
            src="/wbsq-office.jpg"
            alt="A collaborative meeting at WBSQ's Singapore headquarters"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <span>Singapore headquarters · 01°17&apos;N</span>
        </div>
        <div className="operationsCopy">
          <p className="sideLabel">How we work</p>
          <h2>Local insight.<br />Shared strength.</h2>
          <p>
            Our brands stay close to their customers while drawing on the
            group&apos;s regional network, operational knowledge and disciplined
            capital.
          </p>
          <ol>
            <li><span>01</span>Build around a real customer need</li>
            <li><span>02</span>Operate with ownership and speed</li>
            <li><span>03</span>Share capability across the group</li>
          </ol>
        </div>
      </section>

      <section className="footprint" data-reveal>
        <div className="footprintLead">
          <p className="sideLabel light">Regional footprint</p>
          <h2>One base.<br />Five markets.</h2>
        </div>
        <div className="marketMap" aria-label="Markets served">
          <span className="mapLine" />
          <div className="market m1"><i />Singapore <small>HQ</small></div>
          <div className="market m2"><i />Malaysia</div>
          <div className="market m3"><i />Indonesia</div>
          <div className="market m4"><i />Thailand</div>
          <div className="market m5"><i />Vietnam</div>
          <p>ASEAN / connected operations</p>
        </div>
      </section>

      <section className="contact" id="contact" data-reveal>
        <p className="sideLabel">Start a conversation</p>
        <h2>Partnering, supplying<br />or joining us?</h2>
        <div className="contactBottom">
          <p>
            Tell us where you see an opportunity. We&apos;re always interested in
            people and partners who think for the long term.
          </p>
          <a className="contactButton" href="tel:+6580131800">
            <span>Call +65 8013 1800</span><b>↗</b>
          </a>
        </div>
      </section>

      <footer data-reveal>
        <div className="footerTop">
          <Image
            src="/wbsq-wordmark.png"
            alt="WBSQ"
            width={424}
            height={112}
          />
          <p>One enterprise,<br />twelve brands.</p>
        </div>
        <div className="footerBottom">
          <address>32 Hongkong Street<br />Singapore 059671</address>
          <nav aria-label="Footer navigation">
            <a href="/about">About</a>
            <a href="/brands">Brands</a>
            <a href="/contact">Contact</a>
          </nav>
          <p>© 2026 WBSQ Holdings Pte Ltd</p>
          <a href="#top" aria-label="Back to top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
