import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
export default function MentionSkeleton() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 + 0.1 }}
      >
        <Card className="relative border-0 t-0 p-0 rounded-none shadow-none">
          <CardHeader className="flex flex-col gap-4 p-0">
            <div className="relative w-full h-60 overflow-hidden flex items-start">
              <Skeleton className="w-full h-full bg-gray-300" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0 bottom-0 w-full space-y-2">
            <Skeleton className="w-full h-6 rounded-full  bg-gray-300" />
            <Skeleton className="w-2/3 h-6 rounded-full  bg-gray-300" />
            <div className="flex items-center justify-between mt-2">
              <span className="text-slate-600 font-medium text-xs flex gap-1">
                <Skeleton className="w-20 h-6 rounded-full  bg-gray-300" />
              </span>
              <Skeleton className="w-20 h-6 rounded-full  bg-gray-300" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
