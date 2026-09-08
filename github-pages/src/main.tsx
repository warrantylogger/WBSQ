import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Home from "../../app/page";
import AboutPage from "../../app/about/page";
import BrandsPage from "../../app/brands/page";
import ContactPage from "../../app/contact/page";
import FounderPage from "../../app/founder/page";
import CustomCursor from "../../app/components/CustomCursor";
import "../../app/globals.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

const pageTitles: Record<string, string> = {
  "/": "WBSQ Holdings",
  "/about": "About — WBSQ Holdings",
  "/brands": "Brands — WBSQ Holdings",
  "/contact": "Contact — WBSQ Holdings",
  "/founder": "Kevin Ho — Founder of WBSQ Holdings",
};

function currentRoute() {
  let pathname = window.location.pathname;
  if (pathname.startsWith(basePath)) pathname = pathname.slice(basePath.length);
  pathname = `/${pathname}`.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  return pathname in pageTitles ? pathname : "/";
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
      document.title = pageTitles[nextRoute];
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="/"]');
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !(href in pageTitles)) return;

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
  return <Home />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomCursor />
    <GitHubPagesApp />
  </StrictMode>,
);
