import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-xl text-sidebar-primary border-purple-200/40 relative">
      {/* Accent coloré en haut */}
      <div className="h-0.5 bg-gradient-to-r from-primary via-purple-500 to-secondary"></div>

      <div className="container mx-auto px-4 md:px-6 xl:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo et description */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center ring-amber-200/50">
                <img
                  src="/fac-science.jpg"
                  className="h-10 w-10 text-amber-100 object-cover"
                />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-semibold text-sidebar-foreground">
                  Faculté des Sciences
                </span>
                <p className="text-sm text-muted-foreground font-medium">
                  UNIVERSITÉ D'ANTANANARIVO
                </p>
              </div>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Formation d'excellence en sciences et technologies pour le
              développement de Madagascar. Innovation, recherche et excellence
              académique depuis plus de 50 ans.
            </p>
          </div>

          {/* Partenaires */}
          {/* <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-amber-300/50 pb-2">
              Partenaires
            </h3>
            <ul className="space-y-3">
              {[
                {
                  name: "MESUPRES",
                  desc: "Ministère de l'Enseignement Supérieur",
                },
                { name: "AUF", desc: "Agence Universitaire Francophone" },
                { name: "TELMA", desc: "Partenaire technologique" },
                { name: "MNDPT", desc: "Ministère du Numérique" },
              ].map((partner) => (
                <li key={partner.name}>
                  <a
                    href="#"
                    className="block text-slate-600 hover:text-amber-600 transition-colors duration-200 group"
                  >
                    <div className="text-sm font-medium flex items-center">
                      {partner.name}
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                    </div>
                    <div className="text-xs text-slate-500 group-hover:text-amber-500 transition-colors">
                      {partner.desc}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-sidebar-foreground border-b border-purple-300/50 pb-2">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-purple-50 border border-purple-200/50 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-purple-100 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-primary group-hover:text-primary" />
                </div>
                <div>
                  <p className="text-base text-sidebar-foreground font-medium">
                    Adresse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Campus universitaire
                    <br />
                    Antananarivo 101, Madagascar
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-purple-50 border border-purple-200/50 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-purple-100 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-primary group-hover:text-ring" />
                </div>
                <div>
                  <p className="text-base text-sidebar-foreground font-medium">
                    Téléphone
                  </p>
                  <a
                    href="tel:+261201234567"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +261 34 36 146 61
                  </a>
                  <a
                    href="tel:+261201234567"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +261 32 85 038 15
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-purple-50 border border-purple-200/50 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-purple-100 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-primary group-hover:text-primary" />
                </div>
                <div>
                  <p className="text-base text-sidebar-foreground font-medium">
                    Email
                  </p>
                  <a
                    href="mailto:sciencesfaculte@univ-antananarivo.mg"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    sciencesfaculte@univ-antananarivo.mg
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux et horaires */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-sidebar-foreground border-b border-purple-300/50 pb-2">
              Suivez-nous
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/p/Facult%C3%A9-des-Sciences-Antananarivo-100086509081041/?locale=fr_FR"
                className="w-10 h-10 bg-purple-50 hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200 rounded-full flex items-center justify-center transition-all duration-300 group border border-purple-200/50"
              >
                <Facebook className="h-4 w-4 text-primary group-hover:text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-purple-50 hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200 rounded-full flex items-center justify-center transition-all duration-300 group border border-purple-200/50"
              >
                <Twitter className="h-4 w-4 text-primary group-hover:text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-purple-50 hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200 rounded-full flex items-center justify-center transition-all duration-300 group border border-purple-200/50"
              >
                <Linkedin className="h-4 w-4 text-primary group-hover:text-primary" />
              </a>
            </div>

            {/* Horaires */}
            <div className="p-4 bg-gradient-to-br from-muted to-amber-50/30 border border-purple-200/50">
              <p className="text-base font-medium text-sidebar-foreground mb-2">
                Heures d'ouverture
              </p>
              <p className="text-sm text-muted-foreground">
                Lun - Ven : 7h30 - 17h00
                <br />
                Sam : 8h00 - 12h00
              </p>
            </div>
          </div>
        </div>

        {/* Séparateur avec gradient */}
        <div className="my-3 md:my-5 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>

        {/* Copyright et liens légaux */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0 pb-3 md:pb-5">
          <div className="text-center md:text-left">
            <p className="text-base text-muted-foreground">
              &copy; 2025 Faculté des Sciences - Université d'Antananarivo. Tous
              droits réservés.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Établissement public d'enseignement supérieur
            </p>
          </div>

          <div className="flex space-x-6 text-sm">
            <a
              href="/mentions-legales"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Mentions légales
            </a>
            <a
              href="/politique-confidentialite"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Politique de confidentialité
            </a>
            <a
              href="/accessibilite"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Accessibilité
            </a>
          </div>
        </div>
      </div>

      {/* Effet décoratif en bas */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-purple-50/50 to-transparent pointer-events-none"></div>
    </footer>
  );
}
