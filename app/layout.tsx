import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "myShelf",
  description: "Minimal book recommender and manager app",
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