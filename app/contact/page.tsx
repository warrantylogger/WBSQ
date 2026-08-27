"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { CSSProperties } from "react";
import styles from "./contact.module.css";

const details = [
  { label: "Office", content: <><span>32 Hongkong Street</span><span>Singapore 059671</span></> },
  { label: "Phone", content: <a href="tel:+6580131800">+65 8013 1800</a> },
  { label: "Hours", content: <><span>Monday – Friday</span><span>9.00am – 6.00pm SGT</span></> },
];

export default function ContactPage() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-motion]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5%" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="/" aria-label="WBSQ home">
          <Image src="/wbsq-wordmark.png" alt="WBSQ" width={424} height={112} priority />
        </a>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <a href="/about">About</a>
          <a href="/brands">Brands</a>
          <a className={styles.active} href="/contact">Contact</a>
        </nav>
        <span className={styles.headerIndex}>SG / 01°17&apos;N</span>
        <details className={styles.mobileNav}>
          <summary aria-label="Open navigation"><i /><i /></summary>
          <nav aria-label="Mobile navigation">
            <a href="/about">About</a>
            <a href="/brands">Brands</a>
            <a className={styles.active} href="/contact">Contact</a>
          </nav>
        </details>
      </header>

      <main>
        <section className={styles.intro}>
          <div className={styles.fadeUp} data-motion>
            <p className={styles.eyebrow}>Contact</p>
            <h1>Where to find us</h1>
          </div>
          <p className={`${styles.introCopy} ${styles.fadeUp}`} data-motion style={{ "--delay": "140ms" } as CSSProperties}>
            Our group office sits by the Singapore River, a few minutes from Clarke Quay MRT. Drop by or give us a call.
          </p>
        </section>

        <section className={styles.contactGrid} aria-label="WBSQ office information">
          <div className={`${styles.mapWrap} ${styles.fadeRight}`} data-motion>
            <iframe
              title="Map of WBSQ Holdings at 32 Hongkong Street, Singapore"
              src="https://www.openstreetmap.org/export/embed.html?bbox=103.8442%2C1.2854%2C103.8496%2C1.2892&layer=mapnik&marker=1.2873%2C103.8469"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className={styles.mapCaption} aria-hidden="true">
              <span>Singapore River</span><span>01°17&apos;N · 103°50&apos;E</span>
            </div>
          </div>

          <div className={`${styles.office} ${styles.fadeLeft}`} data-motion style={{ "--delay": "100ms" } as CSSProperties}>
            <p className={styles.officeKicker}>Group office</p>
            <h2>Singapore</h2>
            <div className={styles.detailList}>
              {details.map((detail, index) => (
                <div className={styles.detailRow} key={detail.label}>
                  <p>{detail.label}</p>
                  <div style={{ "--delay": `${220 + index * 80}ms` } as CSSProperties}>{detail.content}</div>
                </div>
              ))}
            </div>
            <a className={styles.callLink} href="tel:+6580131800">
              <span>Call the office</span><span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerName}>WBSQ Holdings Pte Ltd</p>
          <nav aria-label="Footer navigation">
            <a href="/about">About</a>
            <a href="/brands">Brands</a>
            <a className={styles.active} href="/contact">Contact</a>
            <span>© 2026</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
