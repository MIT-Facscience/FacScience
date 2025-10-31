import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BACKEND_URL } from "@/lib/api";
import type { Laboratoires } from "@/lib/types";
import {
  Beaker,
  Calculator,
  ChevronDown,
  ChevronUp,
  Cpu,
  Mail,
  MapPin,
  Microscope,
  Mountain,
  Phone,
  TestTube,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

export default function LaboratoiresPage() {
  const {t} = useTranslation("recherche");
  const [isLoading, setLoading] = useState(true);
  const [expandedLab, setExpandedLab] = useState<number | null>(null);
  const [labos, setLabos] = useState<Laboratoires[]>([]);
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/Laboratoire`)
      .then((response) => response.json())
      .then((data) => {
        setLabos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des mentions :", error);
        setLoading(false);
      });
  }, []);

  // Données statiques pour les laboratoires (à remplacer par les vraies données)
  const laboratoireStatique = [
    {
      nom: "Laboratoire de Mathématiques et Applications",
      code: "LMA",
      directeur: "Prof. RAKOTO Jean Claude",
      email: "lma@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 45",
      localisation: "Bâtiment A, 2ème étage",
      personnel: 12,
      doctorants: 8,
      icon: Calculator,
      accentColor: "from-purple-500 to-amber-600",
      borderColor: "border-blue-200",
      bgGradient: "from-blue-50 to-indigo-50",
      imageUrl:
        // "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
        "/fs_labo_1.jpg",
      specialites: [
        "Analyse fonctionnelle",
        "Algèbre commutative",
        "Géométrie différentielle",
        "Statistiques appliquées",
      ],
      equipements: [
        "Serveurs de calcul",
        "Logiciels spécialisés",
        "Bibliothèque mathématique",
      ],
      projets: [
        "Modélisation mathématique des écosystèmes malgaches",
        "Optimisation des réseaux de transport urbain",
        "Analyse statistique des données climatiques",
      ],
    },
    {
      nom: "Laboratoire de Physique des Matériaux",
      code: "LPM",
      directeur: "Prof. ANDRY Marie Jeanne",
      email: "lpm@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 46",
      localisation: "Bâtiment B, 1er étage",
      personnel: 10,
      doctorants: 6,
      icon: Beaker,
      accentColor: "from-yellow-500 to-amber-600",
      borderColor: "border-emerald-200",
      bgGradient: "from-emerald-50 to-teal-50",
      imageUrl:
        // "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop",
        "/fs_labo_2.jpg",
      specialites: [
        "Nanomatériaux",
        "Cristallographie",
        "Optique quantique",
        "Physique des semi-conducteurs",
      ],
      equipements: [
        "Microscope électronique",
        "Diffractomètre X",
        "Spectromètre Raman",
        "Four haute température",
      ],
      projets: [
        "Synthèse de nanomatériaux pour l'énergie solaire",
        "Caractérisation de minéraux malgaches",
        "Développement de capteurs optiques",
      ],
    },
    {
      nom: "Laboratoire de Chimie Organique et Naturelle",
      code: "LCON",
      directeur: "Dr. RABE Paul Henri",
      email: "lcon@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 47",
      localisation: "Bâtiment C, Rez-de-chaussée",
      personnel: 8,
      doctorants: 5,
      icon: TestTube,
      accentColor: "from-purple-500 to-amber-600",
      borderColor: "border-purple-200",
      bgGradient: "from-purple-50 to-violet-50",
      imageUrl:
        // "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=400&fit=crop",
        "/fs_labo_1.jpg",
      specialites: [
        "Synthèse organique",
        "Produits naturels",
        "Catalyse",
        "Chimie médicinale",
      ],
      equipements: [
        "RMN 400 MHz",
        "Chromatographe HPLC",
        "Spectromètre de masse",
        "Réacteurs sous pression",
      ],
      projets: [
        "Valorisation des plantes médicinales malgaches",
        "Synthèse de nouveaux catalyseurs",
        "Développement de médicaments naturels",
      ],
    },
    {
      nom: "Laboratoire de Biologie Moléculaire et Cellulaire",
      code: "LBMC",
      directeur: "Prof. HERY Sophie Claudine",
      email: "lbmc@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 48",
      localisation: "Bâtiment D, 1er étage",
      personnel: 15,
      doctorants: 10,
      icon: Microscope,
      accentColor: "from-yellow-500 to-amber-600",
      borderColor: "border-rose-200",
      bgGradient: "from-rose-50 to-pink-50",
      imageUrl:
        // "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
        "/fs_labo_3.jpg",
      specialites: [
        "Génétique moléculaire",
        "Biotechnologie",
        "Microbiologie",
        "Biologie cellulaire",
      ],
      equipements: [
        "Séquenceur ADN",
        "PCR temps réel",
        "Microscope confocal",
        "Fermenteurs",
      ],
      projets: [
        "Génomique de la biodiversité malgache",
        "Biotechnologie microbienne",
        "Thérapie génique des maladies tropicales",
      ],
    },
    {
      nom: "Laboratoire de Géosciences",
      code: "LGS",
      directeur: "Dr. SOLO Michel André",
      email: "lgs@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 49",
      localisation: "Bâtiment E, Rez-de-chaussée",
      personnel: 9,
      doctorants: 4,
      icon: Mountain,
      accentColor: "from-purple-500 to-amber-600",
      borderColor: "border-amber-200",
      bgGradient: "from-cyan-50 to-blue-50",
      imageUrl:
        // "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop",
        "/fs_labo_2.jpg",
      specialites: [
        "Géologie structurale",
        "Minéralogie",
        "Paléontologie",
        "Hydrogéologie",
      ],
      equipements: [
        "Microscope pétrographique",
        "Analyseur XRF",
        "Sismographe",
        "Foreuse portable",
      ],
      projets: [
        "Cartographie géologique de Madagascar",
        "Ressources minérales et énergétiques",
        "Paléontologie des vertébrés fossiles",
      ],
    },
    {
      nom: "Laboratoire d'Informatique et Systèmes",
      code: "LIS",
      directeur: "Prof. NIVO Clara Hanta",
      email: "lis@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 50",
      localisation: "Bâtiment F, 2ème étage",
      personnel: 11,
      doctorants: 7,
      icon: Cpu,
      accentColor: "from-yellow-100 to-amber-400",
      borderColor: "border-cyan-200",
      bgGradient: "from-cyan-50 to-blue-50",
      imageUrl:
        // "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
        "/fs_labo_1.jpg",
      specialites: [
        "Intelligence artificielle",
        "Réseaux et sécurité",
        "Développement logiciel",
        "Systèmes embarqués",
      ],
      equipements: [
        "Cluster de calcul",
        "Serveurs haute performance",
        "Équipements réseau",
        "Cartes de développement",
      ],
      projets: [
        "IA pour l'agriculture de précision",
        "Systèmes d'information géographique",
        "Cybersécurité des infrastructures critiques",
      ],
    },
  ];

  // Calcul de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Utiliser les données de l'API si disponibles, sinon les données statiques
  const laboratoiresToUse = labos.length > 0 ? labos : laboratoireStatique;
  const currentLabs = laboratoiresToUse.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(laboratoiresToUse.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Calcul des totaux
  const totalPersonnel = laboratoiresToUse.reduce(
    (sum, lab) => sum + ("personnel" in lab ? lab.personnel : laboratoireStatique[0].personnel),
    0
  );
  const totalDoctorants = laboratoiresToUse.reduce(
    (sum, lab) => sum + ("doctorants" in lab ? lab.doctorants : laboratoireStatique[0].doctorants),
    0
  );
  const totalProjets = laboratoiresToUse.reduce(
    (sum, lab) =>
      sum +
      ("projets" in lab && Array.isArray(lab.projets)
        ? lab.projets.length
        : laboratoireStatique[0].projets.length),
    0
  );

  const toggleExpand = useCallback((index: number) => {
    setExpandedLab((prevExpanded) => {
      if (prevExpanded === index) {
        return null;
      }
      return index;
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4"> { t("common.loading")}</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {/* Laboratoires d'Excellence */}
            { t("labo.title")}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {laboratoiresToUse.length} { t("labo.description")}
            </p>
          </div>
        </div>

        {/* Statistiques */}
     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
     {[
       {
         value: laboratoiresToUse.length,
         label: t("labo.stats.laboratories"),  // "Laboratoires"
         color: "from-blue-500 to-indigo-600",
       },
       {
         value: totalPersonnel,
         label: t("labo.stats.researchers"),   // "Chercheurs"
         color: "from-emerald-500 to-teal-600",
       },
       {
         value: totalDoctorants,
         label: t("labo.stats.phdStudents"),   // "Doctorants"
         color: "from-purple-500 to-violet-600",
       },
       {
         value: totalProjets,
         label: t("labo.stats.projects"),      // "Projets"
         color: "from-rose-500 to-pink-600",
       },
     ].map((stat, index) => (
       <div key={index} className="relative group">
         <div
           className="absolute inset-0 bg-black opacity-10 transform rotate-6 group-hover:rotate-12 transition-transform duration-300"
           style={{
             backgroundImage: `linear-gradient(to right, ${
               stat.color.split(" ")[1]
             }, ${stat.color.split(" ")[3]})`,
           }}
         ></div>
         <div className="relative bg-white p-8 shadow-lg border border-gray-100 text-center group-hover:shadow-xl transition-all duration-300">
           <div
             className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
           >
             <CountUp end={stat.value} duration={4} delay={1} />
           </div>
           <div className="text-gray-600 font-medium">{stat.label}</div>
         </div>
       </div>
     ))}
   </div>

        {/* Laboratoires Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
          {currentLabs.map((lab, index) => {
            const realIndex = indexOfFirstItem + index;
            const staticData = laboratoireStatique[index % laboratoireStatique.length];
            const IconComponent = staticData.icon;
            const isExpanded = expandedLab === realIndex;

            return (
              <Card
                key={realIndex}
                className="group hover:shadow-2xl transition-all rounded-none duration-500 transform hover:-translate-y-2 overflow-hidden bg-white border-0 shadow-lg"
              >
                {/* Header avec image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={staticData.imageUrl}
                    alt={ "nomLabo" in lab ? lab.nomLabo:laboratoireStatique[0].nom || staticData.nom}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${staticData.bgGradient} opacity-50`}
                  ></div>

                  {/* Code badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`px-4 py-2 rounded-full text-white font-bold text-lg shadow-lg bg-gradient-to-r ${staticData.accentColor}`}
                    >
                      {"abbreviation" in lab? lab.abbreviation:laboratoireStatique[0].code || staticData.code}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-r ${staticData.accentColor}`}
                    >
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {'nomLabo' in lab ? lab.nomLabo : staticData.nom}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    <span className="font-semibold">{"respoLabo" in lab ? lab.respoLabo:staticData.directeur || staticData.directeur}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Contact compact */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>{("personnel" in lab ?lab.personnel:staticData.personnel || staticData.personnel) + ("doctorants" in lab ?lab.doctorants:staticData.personnel || staticData.doctorants)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="truncate">{ "localisation" in lab ? lab.localisation:staticData.localisation || staticData.localisation}</span>
                    </div>
                  </div>

                  {/* Spécialités */}
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {staticData.specialites.slice(0, 2).map((spec, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs px-2 py-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                        >
                          {spec}
                        </Badge>
                      ))}
                      {staticData.specialites.length > 2 && (
                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-1 border-gray-200 text-gray-500"
                        >
                          +{staticData.specialites.length - 2} {t("labo.others")}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Détails étendus */}
                  {isExpanded && (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                      {/* Contact complet */}
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{"email"in lab ? lab.email:staticData.personnel || staticData.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{"telephone"in lab ? lab.telephone:staticData.telephone || staticData.telephone}</span>
                        </div>
                      </div>

                      {/* Personnel détaillé */}
                      <div className="flex gap-6 justify-center bg-gray-50 p-4 rounded-lg">
                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold bg-gradient-to-r ${staticData.accentColor} bg-clip-text text-transparent`}
                          >
                            {"personnel" in lab ? lab.personnel:staticData.personnel || staticData.personnel}
                          </div>
                          <div className="text-xs text-gray-600">{t("labo.researchersLabel")}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {"doctorants"in lab ? lab.doctorants:staticData.doctorants || staticData.doctorants}
                          </div>
                          <div className="text-xs text-gray-600">{t("labo.phdLabel")}</div>
                        </div>
                      </div>

                      {/* Spécialités complètes */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                          {/* Expertise complète */}
                          {t("labo.expertiseFull")}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {staticData.specialites.map((spec, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs px-2 py-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Équipements */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                        {t("labo.equipment")}
                        </h4>
                        <div className="space-y-1">
                          {staticData.equipements.map((equip, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 text-sm text-gray-600"
                            >
                              <div
                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${staticData.accentColor}`}
                              ></div>
                              <span>{equip}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Projets */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                        {t("labo.ongoingProjects")}
                        </h4>
                        <div className="space-y-2">
                          {staticData.projets.map((projet, i) => (
                            <div
                              key={i}
                              className="p-2 bg-gray-50 rounded text-sm text-gray-700 border-l-4 border-l-purple-400"
                            >
                              {projet}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bouton voir plus/moins */}
                  <Button
                    onClick={() => toggleExpand(realIndex)}
                    variant="ghost"
                    className={`w-full mt-4 transition-all rounded-none duration-300 ${
                      isExpanded
                        ? "bg-amber-50 hover:bg-amber-100 text-amber-700"
                        : "bg-purple-50 hover:bg-purple-100 text-purple-700"
                    }`}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        {t("labo.lessDetails")}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        {t("labo.moreDetails")}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Navigation de pagination */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-wrap gap-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            <Button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-8 py-3 font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←{t("labo.previous")}
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className={`px-4 py-2 font-semibold rounded-xl transition-all duration-300 ${
                    currentPage === i + 1
                      ? "bg-purple-600 text-white"
                      : "border-2 border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white"
                  }`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-8 py-3 font-semibold border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              variant="outline"
            >
             {t("labo.next")} →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}