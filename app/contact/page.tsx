"use client";

import { useEffect } from "react";
import type { CSSProperties } from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import styles from "./contact.module.css";

const details = [
  { label: "Singapore", content: <><span>32 Hongkong Street</span><span>Singapore 059671</span></> },
  {
    label: "Malaysia",
    content: (
      <>
        <span>A1-6, 1st Floor, KL Industrial Park,</span>
        <span>653, Batu 5, Jalan Kelang Lama,</span>
        <span>58200 KL</span>
      </>
    ),
  },
  { label: "Email", content: <a href="mailto:support@wbsq.com">support@wbsq.com</a> },
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
    <div className={styles.page} id="top">
      <SiteHeader theme="light" active="contact" />

      <main>
        <section className={styles.intro}>
          <div className={styles.fadeUp} data-motion>
            <p className={styles.eyebrow}>Contact</p>
            <h1>Where to find us</h1>
          </div>
          <p className={`${styles.introCopy} ${styles.fadeUp}`} data-motion style={{ "--delay": "140ms" } as CSSProperties}>
            Our group offices connect Singapore and Kuala Lumpur. Drop by or send us an email.
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
            <p className={styles.officeKicker}>Group offices</p>
            <h2>Singapore &amp; Malaysia</h2>
            <div className={styles.detailList}>
              {details.map((detail, index) => (
                <div className={styles.detailRow} key={detail.label}>
                  <p>{detail.label}</p>
                  <div style={{ "--delay": `${220 + index * 80}ms` } as CSSProperties}>{detail.content}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter active="contact" />
    </div>
  );
}
