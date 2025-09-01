// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Lightbulb, TrendingUp, Users, Globe } from "lucide-react"

export default function VisionPage() {
  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Vision et Objectifs Stratégiques</h1>
              <p className="text-xl text-muted-foreground">
                Notre vision pour l'avenir de l'enseignement scientifique à Madagascar
              </p>
            </div>

            <div className="space-y-8">
              {/* Vision */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Eye className="h-6 w-6 text-purple-600" />
                    <span>Notre Vision</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 bg-purple-600/10 rounded-lg">
                    <h2 className="text-2xl font-bold text-purple-600 mb-4">Vision 2030</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                      "Être une faculté des sciences de référence dans l'Océan Indien, reconnue pour l'excellence de sa
                      formation, l'innovation de sa recherche et sa contribution au développement durable de Madagascar
                      et de la région."
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Objectifs Stratégiques */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Target className="h-6 w-6 text-purple-600" />
                    <span>Objectifs Stratégiques 2024-2030</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Excellence Académique</h3>
                            <Badge variant="secondary">Priorité 1</Badge>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Atteindre 90% de taux de réussite en L1</li>
                          <li>• Obtenir l'accréditation internationale</li>
                          <li>• Développer 5 nouveaux masters spécialisés</li>
                          <li>• Former 100 docteurs d'ici 2030</li>
                        </ul>
                      </div>

                      <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                            <Lightbulb className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Innovation et Recherche</h3>
                            <Badge variant="secondary">Priorité 2</Badge>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Créer 3 centres d'excellence</li>
                          <li>• Publier 200 articles/an dans des revues indexées</li>
                          <li>• Déposer 10 brevets d'innovation</li>
                          <li>• Développer 5 spin-offs technologiques</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                            <Users className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Développement Humain</h3>
                            <Badge variant="secondary">Priorité 3</Badge>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Former 50 enseignants-chercheurs</li>
                          <li>• Atteindre 80% d'insertion professionnelle</li>
                          <li>• Développer l'entrepreneuriat étudiant</li>
                          <li>• Renforcer l'égalité des genres</li>
                        </ul>
                      </div>

                      <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                            <Globe className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Rayonnement International</h3>
                            <Badge variant="secondary">Priorité 4</Badge>
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Établir 20 partenariats stratégiques</li>
                          <li>• Accueillir 200 étudiants internationaux</li>
                          <li>• Organiser 5 conférences internationales/an</li>
                          <li>• Développer des programmes conjoints</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Axes de Développement */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Axes de Développement Prioritaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge className="bg-purple-600 text-purple-600-foreground">Axe 1</Badge>
                        <h3 className="text-xl font-semibold">Transformation Numérique</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-purple-600">Objectifs</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Digitalisation complète des processus</li>
                            <li>• Développement de l'e-learning</li>
                            <li>• Campus intelligent et connecté</li>
                            <li>• Formation aux compétences numériques</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-purple-600">Indicateurs</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 100% des cours en ligne disponibles</li>
                            <li>• 50% des étudiants certifiés IT</li>
                            <li>• Couverture WiFi complète</li>
                            <li>• Plateforme LMS active</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge className="bg-purple-600 text-purple-600-foreground">Axe 2</Badge>
                        <h3 className="text-xl font-semibold">Développement Durable</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-purple-600">Objectifs</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Campus éco-responsable</li>
                            <li>• Recherche sur l'environnement</li>
                            <li>• Formation aux enjeux climatiques</li>
                            <li>• Partenariats verts</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-purple-600">Indicateurs</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 50% d'énergie renouvelable</li>
                            <li>• Zéro déchet plastique</li>
                            <li>• 10 projets environnementaux/an</li>
                            <li>• Certification ISO 14001</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge className="bg-purple-600 text-purple-600-foreground">Axe 3</Badge>
                        <h3 className="text-xl font-semibold">Innovation et Entrepreneuriat</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-purple-600">Objectifs</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Incubateur d'entreprises</li>
                            <li>• Transfert de technologie</li>
                            <li>• Culture entrepreneuriale</li>
                            <li>• Liens industrie-université</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-purple-600">Indicateurs</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• 20 start-ups créées</li>
                            <li>• 100 étudiants entrepreneurs</li>
                            <li>• 50 partenariats industriels</li>
                            <li>• 5M€ de chiffre d'affaires généré</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Roadmap */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Feuille de Route 2024-2030</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Badge variant="secondary">2024-2025</Badge>
                      <div className="flex-1">
                        <h3 className="font-semibold">Phase 1: Consolidation</h3>
                        <p className="text-sm text-muted-foreground">
                          Modernisation des infrastructures, renforcement des équipes, mise en place des outils
                          numériques
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Badge variant="secondary">2025-2027</Badge>
                      <div className="flex-1">
                        <h3 className="font-semibold">Phase 2: Expansion</h3>
                        <p className="text-sm text-muted-foreground">
                          Développement de nouveaux programmes, création des centres d'excellence, partenariats
                          internationaux
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Badge variant="secondary">2027-2030</Badge>
                      <div className="flex-1">
                        <h3 className="font-semibold">Phase 3: Rayonnement</h3>
                        <p className="text-sm text-muted-foreground">
                          Positionnement régional, innovation de rupture, impact sociétal et économique
                        </p>
                      </div>
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
