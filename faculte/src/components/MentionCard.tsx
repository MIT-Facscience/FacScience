import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import math from "/public/departement.png";
export default function MentionCard({
  dept,
  index,
}: {
  dept: {
    name: string;
    image: string;
    students: string;
    color: string;
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
      <Card className="border-0 rounded-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/90 backdrop-blur-sm h-full overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full h-48 mb-4">
            <img
              src={math}
              alt={`Département ${dept.name}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <CardTitle className="text-lg text-white leading-tight">
                {dept.name}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {dept.students} étudiants
            </Badge>
            <Link to={"detail?" + index}>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 hover:bg-muted cursor-pointer"
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
