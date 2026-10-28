import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BackToTop, CursorFollower, ScrollProgress } from "@/components/motion/extras";
import { MotionRoot } from "@/components/motion/primitives";
import { Loader } from "@/components/site/Loader";
import { site } from "@/lib/content/site";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["SOFT", "WONK", "opsz"], variable: "--font-fraunces" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: {
    default: "Linnea Studio — Scandinavian Interior Design, Copenhagen",
    template: "%s | Linnea Studio",
  },
  description: site.brand.description,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { email, phone, phoneHref } = site.brand;
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} antialiased`}>
      <body className="min-h-dvh bg-snow font-sans text-ink">
        <MotionRoot>
          <Loader />
          <ScrollProgress className="bg-sage-deep" />
          <CursorFollower className="border border-sage-deep/50" activeClassName="border border-sage-deep bg-sage/40" />
          <Header brand={{ email, phone, phoneHref }} />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop className="bg-snow text-sage-deep ring-1 ring-ink/10" ringClassName="stroke-sage-deep" />
        </MotionRoot>
      </body>
    </html>
  );
}
