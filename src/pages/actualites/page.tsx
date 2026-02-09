import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BACKEND_ADMIN_URL } from "@/lib/api";
import { useActuality } from "@/hooks/use-actuality"

export default function ActualitesPage() {

  const { actualities } = useActuality();
  console.log("Data from api/actualite/actualities <<<< ", JSON.stringify(actualities, null, 2));

  const getCategoryColor = (categorie: string) => {
    switch (categorie) {
      case "Sport":
        return "bg-emerald-500 text-white font-medium";
      case "Environnement":
        return "bg-green-600 text-white font-medium";
      case "Événement":
        return "bg-blue-600 text-white font-medium";
      case "Pédagogie":
        return "bg-purple-600 text-white font-medium";
      case "Conférence":
        return "bg-orange-600 text-white font-medium";
      default:
        return "bg-slate-600 text-white font-medium";
    }
  };

  if (actualities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-slate-600">Aucune actualité disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <section className="relative overflow-hidden mb-12 sm:mb-16">
        <div className="absolute inset-0">
          <img
            src="/fs_facade_1.jpg"
            alt="Actualités"
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white-900/80 via-gray-800/60"></div>
        </div>
        <div className="relative z-10 text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Actualités
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Suivez la vie de notre faculté : événements, découvertes et réussites
          </p>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-600">
              Toutes les actualités
            </h1>
            <p className="text-sm md:text-lg mt-2">
              Retrouvez ici toutes les informations marquantes de la faculté
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actualities.map((actualite) => (
              <motion.div
                key={actualite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="relative border-0 t-0 p-0 rounded-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/90 backdrop-blur-sm h-full overflow-hidden">
                  <Link to={`/actualites/${actualite.id}`}>
                    <CardHeader className="flex flex-col gap-4 p-0">
                      <div className="relative w-full h-60 overflow-hidden flex items-start">
                        {actualite.media && actualite.media.length > 0 ? (
                          <img
                            src={`${BACKEND_ADMIN_URL}${actualite.media[0].url}`}
                            alt={actualite.title}
                            className="w-full h-auto"
                          />
                        ) : (
                          <div className="w-full h-40 bg-slate-100 flex items-center justify-center">
                            <Calendar className="h-10 w-10 text-slate-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute z-20 top-4 left-4 flex gap-2">
                          <Badge className={`${getCategoryColor(actualite.category)} px-3 py-1 border-0 rounded-full shadow-sm`}>
                            {actualite.category}
                          </Badge>
                          {actualite.isUrgent && (
                            <Badge variant="destructive" className="px-3 py-1 border-0 rounded-full flex items-center gap-1 shadow-sm animate-pulse">
                              <AlertCircle className="h-3 w-3" />
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <div className="absolute z-20 bottom-5 left-5 right-5">
                          <CardTitle className="text-sm text-white leading-tight font-bold drop-shadow-md">
                            {actualite.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-4">
                      <div className="flex flex-col gap-2.5 mb-4">
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          {actualite.beginedAt && (
                            <div className="flex items-center gap-1.5 bg-slate-100/50 dark:bg-slate-800/50 px-2 py-1 rounded-lg">
                              <Calendar className="h-3 w-3 text-primary" />
                              <span>{new Date(actualite.beginedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              <span className="mx-1 text-slate-300">|</span>
                              <Clock className="h-3 w-3 text-primary" />
                              <span>{new Date(actualite.beginedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          )}
                          {actualite.finishAt && (
                            <div className="flex items-center gap-1.5 bg-primary/5 text-primary px-2 py-1 rounded-lg border border-primary/10">
                              <span className="text-[9px] opacity-70">AU</span>
                              <span>{new Date(actualite.finishAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              <span className="mx-1 opacity-20">|</span>
                              <span>{new Date(actualite.finishAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          )}
                        </div>
                        {actualite.location && (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 w-fit px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-800/30">
                            <MapPin className="h-3 w-3 text-emerald-600" />
                            <span className="truncate max-w-[220px]">{actualite.location}</span>
                          </div>
                        )}
                      </div>
                      <p className="line-clamp-3 text-slate-600 dark:text-slate-400 text-sm mb-5 leading-relaxed">
                        {actualite.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-2">
                          <User className="h-3 w-3 opacity-50" />
                          Fac Science
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[10px] font-bold uppercase tracking-wider text-primary hover:bg-primary/10 group h-8 rounded-full px-4"
                        >
                          Lire la suite
                          <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <Card className="max-w-2xl mx-auto rounded-none text-center border-0 shadow-2xl bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl text-slate-900">
                Restez informés
              </CardTitle>
              <CardDescription className="text-lg text-slate-600 leading-relaxed">
                Recevez les dernières actualités de la Faculté des Sciences directement dans votre boîte mail.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-4 border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:border-border focus:outline-none transition-colors"
                />
                <button className="bg-primary text-primary-foreground px-8 py-4 font-medium m-0 h-full rounded-none border-2 border-primary cursor-pointer">
                  S'abonner
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
