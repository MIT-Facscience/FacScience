import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Award, BookOpen, Microscope, Globe } from "lucide-react"
import { motion } from "framer-motion"

export default function HistoirePage() {
  const timelineEvents = [
    {
      year: "1961",
      title: "Fondation de la Faculté",
      description: "Création de la Faculté des Sciences de l'Université d'Antananarivo, première institution d'enseignement supérieur scientifique de Madagascar.",
      icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "bg-primary"
    },
    {
      year: "1975",
      title: "Expansion des Départements",
      description: "Création des départements de Physique, Chimie et Biologie pour répondre aux besoins croissants du pays en formation scientifique.",
      icon: <Microscope className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "bg-amber-500"
    },
    {
      year: "1990",
      title: "Modernisation des Laboratoires",
      description: "Mise en place de laboratoires modernes et acquisition d'équipements de pointe pour la recherche et l'enseignement.",
      icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "bg-primary"
    },
    {
      year: "2005",
      title: "Partenariats Internationaux",
      description: "Développement de collaborations avec des universités européennes et africaines, programmes d'échange étudiants et enseignants.",
      icon: <Globe className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "bg-amber-600"
    },
    {
      year: "2015",
      title: "Campus Numérique",
      description: "Lancement du projet de digitalisation avec l'introduction de plateformes d'apprentissage en ligne et de laboratoires virtuels.",
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "bg-primary"
    },
    {
      year: "2023",
      title: "Excellence Reconnue",
      description: "Reconnaissance internationale de nos programmes de recherche et obtention de certifications qualité pour nos formations.",
      icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "bg-amber-500"
    }
  ]

  const stats = [
    { number: "60+", label: "Années d'excellence", icon: <Calendar className="h-5 w-5 sm:h-6 sm:w-6" /> },
    { number: "5000+", label: "Diplômés", icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" /> },
    { number: "6", label: "Départements", icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" /> },
    { number: "50+", label: "Enseignants-chercheurs", icon: <Microscope className="h-5 w-5 sm:h-6 sm:w-6" /> }
  ]

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto">
            
            {/* Header avec image de fond - Responsive */}
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
                  Notre Histoire
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                  Plus de 60 ans d'excellence académique et de contribution au développement scientifique de Madagascar
                </p>
              </div>
            </motion.div>

            {/* Statistiques - Responsive Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
            >
              {stats.map((stat, index) => (
                <Card key={index} className="rounded-none text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-border/90 to-primary text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Mission et Vision - Responsive Stack */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16"
            >
              <Card className="rounded-none border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl text-gray-800 flex items-center space-x-3">
                    <div className="p-2 bg-primary/90 text-white ">
                      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span>Notre Mission</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Former des scientifiques de haut niveau capables de contribuer au développement durable de Madagascar 
                    et de la région de l'Océan Indien à travers l'excellence académique et la recherche innovante.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Nous nous engageons à fournir une éducation scientifique de qualité internationale tout en préservant 
                    nos valeurs culturelles et en répondant aux défis locaux.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-none border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100/50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl text-gray-800 flex items-center space-x-3">
                    <div className="p-2 bg-amber-600 text-white">
                      <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span>Notre Vision</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Devenir un centre d'excellence reconnu internationalement pour l'enseignement supérieur et la recherche 
                    scientifique, tout en étant un acteur clé du développement socio-économique de Madagascar.
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Nous aspirons à être une référence dans la formation de scientifiques engagés et innovants, 
                    capables de relever les défis du 21ème siècle.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Timeline - Responsive Design */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
                Chronologie de notre développement
              </h2>
              
              {/* Desktop Timeline */}
              <div className="relative hidden lg:block">
                {/* Ligne centrale */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-ring via-amber-500 to-border rounded-full"></div>
                
                <div className="space-y-12">
                  {timelineEvents.map((event, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                        <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
                          <CardHeader className="pb-4">
                            <div className="flex items-center space-x-3">
                              <Badge variant="secondary" className={`${event.color} text-white border-0`}>
                                {event.year}
                              </Badge>
                              <CardTitle className="text-lg text-gray-800">{event.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 leading-relaxed">{event.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {/* Point central */}
                      <div className="relative z-10">
                        <div className={`w-12 h-12 ${event.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                          {event.icon}
                        </div>
                      </div>
                      
                      <div className="w-1/2"></div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile/Tablet Timeline */}
              <div className="lg:hidden">
                <div className="relative">
                  {/* Ligne verticale à gauche */}
                  <div className="absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-ring via-amber-500 to-border"></div>
                  
                  <div className="space-y-8">
                    {timelineEvents.map((event, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        {/* Point et icône */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 ${event.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                            {event.icon}
                          </div>
                        </div>
                        
                        {/* Contenu */}
                        <div className="flex-1 min-w-0">
                          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                            <CardHeader className="pb-3 sm:pb-4">
                              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <Badge variant="secondary" className={`${event.color} text-white border-0 self-start`}>
                                  {event.year}
                                </Badge>
                                <CardTitle className="text-base sm:text-lg text-gray-800 leading-tight">{event.title}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{event.description}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Valeurs - Responsive Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-purple-100 text-white">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-2xl sm:text-3xl text-center text-gray-500 mb-4 sm:mb-6">Nos Valeurs Fondamentales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Award className="h-6 w-6 sm:h-8 sm:w-8 text-gray-50" />
                      </div>
                      <h3 className="text-lg sm:text-xl text-gray-600 font-semibold mb-2 sm:mb-3">Excellence</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Nous visons l'excellence dans tous nos programmes d'enseignement et de recherche.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-gray-50" />
                      </div>
                      <h3 className="text-lg sm:text-xl text-gray-600 font-semibold mb-2 sm:mb-3">Collaboration</h3>
                      <p className=" text-gray-600 text-sm sm:text-base leading-relaxed">
                        Nous favorisons la collaboration entre étudiants, enseignants et partenaires internationaux.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Microscope className="h-6 w-6 sm:h-8 sm:w-8 text-gray-50" />
                      </div>
                      <h3 className="text-lg sm:text-xl text-gray-600 font-semibold mb-2 sm:mb-3">Innovation</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Nous encourageons l'innovation et la créativité dans la recherche scientifique.
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

