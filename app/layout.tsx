import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

const confortaa = Comfortaa({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={confortaa.className}>
        <main className="flex flex-col min-h-screen bg-slate-200 text-black p-4 md:px-10 xl:px-[22rem]">
          {children}
        </main>
      </body>
    </html>
  );
}
