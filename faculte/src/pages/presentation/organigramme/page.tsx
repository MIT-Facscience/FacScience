"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, Building, ChevronDown, Users, Award, BookOpen } from "lucide-react"

interface Person {
  firstName: string
  lastName: string
  email: string
  phone: string
  building: string
  photo: string
  bio?: string
}

interface OrgNodeType {
  name: string
  title: string
  person?: Person
  children?: OrgNodeType[]
}

interface PersonCardProps {
  person?: Person
  name: string
  title: string
  size?: "large" | "medium" | "small"
  onClick: () => void
  isClickable?: boolean
  isExpanded?: boolean
  id: string
}

const PersonCard = ({
  person,
  name,
  title,
  size = "medium",
  onClick,
  isClickable = false,
  isExpanded = false,
}: PersonCardProps) => {
  const sizeClasses = {
    large: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32",
    medium: "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16",
    small: "w-10 h-10 sm:w-12 sm:h-12",
  }

  const expandedSizeClasses = {
    large: "w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40",
    medium: "w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20",
    small: "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16",
  }

  const textSizeClasses = {
    large: "text-sm sm:text-base lg:text-lg",
    medium: "text-xs sm:text-sm",
    small: "text-xs",
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center ${
        isClickable ? "cursor-pointer" : ""
      } ${isExpanded ? "bg-white p-4 sm:p-6 shadow-xl border border-purple-100" : ""} 
      hover:scale-105 transition-all duration-300`}
      onClick={onClick}
      whileHover={{ y: -2 }}
    >
      <div className="relative">
        <motion.div layout className="p-1 rounded-full ">
          <img
            src={person?.photo || "/api/placeholder/150/150"}
            alt={name}
            className={`${
              isExpanded ? expandedSizeClasses[size] : sizeClasses[size]
            } rounded-full object-cover bg-white transition-all duration-300 border-2 border-white shadow-lg`}
          />
        </motion.div>

        {isClickable && !isExpanded && (
          <motion.div
            className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6  rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 text-primary" />
          </motion.div>
        )}
      </div>

      <motion.div layout className="mt-2 sm:mt-3 text-center max-w-80">
        <h3 className={`font-bold text-foreground ${textSizeClasses[size]} leading-tight`}>{name}</h3>
        <p className={`text-muted-foreground ${size === "large" ? "text-sm sm:text-base" : "text-xs"} leading-tight mt-1 font-medium`}>
          {title}
        </p>

        <AnimatePresence>
          {isExpanded && person && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-left space-y-3 border-t border-purple-200 pt-4"
            >
              {person.bio && (
                <div>
                  <h4 className="text-sm font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Biographie
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed bg-yellow-50 p-3 rounded-lg">{person.bio}</p>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-gray-700 font-medium">{person.email}</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-gray-700 font-medium">{person.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Building className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-gray-700 font-medium">{person.building}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

const ConnectionLine = ({
  direction = "horizontal",
  length = "medium",
}: {
  direction?: "horizontal" | "vertical"
  length?: "short" | "medium" | "long" | "extraLong"
}) => {
  const lengthClasses = {
    short: direction === "horizontal" ? "w-4 sm:w-6 lg:w-8" : "h-4 sm:h-6 lg:h-8",
    medium: direction === "horizontal" ? "w-8 sm:w-12 lg:w-16" : "h-8 sm:h-12 lg:h-16",
    long: direction === "horizontal" ? "w-12 sm:w-18 lg:w-24" : "h-12 sm:h-18 lg:h-24",
    extraLong: direction === "horizontal" ? "w-12 sm:w-18 lg:w-24" : "h-16 sm:h-24 lg:h-150",
  }

  return (
    <div
      className={`bg-gray-400 ${
        direction === "horizontal" ? "h-0.5" : "w-0.5"
      } ${lengthClasses[length]} shadow-sm`}
    />
  )
}

export default function OrganigrammePage() {
  const [showDetails, setShowDetails] = useState<string | null>(null)

  // Données
  const cofacData = {
    name: "COFAC",
    title: "Faculté d'Excellence Académique",
  }
  
  const doyenData = {
    name: "KETUT SUSILO",
    title: "DOYEN",
    person: {
      firstName: "KETUT",
      lastName: "SUSILO",
      email: "doyen@cofac.mg",
      phone: "+261 34 11 111 11",
      building: "Bâtiment Administration",
      photo: "/professional-man.png",
      bio: "Doyen de COFAC, responsable de la gestion académique et administrative de la faculté."
    }
  }

  const mainBranches: OrgNodeType[] = [
    {
      name: "AVERY DAVIS",
      title: "Conseil Scientifique",
      person: {
        firstName: "AVERY",
        lastName: "DAVIS",
        email: "conseil.scientifique@cofac.mg",
        phone: "+261 34 22 222 22",
        building: "Bâtiment Recherche",
        photo: "/professional-man.png",
        bio: "Président du conseil scientifique, supervise les activités de recherche."
      }
    },
    {
      name: "CAHAYA DEWI",
      title: "Mention",
      person: {
        firstName: "CAHAYA",
        lastName: "DEWI",
        email: "mention@cofac.mg",
        phone: "+261 34 44 444 44",
        building: "Bâtiment Formation",
        photo: "/professional-man.png",
        bio: "Responsable des mentions académiques et des programmes d'études."
      },
      children: [
        {
          name: "CHIDI EZE",
          title: "Parcours",
          person: {
            firstName: "CHIDI",
            lastName: "EZE",
            email: "parcours@cofac.mg",
            phone: "+261 34 55 555 55",
            building: "Bâtiment Formation",
            photo: "/professional-man.png",
            bio: "Responsable des parcours de formation et des spécialisations."
          },
          children: [
            {
              name: "AALIYAH",
              title: "Finance",
              person: {
                firstName: "AALIYAH",
                lastName: "",
                email: "finance@cofac.mg",
                phone: "+261 34 66 666 66",
                building: "Bâtiment Finance",
                photo: "/professional-man.png",
                bio: "Responsable des finances et de la gestion budgétaire."
              }
            }
          ]
        }
      ]
    },
    {
      name: "MATT ZHANGYEE",
      title: "Secrétaire Principal",
      person: {
        firstName: "MATT",
        lastName: "ZHANGYEE",
        email: "secretaire.principal@cofac.mg",
        phone: "+261 34 88 888 88",
        building: "Bâtiment Administration",
        photo: "/professional-man.png",
        bio: "Secrétaire principal, coordonne les services administratifs."
      },
      children: [
        {
          name: "CONNOR",
          title: "Service de scolarité",
          person: {
            firstName: "CONNOR",
            lastName: "",
            email: "scolarite@cofac.mg",
            phone: "+261 34 99 999 99",
            building: "Bâtiment Administration",
            photo: "/professional-man.png",
            bio: "Gère les inscriptions et le suivi des étudiants."
          }
        },
        {
          name: "JONATHAN",
          title: "Service du personnel",
          person: {
            firstName: "JONATHAN",
            lastName: "",
            email: "personnel@cofac.mg",
            phone: "+261 34 12 121 21",
            building: "Bâtiment Administration",
            photo: "/professional-man.png",
            bio: "Responsable de la gestion des ressources humaines."
          }
        },
        {
          name: "OLIVIA WILSON",
          title: "Service informatique",
          person: {
            firstName: "OLIVIA",
            lastName: "WILSON",
            email: "informatique@cofac.mg",
            phone: "+261 34 14 141 41",
            building: "Bâtiment Technique",
            photo: "/professional-man.png",
            bio: "Responsable des systèmes informatiques et techniques."
          }
        },
        {
          name: "OLIVIA WILSON",
          title: "Service comptabilité",
          person: {
            firstName: "OLIVIA",
            lastName: "WILSON",
            email: "comptabilite@cofac.mg",
            phone: "+261 34 13 131 31",
            building: "Bâtiment Administration",
            photo: "/professional-man.png",
            bio: "Gère la comptabilité générale de la faculté."
          }
        },
        {
          name: "CONNOR",
          title: "Service des affaires",
          person: {
            firstName: "CONNOR",
            lastName: "",
            email: "affaires.generales@cofac.mg",
            phone: "+261 34 10 101 01",
            building: "Bâtiment Administration",
            photo: "/professional-man.png",
            bio: "Responsable des affaires générales et de la logistique."
          }
        }
      ]
    },
    {
      name: "AVERY DAVIS",
      title: "DICOS",
      person: {
        firstName: "AVERY",
        lastName: "DAVIS",
        email: "dicos@cofac.mg",
        phone: "+261 34 77 777 77",
        building: "Bâtiment Services",
        photo: "/professional-man.png",
        bio: "Responsable du service DICOS et de la communication."
      }
    },
    {
      name: "HANNAH MORALES",
      title: "Vice Doyen chargé de réforme",
      person: {
        firstName: "HANNAH",
        lastName: "MORALES",
        email: "vd.reforme@cofac.mg",
        phone: "+261 34 18 181 81",
        building: "Bâtiment Technique",
        photo: "/professional-man.png",
        bio: "Vice Doyen en charge des réformes et de l'innovation pédagogique."
      }
    },
    {
      name: "HANNAH MORALES",
      title: "Vice Doyen chargé des partenariats",
      person: {
        firstName: "HANNAH",
        lastName: "MORALES",
        email: "vd.reforme@cofac.mg",
        phone: "+261 34 18 181 81",
        building: "Bâtiment Technique",
        photo: "/professional-man.png",
        bio: "Vice Doyen en charge des partenariats et de la coopération internationale."
      }
    },
    {
      name: "HANNAH MORALES",
      title: "Vice Doyen chargé de formation",
      person: {
        firstName: "HANNAH",
        lastName: "MORALES",
        email: "vd.formation@cofac.mg",
        phone: "+261 34 16 161 61",
        building: "Bâtiment Pédagogie",
        photo: "/professional-man.png",
        bio: "Vice Doyen en charge de la formation et des programmes académiques."
      },
      children: [
        {
          name: "SAMANTHA REESE",
          title: "Association des étudiants",
          person: {
            firstName: "SAMANTHA",
            lastName: "REESE",
            email: "associations@cofac.mg",
            phone: "+261 34 17 171 71",
            building: "Bâtiment Étudiant",
            photo: "/professional-man.png",
            bio: "Représentante des associations étudiantes et de la vie étudiante."
          }
        }
      ]
    }
  ]

  const collegeData = {
    name: "HANNAH MORALES",
    title: "College des enseignants",
    person: {
      firstName: "HANNAH",
      lastName: "MORALES",
      email: "college.enseignants@cofac.mg",
      phone: "+261 34 33 333 33",
      building: "Bâtiment Pédagogie",
      photo: "/professional-man.png",
      bio: "Responsable du collège des enseignants et de la coordination pédagogique."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <main className="pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <div className="mx-auto">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-6 sm:mb-8 lg:mb-12 overflow-hidden"
            >
              <div className="absolute inset-0">
                <img 
                  src="/modern-university-campus-with-science-buildings-an.png" 
                  alt="Histoire de la faculté" 
                  className="w-full h-32 sm:h-48 lg:h-64 xl:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
              </div>
              <div className="relative z-10 text-center py-6 sm:py-8 lg:py-12 xl:py-16 px-4 sm:px-6">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 text-white">
                  Structure Organisationnelle
                </h1>
                <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed">
                  Cliquez sur les éléments pour découvrir les informations de notre équipe dirigeante
                </p>
              </div>
            </motion.div>

            {/* Organigramme interactif */}
            <div className="flex items-center justify-center p-2 sm:p-4 lg:p-8">
              <div className="relative flex flex-col items-center w-full overflow-x-auto">
                
                <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-8 lg:gap-12 min-w-fit">

                  <div className="flex flex-col items-center mb-8 lg:mb-0 lg:mr-8 xl:mr-12">
                    {/* COFAC */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col items-center mb-4"
                    >
                      <div className="bg-gradient-to-br from-border to-primary text-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-4 shadow-xl">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center">{cofacData.name}</h2>
                        <p className="text-purple-100 text-xs sm:text-sm text-center mt-1">{cofacData.title}</p>
                      </div>
                      <ConnectionLine direction="vertical" length="extraLong" />
                    </motion.div>

                    {/* DOYEN */}
                    <div className="flex flex-col items-center">
                      <PersonCard
                        person={doyenData.person}
                        name={doyenData.name}
                        title={doyenData.title}
                        size="large"
                        isClickable={true}
                        isExpanded={showDetails === "doyen"}
                        id="doyen"
                        onClick={() => setShowDetails(showDetails === "doyen" ? null : "doyen")}
                      />
                      <ConnectionLine direction="vertical" length="medium" />
                    </div>

                    {/* College des enseignants */}
                    <div className="flex flex-col items-center">
                      <PersonCard
                        person={collegeData.person}
                        name={collegeData.name}
                        title={collegeData.title}
                        size="large"
                        isClickable={true}
                        isExpanded={showDetails === "college"}
                        id="college"
                        onClick={() => setShowDetails(showDetails === "college" ? null : "college")}
                      />
                    </div>
                  </div>

                  <div className="flex items-start w-full lg:w-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center">
                      <div className="hidden lg:block">
                        <ConnectionLine direction="horizontal" length="long" />
                      </div>
                      <div className="relative w-full lg:w-auto">
                        {/* Ligne verticale adaptive : absolute, étendue de top-0 à bottom-0 */}
                        <div className="hidden lg:block absolute top-0 bottom-0 w-0.5 bg-gray-400 shadow-sm"></div>
                        
                        {/* Branches en flux normal (non absolute), avec gap fixe au lieu de justify-between */}
                        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 w-full lg:w-auto min-w-fit">  
                          {mainBranches.map((branch, index) => (
                            <div key={index} className="flex flex-col lg:flex-row lg:items-center w-full">
                              <div className="hidden lg:block">
                                <ConnectionLine direction="horizontal" length="medium" />
                              </div>
                              <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ml-0 lg:ml-4 w-full sm:w-auto"
                              >
                                <PersonCard
                                  person={branch.person}
                                  name={branch.name}
                                  title={branch.title}
                                  size="medium"
                                  isClickable={true}
                                  isExpanded={showDetails === `branch-${index}`}
                                  id={`branch-${index}`}
                                  onClick={() => setShowDetails(showDetails === `branch-${index}` ? null : `branch-${index}`)}
                                />

                                {branch.children && (
                                  <div className={`flex flex-col sm:flex-row sm:items-center ${branch.title === "Secrétaire Principal" ? "gap-0" : "gap-4 sm:gap-6"} w-full sm:w-auto mt-4 sm:mt-0`}>
                                    <div className="hidden sm:block">
                                      <ConnectionLine direction="horizontal" length="medium" />
                                    </div>
                                    {branch.title === "Secrétaire Principal" ? (
                                      // Structure spéciale avec lignes pour Secrétaire Principal seulement
                                      <div className="relative w-full sm:w-auto">
                                        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-0.5 bg-gray-400 shadow-sm"></div>  {/* Ligne verticale */}
                                        <div className="flex flex-col gap-3 sm:gap-4 sm:pl-0">  {/* pl-0 sur sm+ pour éviter le décalage */}
                                          {branch.children.map((subBranch, subIndex) => (
                                            <div key={subIndex} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                              <div className="hidden sm:block">
                                                <ConnectionLine direction="horizontal" length="short" />
                                              </div>
                                              <PersonCard
                                                person={subBranch.person}
                                                name={subBranch.name}
                                                title={subBranch.title}
                                                size="small"
                                                isClickable={true}
                                                isExpanded={showDetails === `sub-${index}-${subIndex}`}
                                                id={`sub-${index}-${subIndex}`}
                                                onClick={() =>
                                                  setShowDetails(
                                                    showDetails === `sub-${index}-${subIndex}` ? null : `sub-${index}-${subIndex}`
                                                  )
                                                }
                                              />
                                              {/* Si l'enfant a des petits-enfants, garde le rendu normal ou applique la même logique si besoin */}
                                              {subBranch.children && (
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                                                  <div className="hidden sm:block">
                                                    <ConnectionLine direction="horizontal" length="short" />
                                                  </div>
                                                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                                    {subBranch.children.map((subSubBranch: any, subSubIndex: any) => (
                                                      <PersonCard
                                                        key={subSubIndex}
                                                        person={subSubBranch.person}
                                                        name={subSubBranch.name}
                                                        title={subSubBranch.title}
                                                        size="small"
                                                        isClickable={true}
                                                        isExpanded={showDetails === `subsub-${index}-${subIndex}-${subSubIndex}`}
                                                        id={`subsub-${index}-${subIndex}-${subSubIndex}`}
                                                        onClick={() =>
                                                          setShowDetails(
                                                            showDetails === `subsub-${index}-${subIndex}-${subSubIndex}`
                                                              ? null
                                                              : `subsub-${index}-${subIndex}-${subSubIndex}`
                                                          )
                                                        }
                                                      />
                                                    ))}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      // Rendu normal pour les autres branches avec enfants
                                      <div className="flex flex-col gap-3 sm:gap-4 w-full sm:w-auto">
                                        {branch.children.map((subBranch, subIndex) => (
                                          <div key={subIndex} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                            <PersonCard
                                              person={subBranch.person}
                                              name={subBranch.name}
                                              title={subBranch.title}
                                              size="small"
                                              isClickable={true}
                                              isExpanded={showDetails === `sub-${index}-${subIndex}`}
                                              id={`sub-${index}-${subIndex}`}
                                              onClick={() =>
                                                setShowDetails(
                                                  showDetails === `sub-${index}-${subIndex}` ? null : `sub-${index}-${subIndex}`
                                                )
                                              }
                                            />
                                            {subBranch.children && (
                                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                                                <div className="hidden sm:block">
                                                  <ConnectionLine direction="horizontal" length="short" />
                                                </div>
                                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                                  {subBranch.children.map((subSubBranch: any, subSubIndex: any) => (
                                                    <PersonCard
                                                      key={subSubIndex}
                                                      person={subSubBranch.person}
                                                      name={subSubBranch.name}
                                                      title={subSubBranch.title}
                                                      size="small"
                                                      isClickable={true}
                                                      isExpanded={showDetails === `subsub-${index}-${subIndex}-${subSubIndex}`}
                                                      id={`subsub-${index}-${subIndex}-${subSubIndex}`}
                                                      onClick={() =>
                                                        setShowDetails(
                                                          showDetails === `subsub-${index}-${subIndex}-${subSubIndex}`
                                                            ? null
                                                            : `subsub-${index}-${subIndex}-${subSubIndex}`
                                                        )
                                                      }
                                                    />
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </motion.div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                         
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}