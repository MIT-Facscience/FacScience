import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Target } from "lucide-react";
import SemestreItem from "./SemestreItem";
export default function ParcourDetail() {
  const name = "Details Licence 1";
  const matiere = [
    {
      matiere: "matiere 1",
      credit: 6,
    },
    {
      matiere: "matiere 2",
      credit: 4,
    },
    {
      matiere: "matiere 3",
      credit: 3,
    },
    {
      matiere: "matiere 4",
      credit: 2,
    },
    {
      matiere: "matiere 5",
      credit: 2,
    },
    {
      matiere: "matiere 6",
      credit: 2,
    },
  ];
  let credit = 0;
  matiere.forEach((items) => {
    credit += items.credit;
  });
  let nbMatiere = 0;
  matiere.forEach(() => {
    nbMatiere += 1;
  });

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
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                    {name}
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                    Découvrez les parcours d'excellences dans le mention {name}
                  </p>
                </div>
              </motion.div>
            </div>
            <div>
              <div className="flex items-center gap-5">
                <div className="bg-gradient-to-br from-primary to-primary/80 w-12 h-12 rounded-full text-white flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-600 text-2xl">
                  Licence 1
                </span>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="border-0 mt-10 shadow-lg rounded-none transition-all duration-300 hover:-translate-y-1">
                    <CardTitle className="px-5 flex items-center gap-3">
                      <Target className="text-primary" />
                      Conditions d'admission
                    </CardTitle>
                    <CardContent className="flex flex-col gap-2">
                      <span className="text-slate-700 text-sm font-medium">
                        <span className="font-bold">• Serie du Bacc : </span>C
                        ou S
                      </span>
                      <span className="text-slate-700 text-sm font-medium">
                        <span className="font-bold">• Année : </span>2020 à 2025
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              <div className="grid md:grid-cols-2 gap-5 mt-5">
                <SemestreItem
                  matiere={matiere}
                  nbMatiere={nbMatiere}
                  credit={credit}
                  semestre={1}
                />
                <SemestreItem
                  matiere={matiere}
                  nbMatiere={nbMatiere}
                  credit={credit}
                  semestre={2}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
