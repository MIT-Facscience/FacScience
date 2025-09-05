import { Card, CardContent } from "@/components/ui/card";
import { getParcoursById, getStatsById } from "@/dataTestFormation/mention";
import { motion } from "framer-motion";
import { Users, Clock, BookOpen, Award } from "lucide-react";
import { useSearchParams } from "react-router-dom";
export default function FormationItems() {
  const id = useSearchParams()[0].toString()[0];
  const data = getParcoursById(id);
  const stats = getStatsById(id);
  const icon = [<Users />, <BookOpen />, <Clock />, <Award />];
  console.log(stats);
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
                    {data?.name}
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                    Découvrez les parcours d'excellence sdans le mention{" "}
                    {data?.name}
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {stats &&
                stats.map((stat, index) => (
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
                            {icon[index]}
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-black-800 mb-2">
                          {stat.value}
                        </div>
                        <div className="text-sm text-black-600 font-medium">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
