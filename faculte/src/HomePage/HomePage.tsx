import { HeroSection } from "@/components/hero-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Microscope,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const departments = [
    {
      name: "Mathématiques et Informatique",
      students: "800+",
      color: "bg-primary",
      image: "/images/mathematiques.jpg",
    },
    {
      name: "MIT",
      students: "600+",
      color: "bg-secondary",
      image: "/images/informatique.jpg",
    },
    {
      name: "Physique",
      students: "400+",
      color: "bg-primary/80",
      image: "/images/physique.jpg",
    },
    {
      name: "Chimie",
      students: "350+",
      color: "bg-secondary/80",
      image: "/images/chimie.jpg",
    },
    {
      name: "Biologie",
      students: "500+",
      color: "bg-primary/90",
      image: "/images/biologie.jpg",
    },
    {
      name: "Géologie",
      students: "300+",
      color: "bg-secondary/90",
      image: "/images/geologie.jpg",
    },
  ];

  const stats = [
    {
      number: "5000+",
      label: "Étudiants",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "50+",
      label: "Enseignants-chercheurs",
      icon: <Award className="h-6 w-6" />,
    },
    {
      number: "6",
      label: "Départements",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      number: "20+",
      label: "Laboratoires",
      icon: <Microscope className="h-6 w-6" />,
    },
  ];

  const latestNews = [
    {
      id: 1,
      type: "event",
      title: "Salon des Étudiants 2025",
      date: "11-12 Septembre 2025",
      time: "08h00 - 17h00",
      location: "Amphithéâtre Principal",
      description:
        "Rencontrez les représentants des différents départements et découvrez nos formations",
      urgent: true,
      icon: <Users className="h-4 w-4" />,
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
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "info",
      title: "Journée Portes Ouvertes",
      date: "15 Septembre 2025",
      time: "09h00 - 15h00",
      location: "Campus Principal",
      description:
        "Visitez nos laboratoires et rencontrez nos enseignants-chercheurs",
      urgent: false,
      icon: <MapPin className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <HeroSection />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <section className="py-16 bg-gradient-to-br from-muted to-card">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Bell className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-bold text-foreground">
                      Dernières Actualités
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Restez informés des événements importants et des dates clés
                    de la faculté
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestNews.map((news) => (
                    <Card
                      key={news.id}
                      className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/90 backdrop-blur-sm overflow-hidden"
                    >
                      {news.urgent && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-destructive to-destructive text-destructive-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
                          URGENT
                        </div>
                      )}

                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <div
                            className={`p-2 rounded-lg ${
                              news.type === "event"
                                ? "bg-primary/10 text-primary"
                                : news.type === "inscription"
                                ? "bg-secondary/10 text-secondary-foreground"
                                : "bg-accent/10 text-accent-foreground"
                            }`}
                          >
                            {news.icon}
                          </div>
                          <div className="flex-1">
                            <Badge
                              variant="secondary"
                              className={`mb-2 ${
                                news.type === "event"
                                  ? "bg-primary/10 text-primary"
                                  : news.type === "inscription"
                                  ? "bg-secondary/10 text-secondary-foreground"
                                  : "bg-accent/10 text-accent-foreground"
                              }`}
                            >
                              {news.type === "event"
                                ? "Événement"
                                : news.type === "inscription"
                                ? "Inscription"
                                : "Information"}
                            </Badge>
                            <h3 className="font-semibold text-card-foreground text-lg leading-tight mb-2">
                              {news.title}
                            </h3>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">{news.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{news.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{news.location}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {news.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 border-0 shadow-lg"
                  >
                    <Link to="/actualites">Voir toutes les actualités</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

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
                  <Card className="text-center border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">
                Faculté des Sciences
              </h2>
              <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
                Un centre d'excellence pour l'enseignement supérieur et la
                recherche scientifique à Madagascar
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
                <h3 className="text-2xl font-bold text-foreground">
                  Excellence académique et innovation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Depuis plus de 60 ans, la Faculté des Sciences de l'Université
                  d'Antananarivo forme les futurs scientifiques et chercheurs de
                  Madagascar. Nous offrons des programmes d'excellence dans six
                  départements spécialisés.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Notre engagement envers la qualité de l'enseignement et la
                  recherche de pointe nous positionne comme un acteur clé du
                  développement scientifique et technologique de la région.
                </p>
                <div className="flex space-x-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <Link to="/presentation/histoire">
                      Notre Histoire
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-secondary text-secondary-foreground hover:bg-secondary/10 bg-transparent"
                  >
                    <Link to="/formation">Nos Formations</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">
                Nos Départements
              </h2>
              <p className="text-xl text-foreground max-w-3xl mx-auto">
                Six départements d'excellence couvrant l'ensemble des
                disciplines scientifiques
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
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/90 backdrop-blur-sm h-full overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative w-full h-48 mb-4">
                        <img
                          src={dept.image || "/placeholder.svg"}
                          alt={`Département ${dept.name}`}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <CardTitle className="text-lg text-white leading-tight">
                            {dept.name}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary"
                        >
                          {dept.students} étudiants
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80"
                        >
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

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.3 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/10 to-primary/20 overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-6 text-primary">
                  Rejoignez-nous
                </h2>
                <p className="text-xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  Découvrez nos programmes d'excellence et devenez acteur du
                  développement scientifique de Madagascar
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                  >
                    <Link to="/formation">
                      Découvrir nos formations
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-secondary text-secondary-foreground hover:bg-secondary/10 bg-transparent"
                  >
                    <Link to="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
