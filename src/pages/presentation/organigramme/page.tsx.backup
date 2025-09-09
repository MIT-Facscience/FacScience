"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Mail, Phone, TreePine } from "lucide-react";
import type React from "react";
import { useState } from "react";

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
  },
  {
    num: 2,
    nomPrenom: "Mr RAKOTOARINIVO Mijoro",
    appartenance: "Responsable Mention",
    email: "rakotoarinivo@outlook.com",
  },
  {
    num: 3,
    nomPrenom: "Mr RANDRIAMAMPIANINA Lovarintsoa Judicaël",
    appartenance: "Responsable Mention",
    email: "bouba.lova@gmail.com",
  },
  {
    num: 4,
    nomPrenom: "Mr RAKOTONIMANANA Rivoniaina Michel Jese",
    appartenance: "Responsable Mention",
    email: "jmrivo@gmail.com",
  },
  {
    num: 5,
    nomPrenom: "Mr RAZAKARIVONY Andriamarolahy Andrianambinina",
    appartenance: "Responsable Mention",
    email: "andri_razakarivony@yahoo.fr",
  },
  {
    num: 6,
    nomPrenom: "Mr RAKOTONIRINA Jean Claude",
    appartenance: "Responsable Mention",
    email: "jcrakoto25@gmail.com",
  },
  {
    num: 7,
    nomPrenom: "Mr LALAHARISON Hanjarivo",
    appartenance: "Responsable Mention",
    email: "lalaharisonh@gmail.com",
  },
  {
    num: 8,
    nomPrenom: "Mr RANDRIANASOLOHARISOA Dimbimalala",
    appartenance: "Responsable Mention",
    email: "rdimbi@yahoo.fr",
  },
  {
    num: 9,
    nomPrenom: "Mme ANDRIAMAMPIANINA Tianarilalaina Tantely",
    appartenance: "Responsable Mention",
    email: "tantely_lalaina@yahoo.fr",
  },
  {
    num: 10,
    nomPrenom: "Mr ANDRIAMIADAMANANA Mavintana Dangerfield Christian",
    appartenance: "Responsable Mention",
    email: "chriast@yahoo.fr",
  },
  {
    num: 11,
    nomPrenom: "Mme RAKOTOSAMIZANANY Saholy",
    appartenance: "Responsable Mention",
    email: "rakotosa@yahoo.fr",
  },
  {
    num: 12,
    nomPrenom: "Mr Madame RATSOAVINA Fanomezana Mihaja",
    appartenance: "Responsable Mention",
    email: "fanomezanarts@gmail.com",
  },
  {
    num: 13,
    nomPrenom: "Mr ANDRIAMAROZAKANIAINA Tahiry Zaka Filamatra",
    appartenance: "Responsable Mention",
    email: "filamatra@gmail.com",
  },
  {
    num: 14,
    nomPrenom: "Mme RAMIANDRISOA Njararivelo Louisa",
    appartenance: "Responsable Mention",
    email: "lnjara14@gmail.com",
  },
  {
    num: 15,
    nomPrenom: "Mr RABEHARISOA Rija",
    appartenance: "Membre extérieur",
    email: "rijarabeharisoa@gmail.com",
    telephone: "032 05 039 72",
  },
  {
    num: 16,
    nomPrenom: "Mr RASAMOELA Henintsoa",
    appartenance: "Membre extérieur",
    email: "hentsrasamy@gmail.com",
  },
  {
    num: 17,
    nomPrenom: "RANDRIANARIVELO Mamy Fetra",
    appartenance: "Membre extérieur",
    email: "mamyfetra@gmail.com",
    telephone: "034 05 185 08",
  },
  {
    num: 18,
    nomPrenom: "Mr RAKOTONDRAMANGA Maonja Finaritra Sitrakiniavo",
    appartenance: "Représentant Enseignant",
    email: "vivimaonja@yahoo.fr",
  },
  {
    num: 19,
    nomPrenom: "Mme HARIMALALA ANDRIAMBELO Nirina",
    appartenance: "Représentant Enseignant",
    email: "nirina.harimalala@univ-antananarivo.mg",
  },
  {
    num: 20,
    nomPrenom: "Mr FELANA MPANARIVO Michel R.",
    appartenance: "Représentant PAT",
    email: "",
  },
  {
    num: 21,
    nomPrenom: "Mme RANDRIANALISON Onilalaina Ange",
    appartenance: "Représentant PAT",
    email: "",
  },
  {
    num: 22,
    nomPrenom: "ANDRIANOARAMAHERY Hervé",
    appartenance: "Représentant Etudiant",
    email: "herverolinho@gmail.com",
  },
];

/*
// Composant pour une carte de personne
const PersonCard: React.FC<{ person: PersonData; className?: string }> = ({
  person,
  className = "",
}) => (
  <Card
    className={`hover:shadow-lg transition-shadow duration-200 ${className}`}
    style={{ borderRadius: 0 }}
  >
    <CardHeader className="pb-3" style={{ borderRadius: 0 }}>
      <CardTitle
        className="text-lg font-semibold text-balance"
        style={{ borderRadius: 0 }}
      >
        {person.prenom} {person.nom}
      </CardTitle>
      <Badge
        variant="secondary"
        className="w-fit text-xs"
        style={{ borderRadius: 0 }}
      >
        {person.responsabilite}
      </Badge>
    </CardHeader>
    <CardContent className="space-y-2" style={{ borderRadius: 0 }}>
      {person.email && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <a
            href={`mailto:${person.email}`}
            className="hover:text-primary transition-colors"
          >
            {person.email}
          </a>
        </div>
      )}
      {person.tel && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <a
            href={`tel:${person.tel}`}
            className="hover:text-primary transition-colors"
          >
            {person.tel}
          </a>
        </div>
      )}
    </CardContent>
  </Card>
);
*/

// Composant pour les membres COFAC
const CofacMemberCard: React.FC<{ member: CofacMember }> = ({ member }) => {
  const getCardColor = () => {
    switch (member.appartenance) {
      case "Responsable Mention":
        return {
          hoverBg: "#780376",
          textColor: "#780376",
        };
      case "Membre extérieur":
        return {
          hoverBg: "#b45309",
          textColor: "#b45309",
        };
      case "Représentant Enseignant":
        return {
          hoverBg: "#3b82f6",
          textColor: "#3b82f6",
        };
      case "Représentant PAT":
        return {
          hoverBg: "#10b981",
          textColor: "#10b981",
        };
      case "Représentant Etudiant":
        return {
          hoverBg: "#f59e0b",
          textColor: "#f59e0b",
        };
      default:
        return {
          hoverBg: "#6b7280",
          textColor: "#6b7280",
        };
    }
  };

  const cardStyle = getCardColor();

  return (
    <div
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-in fade-in-50 slide-in-from-bottom-4"
      style={{
        border: `2px solid #d1d5db`,
        borderRadius: 0,
        backgroundColor: "#ffffff",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = cardStyle.hoverBg;
        e.currentTarget.style.color = "#ffffff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#ffffff";
        e.currentTarget.style.color = "#000000";
      }}
    >
      <div className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4
              className="font-medium text-sm leading-tight text-balance group-hover:text-white transition-colors duration-300 break-words hyphens-auto"
              style={{ color: "#000000" }}
            >
              {member.nomPrenom}
            </h4>
            <div
              className="text-xs shrink-0 px-2 py-1 group-hover:bg-white group-hover:text-current transition-all duration-300 break-words text-center min-w-0"
              style={{
                border: `1px solid ${cardStyle.textColor}`,
                color: cardStyle.textColor,
                borderRadius: 0,
                wordWrap: "break-word",
                overflowWrap: "break-word",
                hyphens: "auto",
                maxWidth: "120px",
              }}
            >
              {member.appartenance}
            </div>
          </div>
          {member.email && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-white transition-colors duration-300">
              <Mail className="h-3 w-3" />
              <a
                href={`mailto:${member.email}`}
                className="hover:underline transition-all duration-200 truncate"
              >
                {member.email}
              </a>
            </div>
          )}
          {member.telephone && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-white transition-colors duration-300">
              <Phone className="h-3 w-3" />
              <a
                href={`tel:${member.telephone}`}
                className="hover:underline transition-all duration-200"
              >
                {member.telephone}
              </a>
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

  const getConnectorColor = () => {
    switch (level) {
      case 0:
        return "#780376";
      case 1:
        return "#1e293b";
      case 2:
        return "#b45309";
      case 3:
        return "#3b82f6";
      case 4:
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const nodeStyle = getNodeStyle();

  return (
    <div className="flex flex-col items-center">
      <div
        className="shadow-md hover:shadow-lg transition-all duration-200 min-w-[100px] max-w-[140px]"
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
                    className="truncate text-[8px] text-gray-600"
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    {person.email.split("@")[0]}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {children && (
        <>
          <div
            className="w-px h-2 border-l-2"
            style={{ borderColor: getConnectorColor() }}
          ></div>
          <div className="flex flex-col items-center space-y-2">{children}</div>
        </>
      )}
    </div>
  );
};

const HierarchicalListItem: React.FC<{
  title: string;
  level: number;
  person?: PersonData;
  children?: React.ReactNode;
}> = ({ title, level, person, children }) => {
  const getIndentClass = () => {
    switch (level) {
      case 0:
        return "ml-0";
      case 1:
        return "ml-4";
      case 2:
        return "ml-8";
      case 3:
        return "ml-12";
      default:
        return "ml-16";
    }
  };

  const getLevelStyle = () => {
    switch (level) {
      case 0:
        return "text-xl font-bold text-white p-3";
      case 1:
        return "text-lg font-semibold text-white p-2";
      case 2:
        return "text-base font-medium text-white p-2";
      case 3:
        return "text-sm font-medium text-white p-1";
      default:
        return "text-sm text-white p-1";
    }
  };

  const getLevelBackground = () => {
    switch (level) {
      case 0:
        return { backgroundColor: "#780376" }; // violet
      case 1:
        return { backgroundColor: "#1e293b" }; // gris foncé
      case 2:
        return { backgroundColor: "#b45309" }; // dark amber
      case 3:
        return { backgroundColor: "#3b82f6" }; // bleu
      default:
        return { backgroundColor: "#6b7280" }; // gris
    }
  };

  return (
    <div className={`${getIndentClass()} mb-2`}>
      <div
        className={getLevelStyle()}
        style={{
          ...getLevelBackground(),
          borderRadius: 0,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-balance">{title}</span>
          {person && (
            <div className="text-xs opacity-80 ml-2">
              {person.prenom} {person.nom}
            </div>
          )}
        </div>
        {person && person.email && (
          <div className="flex items-center gap-1 text-xs opacity-80 mt-1">
            <Mail className="h-3 w-3" />
            <a
              href={`mailto:${person.email}`}
              className="hover:opacity-100 transition-opacity"
            >
              {person.email}
            </a>
          </div>
        )}
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default function Organigramme() {
  const [showCofacMembers, setShowCofacMembers] = useState(false);
  const [showHierarchy, setShowHierarchy] = useState(true);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
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
                  src="/modern-university-campus-with-science-buildings-an.png"
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

            <div className="container mx-auto px-4 py-12 space-y-16">
              {/* Toggle Hierarchy View */}
              <div className="text-center">
                <Button
                  onClick={() => setShowHierarchy(!showHierarchy)}
                  variant="outline"
                  className="gap-2 mb-8"
                >
                  <TreePine className="h-4 w-4" />
                  {showHierarchy ? "Affichage Liste" : "Affichage Hiérarchique"}
                </Button>
              </div>

              {/* Hierarchical Structure View */}
              {showHierarchy ? (
                <section className="overflow-x-auto">
                  <div className="flex flex-col items-center space-y-2 min-w-[1200px] pb-6">
                    {/* COFAC */}
                    <HierarchyNode title="COFAC" level={0}>
                      {/* Level 1: Conseil Scientifique - Doyen - Collège des Enseignants */}
                      <div className="flex justify-center items-start gap-8">
                        {/* Conseil Scientifique Branch */}
                        <div className="flex flex-col items-center space-y-2">
                          <HierarchyNode title="CONSEIL SCIENTIFIQUE" level={1}>
                            <div className="h-2"></div>
                            <HierarchyNode title="MENTION" level={2}>
                              <HierarchyNode title="PARCOURS" level={3}>
                                <HierarchyNode title="LABO" level={4} />
                              </HierarchyNode>
                            </HierarchyNode>
                          </HierarchyNode>
                        </div>

                        {/* Doyen Branch */}
                        <div className="flex flex-col items-center space-y-2">
                          <HierarchyNode title="DOYEN" level={1} person={doyen}>
                            <div className="h-2"></div>
                            <div className="flex justify-center gap-2">
                              {/* Secrétaire Principale */}
                              <div className="flex flex-col items-center space-y-2">
                                <HierarchyNode
                                  title="SECRÉTAIRE PRINCIPALE"
                                  level={2}
                                  person={secretaire}
                                >
                                  <div className="flex flex-wrap justify-center gap-1">
                                    {serviceInformatique && (
                                      <HierarchyNode
                                        title="SERVICE INFORMATIQUE"
                                        level={3}
                                        person={serviceInformatique}
                                      />
                                    )}
                                    {serviceComptabilite && (
                                      <HierarchyNode
                                        title="SERVICE COMPTABILITÉ"
                                        level={3}
                                        person={serviceComptabilite}
                                      />
                                    )}
                                    {servicePersonnel && (
                                      <HierarchyNode
                                        title="SERVICE PERSONNEL"
                                        level={3}
                                        person={servicePersonnel}
                                      />
                                    )}
                                    {serviceScolarite && (
                                      <HierarchyNode
                                        title="SERVICE SCOLARITÉ"
                                        level={3}
                                        person={serviceScolarite}
                                      />
                                    )}
                                    {serviceAffaires && (
                                      <HierarchyNode
                                        title="SERVICE DES AFFAIRES ÉTRANGÈRES"
                                        level={3}
                                        person={serviceAffaires}
                                      />
                                    )}
                                  </div>
                                </HierarchyNode>
                              </div>

                              {/* DICOS */}
                              <HierarchyNode title="DICOS" level={2} />

                              {/* Vice Doyen Formation with Association des Étudiants */}
                              {viceDoyenFormation && (
                                <div className="flex flex-col items-center space-y-2">
                                  <HierarchyNode
                                    title="VICE DOYEN CHARGÉ DE FORMATION"
                                    level={2}
                                    person={viceDoyenFormation}
                                  >
                                    <HierarchyNode
                                      title="ASSOCIATION DES ÉTUDIANTS"
                                      level={3}
                                    />
                                  </HierarchyNode>
                                </div>
                              )}

                              {/* Vice Doyen Réforme Numérique */}
                              {viceDoyenNumerique && (
                                <HierarchyNode
                                  title="VICE DOYEN CHARGÉ DE RÉFORME NUMÉRIQUE"
                                  level={2}
                                  person={viceDoyenNumerique}
                                />
                              )}

                              {/* Vice Doyen Partenariats */}
                              {viceDoyenRecherche && (
                                <HierarchyNode
                                  title="VICE DOYEN CHARGÉ DES PARTENARIATS"
                                  level={2}
                                  person={viceDoyenRecherche}
                                />
                              )}
                            </div>
                          </HierarchyNode>
                        </div>

                        {/* Collège des Enseignants Branch */}
                        <div className="flex flex-col items-center space-y-2">
                          <HierarchyNode
                            title="COLLÈGE DES ENSEIGNANTS"
                            level={1}
                          />
                        </div>
                      </div>
                    </HierarchyNode>
                  </div>
                </section>
              ) : (
                // Hierarchical List View
                <section>
                  <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
                    Structure Hiérarchique
                  </h2>

                  <div className="max-w-4xl mx-auto space-y-4">
                    <HierarchicalListItem title="COFAC" level={0}>
                      <HierarchicalListItem
                        title="CONSEIL SCIENTIFIQUE"
                        level={1}
                      >
                        <HierarchicalListItem title="MENTION" level={2}>
                          <HierarchicalListItem title="PARCOURS" level={3}>
                            <HierarchicalListItem title="LABO" level={4} />
                          </HierarchicalListItem>
                        </HierarchicalListItem>
                      </HierarchicalListItem>

                      <HierarchicalListItem
                        title="DOYEN"
                        level={1}
                        person={doyen}
                      >
                        <HierarchicalListItem
                          title="SECRÉTAIRE PRINCIPALE"
                          level={2}
                          person={secretaire}
                        >
                          {serviceInformatique && (
                            <HierarchicalListItem
                              title="SERVICE INFORMATIQUE"
                              level={3}
                              person={serviceInformatique}
                            />
                          )}
                          {serviceComptabilite && (
                            <HierarchicalListItem
                              title="SERVICE COMPTABILITÉ"
                              level={3}
                              person={serviceComptabilite}
                            />
                          )}
                          {servicePersonnel && (
                            <HierarchicalListItem
                              title="SERVICE PERSONNEL"
                              level={3}
                              person={servicePersonnel}
                            />
                          )}
                          {serviceScolarite && (
                            <HierarchicalListItem
                              title="SERVICE SCOLARITÉ"
                              level={3}
                              person={serviceScolarite}
                            />
                          )}
                          {serviceAffaires && (
                            <HierarchicalListItem
                              title="SERVICE DES AFFAIRES ÉTRANGÈRES"
                              level={3}
                              person={serviceAffaires}
                            />
                          )}
                        </HierarchicalListItem>

                        <HierarchicalListItem title="DICOS" level={2} />

                        {viceDoyenFormation && (
                          <HierarchicalListItem
                            title="VICE DOYEN CHARGÉ DE FORMATION"
                            level={2}
                            person={viceDoyenFormation}
                          >
                            <HierarchicalListItem
                              title="ASSOCIATION DES ÉTUDIANTS"
                              level={3}
                            />
                          </HierarchicalListItem>
                        )}

                        {viceDoyenNumerique && (
                          <HierarchicalListItem
                            title="VICE DOYEN CHARGÉ DE RÉFORME NUMÉRIQUE"
                            level={2}
                            person={viceDoyenNumerique}
                          />
                        )}

                        {viceDoyenRecherche && (
                          <HierarchicalListItem
                            title="VICE DOYEN CHARGÉ DES PARTENARIATS"
                            level={2}
                            person={viceDoyenRecherche}
                          />
                        )}
                      </HierarchicalListItem>

                      <HierarchicalListItem
                        title="COLLÈGE DES ENSEIGNANTS"
                        level={1}
                      />
                    </HierarchicalListItem>
                  </div>
                </section>
              )}

              {/* Membres COFAC */}
              <section>
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
                          <h3 className="text-xl font-semibold mb-6 text-muted-foreground border-b border-border pb-2">
                            {appartenance} ({members.length})
                          </h3>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {members.map((member) => (
                              <CofacMemberCard
                                key={member.num}
                                member={member}
                              />
                            ))}
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
