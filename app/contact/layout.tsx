import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact WBSQ Holdings — Where to find us",
  description:
    "Find WBSQ Holdings at 32 Hongkong Street, Singapore, or contact the team at support@wbsq.com.",
  openGraph: {
    title: "Contact WBSQ Holdings — Where to find us",
    description:
      "Visit the WBSQ group office by the Singapore River or email support@wbsq.com.",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Contact WBSQ Holdings — Where to find us",
    description:
      "Visit the WBSQ group office by the Singapore River or email support@wbsq.com.",
    images: [],
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
