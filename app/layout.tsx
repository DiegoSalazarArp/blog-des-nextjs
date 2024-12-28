import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Comfortaa } from "next/font/google";
import "./globals.css";

const confortaa = Comfortaa({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={confortaa.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="transition-transform duration-300">
            <Navbar />
          </div>
          <main className="flex flex-col min-h-screen  md:px-10 xl:px-[22rem] ">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
