import { HeroSection } from "@/components/hero-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { BookOpen, Users, Award, Microscope, Globe, ArrowRight, Calendar, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight,Clock, Bell } from "lucide-react"

export default function HomePage() {
  const departments = [
    { name: "Mathématiques et Informatique", students: "800+", color: "bg-purple-600" },
    { name: "MIT", students: "600+", color: "bg-amber-600" },
    { name: "Physique", students: "400+", color: "bg-purple-500" },
    { name: "Chimie", students: "350+", color: "bg-amber-500" },
    { name: "Biologie", students: "500+", color: "bg-purple-700" },
    { name: "Géologie", students: "300+", color: "bg-amber-700" }
  ]

  const stats = [
    { number: "5000+", label: "Étudiants", icon: <Users className="h-6 w-6" /> },
    { number: "50+", label: "Enseignants-chercheurs", icon: <Award className="h-6 w-6" /> },
    { number: "6", label: "Départements", icon: <BookOpen className="h-6 w-6" /> },
    { number: "20+", label: "Laboratoires", icon: <Microscope className="h-6 w-6" /> }
  ]

  const actualites = [
    {
      title: "Nouvelle collaboration avec l'Université de La Réunion",
      date: "15 Janvier 2025",
      category: "Partenariat",
      description: "Signature d'un accord de coopération pour les échanges étudiants et la recherche collaborative.",
      image: "/journ-e-portes-ouvertes-universit---tudiants.png"
    },
    {
      title: "Inauguration du nouveau laboratoire de biotechnologie",
      date: "10 Janvier 2025",
      category: "Infrastructure",
      description: "Un laboratoire moderne équipé des dernières technologies pour la recherche en biotechnologie.",
      image: "/laboratoire-biotechnologie-moderne--quipements.png"
    },
    {
      title: "Conférence internationale sur les sciences de l'environnement",
      date: "5 Janvier 2025",
      category: "Événement",
      description: "Organisation d'une conférence réunissant des experts internationaux sur les défis environnementaux.",
      image: "/c-r-monie-remise-dipl-mes-universit-.png"
    }
  ]

  const latestNews = [
    {
      id: 1,
      type: "event",
      title: "Salon des Étudiants 2025",
      date: "11-12 Septembre 2025",
      time: "08h00 - 17h00",
      location: "Amphithéâtre Principal",
      description: "Rencontrez les représentants des différents départements et découvrez nos formations",
      urgent: true,
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 2,
      type: "inscription",
      title: "Inscriptions Année 2025-2026",
      date: "Jusqu'au 30 Septembre 2025",
      time: "08h00 - 16h00",
      location: "Bureau des Inscriptions",
      description: "Période d'inscription pour la nouvelle année académique",
      urgent: true,
      icon: <Calendar className="h-4 w-4" />
    },
    {
      id: 3,
      type: "info",
      title: "Journée Portes Ouvertes",
      date: "15 Septembre 2025",
      time: "09h00 - 15h00",
      location: "Campus Principal",
      description: "Visitez nos laboratoires et rencontrez nos enseignants-chercheurs",
      urgent: false,
      icon: <MapPin className="h-4 w-4" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-amber-50/20">
      {/* Hero Section */}
      <HeroSection />

      <main className="py-16">
        <div className="container mx-auto px-4">

          {/* Section Actualités */}
          <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Bell className="h-6 w-6 text-purple-600" />
                    <h2 className="text-3xl font-bold text-gray-800">Dernières Actualités</h2>
                  </div>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Restez informés des événements importants et des dates clés de la faculté
                  </p>
                </div>

                {/* Actualités Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestNews.map((news) => (
                    <Card key={news.id} className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm overflow-hidden">
                      {news.urgent && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                          URGENT
                        </div>
                      )}
                      
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className={`p-2 rounded-lg ${
                            news.type === 'event' ? 'bg-purple-100 text-purple-600' :
                            news.type === 'inscription' ? 'bg-amber-100 text-amber-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {news.icon}
                          </div>
                          <div className="flex-1">
                            <Badge 
                              variant="secondary" 
                              className={`mb-2 ${
                                news.type === 'event' ? 'bg-purple-100 text-purple-700' :
                                news.type === 'inscription' ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {news.type === 'event' ? 'Événement' : 
                              news.type === 'inscription' ? 'Inscription' : 'Information'}
                            </Badge>
                            <h3 className="font-semibold text-gray-800 text-lg leading-tight mb-2">
                              {news.title}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">{news.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{news.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{news.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {news.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                  <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 border-0 shadow-lg">
                    <Link to="/actualites">Voir toutes les actualités</Link>
                  </Button>
                </div>

              </div>
            </div>
          </section>
          
          {/* Statistiques */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-black-800 mb-2">{stat.number}</div>
                      <div className="text-sm text-black-600 font-medium">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Présentation */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-purple-800 mb-4">
                Faculté des Sciences
              </h2>
              <p className="text-xl text-black-600 max-w-3xl mx-auto leading-relaxed">
                Un centre d'excellence pour l'enseignement supérieur et la recherche scientifique à Madagascar
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <img 
                  src="/chalet.png" 
                  alt="Étudiants en bibliothèque" 
                  className="rounded-2xl shadow-xl w-full h-80 object-cover"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-black-800">
                  Excellence académique et innovation
                </h3>
                <p className="text-black-600 leading-relaxed">
                  Depuis plus de 60 ans, la Faculté des Sciences de l'Université d'Antananarivo forme 
                  les futurs scientifiques et chercheurs de Madagascar. Nous offrons des programmes 
                  d'excellence dans six départements spécialisés.
                </p>
                <p className="text-black-600 leading-relaxed">
                  Notre engagement envers la qualité de l'enseignement et la recherche de pointe 
                  nous positionne comme un acteur clé du développement scientifique et technologique 
                  de la région.
                </p>
                <div className="flex space-x-4">
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600">
                    <Link to="/presentation/histoire">
                      Notre Histoire
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="border-amber-300 text-amber-700 hover:bg-amber-50">
                    <Link to="/formation">Nos Formations</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Départements */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-purple-800 mb-4">
                Nos Départements
              </h2>
              <p className="text-xl text-black-600 max-w-3xl mx-auto">
                Six départements d'excellence couvrant l'ensemble des disciplines scientifiques
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm h-full">
                    <CardHeader>
                      <div className={`w-12 h-12 ${dept.color} rounded-xl flex items-center justify-center mb-4`}>
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg text-black-800 leading-tight">{dept.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-purple-100 text-black-700">
                          {dept.students} étudiants
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                          En savoir plus
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.3 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-6">
                  Rejoignez-nous
                </h2>
                <p className="text-xl text-black-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Découvrez nos programmes d'excellence et devenez acteur du développement scientifique de Madagascar
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-400 text-purple-800 font-semibold">
                    <Link to="/formation">
                      Découvrir nos formations
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-amber-300 text-amber-100 hover:bg-amber-300 hover:text-purple-800">
                    <Link to="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>

        </div>
      </main>
    </div>
  )
}

