// import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
      <footer className="bg-white/95 backdrop-blur-xl border-t border-purple-200/40 text-slate-800 relative">
        {/* Accent coloré en haut - même style que la navbar */}
        <div className="h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-amber-400"></div>
        
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Logo et description */}
            <div className="space-y-6 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg flex items-center justify-center ring-2 ring-amber-200/50">
                  <GraduationCap className="h-5 w-5 text-amber-100" />
                </div>
                <div>
                  <span className="text-xl font-semibold text-slate-800">Faculté des Sciences</span>
                  <p className="text-xs text-purple-600/70 font-medium">UNIVERSITÉ D'ANTANANARIVO</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Formation d'excellence en sciences et technologies pour le développement de Madagascar. 
                Innovation, recherche et excellence académique depuis plus de 50 ans.
              </p>
              
              {/* Réseaux sociaux */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-purple-50 hover:bg-gradient-to-br hover:from-purple-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-300 group border border-purple-200/50">
                  <Facebook className="h-4 w-4 text-purple-600 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-purple-50 hover:bg-gradient-to-br hover:from-purple-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-300 group border border-purple-200/50">
                  <Twitter className="h-4 w-4 text-purple-600 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-purple-50 hover:bg-gradient-to-br hover:from-purple-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-300 group border border-purple-200/50">
                  <Linkedin className="h-4 w-4 text-purple-600 group-hover:text-white" />
                </a>
              </div>
            </div> 

            {/* Partenaires */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-amber-300/50 pb-2">
                Partenaires
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "MESUPRES", desc: "Ministère de l'Enseignement Supérieur" },
                  { name: "AUF", desc: "Agence Universitaire Francophone" },
                  { name: "TELMA", desc: "Partenaire technologique" },
                  { name: "MNDPT", desc: "Ministère du Numérique" }
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
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-purple-300/50 pb-2">
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-purple-50 border border-purple-200/50 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-purple-100 transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-purple-600 group-hover:text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">Adresse</p>
                    <p className="text-xs text-slate-600">
                      Campus universitaire<br />
                      Antananarivo 101, Madagascar
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-purple-50 border border-purple-200/50 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-purple-100 transition-colors duration-300">
                    <Phone className="h-4 w-4 text-purple-600 group-hover:text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">Téléphone</p>
                    <a href="tel:+261201234567" className="text-xs text-slate-600 hover:text-purple-700 transition-colors">
                      +261 20 12 345 67
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-purple-50 border border-purple-200/50 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-purple-100 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-purple-600 group-hover:text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">Email</p>
                    <a 
                      href="mailto:contact@sciences.univ-antananarivo.mg" 
                      className="text-xs text-slate-600 hover:text-purple-700 transition-colors break-all"
                    >
                      contact@sciences.univ-antananarivo.mg
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation rapide */}
            <div className="space-y-6">
               {/* Horaires */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-amber-50/30 rounded-xl border border-purple-200/50">
                <p className="text-sm font-medium text-slate-800 mb-2">Heures d'ouverture</p>
                <p className="text-xs text-slate-600">
                  Lun - Ven : 7h30 - 17h00<br />
                  Sam : 8h00 - 12h00
                </p>
              </div>
            </div>

          </div>

          {/* Séparateur avec gradient */}
          <div className="my-12 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>

          {/* Copyright et liens légaux */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-slate-600">
                &copy; 2025 Faculté des Sciences - Université d'Antananarivo. Tous droits réservés.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Établissement public d'enseignement supérieur
              </p>
            </div>
            
            <div className="flex space-x-6 text-xs">
              <a href="/mentions-legales" className="text-slate-500 hover:text-purple-600 transition-colors">
                Mentions légales
              </a>
              <a href="/politique-confidentialite" className="text-slate-500 hover:text-purple-600 transition-colors">
                Politique de confidentialité
              </a>
              <a href="/accessibilite" className="text-slate-500 hover:text-purple-600 transition-colors">
                Accessibilité
              </a>
            </div>
          </div>
        </div>

        {/* Effet décoratif en bas - version claire */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-purple-50/50 to-transparent pointer-events-none"></div>
      </footer>

  );
}
