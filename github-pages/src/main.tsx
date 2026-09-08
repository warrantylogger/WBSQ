import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Home from "../../app/page";
import AboutPage from "../../app/about/page";
import BrandsPage from "../../app/brands/page";
import ContactPage from "../../app/contact/page";
import FounderPage from "../../app/founder/page";
import { getBrandBySlug } from "../../app/brands/brand-data";
import CustomCursor from "../../app/components/CustomCursor";
import SiteLoader from "../../app/components/SiteLoader";
import BrandDetailPage from "./BrandDetailPage";
import "../../app/globals.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

const pageTitles: Record<string, string> = {
  "/": "WBSQ Holdings",
  "/about": "About — WBSQ Holdings",
  "/brands": "Brands — WBSQ Holdings",
  "/contact": "Contact — WBSQ Holdings",
  "/founder": "Kevin Ho — Founder of WBSQ Holdings",
};

function brandSlugFromRoute(route: string) {
  const match = route.match(/^\/brands\/([^/]+)$/);
  return match?.[1] ?? null;
}

function isKnownRoute(route: string) {
  const slug = brandSlugFromRoute(route);
  return route in pageTitles || Boolean(slug && getBrandBySlug(slug));
}

function titleForRoute(route: string) {
  const slug = brandSlugFromRoute(route);
  const brand = slug ? getBrandBySlug(slug) : undefined;
  return brand ? `${brand.name} — WBSQ Holdings` : pageTitles[route] ?? "WBSQ Holdings";
}

function currentRoute() {
  let pathname = window.location.pathname;
  if (pathname.startsWith(basePath)) pathname = pathname.slice(basePath.length);
  pathname = `/${pathname}`.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  return isKnownRoute(pathname) ? pathname : "/";
}

function routeUrl(route: string) {
  return route === "/" ? `${basePath}/` : `${basePath}${route}`;
}

function GitHubPagesApp() {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const updateRoute = () => {
      const nextRoute = currentRoute();
      setRoute(nextRoute);
      document.title = titleForRoute(nextRoute);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="/"]');
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !isKnownRoute(href)) return;

      event.preventDefault();
      window.history.pushState({}, "", routeUrl(href));
      updateRoute();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", updateRoute);
    updateRoute();
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", updateRoute);
    };
  }, []);

  if (route === "/about") return <AboutPage />;
  if (route === "/brands") return <BrandsPage />;
  if (route === "/contact") return <ContactPage />;
  if (route === "/founder") return <FounderPage />;
  const brandSlug = brandSlugFromRoute(route);
  if (brandSlug) return <BrandDetailPage slug={brandSlug} />;
  return <Home />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SiteLoader />
    <CustomCursor />
    <GitHubPagesApp />
  </StrictMode>,
);
