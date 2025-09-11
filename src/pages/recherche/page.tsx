import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Building, Globe, GraduationCap } from "lucide-react"
import {Link} from "react-router-dom"

export default function RecherchePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Recherche Scientifique</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            La Faculté des Sciences d'Antananarivo est un centre d'excellence en recherche, contribuant au développement
            scientifique de Madagascar et de la région de l'Océan Indien.
          </p>
        </div>

        {/* Navigation rapide */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Link to="/recherche/laboratoires">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Laboratoires</h3>
              </CardContent>
            </Card>
          </Link>
          <Link to="/recherche/projets">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Projets</h3>
              </CardContent>
            </Card>
          </Link>
          <Link to="/recherche/publications">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Publications</h3>
              </CardContent>
            </Card>
          </Link>
          <Link to="/recherche/ecole-doctorale">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold">École Doctorale</h3>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-sm text-slate-600">Laboratoires</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">45</div>
              <div className="text-sm text-slate-600">Projets actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">180</div>
              <div className="text-sm text-slate-600">Publications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">25</div>
              <div className="text-sm text-slate-600">Doctorants</div>
            </CardContent>
          </Card>
        </div>

        {/* Laboratoires principaux */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Laboratoires de Recherche</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Laboratoire de Mathématiques et Applications",
                code: "LMA",
                specialites: ["Analyse", "Algèbre", "Géométrie", "Statistiques"],
                directeur: "Prof. RAKOTO Jean",
              },
              {
                name: "Laboratoire de Physique des Matériaux",
                code: "LPM",
                specialites: ["Nanomatériaux", "Cristallographie", "Optique"],
                directeur: "Prof. ANDRY Marie",
              },
              {
                name: "Laboratoire de Chimie Organique",
                code: "LCO",
                specialites: ["Synthèse", "Catalyse", "Produits naturels"],
                directeur: "Dr. RABE Paul",
              },
              {
                name: "Laboratoire de Biologie Moléculaire",
                code: "LBM",
                specialites: ["Génétique", "Biotechnologie", "Microbiologie"],
                directeur: "Prof. HERY Sophie",
              },
              {
                name: "Laboratoire de Géosciences",
                code: "LGS",
                specialites: ["Géologie", "Minéralogie", "Paléontologie"],
                directeur: "Dr. SOLO Michel",
              },
              {
                name: "Laboratoire d'Informatique",
                code: "LI",
                specialites: ["IA", "Réseaux", "Développement"],
                directeur: "Prof. NIVO Clara",
              },
            ].map((lab, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{lab.name}</CardTitle>
                    <Badge variant="secondary">{lab.code}</Badge>
                  </div>
                  <CardDescription>Directeur: {lab.directeur}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {lab.specialites.map((spec, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Projets en cours */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Projets de Recherche en Cours</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                titre: "Biodiversité Marine de Madagascar",
                financement: "AUF - 50 000 €",
                duree: "2023-2025",
                equipe: "8 chercheurs",
                statut: "En cours",
              },
              {
                titre: "Énergies Renouvelables Tropicales",
                financement: "MESUPRES - 30 000 €",
                duree: "2024-2026",
                equipe: "6 chercheurs",
                statut: "Démarrage",
              },
              {
                titre: "Intelligence Artificielle pour l'Agriculture",
                financement: "Coopération Française - 40 000 €",
                duree: "2023-2024",
                equipe: "5 chercheurs",
                statut: "Finalisation",
              },
            ].map((projet, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{projet.titre}</CardTitle>
                  <div className="flex justify-between items-center">
                    <Badge
                      variant={
                        projet.statut === "En cours"
                          ? "default"
                          : projet.statut === "Démarrage"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {projet.statut}
                    </Badge>
                    <span className="text-sm text-slate-600">{projet.duree}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Financement:</span>
                      <span className="font-medium">{projet.financement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Équipe:</span>
                      <span className="font-medium">{projet.equipe}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Collaborations internationales */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Collaborations Internationales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { pays: "France", universites: ["Sorbonne", "Lyon 1", "Montpellier"] },
              { pays: "Maurice", universites: ["Université de Maurice"] },
              { pays: "Réunion", universites: ["Université de La Réunion"] },
              { pays: "Canada", universites: ["Université Laval", "McGill"] },
            ].map((collab, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    {collab.pays}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    {collab.universites.map((univ, i) => (
                      <li key={i} className="text-slate-600">
                        • {univ}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/recherche/publications/">Voir les Publications</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/recherche">Thèses Soutenues</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/recherche">Équipements</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
