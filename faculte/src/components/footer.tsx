import {Link} from "react-router-dom"
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="text-xl font-bold">Faculté des Sciences</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Formation d'excellence en sciences et technologies pour le développement de Madagascar
            </p>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/formation" className="hover:text-accent transition-colors">
                  Formations
                </Link>
              </li>
              <li>
                <Link to="/recherche" className="hover:text-accent transition-colors">
                  Recherche
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="hover:text-accent transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/resultats" className="hover:text-accent transition-colors">
                  Résultats
                </Link>
              </li>
            </ul>
          </div>

          {/* Partenaires */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Partenaires</h3>
            <ul className="space-y-2 text-sm">
              <li>MESUPRES</li>
              <li>AUF</li>
              <li>TELMA</li>
              <li>MNDPT</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Antananarivo, Madagascar</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+261 XX XX XXX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@sciences.univ-antananarivo.mg</span>
              </div>
            </div>
            <div className="flex space-x-4 pt-2">
              <Facebook className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; 2025 Faculté des Sciences - Université d'Antananarivo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
