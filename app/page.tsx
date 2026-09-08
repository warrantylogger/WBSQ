"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { LogoItem } from "../components/LogoLoop";
import ScrollGlobe from "../components/ScrollGlobe";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const clientLogos: LogoItem[] = [
  { src: "/client-logos/client-01.webp", alt: "Nanyang Technological University" },
  { src: "/client-logos/client-02.webp", alt: "ST Engineering" },
  { src: "/client-logos/client-03.webp", alt: "United States Embassy Singapore" },
  { src: "/client-logos/client-04.webp", alt: "Flex" },
  { src: "/client-logos/client-05.webp", alt: "Wine Connection" },
  { src: "/client-logos/client-06.webp", alt: "Forefront" },
  { src: "/client-logos/client-07.webp", alt: "Contraves" },
  { src: "/client-logos/client-08.webp", alt: "Perodua" },
  { src: "/client-logos/client-09.webp", alt: "TCWA" },
  { src: "/client-logos/client-10.webp", alt: "Bagan Specialist Centre" },
  { src: "/client-logos/client-11.webp", alt: "ViTrox" },
  { src: "/client-logos/client-12.webp", alt: "AMD" },
  { src: "/client-logos/client-13.webp", alt: "Makino" },
  { src: "/client-logos/client-14.webp", alt: "Creative" },
  { src: "/client-logos/client-15.webp", alt: "KLN" },
  { src: "/client-logos/client-16.webp", alt: "Bosch Rexroth" },
  { src: "/client-logos/client-17.webp", alt: "HCS Scientific & Chemical" },
  { src: "/client-logos/client-18.webp", alt: "Feinmetall" },
  { src: "/client-logos/client-19.webp", alt: "Forbes Marshall" },
  { src: "/client-logos/client-20.webp", alt: "DSO National Laboratories" },
  { src: "/client-logos/client-21.webp", alt: "National University of Singapore" },
  { src: "/client-logos/client-22.webp", alt: "Sankyu" },
  { src: "/client-logos/client-23.webp", alt: "Institute of Technical Education" },
  { src: "/client-logos/client-24.webp", alt: "Edwards" },
  { src: "/client-logos/client-25.webp", alt: "Agency for Science, Technology and Research" },
  { src: "/client-logos/client-26.webp", alt: "B. Braun" },
  { src: "/client-logos/client-27.webp", alt: "Heitkamp & Thumann Group" },
  { src: "/client-logos/client-28.webp", alt: "Nissei Technology" },
  { src: "/client-logos/client-29.webp", alt: "PerkinElmer" },
  { src: "/client-logos/client-31.webp", alt: "Standard Chartered" },
  { src: "/client-logos/singapore-airlines.webp", alt: "Singapore Airlines" },
  { src: "/client-logos/dbs.webp", alt: "DBS" },
  { src: "/client-logos/raffles-singapore.webp", alt: "Raffles Singapore" },
];

const clientLogoRows = [
  clientLogos.filter((_, index) => index % 2 === 0),
  clientLogos.filter((_, index) => index % 2 === 1),
];

const sectors = [
  {
    number: "01",
    name: "Appliances",
    filter: "Home appliances",
    count: "11 brands",
    brands: ["The Appliances Co.", "Hobs and Hoods", "Fridge", "Wine Fridge", "DryBox", "AirDry", "Cadenza Celler", "Dewpoint.Co", "Hiniso", "Blupura", "Wine Emotion"],
  },
  {
    number: "02",
    name: "Robotics & Tech",
    filter: "Tech & robotics",
    count: "3 brands",
    brands: ["Smart Watch", "KeenOn Robotics", "Bambu Lab"],
  },
  {
    number: "03",
    name: "Construction",
    filter: "Construction",
    count: "3 brands",
    brands: ["Boh Beh Zao Construction", "Hightech", "Waterproofing"],
  },
  {
    number: "04",
    name: "Logistics",
    filter: "Logistics",
    count: "1 brand",
    brands: ["niveken Logistics"],
  },
  {
    number: "05",
    name: "Wellness & Education",
    filter: "Wellness & education",
    count: "3 brands",
    brands: ["Better with Age Wine", "Science Kits", "Nighte Aromatherapy"],
  },
  {
    number: "06",
    name: "Marketing Services",
    filter: "Marketing services",
    count: "2 brands",
    brands: ["Calm Desk Co.", "Warranty Logger"],
  },
];

const metrics = [
  ["23", "Distinct brands"],
  ["06", "Operating sectors"],
  ["06", "Regional markets"],
  ["100k+", "Customers served"],
];

const values = [
  ["01", "Customer centricity"],
  ["02", "Integrity"],
  ["03", "Collaboration"],
  ["04", "Agility"],
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

export default function Home() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const updateHeroExit = () => {
      animationFrame = 0;
      const distance = Math.max(hero.offsetHeight * 0.78, 1);
      const progress = reducedMotion.matches
        ? 0
        : Math.min(Math.max((window.scrollY - hero.offsetTop) / distance, 0), 1);

      hero.style.setProperty("--hero-exit-opacity", String(1 - progress));
      hero.style.setProperty("--hero-exit-y", `${progress * -90}px`);
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateHeroExit);
    };

    updateHeroExit();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

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

  useEffect(() => {
    const desktopMotion = window.matchMedia("(min-width: 981px) and (prefers-reduced-motion: no-preference)");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-section]"));
    const entrySection = document.querySelector<HTMLElement>("[data-scroll-entry]");
    if (sections.length < 2) return;

    let locked = false;
    let unlockTimer = 0;

    const moveTo = (section: HTMLElement) => {
      locked = true;
      window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, 850);
    };

    const handleWheel = (event: WheelEvent) => {
      if (!desktopMotion.matches || event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 2) return;

      const firstTop = sections[0].offsetTop;
      const lastIndex = sections.length - 1;
      const lastTop = sections[lastIndex].offsetTop;
      const scrollTop = window.scrollY;
      const direction = event.deltaY > 0 ? 1 : -1;
      const closeToSequence = scrollTop >= firstTop - window.innerHeight * .15 && scrollTop <= lastTop + window.innerHeight * .15;

      const enteringFromBrands = entrySection
        && direction > 0
        && scrollTop >= firstTop - window.innerHeight * .55
        && scrollTop < firstTop - 2;

      if (enteringFromBrands) {
        event.preventDefault();
        if (!locked) moveTo(sections[0]);
        return;
      }

      if (!closeToSequence) return;

      if (locked) {
        event.preventDefault();
        return;
      }

      if (scrollTop < firstTop - 2) {
        if (direction < 0) return;
        event.preventDefault();
        moveTo(sections[0]);
        return;
      }

      if (scrollTop > lastTop + 2) {
        if (direction > 0) return;
        event.preventDefault();
        moveTo(sections[lastIndex]);
        return;
      }

      const currentIndex = sections.reduce((closest, section, index) =>
        Math.abs(section.offsetTop - scrollTop) < Math.abs(sections[closest].offsetTop - scrollTop) ? index : closest
      , 0);
      const nextIndex = currentIndex + direction;

      if (nextIndex < 0 || nextIndex > lastIndex) return;
      event.preventDefault();
      moveTo(sections[nextIndex]);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.clearTimeout(unlockTimer);
    };
  }, []);

  return (
    <main>
      <div className="portfolioBridge" data-globe-bridge>
        <ScrollGlobe />

        <div className="heroStickyStage">
          <section className="hero" id="top">
        <Image
          className="heroImage"
          src="/wbsq-hero-team.jpg"
          alt="WBSQ team gathered together on the beach"
          fill
          priority
          sizes="100vw"
        />
        <div className="heroShade" />
        <SiteHeader homeHref="#top" />

        <div className="heroContent">
          <h1>
            <span>One enterprise.</span>
            <br />
            <span>Twenty-three ways forward.</span>
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

          <section className="statement" id="about" data-globe-start data-reveal>
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
        </div>

        <section className="metrics" aria-label="WBSQ at a glance" data-reveal>
          {metrics.map(([value, label], index) => (
            <AnimatedMetric value={value} label={label} index={index} key={label} />
          ))}
        </section>

        <section className="sectors" id="sectors" data-globe-dark data-scroll-entry data-reveal>
          <div className="sectionHeading">
            <p className="sideLabel light">Our brands</p>
            <h2>Six sectors.<br />One operating model.</h2>
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
                  <h3>
                    <a
                      href={`/brands?sector=${encodeURIComponent(sector.filter)}#brand-directory`}
                      onClick={(event) => event.stopPropagation()}
                      aria-label={`View ${sector.name} brands`}
                    >
                      {sector.name}
                    </a>
                  </h3>
                  <span className="sectorControl">
                    <span className="showMore">Show brands</span>
                    <span className="showLess">Show less</span>
                    <i aria-hidden="true"><b /><b /></i>
                  </span>
                </summary>
                <div className="sectorBrands">
                  <div className="sectorBrandsInner">
                    <ul aria-label={`${sector.name} brands`}>
                      {sector.brands.map((brand) => (
                        <li key={brand}>
                          {brand === "Dewpoint.Co" ? (
                            <a href="http://dewpoint.co/" target="_blank" rel="noreferrer">{brand}</a>
                          ) : brand}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            ))}
          </div>
          <a className="sectorDirectoryLink" href="/brands">
            <span>Explore all brands</span>
            <i aria-hidden="true">↗</i>
          </a>
        </section>
      </div>

      <section className="operations" data-reveal data-scroll-section>
        <div className="operationsImage">
          <Image
            src="/how-we-work-event.jpg"
            alt="WBSQ team members presenting a Hiniso Dry Cabinet at an event"
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

      <section className="valuesFeature" data-reveal data-scroll-section>
        <div className="valuesCopy">
          <p className="sideLabel">Values</p>
          <h2>What we<br />stand for.</h2>
          <ol className="valuesList">
            {values.map(([number, title]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
              </li>
            ))}
          </ol>
          <a className="valuesAboutLink" href="/about">
            <span>About us</span>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
        <div className="valuesImage">
          <Image
            src="/what-we-stand-for.jpg"
            alt="WBSQ representatives at the Johor Industrial Fair 2026"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <span>One group · Shared values</span>
        </div>
      </section>

      <section className="footprint" data-reveal data-scroll-section>
        <div className="footprintLead">
          <p className="sideLabel light">Regional footprint</p>
          <h2>One base.<br />Six markets.</h2>
        </div>
        <div className="marketMap" aria-label="Markets served">
          <span className="mapLine" />
          <div className="market m1"><i />Singapore <small>HQ</small></div>
          <div className="market m2"><i />Malaysia</div>
          <div className="market m3"><i />Indonesia</div>
          <div className="market m4"><i />Thailand <small>Upcoming</small></div>
          <div className="market m5"><i />US</div>
          <div className="market m6"><i />Philippines</div>
          <p>ASEAN / connected operations</p>
        </div>
      </section>

      <section className="trustedBrands" data-reveal aria-labelledby="trusted-brands-heading">
        <h2 id="trusted-brands-heading">
          <span>Trusted by leading brands</span>
        </h2>
        <div className="trustedLoop">
          {clientLogoRows.map((logos, index) => (
            <div
              key={index}
              className={`trustedMarquee${index === 1 ? " trustedMarqueeReverse" : ""}`}
              role="region"
              aria-label={`Organizations that have trusted WBSQ, row ${index + 1}`}
              style={{ "--marquee-duration": index === 0 ? "70s" : "76s" } as CSSProperties}
            >
              <div className="trustedMarqueeTrack">
                {[0, 1].map((copyIndex) => (
                  <ul className="trustedMarqueeList" key={copyIndex} aria-hidden={copyIndex === 1}>
                    {logos.map((logo, logoIndex) => "src" in logo ? (
                      <li key={`${copyIndex}-${logoIndex}`}>
                        <img
                          src={logo.src}
                          alt={copyIndex === 0 ? logo.alt ?? "" : ""}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </li>
                    ) : null)}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
