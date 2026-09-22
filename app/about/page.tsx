"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { CSSProperties } from "react";
import TopologyField from "../../components/originkit/ui/topology-field";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import styles from "./about.module.css";

const milestones = [
  ["2012", "NIVEKEN is founded as a logistics company, serving primarily the China–Singapore route."],
  ["2016", "Service and logistics brought in-house; first regional market opens."],
  ["2020", "Robotics and automation added as the group’s second growth engine."],
  ["2023", "WBSQ Holdings is founded, bringing a growing portfolio of brands together under one group."],
  ["2025", "Shared services platform rolled out group-wide."],
];

const values = [
  ["01", "Customer centricity", "Every brand answers to the customer in front of it — not to a group template."],
  ["02", "Integrity", "We keep our commitments to partners, suppliers and each other, in writing and in practice."],
  ["03", "Collaboration", "Twenty-three teams, one bench. Talent, tooling and knowledge move freely across brands."],
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
    <div className={styles.page} id="top">
      <SiteHeader theme="light" active="about" />

      <main>
        <section className={styles.story}>
          <div className={`${styles.storyHeading} ${styles.fadeUp}`} data-motion>
            <p className={styles.eyebrow}>Our story</p>
            <h1>Built brand by brand, market by market.</h1>
          </div>
          <div className={`${styles.storyCopy} ${styles.fadeUp}`} data-motion style={{ "--delay": "160ms" } as CSSProperties}>
            <p>WBSQ began in 2012 as a small appliance business in Singapore, run by a team that answered its own phones and delivered its own orders. That habit of staying close to the customer never left.</p>
            <p>As demand grew, we built the capabilities we needed instead of outsourcing them: installation crews, a service desk, a warehouse, then a delivery fleet. Each new capability made the next brand easier to launch.</p>
            <p>Today the group spans six operating sectors — twenty-three brands sharing one operating model and one standard of service.</p>
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

        <section className={styles.founder}>
          <div className={`${styles.container} ${styles.founderGrid}`}>
            <div className={`${styles.founderCopy} ${styles.fadeUp}`} data-motion>
              <p className={styles.eyebrow}>Founder</p>
              <h2>Curiosity turned into a group of companies.</h2>
              <p>
                Kevin Ho founded WBSQ with a belief that practical technology,
                close customer relationships and the courage to keep building
                could move entire industries forward.
              </p>
              <span className={styles.founderHint}>Select the sphere to meet Kevin</span>
            </div>

            <a
              className={`${styles.founderSphere} ${styles.fadeUp}`}
              data-motion
              style={{ "--delay": "130ms" } as CSSProperties}
              href="/founder"
              aria-label="Meet WBSQ founder Kevin Ho"
            >
              <TopologyField
                background="#000000"
                edgeColor="#d9d9d9"
                nodeColor="#ffffff"
                density={104}
                dotSize={112}
                speed={34}
                hover={130}
                network={{ link: 112, lineWidth: 72, pulse: 82 }}
                sphere={{ offsetX: 0, tilt: 11, distance: 170 }}
                style={{ minWidth: "100%", minHeight: "100%" }}
              />
              <span className={styles.sphereLabel}>Kevin Ho <b aria-hidden="true">↗</b></span>
            </a>
          </div>
        </section>

        <section className={styles.team}>
          <div className={styles.container}>
            <div className={`${styles.teamHeading} ${styles.fadeUp}`} data-motion>
              <p className={styles.eyebrow}>The team</p>
              <h2>Roughly 50 people across five markets.</h2>
            </div>

            <div className={styles.teamGrid}>
              <figure className={styles.fadeRight} data-motion>
                <div className={styles.imageFrame}>
                  <Image
                    src="/wbsq-team-dinner.webp"
                    alt="WBSQ team gathered at the annual group dinner in Singapore"
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <figcaption>Annual group dinner, Singapore</figcaption>
              </figure>
              <figure className={styles.fadeLeft} data-motion style={{ "--delay": "100ms" } as CSSProperties}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/wbsq-hero-team.jpg"
                    alt="WBSQ team at the annual retreat on the beach"
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <figcaption>Company retreat, Phuket</figcaption>
              </figure>
              <figure className={styles.fadeUp} data-motion style={{ "--delay": "200ms" } as CSSProperties}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/wbsq-team-photo.jpg"
                    alt="WBSQ team gathered by the beach"
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <figcaption>Beach party</figcaption>
              </figure>
              <figure className={styles.fadeUp} data-motion style={{ "--delay": "300ms" } as CSSProperties}>
                <div className={styles.imageFrame}>
                  <Image
                    src="/wbsq-malaysia-team.jpg"
                    alt="WBSQ Malaysia team gathered at the office"
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>
                <figcaption>Malaysia team</figcaption>
              </figure>
            </div>

            <blockquote className={`${styles.quote} ${styles.fadeUp}`} data-motion>
              <p>“We don&apos;t run brands from a spreadsheet. We run them from the floor — which is why our directors still do service calls.”</p>
              <footer>Kevin Ho / Director, WBSQ Holdings</footer>
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

      <SiteFooter active="about" />
    </div>
  );
}
