type SiteFooterProps = {
  active?: "about" | "brands" | "contact" | "privacy-policy";
};

export default function SiteFooter({ active }: SiteFooterProps) {
  return (
    <footer className="siteFooter">
      <div className="siteFooterInner">
        <nav aria-label="Footer navigation">
          <a href="/about" aria-current={active === "about" ? "page" : undefined}>About</a>
          <a href="/brands" aria-current={active === "brands" ? "page" : undefined}>Brands</a>
          <a href="/contact" aria-current={active === "contact" ? "page" : undefined}>Contact</a>
          <a href="/privacy-policy" aria-current={active === "privacy-policy" ? "page" : undefined}>Privacy Policy</a>
        </nav>
        <p>Copyright © 2026 WBSQ Holdings Pte Ltd. All rights reserved.</p>
        <a href="#top" aria-label="Back to top">Back to top ↑</a>
      </div>
    </footer>
  );
}
