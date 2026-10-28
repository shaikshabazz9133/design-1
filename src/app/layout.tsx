import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BackToTop, CursorFollower, ScrollProgress } from "@/components/motion/extras";
import { MotionRoot } from "@/components/motion/primitives";
import { Loader } from "@/components/site/Loader";
import { site } from "@/lib/content/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-cormorant" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: {
    default: "Linnea Studio — Scandinavian Interior Design, Copenhagen",
    template: "%s | Linnea Studio",
  },
  description: site.brand.description,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { email, phone, phoneHref } = site.brand;
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} antialiased`}>
      <body className="min-h-dvh bg-white font-sans text-ink">
        <MotionRoot>
          <Loader />
          <ScrollProgress className="bg-pine" />
          <CursorFollower />
          <Header brand={{ email, phone, phoneHref }} />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop className="bg-white text-pine ring-1 ring-ink/10" ringClassName="stroke-pine" />
        </MotionRoot>
      </body>
    </html>
  );
}
