import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "wbsq-holdings-sg.marketing36667.chatgpt.site";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "WBSQ Holdings — One enterprise, twelve brands",
    description:
      "WBSQ Holdings is a Singapore-based operating group of twelve brands across appliances, robotics, construction, logistics, wellness and marketing.",
    icons: {
      icon: "/wbsq-wordmark.png",
      shortcut: "/wbsq-wordmark.png",
    },
    openGraph: {
      title: "WBSQ Holdings — One enterprise, twelve brands",
      description:
        "A Singapore-based operating group building consumer and industrial businesses across Southeast Asia.",
      type: "website",
      images: [{ url: socialImage, width: 1734, height: 907, alt: "WBSQ Holdings — One enterprise. Twelve brands." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "WBSQ Holdings — One enterprise, twelve brands",
      description:
        "A Singapore-based operating group building consumer and industrial businesses across Southeast Asia.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
