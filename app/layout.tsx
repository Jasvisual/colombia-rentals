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
  title: "Inmobiliaria XYZ - Propiedades en Colombia",
  description: "Los mejores inmuebles en Medellín, Cartagena, Bogotá y Santa Marta. Apartamentos, casas, villas y más.",
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
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Inmobiliaria XYZ</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Inicio
              </Link>
              <a href="#contacto" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Contacto
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer id="contacto" className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h3 className="text-lg font-semibold mb-4">Inmobiliaria XYZ</h3>
                <p className="text-gray-400 text-sm">
                  Tu mejor opción para encontrar el hogar perfecto en las principales ciudades de Colombia.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                <div className="space-y-2 text-gray-400 text-sm">
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@inmobiliaraxyz.com
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +57 317 479 2161
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Ciudadades</h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">Medellín</span>
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">Cartagena</span>
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">Bogotá</span>
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">Santa Marta</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Inmobiliaria XYZ. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}