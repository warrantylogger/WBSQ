type SiteHeaderProps = {
  active?: "about" | "brands" | "contact";
  theme?: "dark" | "light";
  homeHref?: string;
};

export default function SiteHeader({ active, theme = "dark", homeHref = "/" }: SiteHeaderProps) {
  return (
    <header className={`siteHeader${theme === "light" ? " siteHeaderLight" : ""}`}>
      <a href={homeHref} aria-label="WBSQ home">
        <img
          className="wordmark"
          src={theme === "light" ? "/wbsq-holdings-black.png" : "/wbsq-holdings-white.png"}
          alt="WBSQ Holdings"
          width="775"
          height="262"
        />
      </a>
      <details className="mobileNav">
        <summary aria-label="Open navigation">
          <span className="menuLabel" aria-hidden="true"><b>Menu</b><b>Close</b></span>
          <span className="menuGlyph" aria-hidden="true"><i /><i /></span>
        </summary>
        <nav aria-label="Primary navigation">
          <a href="/about" aria-current={active === "about" ? "page" : undefined}>About Us</a>
          <a href="/brands" aria-current={active === "brands" ? "page" : undefined}>Brands</a>
          <a href="/contact" aria-current={active === "contact" ? "page" : undefined}>Contact</a>
        </nav>
      </details>
    </header>
  );
}
