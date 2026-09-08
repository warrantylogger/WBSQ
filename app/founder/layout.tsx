import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kevin Ho — Founder of WBSQ Holdings",
  description:
    "Meet WBSQ founder and Managing Director Kevin Ho, an entrepreneur working across digital innovation, eCommerce, AI and robotics.",
  openGraph: {
    title: "Kevin Ho — Founder of WBSQ Holdings",
    description:
      "The experience, ideas and technology-led perspective of WBSQ founder Kevin Ho.",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Kevin Ho — Founder of WBSQ Holdings",
    description:
      "The experience, ideas and technology-led perspective of WBSQ founder Kevin Ho.",
    images: [],
  },
};

export default function FounderLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
