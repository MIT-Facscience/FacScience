import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Share2, Clock, Eye, MapPin } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { BACKEND_ADMIN_URL } from "@/lib/api";
import type { Actuality } from "@/lib/types";

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

export default function ActualiteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [actualite, setActualite] = useState<Actuality | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`${BACKEND_ADMIN_URL}/api/Actualite/actualities`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des données");
        return res.json();
      })
      .then((data: Actuality[]) => {
        const found = data.find((item) => item.id === Number(id));
        if (found) {
          setActualite(found);
        } else {
          setError("Actualité introuvable");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Une erreur est survenue lors de la récupération de l'actualité");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium">Chargement de l'actualité...</p>
        </div>
      </div>
    );
  }

  if (error || !actualite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-md mx-auto bg-card rounded-2xl shadow-xl border border-border">
          <div className="h-20 w-20 bg-red-50 dark:bg-red-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Eye className="h-10 w-10 text-red-500 opacity-50" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{error || "Actualité introuvable"}</h2>
          <p className="text-muted-foreground mb-8">
            Désolé, nous ne parvenons pas à trouver l'article que vous recherchez. Il a peut-être été supprimé ou déplacé.
          </p>
          <Button
            className="w-full h-12 rounded-full font-bold uppercase tracking-wider shadow-lg shadow-primary/20"
            onClick={() => navigate("/actualites")}
          >
            Retour aux actualités
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={actualite.media && actualite.media.length > 0
              ? `${BACKEND_ADMIN_URL}${actualite.media[0].url}`
              : "/placeholder.svg"}
            alt={actualite.title}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-800/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/60 via-transparent to-amber-900/40"></div>
        </div>

        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-6 pb-16">
            <Button
              className="group inline-flex items-center px-6 py-3 mb-8 bg-white/10 backdrop-blur-md rounded-full text-white/90 hover:bg-white/20 transition-all duration-300 border border-white/20"
              variant="ghost"
              onClick={() => navigate("/actualites")}
            >
              <ArrowLeft className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Retour aux actualités</span>
            </Button>

            <div className="max-w-4xl">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6 ${getCategoryColor(
                  actualite.category
                )}`}
              >
                {actualite.category}
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {actualite.title}
              </h1>

              <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                {actualite.description}
              </p>

              <div className="flex flex-wrap items-center gap-8 text-white/80">
                {actualite.beginedAt && (
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">
                      {new Date(actualite.beginedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                )}
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">
                    Administration
                  </span>
                </div>
                {actualite.location && (
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{actualite.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section avec image */}
      {/* <section className="relative h-96 overflow-hidden">
        <img
          src={actualite.image || "/placeholder.svg"}
          alt={actualite.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6 xl:px-8">
            <Link to="/actualites">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux actualités
              </Button>
            </Link>
            <Badge
              className={`${getCategoryColor(
                actualite.categorie
              )} px-4 py-2 mb-4`}
            >
              {actualite.categorie}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              {actualite.title}
            </h1>
            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {actualite.date}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {actualite.auteur}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contenu de l'article */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-8">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {actualite.description}
                  </p>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  {actualite.content?.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-slate-700 leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Articles similaires (Optionnel, masqué si pas de données) */}
          </div>
        </div>
      </section>
    </div>
  );
}
