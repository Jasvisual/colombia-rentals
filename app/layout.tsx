import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colombia Rentals - Alquileres Cortos en Colombia",
  description: "Encuentra tu next short-term rental perfecto en Colombia. Medellín, Cartagena, Bogotá y Santa Marta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🏠</span>
              <span className="text-xl font-bold text-[#FF385C]">Colombia Rentals</span>
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400">© 2024 Colombia Rentals. Todos los derechos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}