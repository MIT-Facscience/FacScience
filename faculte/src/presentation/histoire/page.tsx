// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, Users, BookOpen } from "lucide-react"

export default function HistoirePage() {
  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Histoire et Mission</h1>
              <p className="text-xl text-muted-foreground">
                Découvrez l'histoire et la mission de la Faculté des Sciences de l'Université d'Antananarivo
              </p>
            </div>

            <div className="space-y-8">
              {/* Histoire */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-6 w-6 text-purple-600" />
                    <CardTitle className="text-2xl">Notre Histoire</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-6">
                    <div className="border-l-4 border-purple-600 pl-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">1961</Badge>
                        <h3 className="text-lg font-semibold">Création de la Faculté</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Fondation de la Faculté des Sciences dans le cadre de la création de l'Université de Madagascar,
                        avec pour objectif de former les cadres scientifiques nécessaires au développement du pays.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-600 pl-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">1975</Badge>
                        <h3 className="text-lg font-semibold">Restructuration</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Réorganisation de la faculté avec la création de nouveaux départements et l'adaptation des
                        programmes aux besoins nationaux de développement scientifique et technologique.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-600 pl-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">1988</Badge>
                        <h3 className="text-lg font-semibold">Modernisation</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Mise en place du système LMD et modernisation des infrastructures avec l'appui de partenaires
                        internationaux pour améliorer la qualité de l'enseignement.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-600 pl-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">2020</Badge>
                        <h3 className="text-lg font-semibold">Innovation Numérique</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Intégration des technologies numériques dans l'enseignement et développement de nouveaux
                        parcours professionnalisants adaptés aux défis contemporains.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mission */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Target className="h-6 w-6 text-purple-600" />
                    <CardTitle className="text-2xl">Notre Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <BookOpen className="h-6 w-6 text-purple-600 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Formation d'Excellence</h3>
                          <p className="text-muted-foreground text-sm">
                            Dispenser un enseignement supérieur de qualité dans les domaines scientifiques fondamentaux
                            et appliqués, en phase avec les standards internationaux.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Users className="h-6 w-6 text-purple-600 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">Développement des Compétences</h3>
                          <p className="text-muted-foreground text-sm">
                            Former des scientifiques et des techniciens supérieurs capables de contribuer au
                            développement économique et social de Madagascar.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-purple-600/10 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 text-purple-600">Recherche et Innovation</h3>
                        <p className="text-sm">
                          Promouvoir la recherche scientifique et l'innovation technologique pour répondre aux défis
                          nationaux et internationaux.
                        </p>
                      </div>

                      <div className="bg-purple-600/10 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2 text-purple-600">Partenariat et Coopération</h3>
                        <p className="text-sm">
                          Développer des partenariats stratégiques avec les institutions nationales et internationales
                          pour l'excellence académique.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Valeurs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Nos Valeurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-2">Excellence</h3>
                      <p className="text-sm text-muted-foreground">
                        Recherche constante de la qualité dans l'enseignement et la recherche
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-2">Innovation</h3>
                      <p className="text-sm text-muted-foreground">
                        Adaptation continue aux évolutions scientifiques et technologiques
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-2">Intégrité</h3>
                      <p className="text-sm text-muted-foreground">Respect des principes éthiques et déontologiques</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
