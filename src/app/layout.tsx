import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const robo = Roboto({
  weight: "300",
  variable: "--btn-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multi-threading with Next.js",
  description:
    "Built by an unemployed developer with no commercial experience with Next.js. According to recruiters, this is a red flag.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robo.variable} antialiased`}>{children}</body>
    </html>
  );
}
