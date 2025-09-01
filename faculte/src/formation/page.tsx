// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award, Calendar, DollarSign, Briefcase } from "lucide-react"
import {Link} from "react-router-dom"
// import Image from "next/image"

export default function FormationPage() {
  const departements = [
    {
      name: "Mathématiques et Informatique",
      to: "/formation/mathematiques-informatique",
      description: "Formation en mathématiques pures et appliquées, informatique théorique et pratique",
      niveaux: ["Licence", "Master", "Doctorat"],
      effectifs: "450 étudiants",
    },
    {
      name: "MIT (MISA) - Mention Informatique et Technologique",
      to: "/formation/mit",
      description: "Formation pluridisciplinaire en informatique, mathématiques et techniques appliquées",
      niveaux: ["Licence", "Master"],
      effectifs: "320 étudiants",
    },
    {
      name: "Physique",
      to: "/formation/physique",
      description: "Physique fondamentale et appliquée, physique des matériaux",
      niveaux: ["Licence", "Master", "Doctorat"],
      effectifs: "280 étudiants",
    },
    {
      name: "Chimie",
      to: "/formation/chimie",
      description: "Chimie générale, organique, analytique et industrielle",
      niveaux: ["Licence", "Master", "Doctorat"],
      effectifs: "350 étudiants",
    },
    {
      name: "Biologie/Sciences de la Vie",
      to: "/formation/biologie",
      description: "Biologie générale, écologie, biotechnologies",
      niveaux: ["Licence", "Master", "Doctorat"],
      effectifs: "520 étudiants",
    },
    {
      name: "Géologie/Sciences de la Terre",
      to: "/formation/geologie",
      description: "Géologie, géophysique, sciences de l'environnement",
      niveaux: ["Licence", "Master", "Doctorat"],
      effectifs: "180 étudiants",
    },
  ]

  const parcoursProf = [
    {
      name: "IGCRR",
      fullName: "Ingénierie en Gestion de Catastrophe et Réduction des Risques",
      to: "/formation/igcrr",
      description: "Formation spécialisée en gestion des risques naturels et technologiques",
      duree: "2 ans (Master)",
      debouches: "Gestionnaire de risques, Expert en catastrophes naturelles",
    },
    {
      name: "IPSS",
      fullName: "Ingénierie en Physique des Signaux et Systèmes",
      to: "/formation/ipss",
      description: "Formation en traitement du signal et systèmes embarqués",
      duree: "2 ans (Master)",
      debouches: "Ingénieur en télécommunications, Développeur systèmes embarqués",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Formations</h1>
              <p className="text-xl text-muted-foreground">
                Découvrez nos programmes d'excellence en sciences et technologies
              </p>
              {/* <div className="mt-8">
                <Image
                  src="/departement.png"
                  alt="Bâtiments de formation de la Faculté des Sciences"
                  width={800}
                  height={400}
                  className="rounded-lg mx-auto shadow-lg"
                />
              </div> */}
            </div>

            {/* Actions rapides */}
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              <Button asChild className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link to="/formation/inscription">
                  <BookOpen className="h-6 w-6" />
                  <span>S'inscrire</span>
                </Link>
              </Button>
              {/* <Button
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <Link to="/formation/calendrier">
                  <Calendar className="h-6 w-6" />
                  <span>Calendrier</span>
                </Link>
              </Button> */}
              <Button
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <Link to="/formation/frais">
                  <DollarSign className="h-6 w-6" />
                  <span>Frais de scolarité</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <Link to="/formation/bourses">
                  <Award className="h-6 w-6" />
                  <span>Bourses</span>
                </Link>
              </Button>
            </div>

            {/* Départements */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Départements et Filières</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {departements.map((dept) => (
                  <Card key={dept.to} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{dept.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{dept.effectifs}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{dept.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dept.niveaux.map((niveau) => (
                          <Badge key={niveau} variant="secondary">
                            {niveau}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild className="w-full">
                        <Link to={dept.to}>Découvrir le programme</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Parcours professionnalisants */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Parcours Professionnalisants</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {parcoursProf.map((parcours) => (
                  <Card key={parcours.to} className="hover:shadow-lg transition-shadow border-accent/20">
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-accent text-accent-foreground">{parcours.name}</Badge>
                        <Badge variant="outline">{parcours.duree}</Badge>
                      </div>
                      <CardTitle className="text-lg">{parcours.fullName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{parcours.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2">Débouchés:</h4>
                        <p className="text-sm text-muted-foreground">{parcours.debouches}</p>
                      </div>
                      <Button asChild className="w-full">
                        <Link to={parcours.to}>En savoir plus</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Informations générales */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Informations Générales</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-accent" />
                      <span>Insertion Professionnelle</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Taux d'insertion:</span>
                        <span className="font-semibold text-accent">85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Délai moyen:</span>
                        <span className="font-semibold">6 mois</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Stages obligatoires:</span>
                        <span className="font-semibold">Oui</span>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                      {/* <Link to="/formation/stages">Voir les stages</Link> */}
                      <Link to="/formation/">Voir les stages</Link>

                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-accent" />
                      <span>Bourses et Aides</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Bourses d'État:</span>
                        <span className="font-semibold text-accent">200+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Bourses d'excellence:</span>
                        <span className="font-semibold">50+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Aides sociales:</span>
                        <span className="font-semibold">Disponibles</span>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                      <Link to="/formation">Demander une bourse</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-accent" />
                      <span>Calendrier Académique</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Rentrée:</span>
                        <span className="font-semibold">Octobre 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Inscriptions:</span>
                        <span className="font-semibold text-accent">Ouvertes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Examens S1:</span>
                        <span className="font-semibold">Janvier 2026</span>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                      <Link to="/formation">Voir le calendrier</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
