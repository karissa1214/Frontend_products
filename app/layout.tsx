import type { Metadata } from "next";
import "@/app/global.css";

export const metadata: Metadata = {
  title: "My App",
  description: "My Next.js App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}