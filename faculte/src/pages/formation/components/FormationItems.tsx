import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getRespo, getStatsById } from "@/dataTestFormation/mention";
import { motion } from "framer-motion";
import { Users, Clock, BookOpen, Award, User } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ParcourItems from "./ParcourItems";
import { Link } from "react-router-dom";
import PrimaryButton from "@/components/ui/PrimaryButton";
import getParoursById from "@/dataTestFormation/parcours";
// import SpecialiteItems from "./SpecialiteItems";
export default function FormationItems() {
  const id = useSearchParams()[0].toString().split("=")[0];
  console.log(id);
  const data = getRespo(id);
  const stats = getStatsById(id);
  const icon = [<Users />, <BookOpen />, <Clock />, <Award />];
  const parcours = getParoursById(id);
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
                <div className="relative z-10 text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
                  <h1 className="text-2xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
                    {data?.name}
                  </h1>
                  <p className="text-sm sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                    Découvrez les parcours d'excellences dans le mention{" "}
                    {data?.name?.toLowerCase()}
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
              {stats &&
                stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="text-center rounded-none border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="pt-6">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full">
                            {icon[index]}
                          </div>
                        </div>
                        <div className="text-lg lg:text-3xl font-bold text-black-800 mb-2">
                          {stat.value}
                        </div>
                        <div className="text-xs lg:text-sm text-black-600 font-medium">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-slate-100 mt-10 rounded-md py-20"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-slate-600">
                Nos parcours disponibles
              </h2>
              <div className="relative h-auto">
                <div className="absolute left-5 lg:left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 via-amber-500 to-purple-600 rounded-full"></div>
                <div className="space-y-8">
                  {parcours &&
                    parcours.data.map((items, index) => (
                      <ParcourItems
                        key={index}
                        index={index}
                        parcours={items}
                      />
                    ))}
                </div>
              </div>
            </motion.div>
            {/* <SpecialiteItems /> */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-none rounded-none container mx-auto shadow-lg flex items-center flex-col p-10 mt-5 transition-all duration-300 hover:-translate-y-1 ">
                <CardTitle className="flex flex-col items-center justify-center gap-3 text-xl font-semibold">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary text-white">
                    <User />
                  </div>
                  Responsable du mention
                </CardTitle>
                <CardContent className="text-sm text-slate-600 font-medium flex flex-col items-center gap-4">
                  <span className="flex flex-col items-center md:flex-row md:gap-1">
                    <span className="font-bold">Chef mention : </span>{" "}
                    {data.respo}
                  </span>
                  <p className="w-full lg:w-1/2 text-center font-normal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla porro enim sit voluptatum dolorem corporis quia amet
                    dolores
                  </p>
                  <Link to="/contact">
                    <PrimaryButton className="cursor-pointer">
                      Contactez
                    </PrimaryButton>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
