import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Atom,
  Calculator,
  Dna,
  FlaskConical,
  Laptop,
  Users,
} from "lucide-react";
export default function AllMention() {
  const mentions = [
    {
      id: "mathematiques",
      name: "Mathématiques",
      icon: <Calculator className="h-8 w-8" />,
      color: "bg-blue-500",
      description: "Formation rigoureuse en mathématiques pures et appliquées",
      niveaux: ["L1", "L2", "L3", "M1", "M2"],
      specialisations: [
        "Mathématiques Pures",
        "Mathématiques Appliquées",
        "Statistiques et Probabilités",
      ],
      debouches: [
        "Enseignement secondaire et supérieur",
        "Recherche académique",
        "Analyse financière et actuariat",
        "Data Science et statistiques",
      ],
    },
    {
      id: "physique",
      name: "Physique",
      icon: <Atom className="h-8 w-8" />,
      color: "bg-purple-500",
      description: "Exploration des lois fondamentales de l'univers",
      niveaux: ["L1", "L2", "L3", "M1", "M2"],
      specialisations: [
        "Physique Fondamentale",
        "Physique des Matériaux",
        "Astrophysique",
      ],
      debouches: [
        "Recherche en physique",
        "Ingénierie technologique",
        "Enseignement",
        "Industrie aérospatiale",
      ],
    },
    {
      id: "chimie",
      name: "Chimie",
      icon: <FlaskConical className="h-8 w-8" />,
      color: "bg-green-500",
      description: "Science de la matière et de ses transformations",
      niveaux: ["L1", "L2", "L3", "M1", "M2"],
      specialisations: [
        "Chimie Organique",
        "Chimie Inorganique",
        "Chimie Analytique",
      ],
      debouches: [
        "Industrie pharmaceutique",
        "Recherche et développement",
        "Contrôle qualité",
        "Enseignement",
      ],
    },
    {
      id: "biologie",
      name: "Biologie",
      icon: <Dna className="h-8 w-8" />,
      color: "bg-emerald-500",
      description: "Étude du vivant sous toutes ses formes",
      niveaux: ["L1", "L2", "L3", "M1", "M2"],
      specialisations: ["Biologie Moléculaire", "Écologie", "Biotechnologies"],
      debouches: [
        "Recherche biomédicale",
        "Conservation environnementale",
        "Biotechnologies",
        "Enseignement",
      ],
    },
    {
      id: "informatique",
      name: "Informatique",
      icon: <Laptop className="h-8 w-8" />,
      color: "bg-indigo-500",
      description: "Sciences et technologies de l'information",
      niveaux: ["L1", "L2", "L3", "M1", "M2"],
      specialisations: [
        "Génie Logiciel",
        "Intelligence Artificielle",
        "Réseaux et Systèmes",
      ],
      debouches: [
        "Développement logiciel",
        "Administration systèmes",
        "Intelligence artificielle",
        "Cybersécurité",
      ],
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-white-900/80 via-gray-800/60"></div>
                </div>
                <div className="relative z-10 text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                    Nos Formations
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                    Découvrez nos mentions et parcours d'excellence scientifique
                  </p>
                </div>
              </motion.div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-600">
                Nos Mentions Disponibles
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {mentions.map((mention, index) => (
                  <Card
                    key={mention.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-purple-400 animate-scale-in border-0 shadow-card `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 ${mention.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
                      >
                        {mention.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">
                        {mention.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {mention.description}
                      </p>
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span>
                          {mention.niveaux.length} niveaux disponibles
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
