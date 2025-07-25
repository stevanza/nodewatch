import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NodeWatch - Blockchain Security Platform",
  description:
    "Professional blockchain security and fraud detection platform for enterprise use",
  keywords: "blockchain, security, monitoring, fraud detection, enterprise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-900 font-inter text-dark-100 antialiased">
        {children}
      </body>
    </html>
  );
}
