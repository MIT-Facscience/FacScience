import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Parcours {
  idParcours: number;
  nomParcours: string;
  nomParcoursProfessionnalisante?: string;
  niveaux: string[];
}

export default function ParcourItems({
  parcours,
  index,
  idMention,
}: {
  parcours: Parcours;
  index: number;
  idMention: string;
}) {
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

  // Use the first parcours or specialité as the title, fallback to parcours.title
  // const itemTitle = parcours.parcours[0] || parcours.specialité?.[0] || parcours.title;

  // Get semesters for the associated levels (if levels are provided)
  // const associatedSemesters = parcours.levels
  //   ? parcours.levels
  //       .map((level) => dataSem.find((d) => d.niveau === level)?.semestre)
  //       .filter((s) => s)
  //       .flat()
  //   : dataSem.find((d) => d.value === parcours.title)?.semestre || [1, 2];

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
      className={`flex items-center ${
        index % 2 === 0 ? "flex-row-reverse lg:flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        className={`w-full xl:w-1/2 flex ${
          index % 2 === 0
            ? "pr-0 lg:pr-8 justify-start lg:justify-end"
            : "pl-0 lg:pl-8 justify-start"
        }`}
      >
        <Card className="w-full mx-2 lg:mx-0 lg:w-2/3 p-5 flex flex-col gap-3 rounded-none border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <CardTitle className="text-lg w-full text-gray-800 flex justify-between items-center">
              <span className="">{parcours.nomParcours}</span>
              <span className="flex items-center justify-center space-x-2 min-w-1/4">
                {parcours.niveaux.map((niv, idx) => (
                  <Badge
                    key={idx}
                    variant={niv.startsWith("L") ? "secondary" : "default"}
                    className="text-white"
                  >
                    {niv}
                  </Badge>
                ))}
              </span>
            </CardTitle>
          </div>
          {parcours.nomParcoursProfessionnalisante && (
            <div className="pt-2 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Spécialité :</h3>
              <span className="text-primary font-bold text-lg">
                {parcours.nomParcoursProfessionnalisante}
              </span>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-700">Niveaux concernés :</h3>
            <ul className="text-gray-600 leading-relaxed font-medium text-xs lg:text-sm list-disc list-inside">
              {parcours.niveaux && (
                parcours.niveaux.map((level, idx) => (
                  <li key={idx}>
                    {dataSem.find((d) => d.niveau === level)?.title || level}
                  </li>
                ))
              )}
            </ul>
          </div>
          <Link
            to={`/formation/detailparcours?${idMention}+${parcours.idParcours}`}
            // to={`/formation/detailparcours?${idMention}+${parcours.title}+${type}`}
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-primary font-medium -translate-x-2 hover:text-primary/80 hover:bg-muted cursor-pointer"
            >
              En savoir plus
              <ArrowRight className="h-3 w-3 ml-2" />
            </Button>
          </Link>
        </Card>
      </div>
      <div className="relative z-10">
        <div
          className={`w-10 h-10 text-sm lg:text-lg lg:w-12 lg:h-12 ${
            index % 2 === 0 ? "bg-primary" : "bg-amber-500"
          } rounded-full flex items-center justify-center text-white shadow-lg font-bold`}
        >
        </div>
      </div>
      <div className="lg:w-full xl:w-1/2 h-12 lg:mx-2 xl:mx-0"></div>
    </motion.div>
  );
}