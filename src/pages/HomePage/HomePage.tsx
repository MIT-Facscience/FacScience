import { HeroSection } from "@/components/hero-section";
import MentionsCarousel from "@/components/Home/MentionsCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { BACKEND_ADMIN_URL, BACKEND_URL } from "@/lib/api";
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
  User,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Actuality } from "@/lib/types";

interface ResearchCenter {
  title: string;
  backgroundColor: string;
  logoType: string;
}
// import ToggleResultsButton from "@/components/toggleResultsButton";

export default function HomePage() {
  const [nbEnseignants, setNbEnseignants] = useState(200);
  const [nbMentions, setNbMentions] = useState(14);
  const [nbLabo, setNbLabo] = useState(30);
  const [latestNews, setLatestNews] = useState<Actuality[]>([]);
  const { t } = useTranslation("home");

  useEffect(() => {
    fetch(`${BACKEND_ADMIN_URL}/api/Actualite/latest`)
      .then((response) => {
        if (!response.ok) throw new Error("Erreur de chargement des actualités");
        return response.json();
      })
      .then((data) => {
        setLatestNews(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des actualités :", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/stat/enseignant`)
      .then((response) => {
        if (!response.ok) throw new Error("Erreur de chargement des enseignants");
        return response.json();
      })
      .then((data) => {
        setNbEnseignants(data.length);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des mentions :", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/stat/mention`)
      .then((response) => {
        if (!response.ok) throw new Error("Erreur de chargement des mentions");
        return response.json();
      })
      .then((data) => {
        setNbMentions(data.length);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des mentions :", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/stat/labo`)
      .then((response) => {
        if (!response.ok) throw new Error("Erreur de chargement des labos");
        return response.json();
      })
      .then((data) => {
        setNbLabo(data.length);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des mentions :", error);
      });
  }, []);

  const stats = [
    {
      number: "5000",
      label: t("home.stats.students"),
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: nbEnseignants,
      label: t("home.stats.teachers"),
      icon: <Award className="h-6 w-6" />,
    },
    {
      number: nbMentions,
      label: t("home.stats.mentions"),
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      number: nbLabo,
      label: t("home.stats.laboratories"),
      icon: <Microscope className="h-6 w-6" />,
    },
  ];

  const centers: ResearchCenter[] = [
    {
      title: t("home.portals.items.it.title"),
      backgroundColor: "bg-gray-800",
      logoType: "/Logo_IT.jpg",
    },
    {
      title: t("home.portals.items.mi.title"),
      backgroundColor: "bg-slate-600",
      logoType: "/Logo_MI.jpg",
    },
    {
      title: t("home.portals.items.pc.title"),
      backgroundColor: "bg-green-600",
      logoType: "/Logo_ADD.jpg",
    },
    {
      title: t("home.portals.items.svt.title"),
      backgroundColor: "bg-stone-500",
      logoType: "/Logo_BFA.jpg",
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
                      {t("home.news.title")}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t("home.news.subtitle")}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {latestNews.map((news) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="relative border-0 t-0 p-0 rounded-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/90 backdrop-blur-sm h-full overflow-hidden">
                        <Link to={`/actualites/${news.id}`}>
                          <div className="relative w-full h-48 overflow-hidden flex items-start">
                            {news.media && news.media.length > 0 ? (
                              <img
                                src={`${BACKEND_ADMIN_URL}${news.media[0].url}`}
                                alt={news.title}
                                className="w-full h-auto"
                              />
                            ) : (
                              <div className="w-full h-40 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <Calendar className="h-10 w-10 text-slate-300" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute z-20 top-4 left-4 flex gap-2">
                              <Badge className="bg-primary/90 text-white px-3 py-1 border-0 rounded-full shadow-sm text-[10px] font-bold uppercase tracking-wider">
                                {news.category}
                              </Badge>
                              {news.isUrgent && (
                                <Badge variant="destructive" className="px-3 py-1 border-0 rounded-full flex items-center gap-1 shadow-sm animate-pulse text-[10px] font-bold uppercase tracking-wider">
                                  <AlertCircle className="h-3 w-3" />
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <div className="absolute z-20 bottom-5 left-5 right-5">
                              <h3 className="text-sm text-white leading-tight font-bold drop-shadow-md line-clamp-2">
                                {news.title}
                              </h3>
                            </div>
                          </div>

                          <CardContent className="p-5">
                            <div className="flex flex-col gap-2.5 mb-4">
                              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                {news.beginedAt && (
                                  <div className="flex items-center gap-1.5 bg-slate-100/50 dark:bg-slate-800/50 px-2 py-1 rounded-lg">
                                    <Calendar className="h-3 w-3 text-primary" />
                                    <span>{new Date(news.beginedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                                    <span className="mx-1 text-slate-300">|</span>
                                    <Clock className="h-3 w-3 text-primary" />
                                    <span>{new Date(news.beginedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>
                                )}
                                {news.finishAt && (
                                  <div className="flex items-center gap-1.5 bg-primary/5 text-primary px-2 py-1 rounded-lg border border-primary/10">
                                    <span className="text-[9px] opacity-70">AU</span>
                                    <span>{new Date(news.finishAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                                    <span className="mx-1 opacity-20">|</span>
                                    <span>{new Date(news.finishAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                  </div>
                                )}
                              </div>
                              {news.location && (
                                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 w-fit px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-800/30">
                                  <MapPin className="h-3 w-3 text-emerald-600" />
                                  <span className="truncate max-w-[150px]">{news.location}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5">
                              {news.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                              <span className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-2">
                                <User className="h-3 w-3 opacity-50" />
                                Fac Science
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[10px] font-bold uppercase tracking-wider text-primary hover:bg-primary/10 group h-8 rounded-full px-4"
                              >
                                {t("home.news.seeAll")}
                                <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center w-full flex items-center justify-center mt-12">
                  <Link to="/actualites">
                    <PrimaryButton>{t("home.news.seeAll")}</PrimaryButton>
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
                {t("home.presentation.title")}
              </h2>
              <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
                {t("home.presentation.subtitle")}
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
                  alt={t("home.presentation.title")}
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
                  {t("home.presentation.heading")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("home.presentation.paragraph1", { count: nbMentions })}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("home.presentation.paragraph2")}
                </p>
                <div className="flex space-x-4">
                  <Button asChild className="rounded-none">
                    <Link to="/presentation/histoire">
                      {t("home.presentation.buttons.history")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild className="rounded-none">
                    <Link to="/formation">
                      {t("home.presentation.buttons.formations")}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-24 py-12 px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-primary mb-5"
              >
                {t("home.portals.title")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed"
              >
                {t("home.portals.subtitle")}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {centers.map((center, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group bg-white shadow-lg overflow-hidden relative cursor-pointer h-[320px] border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="h-1 bg-gradient-to-r from-primary to-primary/60 w-0 group-hover:w-full transition-all duration-500 mx-auto mt-6"></div>

                  <div className="p-6 flex flex-col">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300">
                      {center.title}
                    </h3>
                  </div>

                  <div className="mt-auto p-6 pt-0">
                    <div className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <img
                        src={center.logoType}
                        alt={center.title}
                        className="max-h-28 max-w-[80%] mx-auto group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
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
            <div className="grid md:grid-cols-4 gap-6 ">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center border-0  rounded-none shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-2">
                        <CountUp end={parseInt(String(stat.number))} duration={4} delay={1} />
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
                  {t("home.callToAction.title")}
                </h2>
                <p className="text-xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  {t("home.callToAction.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-none"
                  >
                    <Link to="/formation">
                      {t("home.callToAction.buttons.formations")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-secondary rounded-none text-secondary-foreground hover:bg-secondary/10 bg-transparent hover:text-secondary-foreground/90"
                  >
                    <Link to="/contact">
                      {t("home.callToAction.buttons.contact")}
                    </Link>
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