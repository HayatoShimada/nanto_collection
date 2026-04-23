import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NANTO Collection",
  description: "NANTO Collection 2027",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
