import ArrowIcon from "./ArrowIcon";

type SiteFooterProps = {
  active?: "about" | "brands" | "contact";
};

export default function SiteFooter({ active }: SiteFooterProps) {
  return (
    <footer className="siteFooter">
      <div className="siteFooterInner">
        <nav aria-label="Footer navigation">
          <a href="/about" aria-current={active === "about" ? "page" : undefined}>About</a>
          <a href="/brands" aria-current={active === "brands" ? "page" : undefined}>Brands</a>
          <a href="/contact" aria-current={active === "contact" ? "page" : undefined}>Contact</a>
        </nav>
        <p>
          <span>Copyright © 2026 WBSQ Holdings Pte Ltd.</span>{" "}
          <span className="siteFooterRights">All rights reserved.</span>
        </p>
        <a href="#top" aria-label="Back to top">Back to top <ArrowIcon direction="up" /></a>
      </div>
    </footer>
  );
}
