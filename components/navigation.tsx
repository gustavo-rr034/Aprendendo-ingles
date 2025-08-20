"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Brain, Headphones, TrendingUp, Menu, Home, Users, Star } from "lucide-react"
import Link from "next/link"

type NavigationProps = {
  currentPage?: "home" | "lessons" | "quiz" | "listening" | "progress"
  showStats?: boolean
}

export function Navigation({ currentPage = "home", showStats = true }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/lessons?level=basic", label: "Flashcards", icon: BookOpen },
    { href: "/quiz?level=basic", label: "Quiz", icon: Brain },
    { href: "/listening?level=basic", label: "Escuta", icon: Headphones },
    { href: "/progress", label: "Progresso", icon: TrendingUp },
  ]

  const closeSheet = () => setIsOpen(false)

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-serif font-bold text-foreground hidden sm:block">
              Hub de Aprendizado de Inglês
            </h1>
            <h1 className="text-lg font-serif font-bold text-foreground sm:hidden">HAI</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navigationItems.slice(1).map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.label.toLowerCase()
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant={isActive ? "default" : "ghost"} size="sm" className="gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Stats and Mobile Menu */}
          <div className="flex items-center gap-2">
            {showStats && (
              <div className="hidden sm:flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Users className="w-3 h-3" />
                  <span className="hidden lg:inline">10.000+ Estudantes</span>
                  <span className="lg:hidden">10k+</span>
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="hidden lg:inline">4.9 Avaliação</span>
                  <span className="lg:hidden">4.9</span>
                </Badge>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="font-serif font-bold">Hub de Aprendizado de Inglês</span>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-2 flex-1">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      const isActive =
                        currentPage === item.label.toLowerCase() || (item.label === "Início" && currentPage === "home")
                      return (
                        <Link key={item.href} href={item.href} onClick={closeSheet}>
                          <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start gap-3 h-12">
                            <Icon className="w-5 h-5" />
                            {item.label}
                          </Button>
                        </Link>
                      )
                    })}
                  </nav>

                  {showStats && (
                    <div className="border-t pt-4 mt-4">
                      <div className="flex flex-col gap-2">
                        <Badge variant="secondary" className="gap-2 justify-start p-3">
                          <Users className="w-4 h-4" />
                          10.000+ Estudantes Ativos
                        </Badge>
                        <Badge variant="outline" className="gap-2 justify-start p-3">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          4.9 Estrelas de Avaliação
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
