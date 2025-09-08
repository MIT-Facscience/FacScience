import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
export default function SpecialiteItems() {
  return (
    <>
      <motion.div>
        <Card className="shadow-lg rounded-none w-full border-none mt-5">
          <CardTitle>
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
              <GraduationCap />
            </div>
          </CardTitle>
          <CardContent></CardContent>
        </Card>
      </motion.div>
    </>
  );
}
