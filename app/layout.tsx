import type { Metadata } from "next";
import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { unstable_noStore } from "next/cache";


unstable_noStore()
const inter = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "wdy",
  description: "club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex bg-slate-200 text-black min-h-screen flex-col p-4 md:py-10 md:px-96 ">
          {children}
        </main>
      </body>
    </html>
  );
}
