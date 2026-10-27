import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Tracker",
  description: "Web Pelacak Kebugaran Harian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
