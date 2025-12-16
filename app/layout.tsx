import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Espacio Home Design - 80 years of designing homes with a story to tell",
  description: "Premium home design, interior design, kitchens, and projects. Heritage, design and commitment of three generations.",
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
