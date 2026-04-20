import type { Metadata } from "next";
import { gcVank, inter, jetbrainsMono, aestica, vongks, domica } from "./fonts";
import "./globals.css";
import { LoadingCalibration } from "@/components/ui/LoadingCalibration";
import { FontSwitcher } from "@/components/ui/FontSwitcher";

export const metadata: Metadata = {
  title: "Idol Fashion: The Elite Lab",
  description: "Advanced model, designer, and photographer technical training and management. Where science meets high fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gcVank.variable} ${inter.variable} ${jetbrainsMono.variable} ${aestica.variable} ${vongks.variable} ${domica.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-secondary text-brand-primary selection:bg-accent selection:text-white overflow-x-hidden">
        <LoadingCalibration />
        <FontSwitcher />
        {children}
      </body>
    </html>
  );
}
