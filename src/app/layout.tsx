import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interTight = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kartikeyshivhare.com"),
  title: "Kartikey Shivhare — Data Science & AI Developer",
  description: "Personal portfolio of Kartikey Shivhare, B.Tech Computer Science (Data Science) student and Web & AI Solutions developer.",
  openGraph: {
    title: "Kartikey Shivhare — Data Science & AI Developer",
    description: "Personal portfolio of Kartikey Shivhare.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Kartikey Shivhare Portfolio" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#f4f2ee] text-[#0d0d0d] antialiased selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        {children}
      </body>
    </html>
  );
}
