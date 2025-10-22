"use client";

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Mail } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"

// Types pour les données
interface PersonData {
  id: number;
  nom: string;
  prenom: string;
  responsabilite: string;
  email: string;
  tel: string;
}

interface CofacMember {
  num: number;
  nomPrenom: string;
  appartenance: string;
  email: string;
  telephone?: string;
  photo?: string;
}

// Données du personnel principal
const personnelPrincipal: PersonData[] = [
  {
    id: 1,
    nom: "RAZAFINDRANAIVO",
    prenom: "Victor",
    responsabilite: "Vice Doyen chargé de la formation",
    email: "razafv@gmail.com",
    tel: "034 36 413 54",
  },
  {
    id: 2,
    nom: "RAKOTOVAO",
    prenom: "Niry Arinavalona",
    responsabilite: "Vice Doyen chargé de la Recherche et du Partenariat",
    email: "arinavalona2025@gmail.com",
    tel: "034 10 151 51",
  },
  {
    id: 3,
    nom: "RAKOTONDRAMAVONIRINA",
    prenom: "Joseph",
    responsabilite:
      "Vice Doyen chargé de la base de données et de la digitalisation",
    email: "radosefaniri@yahoo.fr",
    tel: "034 36 255 08",
  },
  {
    id: 5,
    nom: "RABEHARISOA",
    prenom: "Olivier",
    responsabilite: "Sec Pal",
    email: "rabearisoaolivier@gmail.com",
    tel: "038 77 110 16",
  },
  {
    id: 6,
    nom: "RAKOTONANAHARY",
    prenom: "Jacquis Hasina Tahirintsoa",
    responsabilite: "Chef de service Comptabilité",
    email: "tahirintsoa4hasina@gmail.com",
    tel: "034 10 016 46",
  },
  {
    id: 7,
    nom: "RAKOTONANAHARY",
    prenom: "Mbolatiana",
    responsabilite: "Chef de service de la Scolarité",
    email: "mbolatiana.rakotonanahary@univ-antananarivo.mg",
    tel: "034 36 146 61",
  },
  {
    id: 8,
    nom: "RATSIMBARISON",
    prenom: "Rivoson",
    responsabilite: "Chef de service des Affaires Générales",
    email: "",
    tel: "034 46 976 90",
  },
  {
    id: 9,
    nom: "FIDINARIVO",
    prenom: "Thomas",
    responsabilite: "Chef de service Informatique",
    email: "toma.fidinarivo@univ-antananarivo.mg",
    tel: "038 18 673 75",
  },
  {
    id: 10,
    nom: "RAKOTOMAVO",
    prenom: "Tantelinirina",
    responsabilite: "Chef de service du Personnel",
    email: "rakotomavotantelinirina2@gmail.com",
    tel: "034 10 535 82",
  },
];

// Données des membres COFAC
const membresCofac: CofacMember[] = [
  {
    num: 1,
    nomPrenom: "Mme RALISON LAINGOHARIMIADANA Marie Nambinina",
    appartenance: "Responsable Mention",
    email: "laingoharimiadana@gmail.com",
    photo: "/professional-woman-portrait.png",
  },
  {
    num: 2,
    nomPrenom: "Mr RAKOTOARINIVO Mijoro",
    appartenance: "Responsable Mention",
    email: "rakotoarinivo@outlook.com",
    photo: "/professional-man-portrait.png",
  },
  {
    num: 3,
    nomPrenom: "Mr RANDRIAMAMPIANINA Lovarintsoa Judicaël",
    appartenance: "Responsable Mention",
    email: "bouba.lova@gmail.com",
    photo: "/professional-man-portrait.png",
  },
  {
    num: 4,
    nomPrenom: "Mr RAKOTONIMANANA Rivoniaina Michel Jese",
    appartenance: "Responsable Mention",
    email: "jmrivo@gmail.com",
    photo: "/professional-man-portrait.png",
  },
  {
    num: 5,
    nomPrenom: "Mr RAZAKARIVONY Andriamarolahy Andrianambinina",
    appartenance: "Responsable Mention",
    email: "andri_razakarivony@yahoo.fr",
    photo: "/professional-man-portrait.png",
  },
  {
    num: 6,
    nomPrenom: "Mr RAKOTONIRINA Jean Claude",
    appartenance: "Responsable Mention",
    email: "jcrakoto25@gmail.com",
    photo: "/professional-man-portrait.png",
  },
  {
    num: 7,
    nomPrenom: "Mr LALAHARISON Hanjarivo",
    appartenance: "Responsable Mention",
    email: "lalaharisonh@gmail.com",
    photo: "/professional-man-portrait.png",
  },
  {
    num: 8,
    nomPrenom: "Mr RANDRIANASOLOHARISOA Dimbimalala",
    appartenance: "Responsable Mention",
    email: "randrianasoloharisoa@gmail.com",
    photo: "/professional-man-portrait.png",
  },
  {
    num: 9,
    nomPrenom: "Mme ANDRIAMAMPIANINA Tianarilalaina Tantely",
    appartenance: "Responsable Mention",
    email: "tantely_lalaina@yahoo.fr",
    photo: "/placeholder.svg?key=6jv2p",
  },
  {
    num: 10,
    nomPrenom: "Mr ANDRIAMIADAMANANA Mavintana Dangerfield Christian",
    appartenance: "Responsable Mention",
    email: "chriast@yahoo.fr",
    photo: "/placeholder.svg?key=9qk4z",
  },
  {
    num: 11,
    nomPrenom: "Mme RAKOTOSAMIZANANY Saholy",
    appartenance: "Responsable Mention",
    email: "rakotosa@yahoo.fr",
    photo: "/placeholder.svg?key=3jv8p",
  },
  {
    num: 12,
    nomPrenom: "Mr Madame RATSOAVINA Fanomezana Mihaja",
    appartenance: "Responsable Mention",
    email: "fanomezanarts@gmail.com",
    photo: "/placeholder.svg?key=7qk4z",
  },
  {
    num: 13,
    nomPrenom: "Mr ANDRIAMAROZAKANIAINA Tahiry Zaka Filamatra",
    appartenance: "Responsable Mention",
    email: "filamatra@gmail.com",
    photo: "/placeholder.svg?key=8qk4z",
  },
  {
    num: 14,
    nomPrenom: "Mme RAMIANDRISOA Njararivelo Louisa",
    appartenance: "Responsable Mention",
    email: "lnjara14@gmail.com",
    photo: "/placeholder.svg?key=9qk4z",
  },
  {
    num: 15,
    nomPrenom: "Mr RABEHARISOA Rija",
    appartenance: "Membre extérieur",
    email: "rijarabeharisoa@gmail.com",
    telephone: "032 05 039 72",
    photo: "/placeholder.svg?key=0qk4z",
  },
  {
    num: 16,
    nomPrenom: "Mr RASAMOELA Henintsoa",
    appartenance: "Membre extérieur",
    email: "hentsrasamy@gmail.com",
    photo: "/placeholder.svg?key=1qk4z",
  },
  {
    num: 17,
    nomPrenom: "RANDRIANARIVELO Mamy Fetra",
    appartenance: "Membre extérieur",
    email: "mamyfetra@gmail.com",
    telephone: "034 05 185 08",
    photo: "/placeholder.svg?key=2qk4z",
  },
  {
    num: 18,
    nomPrenom: "Mr RAKOTONDRAMANGA Maonja Finaritra Sitrakiniavo",
    appartenance: "Représentant Enseignant",
    email: "vivimaonja@yahoo.fr",
    photo: "/placeholder.svg?key=3qk4z",
  },
  {
    num: 19,
    nomPrenom: "Mme HARIMALALA ANDRIAMBELO Nirina",
    appartenance: "Représentant Enseignant",
    email: "nirina.harimalala@univ-antananarivo.mg",
    photo: "/placeholder.svg?key=4qk4z",
  },
  {
    num: 20,
    nomPrenom: "Mr FELANA MPANARIVO Michel R.",
    appartenance: "Représentant PAT",
    email: "",
    photo: "/placeholder.svg?key=5qk4z",
  },
  {
    num: 21,
    nomPrenom: "Mme RANDRIANALISON Onilalaina Ange",
    appartenance: "Représentant PAT",
    email: "",
    photo: "/placeholder.svg?key=6qk4z",
  },
  {
    num: 22,
    nomPrenom: "ANDRIANOARAMAHERY Hervé",
    appartenance: "Représentant Etudiant",
    email: "herverolinho@gmail.com",
    photo: "/placeholder.svg?key=7qk4z",
  },
];

// Composant pour les membres COFAC
const CofacMemberCard: React.FC<{ member: CofacMember }> = ({ member }) => {
  return (
    <div className="flex flex-col items-center p-6 relative">
      {/* Circular Photo */}
      <div className="relative z-20">
        <img
          src={member.photo || "/professional-man.png"}
          alt={`Photo de ${member.nomPrenom}`}
          className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
      </div>

      {/* Name and Title Card */}
      <div className="bg-white/90 backdrop-blur-sm px-4 py-3 text-center shadow-lg min-w-[200px] max-w-[250px] -mt-8 relative z-10">
        <div className="pt-8">
          <h4 className="font-bold text-gray-800 text-sm md:text-base leading-tight mb-1">
            {member.nomPrenom.split(" ").slice(-2).join(" ")}{" "}
            {/* Show last two parts of name for brevity */}
          </h4>
          <p className="text-xs md:text-sm text-gray-600 font-medium">
            {member.appartenance}
          </p>

          {/* Contact info - smaller and subtle */}
          {member.email && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <Mail className="h-3 w-3" />
                <span className="truncate max-w-[180px]">{member.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HierarchyNode: React.FC<{
  title: string;
  level: number;
  children?: React.ReactNode;
  person?: PersonData;
  isService?: boolean;
}> = ({
  title,
  level,
  children,
  person,
  //isService = false
}) => {
  const getNodeStyle = () => {
    switch (level) {
      case 0:
        return {
          backgroundColor: "#ffffff",
          titleColor: "#780376",
          borderColor: "#d1d5db",
        };
      case 1:
        return {
          backgroundColor: "#ffffff",
          titleColor: "#1e293b",
          borderColor: "#d1d5db",
        };
      case 2:
        return {
          backgroundColor: "#ffffff",
          titleColor: "#b45309",
          borderColor: "#d1d5db",
        };
      case 3:
        return {
          backgroundColor: "#ffffff",
          titleColor: "#3b82f6",
          borderColor: "#d1d5db",
        };
      case 4:
        return {
          backgroundColor: "#ffffff",
          titleColor: "#10b981",
          borderColor: "#d1d5db",
        };
      default:
        return {
          backgroundColor: "#ffffff",
          titleColor: "#6b7280",
          borderColor: "#d1d5db",
        };
    }
  };

  // const getConnectorColor = () => {
  //   switch (level) {
  //     case 0:
  //       return "#780376"
  //     case 1:
  //       return "#1e293b"
  //     case 2:
  //       return "#b45309"
  //     case 3:
  //       return "#3b82f6"
  //     case 4:
  //       return "#10b981"
  //     default:
  //       return "#6b7280"
  //   }
  // }

  const nodeStyle = getNodeStyle()

  return (
    <div className="flex flex-col items-center">
      <div
        className="shadow-md hover:shadow-lg transition-all duration-200 min-w-[120px] max-w-[180px]"
        style={{
          backgroundColor: nodeStyle.backgroundColor,
          borderColor: nodeStyle.borderColor,
          border: `2px solid ${nodeStyle.borderColor}`,
          borderRadius: 0,
        }}
      >
        <div
          className="p-1.5 text-center"
          style={{
            backgroundColor: nodeStyle.backgroundColor,
            borderRadius: 0,
          }}
        >
          <h3
            className={`font-bold ${
              level === 0 ? "text-xs" : "text-[10px]"
            } text-balance leading-tight break-words hyphens-auto`}
            style={{
              color: nodeStyle.titleColor,
              backgroundColor: "transparent",
            }}
          >
            {title}
          </h3>
          {person && (
            <div className="mt-0.5 space-y-0.5">
              <p
                className="text-[9px] font-medium leading-tight text-black break-words"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                {person.prenom} {person.nom}
              </p>
              {person.email && (
                <div className="flex items-center justify-center gap-0.5 text-[8px]">
                  <Mail className="h-1.5 w-1.5 text-gray-600" />
                  <span
                    className="text-[7px] text-gray-600 break-all leading-tight"
                    style={{
                      backgroundColor: "transparent",
                      wordBreak: "break-all",
                      overflowWrap: "break-word",
                    }}
                  >
                    {person.email}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {children && (
        <>
          {/* <div className="w-px h-2 border-l-2" style={{ borderColor: getConnectorColor() }}></div> */}
          <div className="flex flex-col items-center ">{children}</div>
        </>
      )}
    </div>
  );
};

export default function Organigramme() {
  const [showCofacMembers, setShowCofacMembers] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Grouper les membres COFAC par appartenance
  const groupedMembers = membresCofac.reduce((acc, member) => {
    if (!acc[member.appartenance]) {
      acc[member.appartenance] = [];
    }
    acc[member.appartenance].push(member);
    return acc;
  }, {} as Record<string, CofacMember[]>);

  // Séparer les vice-doyens et les chefs de service
  const viceDoyens = personnelPrincipal.filter((p) =>
    p.responsabilite.includes("Vice Doyen")
  );
  const chefsService = personnelPrincipal.filter((p) =>
    p.responsabilite.includes("Chef de service")
  );
  const autres = personnelPrincipal.filter(
    (p) =>
      !p.responsabilite.includes("Vice Doyen") &&
      !p.responsabilite.includes("Chef de service")
  );

  // Trouver des personnes spécifiques pour la structure hiérarchique
  const doyen = {
    nom: "DOYEN",
    prenom: "",
    responsabilite: "Doyen",
    email: "",
    tel: "",
    id: 0,
  };
  const secretaire = autres.find((p) => p.responsabilite.includes("Sec")) || {
    nom: "SECRÉTAIRE PRINCIPALE",
    prenom: "",
    responsabilite: "Secrétaire Principale",
    email: "",
    tel: "",
    id: 0,
  };
  const viceDoyenFormation = viceDoyens.find((p) =>
    p.responsabilite.includes("formation")
  );
  const viceDoyenRecherche = viceDoyens.find((p) =>
    p.responsabilite.includes("Recherche")
  );
  const viceDoyenNumerique = viceDoyens.find((p) =>
    p.responsabilite.includes("base de données")
  );

  // Services mapping
  const serviceInformatique = chefsService.find((p) =>
    p.responsabilite.includes("Informatique")
  );
  const serviceComptabilite = chefsService.find((p) =>
    p.responsabilite.includes("Comptabilité")
  );
  const servicePersonnel = chefsService.find((p) =>
    p.responsabilite.includes("Personnel")
  );
  const serviceScolarite = chefsService.find((p) =>
    p.responsabilite.includes("Scolarité")
  );
  const serviceAffaires = chefsService.find((p) =>
    p.responsabilite.includes("Affaires")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-x-auto">
      <main className="pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <div className="mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-12 sm:mb-16 overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src="/fs_facade_2.jpg"
                  alt="Histoire de la faculté"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white-900/80 via-gray-800/60"></div>
              </div>
              <div className="relative z-10 text-center py-10 sm:py-16 lg:py-20 px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                  Structure organisationnelle
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed"></p>
              </div>
            </motion.div>

            <div>
              <section
                className="overflow-y-visible"
                style={{
                  overflowX: windowWidth >= 1468 ? "visible" : "auto",
                }}
              >
                <div
                  className="flex flex-col items-center pb-6"
                  style={{
                    minWidth: windowWidth >= 1468 ? "1200px" : "1400px",
                  }}
                >
                  {/* COFAC */}
                  <HierarchyNode title="COFAC" level={0}>
                    {/* ===== Ligne verticale depuis COFAC ===== */}
                    <div className="w-px h-6 bg-gray-400"></div>

                    {/* Level 1: Conseil Scientifique - Doyen - Collège des Enseignants */}
                    {/* Ligne horizontale centrée */}
                    <div className="flex justify-center items-start relative w-324 gap-2">
                      <div className="absolute top-0 left-2 right-3 h-px bg-gray-400" />

                      {/* Conseil Scientifique Branch */}
                      <div className="flex flex-col items-center">
                        <div className="w-px h-6 bg-gray-400"></div>
                        <HierarchyNode title="CONSEIL SCIENTIFIQUE" level={1}>
                          <div className="w-px h-6 bg-gray-400"></div>

                          <HierarchyNode title="MENTION" level={2}>
                            <div className="w-px h-6 bg-gray-400"></div>

                            <HierarchyNode title="PARCOURS" level={3}>
                              <div className="w-px h-6 bg-gray-400"></div>

                              <HierarchyNode title="LABO" level={4} />
                            </HierarchyNode>
                          </HierarchyNode>
                        </HierarchyNode>
                      </div>

                      {/* ===== DOYEN ===== */}
                      <div className="flex flex-col items-center ">
                        <div className="w-px h-6 bg-gray-400"></div>
                        <HierarchyNode title="DOYEN" level={1} person={doyen} />
                        <div className="w-px h-6 bg-gray-400"></div>

                        {/* ===== Ligne horizontale depuis DOYEN ===== */}
                        <div className="relative w-full flex justify-center items-start gap-1">
                          <div className="absolute top-0 left-80 right-15 h-px bg-gray-400"></div>

                          {/* Secrétaire + Services */}
                          <div className="flex flex-col items-center">
                            <div className="w-px h-6 bg-gray-400"></div>
                            <HierarchyNode
                              title="SECRÉTAIRE PRINCIPALE"
                              level={2}
                              person={secretaire}
                            />
                            <div className="w-px h-10 bg-gray-400"></div>

                            {/* ===== Ligne horizontale depuis SECRÉTAIRE ===== */}
                            <div className="relative w-full flex justify-center items-start gap-2">
                              <div className="absolute top-0 left-15 right-15 h-px bg-gray-400"></div>

                              {serviceInformatique && (
                                <div className="flex flex-col items-center">
                                  <div className="w-px h-6 bg-gray-400"></div>
                                  <HierarchyNode
                                    title="SERVICE INFORMATIQUE"
                                    level={3}
                                    person={serviceInformatique}
                                  />
                                </div>
                              )}
                              {serviceComptabilite && (
                                <div className="flex flex-col items-center">
                                  <div className="w-px h-6 bg-gray-400"></div>
                                  <HierarchyNode
                                    title="SERVICE COMPTABILITÉ"
                                    level={3}
                                    person={serviceComptabilite}
                                  />
                                </div>
                              )}
                              {servicePersonnel && (
                                <div className="flex flex-col items-center">
                                  <div className="w-px h-6 bg-gray-400"></div>
                                  <HierarchyNode
                                    title="SERVICE PERSONNEL"
                                    level={3}
                                    person={servicePersonnel}
                                  />
                                </div>
                              )}
                              {serviceScolarite && (
                                <div className="flex flex-col items-center">
                                  <div className="w-px h-6 bg-gray-400"></div>
                                  <HierarchyNode
                                    title="SERVICE SCOLARITÉ"
                                    level={3}
                                    person={serviceScolarite}
                                  />
                                </div>
                              )}
                              {serviceAffaires && (
                                <div className="flex flex-col items-center">
                                  <div className="w-px h-6 bg-gray-400"></div>
                                  <HierarchyNode
                                    title="SERVICE DES AFFAIRES ÉTRANGÈRES"
                                    level={3}
                                    person={serviceAffaires}
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* DICOS - rapproché de la Secrétaire */}
                          <div className="flex flex-col items-center">
                            <div className="w-px h-6 bg-gray-400"></div>
                            <HierarchyNode title="DICOS" level={2} />
                          </div>

                          {/* Vice-Doyens */}
                          {viceDoyenFormation && (
                            <div className="flex flex-col items-center">
                              <div className="w-px h-6 bg-gray-400"></div>
                              <HierarchyNode
                                title="VICE DOYEN FORMATION"
                                level={2}
                                person={viceDoyenFormation}
                              >
                                <div className="w-px h-10 bg-gray-400"></div>
                                <HierarchyNode
                                  title="ASSOCIATION DES ÉTUDIANTS"
                                  level={3}
                                />
                              </HierarchyNode>
                            </div>
                          )}
                          {viceDoyenNumerique && (
                            <div className="flex flex-col items-center">
                              <div className="w-px h-6 bg-gray-400"></div>
                              <HierarchyNode
                                title="VICE DOYEN NUMÉRIQUE"
                                level={2}
                                person={viceDoyenNumerique}
                              />
                            </div>
                          )}
                          {viceDoyenRecherche && (
                            <div className="flex flex-col items-center">
                              <div className="w-px h-6 bg-gray-400"></div>
                              <HierarchyNode
                                title="VICE DOYEN RECHERCHE"
                                level={2}
                                person={viceDoyenRecherche}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Collège des Enseignants Branch */}
                      <div className="flex flex-col items-center">
                        <div className="w-px h-6 bg-gray-400"></div>
                        <HierarchyNode
                          title="COLLÈGE DES ENSEIGNANTS"
                          level={1}
                        />
                      </div>
                    </div>
                  </HierarchyNode>
                </div>
              </section>

              {/* Membres COFAC */}
              <section className="mt-9">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">
                    Membres du COFAC
                  </h2>
                  <Button
                    onClick={() => setShowCofacMembers(!showCofacMembers)}
                    variant="outline"
                    className="gap-2"
                  >
                    {showCofacMembers ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Masquer les membres
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Afficher les membres ({membresCofac.length})
                      </>
                    )}
                  </Button>
                </div>

                {showCofacMembers && (
                  <div className="space-y-12">
                    {Object.entries(groupedMembers).map(
                      ([appartenance, members]) => (
                        <div key={appartenance}>
                          <h3 className="text-xl font-semibold mb-6 text-center text-white bg-primary py-3">
                            {appartenance} ({members.length})
                          </h3>

                          {/* Blue background container matching reference image */}
                          <div className="p-8 md:p-12">
                            {/* Responsive grid that adapts to member count */}
                            <div
                              className={`grid gap-8 justify-items-center ${
                                members.length <= 2
                                  ? "grid-cols-1 md:grid-cols-2"
                                  : members.length <= 3
                                  ? "grid-cols-1 md:grid-cols-3"
                                  : members.length <= 4
                                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                                  : members.length <= 6
                                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                              }`}
                            >
                              {members.map((member) => (
                                <CofacMemberCard
                                  key={member.num}
                                  member={member}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
