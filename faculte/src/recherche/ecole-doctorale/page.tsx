import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, BookOpen, Award, Calendar, FileText } from "lucide-react"
import {Link} from "react-router-dom"

export default function EcoleDoctoralePage() {
  const specialites = [
    {
      nom: "Mathématiques et Applications",
      code: "MA",
      directeur: "Prof. RAKOTO Jean Claude",
      doctorants: 8,
      theses_soutenues: 15,
      duree: "3-4 ans",
      conditions: ["Master 2 ou équivalent", "Projet de recherche", "Financement"],
    },
    {
      nom: "Physique et Sciences des Matériaux",
      code: "PSM",
      directeur: "Prof. ANDRY Marie Jeanne",
      doctorants: 6,
      theses_soutenues: 12,
      duree: "3-4 ans",
      conditions: ["Master 2 Physique", "Stage de recherche", "Accord directeur de thèse"],
    },
    {
      nom: "Chimie et Sciences du Vivant",
      code: "CSV",
      directeur: "Dr. RABE Paul Henri",
      doctorants: 9,
      theses_soutenues: 18,
      duree: "3-4 ans",
      conditions: ["Master 2 Chimie/Biologie", "Projet innovant", "Partenariat industriel possible"],
    },
    {
      nom: "Sciences de la Terre et Environnement",
      code: "STE",
      directeur: "Dr. SOLO Michel André",
      doctorants: 4,
      theses_soutenues: 8,
      duree: "3-4 ans",
      conditions: ["Master 2 Géosciences", "Terrain d'étude défini", "Collaboration internationale"],
    },
    {
      nom: "Informatique et Systèmes",
      code: "IS",
      directeur: "Prof. NIVO Clara Hanta",
      doctorants: 7,
      theses_soutenues: 10,
      duree: "3-4 ans",
      conditions: ["Master 2 Informatique", "Projet technologique", "Stage en entreprise"],
    },
  ]

  const theses_recentes = [
    {
      titre: "Modélisation mathématique des épidémies dans les îles de l'océan Indien",
      auteur: "ANDRIAMAHEFA Hery",
      directeur: "Prof. RAKOTO J.C.",
      annee: 2024,
      specialite: "MA",
      mention: "Très honorable avec félicitations",
    },
    {
      titre: "Synthèse et caractérisation de nanomatériaux photovoltaïques à base de minéraux malgaches",
      auteur: "RASOAMANANA Miora",
      directeur: "Prof. ANDRY M.J.",
      annee: 2024,
      specialite: "PSM",
      mention: "Très honorable",
    },
    {
      titre: "Valorisation des plantes endémiques de Madagascar en cosmétique naturelle",
      auteur: "RAKOTONIRINA Fanja",
      directeur: "Dr. RABE P.H.",
      annee: 2023,
      specialite: "CSV",
      mention: "Très honorable avec félicitations",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">École Doctorale</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            L'École Doctorale de la Faculté des Sciences forme les futurs chercheurs et enseignants-chercheurs dans tous
            les domaines des sciences exactes et naturelles.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">34</div>
              <div className="text-sm text-slate-600">Doctorants actuels</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">63</div>
              <div className="text-sm text-slate-600">Thèses soutenues</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">25</div>
              <div className="text-sm text-slate-600">Directeurs de thèse</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">5</div>
              <div className="text-sm text-slate-600">Spécialités</div>
            </CardContent>
          </Card>
        </div>

        {/* Spécialités doctorales */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Spécialités Doctorales</h2>
          <div className="space-y-6">
            {specialites.map((spec, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-slate-800">{spec.nom}</CardTitle>
                      <CardDescription className="text-lg mt-1">Directeur: {spec.directeur}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {spec.code}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Statistiques */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{spec.doctorants}</div>
                      <div className="text-sm text-slate-600">Doctorants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{spec.theses_soutenues}</div>
                      <div className="text-sm text-slate-600">Thèses soutenues</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{spec.duree}</div>
                      <div className="text-sm text-slate-600">Durée</div>
                    </div>
                  </div>

                  {/* Conditions d'admission */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Conditions d'admission</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {spec.conditions.map((condition, i) => (
                        <li key={i}>• {condition}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Thèses récemment soutenues */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Thèses Récemment Soutenues</h2>
          <div className="space-y-4">
            {theses_recentes.map((these, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800">{these.titre}</CardTitle>
                  <CardDescription>
                    Par {these.auteur} • Dirigée par {these.directeur} • {these.annee}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge variant="outline">{these.specialite}</Badge>
                      <Badge variant={these.mention.includes("félicitations") ? "default" : "secondary"}>
                        {these.mention}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Résumé
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Processus d'inscription */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Processus d'Inscription Doctorale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Calendrier 2024-2025</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Dépôt des candidatures:</span>
                    <span className="font-medium">15 Mars - 30 Avril</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sélection des dossiers:</span>
                    <span className="font-medium">Mai</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Entretiens:</span>
                    <span className="font-medium">Juin</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Résultats:</span>
                    <span className="font-medium">Juillet</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Inscription:</span>
                    <span className="font-medium">Septembre</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Dossier de Candidature</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• CV détaillé</li>
                  <li>• Diplômes et relevés de notes</li>
                  <li>• Projet de recherche (10 pages max)</li>
                  <li>• Lettres de recommandation (2)</li>
                  <li>• Lettre de motivation</li>
                  <li>• Accord de principe d'un directeur de thèse</li>
                  <li>• Justificatifs de financement</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financement et bourses */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Financement et Bourses Doctorales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Bourses Nationales</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Bourse MESUPRES: 200 000 Ar/mois</li>
                  <li>• Bourse d'excellence: 300 000 Ar/mois</li>
                  <li>• Allocation de recherche: 150 000 Ar/mois</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Bourses Internationales</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Bourse AUF: 800 €/mois</li>
                  <li>• Coopération française: 1200 €/mois</li>
                  <li>• Erasmus Mundus: 1400 €/mois</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Autres Financements</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Contrats industriels</li>
                  <li>• Projets de recherche</li>
                  <li>• Cofinancements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/recherche">Retour à la Recherche</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/formation/inscription">Candidater</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/recherche/theses">Toutes les Thèses</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
