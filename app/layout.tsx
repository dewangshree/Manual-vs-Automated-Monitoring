import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starlly — ROI Calculator",
  description: "Compare manual round costs vs automated monitoring with Starlly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
