import MentionCard from "@/pages/formation/components/MentionCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingFormation from "@/pages/formation/components/LoadingFormation";
import ErrorFormation from "./components/ErrorFormation";
import { BACKEND_URL } from "@/lib/api";

interface Mention {
  idMention: string;
  nomMention: string;
  abbreviation?: string;
  logoPath?: string;
  image: string;
  descriptionMention: string;
  responsable: string;
}

export default function FormationPage() {
  const [mentions, setMentions] = useState<Mention[] | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/Mention/liste`);
        if (!response.ok) throw new Error("Erreur réseau");
        const json = await response.json();
        if (isMounted) setMentions(json);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <LoadingFormation />;
  if (error) return <ErrorFormation error={error} />;

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
                    src="/fs_facade_1.jpg"
                    alt="Histoire de la faculté"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white-900/80 via-gray-800/60"></div>
                </div>
                <div className="relative z-10 text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                    Nos Formations
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                    Découvrez nos mentions et parcours d'excellence scientifique
                  </p>
                </div>
              </motion.div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-600 text-center">
                Nos Mentions disponibles
              </h1>
              <p className="text-sm md:text-lg text-center mb-10 mt-2">
                Voici la liste des mentions disponibles dans notre faculté
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {mentions?.map((mt, index) => (
                  <MentionCard mention={mt} index={index} key={index} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
