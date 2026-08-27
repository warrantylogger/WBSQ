import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About WBSQ Holdings — Our story, team and values",
  description:
    "Learn how WBSQ grew from one Singapore appliance business into twelve brands across six sectors and five markets.",
  openGraph: {
    title: "About WBSQ Holdings — Our story, team and values",
    description:
      "The milestones, people and principles behind WBSQ Holdings.",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "About WBSQ Holdings — Our story, team and values",
    description: "The milestones, people and principles behind WBSQ Holdings.",
    images: [],
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
