// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { User,  Building, Phone, Mail, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface Person {
  name: string;
  title: string;
  phone: string;
  email: string;
  office: string;
}

interface PersonCardProps {
  person: Person;
  personKey: string;
  bgColor: string;
  textColor: string;
  hoverColor: string;
}

export default function OrganigrammePage() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)

  const orgData = {
    doyen: {
      name: "Prof. RAKOTOMALALA Jean",
      title: "Doyen",
      phone: "+261 XX XX XXX XX",
      email: "doyen@sciences.univ-antananarivo.mg",
      office: "Bureau du Doyen, 1er étage"
    } as Person,
    vicedoyen: {
      name: "Dr. RASOAMANANA Marie",
      title: "Vice-Doyen",
      phone: "+261 XX XX XXX XX",
      email: "vice-doyen@sciences.univ-antananarivo.mg",
      office: "Bureau Vice-Doyen, 1er étage"
    } as Person,
    secretaire: {
      name: "Mme RAZAFY Voahirana",
      title: "Secrétaire Général",
      phone: "+261 XX XX XXX XX",
      email: "secretariat@sciences.univ-antananarivo.mg",
      office: "Secrétariat général, RDC"
    } as Person,
    departments: {
      math: {
        name: "Prof. ANDRIAMAMPIANINA Paul",
        title: "Chef Département Math-Info",
        phone: "+261 XX XX XXX XX",
        email: "math-info@sciences.univ-antananarivo.mg",
        office: "Département Math-Info, 2ème étage"
      } as Person,
      mit: {
        name: "Dr. RAKOTONIRINA Sophie",
        title: "Chef Département MIT",
        phone: "+261 XX XX XXX XX",
        email: "mit@sciences.univ-antananarivo.mg",
        office: "Département MIT, 2ème étage"
      } as Person,
      physique: {
        name: "Prof. RAHARISON Michel",
        title: "Chef Département Physique",
        phone: "+261 XX XX XXX XX",
        email: "physique@sciences.univ-antananarivo.mg",
        office: "Département Physique, 3ème étage"
      } as Person,
      chimie: {
        name: "Dr. RAZAFINDRABE Hery",
        title: "Chef Département Chimie",
        phone: "+261 XX XX XXX XX",
        email: "chimie@sciences.univ-antananarivo.mg",
        office: "Département Chimie, 3ème étage"
      } as Person,
      biologie: {
        name: "Prof. RANDRIAMAMPIONONA Lala",
        title: "Chef Département Biologie",
        phone: "+261 XX XX XXX XX",
        email: "biologie@sciences.univ-antananarivo.mg",
        office: "Département Biologie, 4ème étage"
      } as Person,
      geologie: {
        name: "Dr. RAKOTONDRAZAFY Mamy",
        title: "Chef Département Géologie",
        phone: "+261 XX XX XXX XX",
        email: "geologie@sciences.univ-antananarivo.mg",
        office: "Département Géologie, 4ème étage"
      } as Person
    }
  }

  const PersonCard = ({ person, personKey, bgColor, textColor, hoverColor }: PersonCardProps) => {
    const isSelected = selectedPerson === personKey
    
    return (
      <motion.div
        layout
        className={`${bgColor} ${hoverColor} rounded-xl shadow-md transition-all duration-300 cursor-pointer`}
        onClick={() => setSelectedPerson(isSelected ? null : personKey)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className={`h-6 w-6 ${textColor}`} />
              <div>
                <h4 className={`font-semibold ${textColor}`}>
                  {person.title.replace("Chef Département ", "")}
                </h4>
                <p className={`text-xs ${textColor} opacity-80`}>
                  {person.name.split(" ").slice(-1)[0]}
                </p>
              </div>
            </div>
            {isSelected ? (
              <ChevronUp className={`h-5 w-5 ${textColor}`} />
            ) : (
              <ChevronDown className={`h-5 w-5 ${textColor}`} />
            )}
          </div>
        </div>
        
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 border-t border-white/20 mt-2 pt-4">
                <div className="space-y-3">
                  <div>
                    <h5 className={`font-medium ${textColor} mb-1`}>{person.name}</h5>
                    <p className={`text-sm ${textColor} opacity-90`}>{person.title}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className={`h-4 w-4 ${textColor}`} />
                      <span className={`text-sm ${textColor}`}>{person.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className={`h-4 w-4 ${textColor}`} />
                      <span className={`text-sm ${textColor} break-all`}>{person.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className={`h-4 w-4 ${textColor}`} />
                      <span className={`text-sm ${textColor}`}>{person.office}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            {/* Header avec image de fond - Responsive */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-12 sm:mb-16 rounded-2xl sm:rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0">
                <img 
                  src="/modern-university-campus-with-science-buildings-an.png" 
                  alt="Histoire de la faculté" 
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black-900/80 to-gray-800/60 "></div>
              </div>
              <div className="relative z-10 text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                  Structure Organisationnelle
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                  Cliquez sur les éléments pour découvrir les informations de notre équipe dirigeante
                </p>
              </div>
            </motion.div>

            {/* Organigramme interactif */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-12"
            >
              <div className="text-center">
                {/* Doyen */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-block mb-8 max-w-md"
                >
                  <PersonCard 
                    person={orgData.doyen}
                    personKey="doyen"
                    bgColor="bg-gradient-to-r from-purple-600 to-purple-700"
                    textColor="text-white"
                    hoverColor="hover:from-purple-700 hover:to-purple-800"
                  />
                </motion.div>

                {/* Ligne de connexion */}
                <div className="flex justify-center mb-8">
                  <div className="w-px h-12 bg-gradient-to-b from-purple-600 to-purple-400"></div>
                </div>

                {/* Niveau 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="grid md:grid-cols-3 gap-6 mb-8"
                >
                  <PersonCard 
                    person={orgData.vicedoyen}
                    personKey="vicedoyen"
                    bgColor="bg-gradient-to-br from-purple-100 to-purple-200"
                    textColor="text-purple-800"
                    hoverColor="hover:from-purple-200 hover:to-purple-300"
                  />
                  
                  <PersonCard 
                    person={orgData.secretaire}
                    personKey="secretaire"
                    bgColor="bg-gradient-to-br from-amber-100 to-amber-200"
                    textColor="text-amber-800"
                    hoverColor="hover:from-amber-200 hover:to-amber-300"
                  />
                  
                  <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-md">
                    <div className="flex items-center space-x-3">
                      <Building className="h-6 w-6 text-gray-600" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Services Admin.</h4>
                        <p className="text-xs text-gray-600">6 services</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Ligne de connexion */}
                <div className="flex justify-center mb-8">
                  <div className="w-px h-12 bg-gradient-to-b from-purple-400 to-purple-600"></div>
                </div>

                {/* Départements */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {Object.entries(orgData.departments).map(([key, dept], index) => {
                    const colors = [
                      { bg: "bg-gradient-to-r from-purple-600 to-purple-700", text: "text-white", hover: "hover:from-purple-700 hover:to-purple-800" },
                      { bg: "bg-gradient-to-r from-amber-600 to-amber-700", text: "text-white", hover: "hover:from-amber-700 hover:to-amber-800" },
                      { bg: "bg-gradient-to-r from-purple-500 to-purple-600", text: "text-white", hover: "hover:from-purple-600 hover:to-purple-700" },
                      { bg: "bg-gradient-to-r from-amber-500 to-amber-600", text: "text-white", hover: "hover:from-amber-600 hover:to-amber-700" },
                      { bg: "bg-gradient-to-r from-purple-700 to-purple-800", text: "text-white", hover: "hover:from-purple-800 hover:to-purple-900" },
                      { bg: "bg-gradient-to-r from-amber-700 to-amber-800", text: "text-white", hover: "hover:from-amber-800 hover:to-amber-900" }
                    ]
                    
                    const colorScheme = colors[index]
                    
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                      >
                        <PersonCard 
                          person={dept}
                          personKey={key}
                          bgColor={colorScheme.bg}
                          textColor={colorScheme.text}
                          hoverColor={colorScheme.hover}
                        />
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  )
}

