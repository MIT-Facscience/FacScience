import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Lightbulb, Users, Globe, Award, BookOpen, Microscope, Heart, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function VisionPage() {
  const objectives = [
    {
      title: "Excellence Académique",
      description: "Maintenir et améliorer la qualité de nos programmes d'enseignement pour former des diplômés compétents et innovants.",
      icon: <Award className="h-6 w-6" />,
      color: "bg-purple-600",
      targets: ["Accréditation internationale", "Programmes modernisés", "Évaluation continue"]
    },
    {
      title: "Recherche de Pointe",
      description: "Développer une recherche scientifique de haut niveau qui contribue à l'avancement des connaissances et au développement durable.",
      icon: <Microscope className="h-6 w-6" />,
      color: "bg-amber-600",
      targets: ["Publications internationales", "Projets collaboratifs", "Innovation technologique"]
    },
    {
      title: "Partenariats Stratégiques",
      description: "Établir et renforcer les collaborations avec les universités, entreprises et institutions de recherche nationales et internationales.",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-purple-500",
      targets: ["Échanges étudiants", "Projets conjoints", "Mobilité enseignante"]
    },
    {
      title: "Formation Continue",
      description: "Offrir des programmes de formation continue et de perfectionnement professionnel pour répondre aux besoins du marché du travail.",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-amber-500",
      targets: ["Certifications professionnelles", "Formations courtes", "E-learning"]
    },
    {
      title: "Inclusion et Diversité",
      description: "Promouvoir l'égalité des chances et l'inclusion de tous les étudiants, indépendamment de leur origine sociale ou géographique.",
      icon: <Heart className="h-6 w-6" />,
      color: "bg-purple-700",
      targets: ["Bourses d'études", "Programmes d'accompagnement", "Accessibilité"]
    },
    {
      title: "Innovation Pédagogique",
      description: "Intégrer les nouvelles technologies et méthodes pédagogiques pour améliorer l'expérience d'apprentissage des étudiants.",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-amber-700",
      targets: ["Plateformes numériques", "Pédagogie active", "Laboratoires virtuels"]
    }
  ]

  const visionPoints = [
    {
      title: "Centre d'Excellence Régional",
      description: "Devenir la référence en matière d'enseignement supérieur scientifique dans l'Océan Indien",
      icon: <Target className="h-8 w-8" />
    },
    {
      title: "Innovation et Recherche",
      description: "Être reconnu pour nos contributions à l'innovation scientifique et technologique",
      icon: <Lightbulb className="h-8 w-8" />
    },
    {
      title: "Impact Sociétal",
      description: "Contribuer significativement au développement socio-économique de Madagascar",
      icon: <Users className="h-8 w-8" />
    },
    {
      title: "Rayonnement International",
      description: "Établir notre réputation sur la scène scientifique internationale",
      icon: <Globe className="h-8 w-8" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-amber-50/20">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Header avec image de fond */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-16 rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0">
                <img 
                  src="/entree.png" 
                  alt="Vision et objectifs" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-amber-900/40"></div>
              </div>
              <div className="relative z-10 text-center py-20 px-6">
                <h1 className="text-5xl font-bold mb-6 text-white">
                  Vision & Objectifs
                </h1>
                <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                  Notre vision d'avenir et les objectifs stratégiques qui guident notre développement
                </p>
              </div>
            </motion.div>

            {/* Vision principale */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-300 to-purple-500 text-white overflow-hidden">
                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-amber-400 rounded-full">
                      <Eye className="h-12 w-12 text-purple-800" />
                    </div>
                  </div>
                  <CardTitle className="text-4xl mb-6">Notre Vision 2030</CardTitle>
                  <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
                    Devenir un centre d'excellence reconnu internationalement pour l'enseignement supérieur et la recherche 
                    scientifique, tout en étant un acteur clé du développement socio-économique de Madagascar et de la région 
                    de l'Océan Indien.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visionPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                      >
                        <div className="flex justify-center mb-4">
                          <div className="p-3 bg-amber-400 rounded-full text-purple-800">
                            {point.icon}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-amber-100">{point.title}</h3>
                        <p className="text-sm text-purple-100 leading-relaxed">{point.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Objectifs stratégiques */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold text-center mb-4 text-purple-800">
                Objectifs Stratégiques
              </h2>
              <p className="text-xl text-center text-black-600 mb-12 max-w-3xl mx-auto">
                Six axes prioritaires pour concrétiser notre vision et assurer notre développement durable
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {objectives.map((objective, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm h-full">
                      <CardHeader>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`p-3 ${objective.color} rounded-xl text-white`}>
                            {objective.icon}
                          </div>
                          <CardTitle className="text-xl text-black-800">{objective.title}</CardTitle>
                        </div>
                        <p className="text-black-600 leading-relaxed">{objective.description}</p>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-semibold text-black-700 mb-3">Cibles prioritaires :</h4>
                        <div className="space-y-2">
                          {objective.targets.map((target, targetIndex) => (
                            <div key={targetIndex} className="flex items-center space-x-2">
                              <div className={`w-2 h-2 ${objective.color} rounded-full`}></div>
                              <span className="text-sm text-black-600">{target}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Indicateurs de performance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="mb-16"
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-amber-100/50">
                <CardHeader>
                  <CardTitle className="text-3xl text-center text-amber-800 mb-6">
                    Indicateurs de Performance 2025-2030
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-white/80 rounded-2xl shadow-md">
                      <div className="text-3xl font-bold text-purple-800 mb-2">95%</div>
                      <div className="text-sm text-purple-600 font-medium">Taux d'employabilité des diplômés</div>
                    </div>
                    <div className="text-center p-6 bg-white/80 rounded-2xl shadow-md">
                      <div className="text-3xl font-bold text-amber-800 mb-2">50+</div>
                      <div className="text-sm text-amber-600 font-medium">Publications internationales/an</div>
                    </div>
                    <div className="text-center p-6 bg-white/80 rounded-2xl shadow-md">
                      <div className="text-3xl font-bold text-purple-800 mb-2">20+</div>
                      <div className="text-sm text-purple-600 font-medium">Partenariats internationaux</div>
                    </div>
                    <div className="text-center p-6 bg-white/80 rounded-2xl shadow-md">
                      <div className="text-3xl font-bold text-amber-800 mb-2">100%</div>
                      <div className="text-sm text-amber-600 font-medium">Programmes accrédités</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plan d'action */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                <CardHeader>
                  <CardTitle className="text-3xl text-center mb-6">Plan d'Action 2025-2030</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-purple-800">1</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-amber-100">Phase 1 (2025-2026)</h3>
                      <p className="text-purple-100 text-sm leading-relaxed">
                        Modernisation des infrastructures, révision des programmes et renforcement des partenariats régionaux.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-purple-800">2</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-amber-100">Phase 2 (2027-2028)</h3>
                      <p className="text-purple-100 text-sm leading-relaxed">
                        Développement de la recherche, accréditations internationales et expansion des programmes de formation continue.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-purple-800">3</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-amber-100">Phase 3 (2029-2030)</h3>
                      <p className="text-purple-100 text-sm leading-relaxed">
                        Consolidation de la position de leader régional et évaluation des objectifs stratégiques atteints.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  )
}

