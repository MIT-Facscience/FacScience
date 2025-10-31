import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            import { BACKEND_URL } from "@/lib/api";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  FlaskConical,
  Globe,
  Laptop,
  Microscope,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

export default function HistoirePage() {
  const [nbEnseignants, setNbEnseignants] = useState(200);
  const [nbMentions, setNbMentions] = useState(14);

  const { t } = useTranslation("presentation");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/stat/enseignant`)
      .then((response) => response.json())
      .then((data) => {
        setNbEnseignants(data.length);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des mentions :", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/stat/mention`)
      .then((response) => response.json())
      .then((data) => {
        setNbMentions(data.length);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des mentions :", error);
      });
  }, []);

   const timelineIcons = {
    foundation: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
    departments: <Microscope className="h-4 w-4 sm:h-5 sm:w-5" />,
    infrastructure: <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5" />,
    international: <Globe className="h-4 w-4 sm:h-5 sm:w-5" />,
    innovation: <Laptop className="h-4 w-4 sm:h-5 sm:w-5" />,
  };

  const timelineColors = {
    foundation: "bg-primary",
    departments: "bg-amber-500",
    infrastructure: "bg-primary",
    international: "bg-amber-600",
    innovation: "bg-primary",
  };

   const timelineEvents = [
    {
      year: t('timeline.events.foundation.year'),
      title: t('timeline.events.foundation.title'),
      description: t('timeline.events.foundation.description'),
      icon: timelineIcons.foundation,
      color: timelineColors.foundation,
    },
    {
      year: "",
      title: t('timeline.events.departments.title'),
      description: t('timeline.events.departments.description'),
      icon: timelineIcons.departments,
      color: timelineColors.departments,
    },
    {
      year: "",
      title: t('timeline.events.infrastructure.title'),
      description: t('timeline.events.infrastructure.description'),
      icon: timelineIcons.infrastructure,
      color: timelineColors.infrastructure,
    },
    {
      year: "",
      title: t('timeline.events.international.title'),
      description: t('timeline.events.international.description'),
      icon: timelineIcons.international,
      color: timelineColors.international,
    },
    {
      year: "",
      title: t('timeline.events.innovation.title'),
      description: t('timeline.events.innovation.description'),
      icon: timelineIcons.innovation,
      color: timelineColors.innovation,
    },
  ];

  const stats = [
    {
      number: t('stats.yearsExcellence.number'),
      label: t('stats.yearsExcellence.label'),
      icon: <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      number: t('stats.graduates.number'),
      label: t('stats.graduates.label'),
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      number: nbMentions.toString(),
      label: t('stats.programs.label'),
      icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      number: nbEnseignants.toString(),
      label: t('stats.teachers.label'),
      icon: <Microscope className="h-5 w-5 sm:h-6 sm:w-6" />,
    }
  ];

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
                  src="/fs_outside_view.jpg"
                  alt="Histoire de la faculté"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white-900/80 via-gray-800/60"></div>
              </div>
              <div className="relative z-10 text-center py-10 sm:py-16 lg:py-20 px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                  {/* Notre Histoire */}
                  {t("title")}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                  {/* Plus de 60 ans d'excellence académique et de contribution au
                  développement scientifique de Madagascar */}
                  {t("subtitle")}
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
                <Card
                  key={index}
                  className="rounded-none text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-border/90 to-primary text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">
                      {stat.label}
                    </div>
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
                    <span>
                      {t("mission.title")}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {t("mission.firstMission")}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("mission.secondMission")}
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-none border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100/50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl text-gray-800 flex items-center space-x-3">
                    <div className="p-2 bg-amber-600 text-white">
                      <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span>
                      {t("vision.title")}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {t("vision.slogan")}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {t("vision.firstVision")}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                   {t("vision.secondVision")}
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
                {t("timeline.title")}
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
                      className={`flex items-center ${
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`w-1/2 ${
                          index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                        }`}
                      >
                        <Card className="rounded-none border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
                          <CardHeader className="pb-4">
                            <div className="flex items-center space-x-3">
                              <Badge
                                variant="secondary"
                                className={`${event.color} text-white border-0`}
                              >
                                {event.year}
                              </Badge>
                              <CardTitle className="text-lg text-gray-800">
                                {event.title}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 leading-relaxed">
                              {event.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Point central */}
                      <div className="relative z-10">
                        <div
                          className={`w-12 h-12 ${event.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                        >
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
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 ${event.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                          >
                            {event.icon}
                          </div>
                        </div>

                        {/* Contenu */}
                        <div className="flex-1 min-w-0">
                          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                            <CardHeader className="pb-3 sm:pb-4">
                              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                                <Badge
                                  variant="secondary"
                                  className={`${event.color} text-white border-0 self-start`}
                                >
                                  {event.year}
                                </Badge>
                                <CardTitle className="text-base sm:text-lg text-gray-800 leading-tight">
                                  {event.title}
                                </CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                {event.description}
                              </p>
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
                  <CardTitle className="text-2xl sm:text-3xl text-center text-gray-500 mb-4 sm:mb-6">
                    {t("value.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Award className="h-6 w-6 sm:h-8 sm:w-8 text-gray-50" />
                      </div>
                      <h3 className="text-lg sm:text-xl text-gray-600 font-semibold mb-2 sm:mb-3">
                        {t("value.award.title")}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {t("value.award.infos")}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-gray-50" />
                      </div>
                      <h3 className="text-lg sm:text-xl text-gray-600 font-semibold mb-2 sm:mb-3">
                        {t("value.users.title")}
                      </h3>
                      <p className=" text-gray-600 text-sm sm:text-base leading-relaxed">
                        {t("value.users.infos")}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Microscope className="h-6 w-6 sm:h-8 sm:w-8 text-gray-50" />
                      </div>
                      <h3 className="text-lg sm:text-xl text-gray-600 font-semibold mb-2 sm:mb-3">
                        {t("value.innovation.title")}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {t("value.innovation.infos")}
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
  );
}
