import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "./ui/PrimaryButton";

const presentationItems = [
  { title: "Histoire et Mission", to: "/presentation/histoire" },
  { title: "Organigramme", to: "/presentation/organigramme" },
  { title: "Vision et Objectifs", to: "/presentation/vision" },
];

const rechercheItems = [
  { title: "Laboratoires", to: "/recherche/laboratoires" },
  { title: "Publications", to: "/recherche/publications" },
  { title: "École doctorale", to: "/recherche/ecole-doctorale" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isActiveParent = (base: string) => location.pathname.startsWith(base);

  return (
    <div className="min-h-16 bg-gradient-to-br from-slate-50 via-purple-50/30 to-amber-50/20">
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <div className="bg-white/95 backdrop-blur-xl border-b border-purple-200/30 shadow-sm">
          <div className="container mx-auto px-4 md:px-6 xl:px-8">
            <div className="flex h-18 items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="/fac-science.jpg"
                  alt="Logo Faculté des Sciences"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h1 className="text-sm font-semibold text-slate-800 tracking-tight">
                    Faculté des Sciences
                  </h1>
                  <h3 className="text-xs font-semibold text-slate-600 tracking-tight">
                    Université d'Antananarivo
                  </h3>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center space-x-1">
                {/* Présentation Dropdown */}
                <div className="relative group">
                  <button
                    className={`flex items-center space-x-1 px-5 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 group-hover:bg-purple-50/50 ${
                      isActiveParent("/presentation")
                        ? "text-purple-700 bg-purple-50/70"
                        : "text-slate-700 hover:text-purple-700"
                    }`}
                  >
                    <span>Présentation</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-purple-600/60" />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-200/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-6 space-y-1">
                      {presentationItems.map((item, index) => (
                        <a
                          key={item.to}
                          href={item.to}
                          className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-l-2 ${
                            isActive(item.to)
                              ? "bg-purple-100 text-purple-700 border-purple-500"
                              : "text-slate-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-amber-50/30 border-transparent hover:border-amber-300"
                          }`}
                          style={{ transitionDelay: `${index * 50}ms` }}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recherche Dropdown */}
                <div className="relative group">
                  <button
                    className={`flex items-center space-x-1 px-5 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 group-hover:bg-purple-50/50 ${
                      isActiveParent("/recherche")
                        ? "text-purple-700 bg-purple-50/70"
                        : "text-slate-700 hover:text-purple-700"
                    }`}
                  >
                    <span>Recherche</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-purple-600/60" />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-200/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-6 space-y-1">
                      {rechercheItems.map((item, index) => (
                        <a
                          key={item.to}
                          href={item.to}
                          className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-l-2 ${
                            isActive(item.to)
                              ? "bg-purple-100 text-purple-700 border-purple-500"
                              : "text-slate-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-amber-50/30 border-transparent hover:border-amber-300"
                          }`}
                          style={{ transitionDelay: `${index * 50}ms` }}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Formation */}
                <a
                  href="/formation"
                  className={`px-5 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                    isActive("/formation")
                      ? "text-purple-700 bg-purple-50/70"
                      : "text-slate-700 hover:text-purple-700 hover:bg-purple-50/50"
                  }`}
                >
                  Formation
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-purple-400 to-amber-400 transition-all duration-300 group-hover:w-8"></div>
                </a>

                {/* Actualités */}
                <a
                  href="/actualites"
                  className={`px-5 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                    isActive("/actualites")
                      ? "text-purple-700 bg-purple-50/70"
                      : "text-slate-700 hover:text-purple-700 hover:bg-purple-50/50"
                  }`}
                >
                  Actualités
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-purple-400 to-amber-400 transition-all duration-300 group-hover:w-8"></div>
                </a>

                {/* Résultats */}
                <a
                  href="/resultats"
                  className={`px-5 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                    isActive("/resultats")
                      ? "text-purple-700 bg-purple-50/70"
                      : "text-slate-700 hover:text-purple-700 hover:bg-purple-50/50"
                  }`}
                >
                  Résultats
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-purple-400 to-amber-400 transition-all duration-300 group-hover:w-8"></div>
                </a>

                {/* Contact */}
                <Link to="/contact">
                  <PrimaryButton>Contact</PrimaryButton>
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2.5 text-slate-700 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="absolute right-0 top-0 w-80 h-full bg-white/95 backdrop-blur-xl shadow-2xl border-l border-purple-200/40 overflow-y-auto max-h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 space-y-8 h-screen overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-purple-200/50">
                  <Link to="/" className="flex items-center space-x-3">
                    <img
                      src="/fac-science.jpg"
                      alt="Logo Faculté des Sciences"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
                      Faculté des Sciences
                    </h1>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-slate-500 hover:text-purple-600 transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Sections */}
                {[
                  {
                    title: "Présentation",
                    items: presentationItems,
                    base: "/presentation",
                  },
                  {
                    title: "Recherche",
                    items: rechercheItems,
                    base: "/recherche",
                  },
                ].map((section) => (
                  <div key={section.title} className="space-y-3">
                    <h3
                      className={`font-semibold text-sm tracking-wide uppercase border-b pb-2 ${
                        isActiveParent(section.base)
                          ? "text-purple-700 border-purple-500"
                          : "text-slate-800 border-purple-300"
                      }`}
                    >
                      {section.title}
                    </h3>
                    <div className="space-y-1 ml-2">
                      {section.items.map((item) => (
                        <a
                          key={item.to}
                          href={item.to}
                          className={`block py-2 text-sm font-medium transition-all duration-200 ${
                            isActive(item.to)
                              ? "text-purple-700 font-semibold pl-2 border-l-2 border-purple-500"
                              : "text-slate-600 hover:text-purple-700 hover:pl-2"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Direct Links */}
                <div className="space-y-3 pt-6 border-t border-purple-200/50">
                  {[
                    {
                      name: "Formation",
                      path: "/formation",
                      base: "/formation",
                    },
                    {
                      name: "Actualités",
                      path: "/actualites",
                      base: "/actualites",
                    },
                    {
                      name: "Résultats",
                      path: "/resultats",
                      base: "/resultats",
                    },
                    {
                      name: "Contact",
                      path: "/contact",
                      base: "/contact",
                      special: true,
                    },
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.path}
                      className={`block p-4 rounded-xl transition-all duration-200 font-medium border ${
                        isActive(link.path)
                          ? "bg-purple-100 text-purple-700 border-purple-500"
                          : link.special
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-600 hover:from-purple-500 hover:to-purple-600"
                          : "bg-gradient-to-r from-purple-50 to-purple-100 text-slate-800 border-purple-200 hover:from-purple-100 hover:to-purple-200"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
