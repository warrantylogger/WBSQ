import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands, getBrandBySlug, getBrandLogo } from "../brand-data";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "../brands.module.css";
import ScrollToTop from "./scroll-to-top";

type BrandPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) return { title: "Brand not found — WBSQ Holdings" };

  return {
    title: `${brand.name} — WBSQ Holdings`,
    description: brand.summary,
  };
}

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) notFound();

  const index = brands.findIndex((item) => item.slug === brand.slug);
  const previous = brands[(index - 1 + brands.length) % brands.length];
  const next = brands[(index + 1) % brands.length];
  const websiteLinks = brand.websites ?? (brand.website ? [{ label: "Visit brand website", url: brand.website }] : []);

  return (
    <div className={styles.page} id="top">
      <ScrollToTop routeKey={brand.slug} />
      <SiteHeader theme="light" active="brands" />

      <main className={styles.detailMain}>
        <a className={styles.detailBack} href="/brands"><span aria-hidden="true">←</span> All brands</a>

        <section className={styles.detailHero}>
          <div className={styles.detailIdentity}>
            <p className={styles.detailEyebrow}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{brand.categories.join(" · ")}</span>
            </p>
            <h1>{brand.name}</h1>
          </div>
          <aside className={styles.detailAside} aria-label="Brand information">
            <div className={styles.detailBadge} data-brand-logo={brand.largeLogo ? brand.slug : undefined}>
              {brand.logoPending ? (
                <span className={styles.logoPlaceholder}>{brand.name}</span>
              ) : (
                <Image
                  src={getBrandLogo(brand.slug)}
                  alt={`${brand.name} logo`}
                  width={640}
                  height={360}
                  priority
                />
              )}
            </div>
            <dl className={styles.detailFacts}>
              <div><dt>Sector</dt><dd>{brand.categories.join(" · ")}</dd></div>
              <div><dt>Market</dt><dd>{brand.location}</dd></div>
            </dl>
          </aside>
        </section>

        <section className={styles.detailBody}>
          <p className={styles.detailLabel}>Brand description</p>
          <div className={styles.detailCopyWrap}>
            <p className={styles.detailCopy}>{brand.description}</p>
            {websiteLinks.length > 0 && (
              <div className={styles.websiteLinks}>
                {websiteLinks.map((website) => (
                  <a className={styles.websiteLink} href={website.url} target="_blank" rel="noreferrer" key={website.url}>
                    {website.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <nav className={styles.detailPager} aria-label="Browse brands">
          <a href={`/brands/${previous.slug}`}>
            <span>← Previous brand</span>
            <strong>{previous.name}</strong>
          </a>
          <a href={`/brands/${next.slug}`}>
            <span>Next brand →</span>
            <strong>{next.name}</strong>
          </a>
        </nav>
      </main>

      <SiteFooter active="brands" />
    </div>
  );
}
