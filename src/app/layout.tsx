import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// `wdth` no viene por defecto; el display del diseño va a 125 %.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.url),
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: site.meta.url,
    siteName: site.identity.name,
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.meta.locale}
      className={`${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-fg font-sans">{children}</body>
    </html>
  );
}
