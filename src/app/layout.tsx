import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { PageLoader } from "@/components/PageLoader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NANTO Collection 2027",
  description:
    "南砺市民の、南砺市民による、南砺市民のためのファッションショー「NANTO Collection 2027」。2027年3月14日（土）開催。",
  openGraph: {
    title: "NANTO Collection 2027",
    description:
      "南砺市民の、南砺市民による、南砺市民のためのファッションショー",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/background.png"
          fetchPriority="high"
        />
      </head>
      <body>
        <PageLoader>{children}</PageLoader>
      </body>
    </html>
  );
}
