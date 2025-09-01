import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Users, Mail, Phone, MapPin } from "lucide-react"
import {Link} from "react-router-dom"

export default function LaboratoiresPage() {
  const laboratoires = [
    {
      nom: "Laboratoire de Mathématiques et Applications",
      code: "LMA",
      directeur: "Prof. RAKOTO Jean Claude",
      email: "lma@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 45",
      localisation: "Bâtiment A, 2ème étage",
      personnel: 12,
      doctorants: 8,
      specialites: [
        "Analyse fonctionnelle",
        "Algèbre commutative",
        "Géométrie différentielle",
        "Statistiques appliquées",
      ],
      equipements: ["Serveurs de calcul", "Logiciels spécialisés", "Bibliothèque mathématique"],
      projets: [
        "Modélisation mathématique des écosystèmes malgaches",
        "Optimisation des réseaux de transport urbain",
        "Analyse statistique des données climatiques",
      ],
    },
    {
      nom: "Laboratoire de Physique des Matériaux",
      code: "LPM",
      directeur: "Prof. ANDRY Marie Jeanne",
      email: "lpm@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 46",
      localisation: "Bâtiment B, 1er étage",
      personnel: 10,
      doctorants: 6,
      specialites: ["Nanomatériaux", "Cristallographie", "Optique quantique", "Physique des semi-conducteurs"],
      equipements: ["Microscope électronique", "Diffractomètre X", "Spectromètre Raman", "Four haute température"],
      projets: [
        "Synthèse de nanomatériaux pour l'énergie solaire",
        "Caractérisation de minéraux malgaches",
        "Développement de capteurs optiques",
      ],
    },
    {
      nom: "Laboratoire de Chimie Organique et Naturelle",
      code: "LCON",
      directeur: "Dr. RABE Paul Henri",
      email: "lcon@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 47",
      localisation: "Bâtiment C, Rez-de-chaussée",
      personnel: 8,
      doctorants: 5,
      specialites: ["Synthèse organique", "Produits naturels", "Catalyse", "Chimie médicinale"],
      equipements: ["RMN 400 MHz", "Chromatographe HPLC", "Spectromètre de masse", "Réacteurs sous pression"],
      projets: [
        "Valorisation des plantes médicinales malgaches",
        "Synthèse de nouveaux catalyseurs",
        "Développement de médicaments naturels",
      ],
    },
    {
      nom: "Laboratoire de Biologie Moléculaire et Cellulaire",
      code: "LBMC",
      directeur: "Prof. HERY Sophie Claudine",
      email: "lbmc@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 48",
      localisation: "Bâtiment D, 1er étage",
      personnel: 15,
      doctorants: 10,
      specialites: ["Génétique moléculaire", "Biotechnologie", "Microbiologie", "Biologie cellulaire"],
      equipements: ["Séquenceur ADN", "PCR temps réel", "Microscope confocal", "Fermenteurs"],
      projets: [
        "Génomique de la biodiversité malgache",
        "Biotechnologie microbienne",
        "Thérapie génique des maladies tropicales",
      ],
    },
    {
      nom: "Laboratoire de Géosciences",
      code: "LGS",
      directeur: "Dr. SOLO Michel André",
      email: "lgs@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 49",
      localisation: "Bâtiment E, Rez-de-chaussée",
      personnel: 9,
      doctorants: 4,
      specialites: ["Géologie structurale", "Minéralogie", "Paléontologie", "Hydrogéologie"],
      equipements: ["Microscope pétrographique", "Analyseur XRF", "Sismographe", "Foreuse portable"],
      projets: [
        "Cartographie géologique de Madagascar",
        "Ressources minérales et énergétiques",
        "Paléontologie des vertébrés fossiles",
      ],
    },
    {
      nom: "Laboratoire d'Informatique et Systèmes",
      code: "LIS",
      directeur: "Prof. NIVO Clara Hanta",
      email: "lis@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 50",
      localisation: "Bâtiment F, 2ème étage",
      personnel: 11,
      doctorants: 7,
      specialites: ["Intelligence artificielle", "Réseaux et sécurité", "Développement logiciel", "Systèmes embarqués"],
      equipements: ["Cluster de calcul", "Serveurs haute performance", "Équipements réseau", "Cartes de développement"],
      projets: [
        "IA pour l'agriculture de précision",
        "Systèmes d'information géographique",
        "Cybersécurité des infrastructures critiques",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Laboratoires de Recherche</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Découvrez nos laboratoires de recherche d'excellence, équipés des dernières technologies et dirigés par des
            chercheurs reconnus internationalement.
          </p>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">6</div>
              <div className="text-sm text-slate-600">Laboratoires</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">65</div>
              <div className="text-sm text-slate-600">Chercheurs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">40</div>
              <div className="text-sm text-slate-600">Doctorants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">18</div>
              <div className="text-sm text-slate-600">Projets actifs</div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des laboratoires */}
        <div className="space-y-8">
          {laboratoires.map((lab, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-slate-800">{lab.nom}</CardTitle>
                    <CardDescription className="text-lg mt-1">Directeur: {lab.directeur}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {lab.code}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informations de contact */}
                <div className="grid md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{lab.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{lab.telephone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <span className="text-sm">{lab.localisation}</span>
                  </div>
                </div>

                {/* Personnel */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{lab.personnel}</div>
                    <div className="text-sm text-slate-600">Chercheurs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{lab.doctorants}</div>
                    <div className="text-sm text-slate-600">Doctorants</div>
                  </div>
                </div>

                {/* Spécialités */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Spécialités de recherche</h4>
                  <div className="flex flex-wrap gap-2">
                    {lab.specialites.map((spec, i) => (
                      <Badge key={i} variant="outline">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Équipements */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Équipements principaux</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {lab.equipements.map((equip, i) => (
                      <li key={i}>• {equip}</li>
                    ))}
                  </ul>
                </div>

                {/* Projets */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Projets en cours</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {lab.projets.map((projet, i) => (
                      <li key={i}>• {projet}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/recherche">Retour à la Recherche</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/recherche/projets">Voir les Projets</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/recherche/equipements">Équipements Détaillés</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
