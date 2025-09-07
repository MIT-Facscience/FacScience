import { motion, AnimatePresence } from "framer-motion"
import React, { useState } from "react";
import { ChevronDown, ChevronRight, User, Mail, Phone, Building, MapPin, ChevronUp } from "lucide-react";

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

interface OrgNodeType {
  name: string;
  title: string;
  person?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    building: string;
    photo: string;
    bio?: string;
  };
  children?: OrgNodeType[];
}

export default function OrganigrammePage() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('');

  const orgData = {
    name: "COFAC",
    title: "Faculté",
    person: {
      firstName: "Dr. Marie",
      lastName: "RASOANAIVO",
      email: "marie.rasoanaivo@cofac.mg",
      phone: "+261 34 12 345 67",
      building: "Bâtiment Principal",
      photo: "/api/placeholder/80/80",
      bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
    },
    children: [
      {
        name: "Doyen",
        title: "Direction",
        person: {
          firstName: "Prof. Jean",
          lastName: "RAKOTOMANGA",
          email: "doyen@cofac.mg",
          phone: "+261 34 11 111 11",
          building: "Bâtiment Administration",
          photo: "/api/placeholder/80/80",
          bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
        },
        children: [
          { 
            name: "Conseil scientifique",
            title: "Conseil",
            person: {
              firstName: "Dr. Paul",
              lastName: "ANDRIAMAMY",
              email: "conseil.scientifique@cofac.mg",
              phone: "+261 34 22 222 22",
              building: "Bâtiment Recherche",
              photo: "/api/placeholder/80/80",
              bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
            }
          },
          { 
            name: "Collège des enseignants",
            title: "Enseignement",
            person: {
              firstName: "Dr. Sophie",
              lastName: "RAZAFY",
              email: "college.enseignants@cofac.mg",
              phone: "+261 34 33 333 33",
              building: "Bâtiment Pédagogie",
              photo: "/api/placeholder/80/80",
              bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
            }
          },
          {
            name: "Mention",
            title: "Formation",
            person: {
              firstName: "Dr. Michel",
              lastName: "RABE",
              email: "mention@cofac.mg",
              phone: "+261 34 44 444 44",
              building: "Bâtiment Formation",
              photo: "/api/placeholder/80/80",
              bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
            },
            children: [
              {
                name: "Parcours",
                title: "Spécialisation",
                person: {
                  firstName: "Dr. Anne",
                  lastName: "RATIARISON",
                  email: "parcours@cofac.mg",
                  phone: "+261 34 55 555 55",
                  building: "Bâtiment Formation",
                  photo: "/api/placeholder/80/80",
                  bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                },
                children: [
                  { 
                    name: "Labo",
                    title: "Laboratoire",
                    person: {
                      firstName: "Dr. Pierre",
                      lastName: "RANDRIA",
                      email: "labo@cofac.mg",
                      phone: "+261 34 66 666 66",
                      building: "Bâtiment Laboratoire",
                      photo: "/api/placeholder/80/80",
                      bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                    }
                  }
                ],
              },
            ],
          },
          { 
            name: "DICOS",
            title: "Service",
            person: {
              firstName: "Mme. Claire",
              lastName: "RAKOTO",
              email: "dicos@cofac.mg",
              phone: "+261 34 77 777 77",
              building: "Bâtiment Services",
              photo: "/api/placeholder/80/80",
              bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
            }
          },
          {
            name: "Secrétaire principal",
            title: "Administration",
            person: {
              firstName: "M. Robert",
              lastName: "RATSIMBA",
              email: "secretaire.principal@cofac.mg",
              phone: "+261 34 88 888 88",
              building: "Bâtiment Administration",
              photo: "/api/placeholder/80/80",
              bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
            },
            children: [
              { 
                name: "Service de la scolarité",
                title: "Scolarité",
                person: {
                  firstName: "Mme. Hery",
                  lastName: "RAJAO",
                  email: "scolarite@cofac.mg",
                  phone: "+261 34 99 999 99",
                  building: "Bâtiment Administration",
                  photo: "/api/placeholder/80/80",
                  bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                }
              },
              { 
                name: "Service des affaires générales",
                title: "Affaires générales",
                person: {
                  firstName: "M. David",
                  lastName: "RAZANA",
                  email: "affaires.generales@cofac.mg",
                  phone: "+261 34 10 101 01",
                  building: "Bâtiment Administration",
                  photo: "/api/placeholder/80/80",
                  bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                }
              },
              { 
                name: "Service du personnel",
                title: "Ressources humaines",
                person: {
                  firstName: "Mme. Nadia",
                  lastName: "RANAIVO",
                  email: "personnel@cofac.mg",
                  phone: "+261 34 12 121 21",
                  building: "Bâtiment Administration",
                  photo: "/api/placeholder/80/80",
                  bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                }
              },
              { 
                name: "Service de la comptabilité",
                title: "Finance",
                person: {
                  firstName: "M. Eric",
                  lastName: "RABARY",
                  email: "comptabilite@cofac.mg",
                  phone: "+261 34 13 131 31",
                  building: "Bâtiment Administration",
                  photo: "/api/placeholder/80/80",
                  bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                }
              },
              { 
                name: "Service informatique",
                title: "IT",
                person: {
                  firstName: "M. Luc",
                  lastName: "RAJERY",
                  email: "informatique@cofac.mg",
                  phone: "+261 34 14 141 41",
                  building: "Bâtiment Technique",
                  photo: "/api/placeholder/80/80",
                  bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                }
              },
            ],
          },
          {
            name: "Vice-Doyens",
            title: "Direction adjointe",
            person: {
              firstName: "Coordination",
              lastName: "Vice-Doyens",
              email: "vice.doyens@cofac.mg",
              phone: "+261 34 15 151 51",
              building: "Bâtiment Administration",
              photo: "/api/placeholder/80/80",
              bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
            },
            children: [
              {
                name: "Vice Doyen chargé de la formation",
                title: "Formation",
                person: {
                  firstName: "Dr. Alice",
                  lastName: "RAMASY",
                  email: "vd.formation@cofac.mg",
                  phone: "+261 34 16 161 61",
                  building: "Bâtiment Pédagogie",
                  photo: "/api/placeholder/80/80",
                  bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                },
                children: [
                  { 
                    name: "Associations des étudiants",
                    title: "Vie étudiante",
                    person: {
                      firstName: "M. Kevin",
                      lastName: "RATOVO",
                      email: "associations@cofac.mg",
                      phone: "+261 34 17 171 71",
                      building: "Bâtiment Étudiant",
                      photo: "/api/placeholder/80/80",
                      bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                    }
                  }
                ],
              },
              {
                name: "Vice Doyen chargé de la réforme numérique et base de données",
                title: "Numérique",
                person: {
                  firstName: "Dr. Thomas",
                  lastName: "RAZAKA",
                  email: "vd.numerique@cofac.mg",
                  phone: "+261 34 18 181 81",
                  building: "Bâtiment Technique",
                  photo: "/api/placeholder/80/80",
                  bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                }
              },
              {
                name: "Vice Doyen chargé du Développement des partenariats et recherche",
                title: "Partenariats",
                person: {
                  firstName: "Prof. Sylvie",
                  lastName: "RANDRIANY",
                  email: "vd.partenariats@cofac.mg",
                  phone: "+261 34 19 191 91",
                  building: "Bâtiment Recherche",
                  photo: "/api/placeholder/80/80",
                  bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                }
              },
              {
                name: "Vice Doyen chargé de la communication, contrôle de gestion et de la vie sociale",
                title: "Communication",
                person: {
                  firstName: "Mme. Julie",
                  lastName: "RABENJA",
                  email: "vd.communication@cofac.mg",
                  phone: "+261 34 20 202 02",
                  building: "Bâtiment Communication",
                  photo: "/api/placeholder/80/80",
                  bio: "Dr. Marie RASOANAIVO est doyenne de COFAC depuis 2018 et spécialisée en sciences de l'éducation."
                }
              },
            ],
          },
        ],
      },
    ],
  };

  const getLevelColors = (level: number) => {
    const colors = [
      { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800' },
      { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800' },
      { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-800' },
      { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800' },
      { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800' },
      { bg: 'bg-indigo-50', border: 'border-indigo-300', text: 'text-indigo-800' },
    ];
    return colors[level % colors.length];
  };

  const OrgNode: React.FC<{ node: OrgNodeType; level?: number; }> = ({ node, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(level < 2);
    const [showDetails, setShowDetails] = useState(false);

    const hasChildren = node.children && node.children.length > 0;
    
    const toggleExpansion = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    };

    const toggleDetails = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowDetails(!showDetails);
    };

    const matchesSearch = searchTerm === '' || 
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.person?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.person?.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch && !hasChildren) return null;

    let filteredChildren = node.children?.filter(child => {
      const childMatches = child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.person?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.person?.lastName.toLowerCase().includes(searchTerm.toLowerCase());
      return childMatches || (child.children && child.children.length > 0);
    }) || [];

    const effectiveHasChildren = filteredChildren.length > 0;

    // Reorder for Vice-Doyens to put "Vice Doyen chargé de la formation" last
    if (node.name === "Vice-Doyens") {
      const formationViceIndex = filteredChildren.findIndex(c => c.name === "Vice Doyen chargé de la formation");
      if (formationViceIndex !== -1) {
        const [formationVice] = filteredChildren.splice(formationViceIndex, 1);
        filteredChildren.push(formationVice);
      }
    }

    const isVertical = (node.name === "Mention" || node.name === "Vice-Doyens" || node.name === "Parcours" || node.name==="Secrétaire principal");

    const { bg, border, text } = getLevelColors(level);

    return (
      <div className="flex flex-col items-center">
        {/* Conteneur principal du nœud */}
        <div 
          className={`
            relative ${bg} ${border} border-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer 
            w-full max-w-[16rem] sm:max-w-[18rem] md:max-w-[20rem] lg:max-w-[22rem]
          `}
          onClick={toggleDetails}
        >
          {/* En-tête avec bouton d'expansion */}
          <div className="flex items-center justify-between p-3 sm:p-4">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {/* Avatar avec photo ou initiales - TAILLE AUGMENTÉE */}
              {node.person ? (
                node.person.photo ? (
                  <img 
                    src={node.person.photo} 
                    alt={`${node.person.firstName} ${node.person.lastName}`} 
                    className={`object-cover ${level === 0 ? 'w-16 h-16 sm:w-18 sm:h-18' : 'w-14 h-14 sm:w-16 sm:h-16'}`}
                  />
                ) : (
                  <div className={`bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold ${level === 0 ? 'w-16 h-16 sm:w-18 sm:h-18 text-xl' : 'w-14 h-14 sm:w-16 sm:h-16 text-lg'}`}>
                    {node.person.firstName[0]}{node.person.lastName[0]}
                  </div>
                )
              ) : (
                <div className={`bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center ${level === 0 ? 'w-16 h-16 sm:w-18 sm:h-18' : 'w-14 h-14 sm:w-16 sm:h-16'}`}>
                  <User className={`text-slate-600 ${level === 0 ? 'w-8 h-8' : 'w-6 h-6'}`} />
                </div>
              )}
              
              {/* Nom et titre */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold ${text} ${
                  level === 0 ? 'text-base sm:text-lg' : level === 1 ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                } leading-tight`}>
                  {node.name}
                </h3>
                {node.title && (
                  <p className={`${text} opacity-80 ${
                    level === 0 ? 'text-sm' : 'text-xs'
                  } leading-tight mt-1`}>{node.title}</p>
                )}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center space-x-1 sm:space-x-2 ml-2">
              {node.person && (
                <button 
                  onClick={toggleDetails}
                  className={`
                    px-2 py-1 text-xs font-medium transition-all duration-200
                    ${showDetails 
                      ? 'bg-white text-slate-700 border border-slate-300' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }
                  `}
                >
                  {showDetails ? 'Masquer' : 'Détails'}
                </button>
              )}
              
              {effectiveHasChildren && (
                <button
                  onClick={toggleExpansion}
                  className="p-1.5 sm:p-2 hover:bg-slate-100 transition-colors duration-200"
                >
                  {isExpanded ? 
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" /> : 
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                  }
                </button>
              )}
            </div>
          </div>

          {/* Détails de la personne (expandable) */}
          <AnimatePresence>
            {showDetails && node.person && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t-2 border-slate-200 overflow-hidden"
              >
                <div className="p-3 sm:p-4 bg-white/60">
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800 truncate">
                        {node.person.firstName} {node.person.lastName}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Building className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 truncate">{node.person.building}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 flex-shrink-0" />
                      <a 
                        href={`mailto:${node.person.email}`}
                        className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {node.person.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 flex-shrink-0" />
                      <a 
                        href={`tel:${node.person.phone}`}
                        className="text-xs sm:text-sm text-green-600 hover:text-green-800 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {node.person.phone}
                      </a>
                    </div>

                    {/* Biographie */}
                    {node.person.bio && (
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {node.person.bio}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enfants avec connecteurs améliorés */}
        {effectiveHasChildren && isExpanded && (
          <motion.div 
            className="flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {/* Connecteur vertical principal - part du bas du conteneur parent */}
            <div className="w-0.5 h-6 bg-slate-500" />
            
            {/* Point de distribution principal */}
            <div className="w-1 h-1 bg-slate-500" />

            {node.name === "Doyen" ? (
              <div className="flex flex-col items-center gap-12">
                {/* Première ligne: 2 enfants */}
                <div className="relative flex flex-col sm:flex-row justify-center items-start gap-6 sm:gap-16 w-full">
                  {/* Point de jonction central */}
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-slate-500 transform -translate-x-0.5" />
                  {/* Ligne horizontale de connexion entre les 2 premiers enfants */}
                  <div className="absolute top-0.5 left-1/4 right-1/4 h-0.5 bg-slate-500 hidden sm:block" />
                  
                  {filteredChildren.slice(0, 2).map((child: OrgNodeType, index: number) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center"
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Connecteur vertical vers l'enfant */}
                      <div className="w-0.5 h-6 bg-slate-500" />
                      <OrgNode node={child} level={level + 1}/>
                    </motion.div>
                  ))}
                </div>

                {/* Connecteur vertical central entre les deux lignes */}
                <div className="w-0.5 h-8 bg-slate-500" />

                {/* Deuxième ligne: reste des enfants */}
                <div className="relative flex flex-wrap justify-center items-start gap-4 sm:gap-6 w-full max-w-6xl">
                  {/* Point de jonction central pour la deuxième ligne */}
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-slate-500 transform -translate-x-0.5" />
                  {/* Ligne horizontale de connexion étendue */}
                  <div className="absolute top-0.5 left-8 right-8 h-0.5 bg-slate-500" />
                  
                  {filteredChildren.slice(2).map((child: OrgNodeType, index: number) => (
                    <motion.div
                      key={index + 2}
                      className="flex flex-col items-center"
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {/* Connecteur vertical vers l'enfant */}
                      <div className="w-0.5 h-6 bg-slate-500" />
                      <OrgNode node={child} level={level + 1} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : isVertical ? (
              /* Layout vertical amélioré - connexions précises */
              <div className="w-full max-w-4xl">
                <div className="relative ml-6 sm:ml-10 space-y-6 sm:space-y-8">
                  {/* Point de départ de la ligne verticale */}
                  <div className="absolute -left-6 sm:-left-10 top-0 w-1 h-1 bg-slate-500" />
                  {/* Ligne verticale principale de connexion */}
                  <div className="absolute -left-6 sm:-left-10 top-0.5 bottom-0 w-0.5 bg-slate-500" />
                  
                  {filteredChildren.map((child: OrgNodeType, index: number) => (
                    <motion.div
                      key={index}
                      className="relative"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {/* Connecteur horizontal précis vers chaque enfant */}
                      <div className="absolute -left-6 sm:-left-10 top-8 w-6 sm:w-10 h-0.5 bg-slate-500" />
                      <OrgNode node={child} level={level + 1} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              /* Layout horizontal standard - connexions centrées */
              <div className="relative w-full">
                <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-6 lg:gap-8">
                  {/* Point de jonction central */}
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-slate-500 transform -translate-x-0.5" />
                  {/* Ligne horizontale de connexion centrée */}
                  <div className="absolute top-0.5 h-0.5 bg-slate-500" style={{
                    left: `${100 / filteredChildren.length / 2}%`,
                    right: `${100 / filteredChildren.length / 2}%`
                  }} />
                  
                  {filteredChildren.map((child: OrgNodeType, index: number) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center"
                      variants={{
                        hidden: { opacity: 0, scale: 0.8, y: -20 },
                        visible: { opacity: 1, scale: 1, y: 0 }
                      }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {/* Connecteur vertical vers chaque enfant */}
                      <div className="w-0.5 h-6 bg-slate-500" />
                      <OrgNode node={child} level={level + 1} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <main className="pt-8 sm:pt-12 pb-8 sm:pb-12">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <div className="mx-auto">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-8 sm:mb-12 overflow-hidden"
            >
              <div className="absolute inset-0">
                <img 
                  src="/modern-university-campus-with-science-buildings-an.png" 
                  alt="Histoire de la faculté" 
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
              </div>
              <div className="relative z-10 text-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">
                  Structure Organisationnelle
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed">
                  Cliquez sur les éléments pour découvrir les informations de notre équipe dirigeante
                </p>
              </div>
            </motion.div>

            {/* Organigramme interactif */}
            <div className="bg-white shadow-2xl p-4 sm:p-6 lg:p-8 overflow-x-auto">
              <div className="w-full min-w-[800px] flex justify-center">
                <OrgNode node={orgData} level={0}/>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}