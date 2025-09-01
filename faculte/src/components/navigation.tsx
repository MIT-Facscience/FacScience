"use client"

import { useState } from "react"
import {Link}from "react-router-dom"
// import img from "next/img"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const presentationItems = [
  { title: "Histoire et Mission", to: "/presentation/histoire" },
  { title: "Organigramme", to: "/presentation/organigramme" },
  { title: "Vision et Objectifs", to: "/presentation/vision" },
]

const formationItems = [
  { title: "Mathématiques et Informatique", to: "/formation/mathematiques-informatique" },
  { title: "MIT", to: "/formation/mit" },
  { title: "Physique", to: "/formation/physique" },
  { title: "Chimie", to: "/formation/chimie" },
  { title: "Biologie/Sciences de la Vie", to: "/formation/biologie" },
  { title: "Géologie/Sciences de la Terre", to: "/formation/geologie" },
  { title: "IGCRR", to: "/formation/igcrr" },
  { title: "IPSS", to: "/formation/ipss" },
]

const rechercheItems = [
  { title: "Laboratoires", to: "/recherche/laboratoires" },
  { title: "Publications", to: "/recherche/publications" },
  { title: "École doctorale", to: "/recherche/ecole-doctorale" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/fac-science.jpg"
            alt="Logo Faculté des Sciences"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-primary">Faculté des Sciences</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Présentation</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4">
                  {presentationItems.map((item) => (
                    <NavigationMenuLink key={item.to} asChild>
                      <Link
                        to={item.to}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{item.title}</div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Formation</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[500px] gap-3 p-4">
                  {formationItems.map((item) => (
                    <NavigationMenuLink key={item.to} asChild>
                      <Link
                        to={item.to}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{item.title}</div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Recherche</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4">
                  {rechercheItems.map((item) => (
                    <NavigationMenuLink key={item.to} asChild>
                      <Link
                        to={item.to}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{item.title}</div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/actualites"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Actualités
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/resultats"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Résultats
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/contact"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] bg-gradient-to-b from-white to-slate-50 overflow-y-auto">
            <div className="flex items-center space-x-3 mb-6 pt-4">
              <img
                src="/fac-science.jpg"
                alt="Logo Faculté des Sciences"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-bold text-primary">Faculté des Sciences</span>
            </div>

            <div className="flex flex-col space-y-5 pb-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-slate-800 mb-2">Présentation</h3>
                <div className="space-y-2 ml-2">
                  {presentationItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block text-sm text-slate-600 hover:text-primary hover:font-medium transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-slate-800 mb-2">Formation</h3>
                <div className="space-y-2 ml-2">
                  {formationItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block text-sm text-slate-600 hover:text-primary hover:font-medium transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-slate-800 mb-2">Recherche</h3>
                <div className="space-y-2 ml-2">
                  {rechercheItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block text-sm text-slate-600 hover:text-primary hover:font-medium transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200">
                <Link
                  to="/actualites"
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow font-medium text-slate-800 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Actualités
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </Link>
                <Link
                  to="/resultats"
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow font-medium text-slate-800 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Résultats
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow font-medium text-slate-800 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}