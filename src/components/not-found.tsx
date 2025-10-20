import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-8xl font-bold text-purple-700 mb-4"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl md:text-3xl font-semibold text-gray-800"
      >
        Page non trouvée
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-gray-600 mt-3 max-w-md"
      >
        La page que vous recherchez n’existe pas ou a été déplacée.
        <br />
        Retournez à la page d’accueil pour continuer votre visite.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8"
      >
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-xl shadow hover:bg-purple-800 transition"
        >
          <ArrowLeft size={20} />
          Retour à l’accueil
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 text-sm text-gray-400"
      >
        Faculté des Sciences · Université d’Antananarivo
      </motion.div>
    </div>
  );
}
