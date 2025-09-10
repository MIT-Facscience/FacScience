import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Target } from "lucide-react";
import SemestreItem from "./SemestreItem";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { getParcoursByType } from "@/dataTestFormation/parcours";
import { getMentionById } from "@/dataTestFormation/mention";
import { useState } from "react";
export default function ParcourDetail() {
  const params = useSearchParams()[0].toString().split("=")[0].split("+");
  // const name = "Detail " + params[1];
  const parcoursList = getParcoursByType(params[0], params[2], params[1]);
  const dataSem = [
    {
      value: "licence1",
      semestre: [1, 2],
      niveau: "L1",
      title: "Licence 1",
    },
    {
      value: "licence2",
      semestre: [3, 4],
      niveau: "L2",
      title: "Licence 2",
    },

    {
      value: "licence3",
      semestre: [5, 6],
      niveau: "L3",
      title: "Licence 3",
    },

    {
      value: "master1",
      semestre: [7, 8],
      niveau: "M1",
      title: "Master 1",
    },

    {
      value: "master2",
      semestre: [9, 10],
      niveau: "M2",
      title: "Master 2",
    },
  ];
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
  const [parcoursSelected, setParcoursSelected] = useState<string>(
    parcoursList ? parcoursList[0] : ""
  );
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
                    Detail{" "}
                    {dataSem.find((d) => d.value == params[1])?.title ??
                      "Licence 1"}
                    <span></span>
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                    Découvrez les details de chaque parcours dans la mention{" "}
                    {getMentionById(params[0])?.toLowerCase()}
                  </p>
                </div>
              </motion.div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="w-full flex flex-col gap-5">
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between w-full">
                      <div className="flex gap-3 items-center">
                        <div className="bg-gradient-to-br from-primary to-primary/80 w-12 h-12 rounded-full text-white flex items-center justify-center">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-600 text-2xl">
                          {dataSem.find((d) => d.value == params[1])?.title ??
                            "Licence 1"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">
                      <span className="font-bold">Mentions : </span>
                      <span className="">
                        {getMentionById(params[0])?.toLowerCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium flex items-center">
                      <span className="font-bold mr-1">Parcours : </span>
                      {parcoursList?.length != 1 ? (
                        <>
                          <div className="flex ml-3 gap-4 text-slate-600 items-center text-sm font-medium">
                            <Select
                              defaultValue={parcoursSelected}
                              onValueChange={(v) => setParcoursSelected(v)}
                            >
                              <SelectTrigger className="border-0 bg-slate-100 rounded-none font-medium">
                                <SelectValue placeholder="Sélectionner le parcours"></SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-white shadow-lg border-0">
                                <SelectGroup>
                                  {parcoursList?.map((items, index) => (
                                    // <>
                                    <SelectItem
                                      value={items}
                                      key={index}
                                      className="focus:bg-primary focus:text-white"
                                    >
                                      {items}
                                    </SelectItem>
                                    // </>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      ) : (
                        parcoursSelected
                      )}
                    </span>
                  </div>
                </div>
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
                        <span className="font-bold">• Série du Bacc : </span>C
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
