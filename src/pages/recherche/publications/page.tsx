import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Download, Search, Filter } from "lucide-react"
import {Link} from "react-router-dom"

export default function PublicationsPage() {
  const publications = [
    {
      titre: "Biodiversity Assessment of Madagascar's Marine Ecosystems Using AI-Driven Analysis",
      auteurs: ["RAKOTO J.C.", "ANDRY M.J.", "SMITH P."],
      revue: "Marine Biology International",
      annee: 2024,
      type: "Article",
      impact: "Q1",
      citations: 15,
      doi: "10.1016/j.marbi.2024.01.015",
      laboratoire: "LBM",
      resume:
        "Cette étude propose une approche innovante fondée sur l'Intelligence Artificielle pour évaluer la biodiversité des écosystèmes marins malgaches...",
    },
    {
      titre: "Novel Nanomaterials from Madagascar Minerals for Solar Energy Applications",
      auteurs: ["ANDRY M.J.", "RABE P.H.", "JOHNSON K."],
      revue: "Advanced Materials Science",
      annee: 2024,
      type: "Article",
      impact: "Q1",
      citations: 23,
      doi: "10.1002/adma.2024.12345",
      laboratoire: "LPM",
      resume:
        "Développement de nouveaux nanomatériaux à partir de minéraux malgaches pour des applications dans l'énergie solaire...",
    },
    {
      titre: "Mathematical Modeling of Urban Transport Networks in Antananarivo",
      auteurs: ["RAKOTO J.C.", "NIVO C.H."],
      revue: "Transportation Research Part B",
      annee: 2023,
      type: "Article",
      impact: "Q1",
      citations: 31,
      doi: "10.1016/j.trb.2023.08.012",
      laboratoire: "LMA",
      resume:
        "Modélisation mathématique avancée des réseaux de transport urbain d'Antananarivo pour optimiser la mobilité...",
    },
    {
      titre: "Medicinal Plants of Madagascar: Phytochemical Analysis and Therapeutic Potential",
      auteurs: ["RABE P.H.", "HERY S.C.", "MARTIN L."],
      revue: "Journal of Ethnopharmacology",
      annee: 2023,
      type: "Article",
      impact: "Q2",
      citations: 42,
      doi: "10.1016/j.jep.2023.116789",
      laboratoire: "LCON",
      resume:
        "Analyse phytochimique complète des plantes médicinales malgaches et évaluation de leur potentiel thérapeutique...",
    },
    {
      titre: "Geological Survey and Mineral Resources Assessment of Eastern Madagascar",
      auteurs: ["SOLO M.A.", "BROWN R.", "WILSON T."],
      revue: "Economic Geology",
      annee: 2023,
      type: "Article",
      impact: "Q1",
      citations: 18,
      doi: "10.2113/econgeo.118.5.1234",
      laboratoire: "LGS",
      resume: "Étude géologique approfondie et évaluation des ressources minérales de l'Est de Madagascar...",
    },
    {
      titre: "AI-Driven Precision Agriculture for Tropical Crops",
      auteurs: ["NIVO C.H.", "RAKOTO J.C.", "DAVIS M."],
      revue: "Computers and Electronics in Agriculture",
      annee: 2024,
      type: "Article",
      impact: "Q1",
      citations: 8,
      doi: "10.1016/j.compag.2024.107890",
      laboratoire: "LIS",
      resume:
        "Application de l'Intelligence Artificielle pour l'agriculture de précision adaptée aux cultures tropicales...",
    },
    {
      titre: "Microbial Diversity in Madagascar's Unique Ecosystems",
      auteurs: ["HERY S.C.", "GARCIA A.", "THOMPSON J."],
      revue: "Applied and Environmental Microbiology",
      annee: 2023,
      type: "Article",
      impact: "Q1",
      citations: 27,
      doi: "10.1128/AEM.01234-23",
      laboratoire: "LBMC",
      resume: "Exploration de la diversité microbienne dans les écosystèmes uniques de Madagascar...",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Publications Scientifiques</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Découvrez les travaux de recherche publiés par nos chercheurs dans des revues scientifiques internationales
            de premier plan.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">180</div>
              <div className="text-sm text-slate-600">Publications totales</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">45</div>
              <div className="text-sm text-slate-600">Publications 2024</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1,250</div>
              <div className="text-sm text-slate-600">Citations totales</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">2.8</div>
              <div className="text-sm text-slate-600">H-index moyen</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres et Recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input placeholder="Rechercher..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Année" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Laboratoire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LMA">LMA</SelectItem>
                  <SelectItem value="LPM">LPM</SelectItem>
                  <SelectItem value="LCON">LCON</SelectItem>
                  <SelectItem value="LBMC">LBMC</SelectItem>
                  <SelectItem value="LGS">LGS</SelectItem>
                  <SelectItem value="LIS">LIS</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="conference">Conférence</SelectItem>
                  <SelectItem value="livre">Livre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des publications */}
        <div className="space-y-6">
          {publications.map((pub, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-slate-800 mb-2">{pub.titre}</CardTitle>
                    <CardDescription className="text-base">{pub.auteurs.join(", ")}</CardDescription>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Badge variant={pub.impact === "Q1" ? "default" : "secondary"}>{pub.impact}</Badge>
                    <Badge variant="outline">{pub.laboratoire}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Informations de publication */}
                <div className="grid md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-slate-600">Revue:</span>
                    <div className="font-medium">{pub.revue}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-600">Année:</span>
                    <div className="font-medium">{pub.annee}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-600">Citations:</span>
                    <div className="font-medium">{pub.citations}</div>
                  </div>
                </div>

                {/* Résumé */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Résumé</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{pub.resume}</p>
                </div>

                {/* DOI et actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-slate-600">
                    DOI: <span className="font-mono">{pub.doi}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Voir en ligne
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Précédent
            </Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Suivant
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/recherche">Retour à la Recherche</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/recherche/theses">Thèses Soutenues</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
