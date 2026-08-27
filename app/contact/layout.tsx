import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact WBSQ Holdings — Where to find us",
  description:
    "Find WBSQ Holdings at 32 Hongkong Street, Singapore, and view the group office phone number and opening hours.",
  openGraph: {
    title: "Contact WBSQ Holdings — Where to find us",
    description:
      "Visit the WBSQ group office by the Singapore River or call us during weekday business hours.",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Contact WBSQ Holdings — Where to find us",
    description:
      "Visit the WBSQ group office by the Singapore River or call us during weekday business hours.",
    images: [],
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
