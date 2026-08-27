import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WBSQ Brands — Twelve businesses, six sectors",
  description:
    "Browse the WBSQ Holdings brand directory across appliances, technology and robotics, construction, logistics, wellness and education, and marketing services.",
  openGraph: {
    title: "WBSQ Brands — Twelve businesses, six sectors",
    description:
      "Twelve WBSQ businesses, each with its own customers and craft.",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "WBSQ Brands — Twelve businesses, six sectors",
    description: "Twelve WBSQ businesses, each with its own customers and craft.",
    images: [],
  },
};

export default function BrandsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
