import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
// import math from "/public/departement.png";
import type { JSX } from "react";
export default function MentionCard({
  dept,
  index,
}: {
  dept: {
    id: string;
    name: string;
    image: string;
    color: string;
    icon: JSX.Element;
    description: string;
    responsable: string;
  };
  index: number;
}) {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
    >
      <Card className="relative border-0 pb-0 rounded-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/90 backdrop-blur-sm h-full overflow-hidden">
        <CardHeader className="p-5 flex flex-col gap-4 items-center mb-20">
          <div className="relative w-24 h-24 ">
            <img
              src={dept.image ?? "/public/chalet.png"}
              alt={`Département ${dept.name}`}
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-full" /> */}
          </div>
          <div className="">
            <CardTitle className="text-sm text-slate-600 leading-tight text-center">
              {dept.name}
            </CardTitle>
          </div>
          <p className="text-center text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            blanditiis ad consequatur,
          </p>
        </CardHeader>
        <CardContent className="pt-0 bg-primary py-5 absolute bottom-0 w-full">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-primary/10 text-white">
              600+ étudiants
            </Badge>
            <Link to={"detail?" + index}>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-slate-600 hover:bg-secondary cursor-pointer"
              >
                En savoir plus
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
