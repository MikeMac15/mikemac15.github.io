import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Home, { Footer } from "./mainPage";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael McIntosh | Software Engineer",
  description: "Portfolio website for Michael McIntosh.",
};

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Left: “Logo” */}
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-semibold tracking-wide text-slate-100">
            Michael McIntosh
          </span>
          <span className="text-md font-medium text-slate-400">
            Software Engineer
          </span>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/mikemac15"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-400 bg-white/10 text-slate-100 transition hover:border-white/20 hover:bg-white/10 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <FaGithub className="h-5 w-5" />
          </Link>

          <Link
            href="https://linkedin.com/in/michaeldmcintosh15"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-400 bg-white/10 text-blue-400 transition hover:border-white/20 hover:bg-white/10 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <FaLinkedin className="h-5 w-5" />
          </Link>

          <Link
            href="mailto:michaeldmc58@gmail.com"
            aria-label="Email"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-400 bg-white/10 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <FaEnvelope className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        

     <main className="flex min-h-screen flex-col">
          <SiteHeader />
          <Home />
          
        </main>
     <footer>
          <Footer />
     </footer>

      </body>
    </html>
  );
}
