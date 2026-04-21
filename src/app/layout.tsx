import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import "@/styles/reset.css";
import "@/styles/variables.css";
import "@/styles/typography.css";
import "@/styles/utilities.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { defaultMetadata } from "@/lib/metadata";
import { artistProfile } from "@/data/artist";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <a href="#conteudo" className="skipLink">
          Pular para conteúdo principal
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <a
          href={artistProfile.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="floatingWhatsApp"
          aria-label="Conversar no WhatsApp"
        >
          WhatsApp
        </a>
      </body>
    </html>
  );
}
