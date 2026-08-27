"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { CSSProperties } from "react";
import styles from "./about.module.css";

const milestones = [
  ["2012", "WBSQ is founded in Singapore with a single home appliance business."],
  ["2016", "Service and logistics brought in-house; first regional market opens."],
  ["2020", "Robotics and automation added as the group’s second growth engine."],
  ["2024", "Twelve brands operating across six sectors and five markets."],
  ["2025", "Shared services platform rolled out group-wide."],
];

const values = [
  ["01", "Customer centricity", "Every brand answers to the customer in front of it — not to a group template."],
  ["02", "Integrity", "We keep our commitments to partners, suppliers and each other, in writing and in practice."],
  ["03", "Collaboration", "Twelve teams, one bench. Talent, tooling and knowledge move freely across brands."],
  ["04", "Agility", "Small decision circles, short cycles, and a bias toward shipping over deliberating."],
];

export default function AboutPage() {
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

  return (
    <div className={styles.page} id="about-top">
      <header className={styles.header}>
        <a href="/" aria-label="WBSQ home">
          <Image src="/wbsq-wordmark.png" alt="WBSQ" width={424} height={112} priority />
        </a>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <a className={styles.active} href="/about">About</a>
          <a href="/brands">Brands</a>
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
        <section className={styles.story}>
          <div className={`${styles.storyHeading} ${styles.fadeUp}`} data-motion>
            <p className={styles.eyebrow}>Our story</p>
            <h1>Built brand by brand, market by market.</h1>
          </div>
          <div className={`${styles.storyCopy} ${styles.fadeUp}`} data-motion style={{ "--delay": "160ms" } as CSSProperties}>
            <p>WBSQ began in 2012 as a small appliance business in Singapore, run by a team that answered its own phones and delivered its own orders. That habit of staying close to the customer never left.</p>
            <p>As demand grew, we built the capabilities we needed instead of outsourcing them: installation crews, a service desk, a warehouse, then a delivery fleet. Each new capability made the next brand easier to launch.</p>
            <p>Today the group spans appliances, robotics, construction, logistics, wellness and marketing services — twelve brands sharing one operating model and one standard of service.</p>
          </div>
        </section>

        <section className={styles.milestones}>
          <div className={styles.container}>
            <p className={`${styles.eyebrow} ${styles.fadeUp}`} data-motion>Milestones</p>
            <div className={styles.milestoneGrid}>
              {milestones.map(([year, description], index) => (
                <article
                  className={`${styles.milestoneCard} ${styles.fadeUp}`}
                  data-motion
                  style={{ "--delay": `${index * 90}ms` } as CSSProperties}
                  key={year}
                >
                  <p className={styles.year}>{year}</p>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.team}>
          <div className={styles.container}>
            <div className={`${styles.teamHeading} ${styles.fadeUp}`} data-motion>
              <p className={styles.eyebrow}>The team</p>
              <h2>Roughly 300 people across five markets.</h2>
            </div>

            <div className={styles.teamGrid}>
              <figure className={styles.fadeRight} data-motion>
                <div className={styles.imageFrame}>
                  <Image
                    src="/team-dinner.jpg"
                    alt="WBSQ colleagues at the annual company dinner in Singapore"
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <figcaption>Annual group dinner, Singapore</figcaption>
              </figure>
              <figure className={styles.fadeLeft} data-motion style={{ "--delay": "100ms" } as CSSProperties}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/team-beach.jpg"
                    alt="WBSQ team at the annual retreat on the beach"
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <figcaption>Company retreat, Phuket</figcaption>
              </figure>
            </div>

            <blockquote className={`${styles.quote} ${styles.fadeUp}`} data-motion>
              <p>“We don&apos;t run brands from a spreadsheet. We run them from the floor — which is why our managing directors still do service calls.”</p>
              <footer>Group Managing Director, WBSQ Holdings</footer>
            </blockquote>
          </div>
        </section>

        <section className={styles.values}>
          <div className={styles.container}>
            <p className={`${styles.eyebrow} ${styles.fadeUp}`} data-motion>Values</p>
            <div className={styles.valueGrid}>
              {values.map(([number, title, description], index) => (
                <article
                  className={`${styles.valueCard} ${styles.fadeUp}`}
                  data-motion
                  style={{ "--delay": `${index * 90}ms` } as CSSProperties}
                  key={number}
                >
                  <p className={styles.valueNumber}>{number}</p>
                  <h3>{title}</h3>
                  <p>{description}</p>
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
            <a className={styles.active} href="/about">About</a>
            <a href="/brands">Brands</a>
            <a href="/contact">Contact</a>
            <span>© 2026</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
