import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";

const presentationItems = [
  { title: "Histoire et Mission", to: "/presentation/histoire" },
  { title: "Organigramme", to: "/presentation/organigramme" },
  { title: "Vision et Objectifs", to: "/presentation/vision" },
];

// const formationItems = [
//   {
//     title: "Mathématiques et Informatique",
//     to: "/formation/mathematiques-informatique",
//   },
//   { title: "MIT", to: "/formation/mit" },
//   { title: "Physique", to: "/formation/physique" },
//   { title: "Chimie", to: "/formation/chimie" },
//   { title: "Biologie", to: "/formation/biologie" },
// ];

const rechercheItems = [
  { title: "Laboratoires", to: "/recherche/laboratoires" },
  { title: "Publications", to: "/recherche/publications" },
  { title: "École doctorale", to: "/recherche/ecole-doctorale" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-16 bg-gradient-to-br from-slate-50 via-purple-50/30 to-amber-50/20">
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        {/* Bandeau université en haut */}
        {/* <div className=" top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-800 py-1">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center">
              <p className="text-sm font-medium tracking-wide text-align-middle">
                🎓 Université d'Antananarivo
              </p>
            </div>
          </div>
        </div> */}
        {/* Navbar avec touches de couleurs subtiles */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-purple-200/30 shadow-sm">
          <div className="container mx-auto px-4 md:px-6 xl:px-8">
            <div className="flex h-18 items-center justify-between">
              {/* Logo avec les vraies couleurs */}
              <div className="flex items-center space-x-4">
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
              </div>

              {/* Navigation desktop avec accents colorés */}
              <nav className="hidden lg:flex items-center space-x-1">
                {/* Présentation Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-1 px-5 py-3 text-slate-700 hover:text-purple-700 transition-all duration-300 font-medium text-sm tracking-wide group-hover:bg-purple-50/50 rounded-lg">
                    <span>Présentation</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-purple-600/60" />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-200/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-6">
                      <div className="space-y-1">
                        {presentationItems.map((item, index) => (
                          <a
                            key={item.to}
                            href={item.to}
                            className="block px-4 py-3 text-slate-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-amber-50/30 rounded-xl transition-all duration-200 text-sm font-medium border-l-2 border-transparent hover:border-amber-300"
                            style={{ transitionDelay: `${index * 50}ms` }}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Recherche Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-1 px-5 py-3 text-slate-700 hover:text-purple-700 transition-all duration-300 font-medium text-sm tracking-wide group-hover:bg-purple-50/50 rounded-lg">
                    <span>Recherche</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-purple-600/60" />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-200/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-6">
                      <div className="space-y-1">
                        {rechercheItems.map((item, index) => (
                          <a
                            key={item.to}
                            href={item.to}
                            className="block px-4 py-3 text-slate-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-amber-50/30 rounded-xl transition-all duration-200 text-sm font-medium border-l-2 border-transparent hover:border-amber-300"
                            style={{ transitionDelay: `${index * 50}ms` }}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Liens directs avec accents colorés */}
                <a
                  href="/formation"
                  className="px-5 py-3 text-slate-700 hover:text-purple-700 transition-all duration-300 font-medium text-sm tracking-wide hover:bg-purple-50/50 rounded-lg relative group"
                >
                  Formation
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-purple-400 to-amber-400 transition-all duration-300 group-hover:w-8"></div>
                </a>
                <a
                  href="/actualites"
                  className="px-5 py-3 text-slate-700 hover:text-purple-700 transition-all duration-300 font-medium text-sm tracking-wide hover:bg-purple-50/50 rounded-lg relative group"
                >
                  Actualités
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-purple-400 to-amber-400 transition-all duration-300 group-hover:w-8"></div>
                </a>
                <a
                  href="/resultats"
                  className="px-5 py-3 text-slate-700 hover:text-purple-700 transition-all duration-300 font-medium text-sm tracking-wide hover:bg-purple-50/50 rounded-lg relative group"
                >
                  Résultats
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-purple-400 to-amber-400 transition-all duration-300 group-hover:w-8"></div>
                </a>

                {/* CTA Contact avec les couleurs du logo */}
                <a
                  href="/contact"
                  className={cn(
                    buttonVariants({}),
                    "ml-4 px-6 py-2.5  font-medium text-sm tracking-wide rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ring-1"
                  )}
                >
                  Contact
                </a>
              </nav>

              {/* Menu mobile */}
              <button
                className="lg:hidden p-2.5 text-slate-700 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile avec touches de couleurs */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="absolute right-0 top-0 w-80 h-full bg-white/95 backdrop-blur-xl shadow-2xl border-l border-purple-200/40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 space-y-8">
                {/* Header mobile coloré */}
                <div className="flex items-center justify-between pb-6 border-b border-purple-200/50">
                  <Link to="/" className="flex items-center space-x-3">
                    <img
                      src="/fac-science.jpg"
                      alt="Logo Faculté des Sciences"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
                        Faculté des Sciences
                      </h1>
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-slate-500 hover:text-purple-600 transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Sections mobiles avec accents */}
                {[
                  {
                    title: "Présentation",
                    items: presentationItems,
                    accent: "border-purple-300",
                  },
                  {
                    title: "Recherche",
                    items: rechercheItems,
                    accent: "border-purple-400",
                  },
                ].map((section) => (
                  <div key={section.title} className="space-y-3">
                    <h3
                      className={`font-semibold text-slate-800 text-sm tracking-wide uppercase border-b ${section.accent} pb-2`}
                    >
                      {section.title}
                    </h3>
                    <div className="space-y-1 ml-2">
                      {section.items.map((item) => (
                        <a
                          key={item.to}
                          href={item.to}
                          className="block text-slate-600 hover:text-purple-700 transition-colors duration-200 py-2 text-sm font-medium hover:pl-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Liens directs mobiles avec couleurs */}
                <div className="space-y-3 pt-6 border-t border-purple-200/50">
                  {[
                    {
                      name: "Formation",
                      gradient: "from-purple-50 to-purple-100",
                      hover: "hover:from-purple-100 hover:to-purple-150",
                      border: "border-purple-200",
                    },
                    {
                      name: "Actualités",
                      gradient: "from-purple-100 to-purple-200",
                      hover: "hover:from-purple-200 hover:to-purple-350",
                      border: "border-purple-200",
                    },
                    {
                      name: "Résultats",
                      gradient: "from-amber-50 to-amber-100",
                      hover: "hover:from-amber-100 hover:to-amber-150",
                      border: "border-amber-200",
                    },
                    {
                      name: "Contact",
                      gradient: "from-purple-600 to-purple-700",
                      hover: "hover:from-purple-500 hover:to-purple-600",
                      border: "border-purple-600",
                      text: "text-white",
                    },
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={`/${link.name.toLowerCase()}`}
                      className={`block p-4 bg-gradient-to-r ${link.gradient} ${
                        link.hover
                      } rounded-xl transition-all duration-200 font-medium ${
                        link.text || "text-slate-800"
                      } border ${link.border}`}
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
