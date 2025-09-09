import { HeroSection } from "@/components/hero-section";
import MentionsCarousel from "@/components/Home/MentionsCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PrimaryButton from "@/components/ui/PrimaryButton";
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

interface ResearchCenter {
  title: string;
  backgroundColor: string;
  logoType: string;
}

export default function HomePage() {
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
      number: "14",
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

  const centers: ResearchCenter[] = [
    {
      title: "Informatique et Technologie",
      backgroundColor: "bg-gray-800",
      logoType: "/Logo/Logo_IT.png",
    },
    {
      title: "Mathematique et Informatique",
      backgroundColor: "bg-slate-600",
      logoType: "/Logo/Logo_MI.jpg",
    },
    {
      title: "Physique et Chimie",
      backgroundColor: "bg-green-600",
      logoType: "/Logo/Logo_ADD.jpg",
    },
    {
      title: "SVT",
      backgroundColor: "bg-stone-500",
      logoType: "/Logo/Logo_BFA.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <HeroSection />

      <main className="py-16">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <section className="py-16 bg-gradient-to-br from-muted to-card">
            <div className="container mx-auto px-4">
              <div className="mx-auto">
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
                      className="relative border-0 rounded-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/90 backdrop-blur-sm"
                    >
                      {news.urgent && (
                        <div className="bg-[gent-clip-path] z-40 absolute top-3 -right-1.5 bg-gradient-to-r from-destructive to-destructive text-destructive-foreground pl-5 pr-3 py-1 text-xs font-semibold">
                          URGENT
                          <span className="right-0 top-full z-50 bg-red-400 absolute w-1.5 h-1.5 triangle" />
                        </div>
                      )}

                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <div
                            className={`p-2 rounded-none ${
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

                <div className="text-center w-full flex items-center justify-center mt-12">
                  <Link to="/actualites">
                    <PrimaryButton>Voir toutes les actualités</PrimaryButton>
                  </Link>
                </div>
              </div>
            </div>
          </section>

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
                  className=" shadow-xl w-full h-80 object-cover"
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
                  <Button asChild className="rounded-none">
                    <Link to="/presentation/histoire">
                      Notre Histoire
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild className="rounded-none">
                    <Link to="/formation">Nos Formations</Link>
                  </Button>
                </div>
              </motion.div>
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
                Nos Portails
              </h2>
              <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
                Les grandes parcours dans notre faculté
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-3 md:gap-5 xl:gap-7">
              {centers.map((center, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity duration-300 hover:-translate-y-5 h-[500px] "
                >
                  {/* Ligne décorative en haut */}
                  <div className="h-1 bg-white opacity-30 mx-6 mt-6"></div>

                  {/* Contenu texte */}
                  <div className="p-6">
                    <h3 className="text-3xl font-normal leading-relaxed mb-4">
                      {center.title}
                    </h3>

                    {/* Flèche */}
                    <div className="text-2xl mb-8">›</div>
                  </div>

                  {/* Logo en bas */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <img
                      src={center.logoType}
                      alt={center.title}
                      className=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <MentionsCarousel />

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            {/* <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-8 min-w-72 max-w-80 border-l-2 border-gray-300 hover:border-gray-400 transition-colors duration-300"
                >
                  <div className="text-left">
                    <div className="text-7xl font-light text-gray-800 mb-4">
                      {stat.number}
                    </div>
                    <div className="text-black-600 text-lg leading-relaxed">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center border-0 rounded-none shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
            transition={{ duration: 0.6, delay: 2.3 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br rounded-none from-primary/10 to-primary/20 overflow-hidden">
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
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-none"
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
                    className="border-2 border-secondary rounded-none text-secondary-foreground hover:bg-secondary/10 bg-transparent hover:text-secondary-foreground/90"
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
