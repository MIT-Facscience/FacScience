import { Link } from "react-router-dom";
import { MessageSquareWarning, House } from "lucide-react";

export default function ConstructionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 text-indigo-600 px-4 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-50 animate-float-slow"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-50 animate-float-slower"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-40 animate-float-slowest"></div>
      </div>

      <div className="max-w-2xl text-center space-y-8 relative z-10 px-6 md:px-10">
        
        {/* Icône principale */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 w-56 h-56 bg-indigo-300 rounded-full blur-2xl opacity-30 animate-float-slow"></div>
            <div className="relative bg-white p-8 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-500">
              <MessageSquareWarning className="w-24 h-24 text-secondary" />
            </div>
          </div>
        </div>

        {/* Titre principal */}
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight animate-fade-in">
          Site en construction
        </h1>

        {/* Sous-titre */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100">
          <p className="text-gray-700 text-xl leading-relaxed">
            Cette page est encore en développement.
            <br />
            <span className="font-semibold text-primary">Merci pour votre patience</span>
          </p>
          <p className="text-gray-600 mt-4">
            Vous pouvez accéder à l'accueil via le bouton ci-dessous.
          </p>
        </div>

        {/* Bouton avec effet */}
        <div className="pt-4">
          <Link
            to="/Home"
            className="group relative inline-flex items-center gap-3 px-8 py-4
              bg-gradient-to-r from-primary to-purple-600
              text-white font-semibold rounded-2xl
              shadow-lg shadow-indigo-300/30
              transition-all duration-300
              hover:shadow-indigo-400/50 hover:-translate-y-1 hover:scale-105
              before:absolute before:inset-0 before:rounded-2xl before:bg-white/10
              before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            <House className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            <span>Aller à l'accueil</span>
          </Link>
        </div>

        {/* Barre de progression décorative */}
        <div className="pt-8">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-primary via-pink-500 to-yellow-500 h-full rounded-full animate-progress" style={{width: '65%'}}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2 font-medium">Développement en cours...</p>
        </div>
      </div>

      {/* Footer amélioré */}
      <footer className="mt-16 text-center relative z-10 bg-white/70 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg border border-indigo-100">
        <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-300 to-transparent mx-auto mb-4"></div>
        <p className="text-base text-gray-700 font-semibold">
          &copy; 2025 Faculté des Sciences – Université d'Antananarivo
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Établissement public d'enseignement supérieur
        </p>
        <p className="text-xs text-gray-500 mt-3">
          Tous droits réservés
        </p>
      </footer>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 65%; }
        }
        .animate-progress {
          animation: progress 2s ease-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        .animate-float-slower {
          animation: float-slower 8s ease-in-out infinite;
        }
        @keyframes float-slowest {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-float-slowest {
          animation: float-slowest 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}