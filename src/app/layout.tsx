import type { Metadata } from "next";
import { gcVank, inter, jetbrainsMono, aestica, vongks, domica } from "./fonts";
import "./globals.css";
import { LoadingCalibration } from "@/components/ui/LoadingCalibration";

export const metadata: Metadata = {
  metadataBase: new URL('https://idolfashiontheelitelab.com'),
  title: "Idol Fashion: The Elite Lab",
  description: "Advanced model, designer, and photographer technical training and management. Where science meets high fashion.",
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    title: "Idol Fashion: The Elite Lab",
    description: "Advanced model, designer, and photographer technical training and management. Miami's premier talent infrastructure.",
    url: 'https://idolfashiontheelitelab.com',
    siteName: 'Idol Fashion',
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Idol Fashion: The Elite Lab",
      },
    ],
    locale: 'en_US',
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Idol Fashion: The Elite Lab",
    description: "Advanced model, designer, and photographer technical training and management.",
    images: ["/assets/og-image.png"],
  },
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
        {children}
      </body>
    </html>
  );
}
