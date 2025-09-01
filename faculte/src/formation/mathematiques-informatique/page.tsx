// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Clock, Award, Target } from "lucide-react"
import {Link} from "react-router-dom"

export default function MathInfoPage() {
  const programmes = {
    "Licence 1": {
      semestre1: [
        { code: "MAT101", nom: "Algèbre 1", credits: 6, Credit: 3 },
        { code: "MAT102", nom: "Analyse 1", credits: 6, Credit: 3 },
        { code: "INF101", nom: "Introduction à l'Informatique", credits: 4, Credit: 2 },
        { code: "PHY101", nom: "Physique Générale", credits: 4, Credit: 2 },
        { code: "FRA101", nom: "Français", credits: 2, Credit: 1 },
        { code: "ANG101", nom: "Anglais", credits: 2, Credit: 1 },
        { code: "MLG101", nom: "Malagasy", credits: 2, Credit: 1 },
        { code: "EPS101", nom: "Éducation Physique", credits: 2, Credit: 1 },
      ],
      semestre2: [
        { code: "MAT201", nom: "Algèbre 2", credits: 6, Credit: 3 },
        { code: "MAT202", nom: "Analyse 2", credits: 6, Credit: 3 },
        { code: "INF201", nom: "Programmation 1", credits: 4, Credit: 2 },
        { code: "MAT203", nom: "Géométrie", credits: 4, Credit: 2 },
        { code: "STA201", nom: "Statistiques Descriptives", credits: 4, Credit: 2 },
        { code: "FRA201", nom: "Expression Écrite", credits: 2, Credit: 1 },
        { code: "ANG201", nom: "Anglais Technique", credits: 2, Credit: 1 },
        { code: "INF202", nom: "Bureautique", credits: 2, Credit: 1 },
      ],
    },
    "Licence 2": {
      semestre3: [
        { code: "MAT301", nom: "Algèbre Linéaire", credits: 6, Credit: 3 },
        { code: "MAT302", nom: "Analyse 3", credits: 6, Credit: 3 },
        { code: "INF301", nom: "Programmation 2", credits: 6, Credit: 3 },
        { code: "MAT303", nom: "Probabilités", credits: 4, Credit: 2 },
        { code: "INF302", nom: "Structures de Données", credits: 4, Credit: 2 },
        { code: "MAT304", nom: "Mathématiques Discrètes", credits: 4, Credit: 2 },
      ],
      semestre4: [
        { code: "MAT401", nom: "Analyse Numérique", credits: 6, Credit: 3 },
        { code: "INF401", nom: "Algorithmique Avancée", credits: 6, Credit: 3 },
        { code: "INF402", nom: "Bases de Données", credits: 6, Credit: 3 },
        { code: "MAT402", nom: "Statistiques Inférentielles", credits: 4, Credit: 2 },
        { code: "INF403", nom: "Systèmes d'Exploitation", credits: 4, Credit: 2 },
        { code: "MAT403", nom: "Recherche Opérationnelle", credits: 4, Credit: 2 },
      ],
    },
    "Licence 3": {
      semestre5: [
        { code: "MAT501", nom: "Analyse Fonctionnelle", credits: 6, Credit: 3 },
        { code: "INF501", nom: "Génie Logiciel", credits: 6, Credit: 3 },
        { code: "INF502", nom: "Réseaux Informatiques", credits: 6, Credit: 3 },
        { code: "MAT502", nom: "Modélisation Mathématique", credits: 4, Credit: 2 },
        { code: "INF503", nom: "Intelligence Artificielle", credits: 4, Credit: 2 },
        { code: "PRO501", nom: "Projet Tutoré", credits: 4, Credit: 2 },
      ],
      semestre6: [
        { code: "INF601", nom: "Développement Web", credits: 6, Credit: 3 },
        { code: "MAT601", nom: "Cryptographie", credits: 6, Credit: 3 },
        { code: "INF602", nom: "Sécurité Informatique", credits: 4, Credit: 2 },
        { code: "MAT602", nom: "Optimisation", credits: 4, Credit: 2 },
        { code: "STA601", nom: "Data Mining", credits: 4, Credit: 2 },
        { code: "STG601", nom: "Stage Professionnel", credits: 6, Credit: 3 },
      ],
    },
  }

  const masters = [
    {
      nom: "Master Mathématiques Appliquées",
      description: "Spécialisation en modélisation mathématique et calcul scientifique",
      debouches: "Ingénieur de recherche, Consultant en modélisation, Enseignant-chercheur",
    },
    {
      nom: "Master Informatique",
      description: "Spécialisation en développement logiciel et systèmes d'information",
      debouches: "Ingénieur logiciel, Chef de projet IT, Architecte système",
    },
    {
      nom: "Master Data Science",
      description: "Spécialisation en science des données et intelligence artificielle",
      debouches: "Data Scientist, Analyste de données, Consultant BI",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Mathématiques et Informatique</h1>
              <p className="text-xl text-muted-foreground">
                Formation d'excellence en mathématiques et sciences informatiques
              </p>
            </div>

            {/* Informations générales */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8  mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">450</div>
                  <div className="text-sm text-muted-foreground">Étudiants</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">25</div>
                  <div className="text-sm text-muted-foreground">Enseignants</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">3-5</div>
                  <div className="text-sm text-muted-foreground">Années</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">88%</div>
                  <div className="text-sm text-muted-foreground">Insertion</div>
                </CardContent>
              </Card>
            </div>

            {/* Conditions d'admission */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span>Conditions d'Admission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Licence 1</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Série du Bac:</strong> C ou D (Mathématiques obligatoires)
                      </li>
                      <li>
                        • <strong>Année:</strong> 2020 à 2024
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Admission Directe</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>L2:</strong> Validation L1 (60 ECTS) ou équivalent
                      </li>
                      <li>
                        • <strong>L3:</strong> Validation L2 (120 ECTS) ou équivalent
                      </li>
                      <li>
                        • <strong>M1:</strong> Licence en Math/Info ou équivalent
                      </li>
                      <li>
                        • <strong>M2:</strong> Master 1 validé
                      </li>
                      <li>
                        • <strong>Dossier:</strong> Relevés de notes + entretien
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/formation/inscription">Déposer un Dossier</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Programmes détaillés */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Programmes Détaillés - Licence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {Object.entries(programmes).map(([niveau, semestres]) => (
                    <div key={niveau}>
                      <h3 className="text-xl font-semibold mb-4 text-purple-600">{niveau}</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(semestres).map(([semestre, ues]) => (
                          <div key={semestre} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-3 capitalize">{semestre.replace(/(\d)/, " $1")}</h4>
                            <div className="space-y-2">
                              {ues.map((ue) => (
                                <div key={ue.code} className="flex justify-between items-center text-sm">
                                  <div className="flex-1">
                                    <span className="font-medium">{ue.code}</span> - {ue.nom}
                                  </div>
                                  <div className="flex space-x-2">
                                    <Badge variant="outline">{ue.credits} ECTS</Badge>
                                    <Badge variant="secondary" className="bg-purple-600">Credit {ue.Credit}</Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 pt-3 border-t">
                              <div className="flex justify-between text-sm font-semibold">
                                <span>Total:</span>
                                <span>{ues.reduce((sum, ue) => sum + ue.credits, 0)} ECTS</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Masters */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Masters Spécialisés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {masters.map((master, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-purple-600 mb-2">{master.nom}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{master.description}</p>
                      <div className="mb-3">
                        <h4 className="font-medium text-sm mb-1">Débouchés:</h4>
                        <p className="text-xs text-muted-foreground">{master.debouches}</p>
                      </div>
                      <Badge variant="secondary">2 ans</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Débouchés et insertion */}
            <Card>
              <CardHeader>
                <CardTitle>Débouchés Professionnels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-purple-600">Secteurs d'Activité</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Développement logiciel et applications</li>
                      <li>• Systèmes d'information et bases de données</li>
                      <li>• Recherche et développement</li>
                      <li>• Enseignement et formation</li>
                      <li>• Conseil et audit informatique</li>
                      <li>• Finance et actuariat</li>
                      <li>• Télécommunications</li>
                      <li>• Administration publique</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-purple-600">Métiers Visés</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Développeur / Ingénieur logiciel</li>
                      <li>• Administrateur systèmes et réseaux</li>
                      <li>• Data Scientist / Analyste de données</li>
                      <li>• Chef de projet informatique</li>
                      <li>• Consultant en systèmes d'information</li>
                      <li>• Enseignant-chercheur</li>
                      <li>• Actuaire / Analyste financier</li>
                      <li>• Ingénieur de recherche</li>
                    </ul>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
