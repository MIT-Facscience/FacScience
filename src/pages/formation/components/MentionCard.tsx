import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function MentionCard({
  mention,
  index,
}: {
  mention: {
    idMention: string;
    nomMention: string;
    abbreviation?: string;
    logoPath?: string;
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
      <Card className="relative border-0 t-0 p-0 rounded-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/90 backdrop-blur-sm h-full overflow-hidden">
        <CardHeader className="flex flex-col gap-4 p-0">
          <div className="relative w-full h-60 overflow-hidden flex items-start">
            <img
              src={"/public/science.png"}
              alt={`Mention ${mention.nomMention}`}
              className="w-full h-auto"
            />
            <div className="absolute z-20 right-5 top-5 bg-white rounded-full overflow-hidden w-20 h-20">
              <img src={mention.logoPath ? `/${mention.logoPath}` : `/Logo_${mention.abbreviation}.jpg`} 
                className="object-cover h-full w-full" 
                onError={(e) => {
                  e.currentTarget.src = '/fac-science.jpg';
                }}
              />
            </div>
            <div className="absolute z-10 top-0 left-0 w-full h-full inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute z-20 bottom-5 left-5">
              <CardTitle className="text-sm text-white leading-tight text-center">
                {mention.nomMention}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0 bottom-0 w-full">
          <p className="font-medium text-slate-500 text-sm">
              La mention {mention.nomMention} a pour objectif de former les étudiants, en leur offrant des compétences théoriques et pratiques adaptées aux exigences académiques et professionnelles.
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-slate-600 font-medium text-xs flex gap-1">
              <Users className="w-4 h-4" />
              600+ étudiants
            </span>
            <Link to={"detail?" + index}>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-slate-500 hover:bg-primary hover:text-white cursor-pointer"
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
