"use client"

import { Button } from "@/components/ui/button"
import { useScrollPosition } from "@/hooks/useScrollPosition"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import BannerTitle from "./site/BannerTitle"

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const isVisible = useScrollPosition()

    return (
        <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 bg-background border-b ${isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <BannerTitle className="md:text-[30px] " title="we_die_young" />
                            </Link>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Cambiar tema</span>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
} 