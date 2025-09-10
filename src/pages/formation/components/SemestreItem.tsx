import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
export default function SemestreItem({
  matiere,
  credit,
  nbMatiere,
  semestre,
}: {
  matiere: { matiere: string; credit: number }[];
  credit: number;
  nbMatiere: number;
  semestre: number;
}) {
  return (
    <>
      <motion.div
        initial={{ x: semestre % 2 == 0 ? 20 : -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-none shadow-lg rounded-none">
          <CardTitle className="flex justify-between items-center px-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                S{semestre}
              </div>
              Semestre {semestre % 2 === 0 ? "Paire" : "Impaire"}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col text-slate-600 text-xs font-medium">
                <span>{credit} Crédit</span>
                <span>
                  <span>{nbMatiere} Matières</span>
                </span>
              </div>
            </div>
          </CardTitle>
          <CardContent className="px-5">
            <div className="flex text-sm font-medium justify-between border-b-2 border-slate-400 py-2 text-slate-600 mb-2">
              <span>Matieres</span>
              <span>Nombre de crédit</span>
            </div>
            <div className="space-y-2 text-sm font-medium">
              {matiere.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between p-3 bg-slate-100"
                >
                  <span>{item.matiere}</span>
                  <span className="font-bold">
                    <Badge className="bg-amber-400">{item.credit} Crédit</Badge>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
