// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function ParcourItems({
  parcours,
  index,
}: {
  parcours: {
    title: string;
    description: string;
    color: string;
    niveau: string;
  };
  index: number;
}) {
  return (
    <>
      <motion.div
        key={index}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
        className={`flex items-center ${
          index % 2 === 0 ? "flex-row " : "flex-row-reverse"
        }`}
      >
        <div
          className={`w-1/2 flex ${
            index % 2 === 0 ? "pr-8 justify-end " : "pl-8 justify-start"
          }`}
        >
          <Card className="w-2/3 p-5 flex flex-col gap-2 rounded-none border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
            <div>
              <div className="flex items-center space-x-3">
                <CardTitle className="text-lg text-gray-800">
                  {parcours.title}
                </CardTitle>
              </div>
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed">
                {parcours.description}
              </p>
            </div>

            <Link to={"detail?" + index}>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary -translate-x-2 hover:text-primary/80 hover:bg-muted"
              >
                En savoir plus
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </Card>
        </div>
        <div className="relative z-10">
          <div
            className={`w-12 h-12 ${parcours.color} rounded-full flex items-center justify-center text-white shadow-lg font-bold`}
          >
            {parcours.niveau}
          </div>
        </div>
        <div className="w-1/2"></div>
      </motion.div>
    </>
  );
}
