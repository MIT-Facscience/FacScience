import { motion } from "framer-motion";
import ParcourItems from "./ParcourItems";
export default function Parcours({
  parcours,
  type,
  idMention,
}: {
  parcours: {
    title: string;
    parcours: string[];
    specalite?: string[];
  }[];
  type: string;
  idMention: string;
}) {
  return (
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
          {parcours.map((items, index) => (
            <ParcourItems
              key={index}
              index={index}
              idMention={idMention}
              parcours={items}
              type={type}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
