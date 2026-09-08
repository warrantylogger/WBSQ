"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { CSSProperties } from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import ArrowIcon from "../components/ArrowIcon";
import styles from "./founder.module.css";

const biography = [
  "As an entrepreneur with over 20 years of experience in the digital industry, I am passionately driven by innovation and the transformative power of technology. My journey has been marked by relentless curiosity and a commitment to leveraging digital solutions to solve real-world problems. From pioneering self-order kiosks for McDonald’s in Singapore to leading cutting-edge projects at Microsoft, Amazon, and Apple, my career is a testament to my belief in the potential of digital and eCommerce to revolutionize industries.",
  "I describe myself as a visionary entrepreneur who thrives on pushing boundaries and exploring new frontiers in technology. My expertise spans a wide array of digital domains, including AI, robotics, and eCommerce, where I have consistently demonstrated my ability to identify trends and capitalize on opportunities. My most notable project, the deployment of self-order kiosks in McDonald’s globally, showcased my ability to integrate technology seamlessly into everyday experiences, enhancing efficiency and customer satisfaction.",
  "Currently, my newest adventure with KeenOn involves better understanding service robotics for hotels and restaurants. I am spearheading initiatives that place us at the forefront of robotics innovation. KeenOn’s latest product, a cleaning robot designed for high-traffic areas, exemplifies my commitment to creating solutions that address contemporary challenges with sophistication and practicality.",
  "Beyond my professional achievements, I am deeply committed to promoting sustainability and eco-friendliness. This is reflected in my everyday directives in my companies and work with suppliers. Our fleet includes the electric vehicle BYD T3.",
];

export default function FounderPage() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-founder-motion]");
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
    <div className={styles.page} id="top">
      <SiteHeader theme="light" active="about" />

      <main>
        <section className={styles.hero}>
          <figure className={`${styles.portrait} ${styles.fadeRight}`} data-founder-motion>
            <Image
              src="/founder-kevin.webp"
              alt="Kevin Ho, founder and Managing Director of WBSQ Holdings"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <figcaption>Kevin Ho / Singapore</figcaption>
          </figure>

          <div className={`${styles.heroCopy} ${styles.fadeUp}`} data-founder-motion style={{ "--delay": "130ms" } as CSSProperties}>
            <p className={styles.eyebrow}>Founder</p>
            <h1>Kevin Ho</h1>
            <p className={styles.role}>Managing Director</p>
            <p className={styles.intro}>An entrepreneur driven by innovation, practical technology and the possibilities created when curiosity becomes action.</p>
            <div className={styles.profileLinks}>
              <a href="https://www.linkedin.com/in/hokevin/" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon direction="external" /></a>
              <a href="https://api.whatsapp.com/send?phone=6589789318" target="_blank" rel="noreferrer">Mobile <ArrowIcon direction="external" /></a>
            </div>
          </div>
        </section>

        <section className={styles.biography}>
          <div className={`${styles.bioLabel} ${styles.fadeUp}`} data-founder-motion>
            <p className={styles.eyebrow}>The journey</p>
            <span>20+ years across digital, eCommerce, AI and robotics.</span>
          </div>
          <div className={styles.bioCopy}>
            {biography.map((paragraph, index) => (
              <p
                className={styles.fadeUp}
                data-founder-motion
                style={{ "--delay": `${Math.min(index * 80, 240)}ms` } as CSSProperties}
                key={paragraph.slice(0, 36)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className={styles.perspective}>
          <div className={styles.perspectiveInner}>
            <p className={`${styles.eyebrow} ${styles.fadeUp}`} data-founder-motion>Perspective</p>
            <blockquote className={styles.fadeUp} data-founder-motion style={{ "--delay": "100ms" } as CSSProperties}>
              “In essence, I am an entrepreneur who is not just passionate about technology but also about the positive impact it can have on our lives and the world around us. My ability to blend creativity with strategic thinking has been key to my success, and I remain dedicated to driving innovation in the digital and eCommerce spaces.”
            </blockquote>
            <a className={`${styles.backLink} ${styles.fadeUp}`} data-founder-motion style={{ "--delay": "180ms" } as CSSProperties} href="/about">
              <ArrowIcon direction="left" /> Return to About
            </a>
          </div>
        </section>
      </main>

      <SiteFooter active="about" />
    </div>
  );
}
