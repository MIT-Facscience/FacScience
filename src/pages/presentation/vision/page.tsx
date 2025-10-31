import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function VisionPage() {
  const { t } = useTranslation("vision");

  const latestNews = [
    {
      title: t("vision.news.0.title"),
      description: t("vision.news.0.description"),
      image: "/partenariat.png",
      date: "",
    },
    {
      title: t("vision.news.1.title"),
      description: t("vision.news.1.description"),
      image: "/nouveauprof.jpg",
      date: "",
    },
  ];

  const events = [
    {
      title: t("vision.events.0.title"),
      subtitle: t("vision.events.0.subtitle"),
      date: t("vision.events.0.date"),
    },
    {
      title: t("vision.events.1.title"),
      subtitle: t("vision.events.1.subtitle"),
      date: t("vision.events.1.date"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto">
            {/* Header avec image de fond */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-12 sm:mb-16 overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src="/ankatso.jpg"
                  alt="Histoire de la faculté"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white-900/80 via-gray-800/60"></div>
              </div>
              <div className="relative z-10 text-center py-10 sm:py-16 lg:py-20 px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                  {t("vision.title")}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                  {t("vision.subtitle")}
                </p>
              </div>
            </motion.div>

            <div className="min-h-screen bg-white">
              <main className="pt-20 pb-12">
                <div className="container mx-auto px-4">
                  {/* Three Column Layout */}
                  <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* STRATEGY Column */}
                    <div className="space-y-6 p-16">
                      <h2 className="text-4xl font-black text-gray-900 mb-8">
                        {t("vision.sections.strategy")}
                      </h2>

                      {latestNews.map((news, index) => (
                        <div key={index} className="space-y-4">
                          <img
                            src={news.image || "/coursera.jpg"}
                            alt={news.title}
                            className="w-full h-32 object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                              {news.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {news.description}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {news.date}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* VISION Column */}
                    <div className="space-y-6">
                      <h2 className="text-4xl font-black text-gray-900 mb-8 text-center">
                        {t("vision.sections.vision")}
                      </h2>

                      <div className="text-center">
                        <h1 className="text-3xl font-serif text-amber-700 mb-8 leading-tight">
                          {t("vision.sections.slogan")}
                        </h1>

                        <img
                          src="/president.jpg"
                          alt="Vision 2030"
                          className="w-full h-auto object-cover mb-6"
                        />

                        <div className="text-left space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            {t("vision.presidentText")}
                          </p>

                          <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <div className="text-2xl font-bold text-purple-800">
                                95%
                              </div>
                              <div className="text-xs text-purple-600">
                                {t("vision.stats.employmentRate")}
                              </div>
                            </div>
                            <div className="text-center p-4 bg-amber-50 rounded-lg">
                              <div className="text-2xl font-bold text-amber-800">
                                50+
                              </div>
                              <div className="text-xs text-amber-600">
                                {t("vision.stats.publications")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STRATEGY Column (Right) */}
                    <div className="space-y-6 p-16">
                      <h2 className="text-4xl font-black text-gray-900 mb-8 text-right">
                        {t("vision.sections.strategy")}
                      </h2>

                      <img
                        src="/media-digitalisation.jpg"
                        alt="Campus Events"
                        className="w-full h-32 object-cover rounded-lg"
                      />

                      <div className="space-y-6">
                        {events.map((event, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-200 pb-4"
                          >
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {event.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {event.subtitle}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {event.date}
                              </span>
                            </div>
                          </div>
                        ))}

                        <div className="mt-6">
                          <a
                            href="/actualites"
                            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                          >
                            {t("vision.links.moreEvents")}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}