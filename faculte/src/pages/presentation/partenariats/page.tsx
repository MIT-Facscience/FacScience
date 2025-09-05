import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, BookOpen, Award, Building, Handshake } from "lucide-react"

export default function PartenariatPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Partenariats Nationaux et Internationaux</h1>
              <p className="text-xl text-muted-foreground">
                Nos collaborations stratégiques pour l'excellence académique et la recherche
              </p>
            </div>

            <div className="space-y-8">
              {/* Partenaires Institutionnels */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Building className="h-6 w-6 text-accent" />
                    <span>Partenaires Institutionnels Nationaux</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">MESUPRES</h3>
                          <p className="text-sm text-muted-foreground">Ministère de l'Enseignement Supérieur</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Partenariat stratégique pour le développement de l'enseignement supérieur scientifique à
                        Madagascar.
                      </p>
                      <div className="space-y-2">
                        <Badge variant="secondary">Financement</Badge>
                        <Badge variant="secondary">Politique éducative</Badge>
                        <Badge variant="secondary">Accréditation</Badge>
                      </div>
                    </div>

                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                          <Globe className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">TELMA</h3>
                          <p className="text-sm text-muted-foreground">Télécommunications Malagasy</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Partenariat technologique pour la connectivité et les infrastructures numériques du campus.
                      </p>
                      <div className="space-y-2">
                        <Badge variant="secondary">Connectivité</Badge>
                        <Badge variant="secondary">Infrastructure IT</Badge>
                        <Badge variant="secondary">Formation</Badge>
                      </div>
                    </div>

                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">MNDPT</h3>
                          <p className="text-sm text-muted-foreground">Ministère du Numérique</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Collaboration pour la transformation numérique et le développement des compétences IT.
                      </p>
                      <div className="space-y-2">
                        <Badge variant="secondary">Transformation digitale</Badge>
                        <Badge variant="secondary">Compétences IT</Badge>
                        <Badge variant="secondary">Innovation</Badge>
                      </div>
                    </div>

                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">AUF</h3>
                          <p className="text-sm text-muted-foreground">Agence Universitaire de la Francophonie</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Soutien pour la coopération universitaire francophone et les échanges académiques.
                      </p>
                      <div className="space-y-2">
                        <Badge variant="secondary">Mobilité étudiante</Badge>
                        <Badge variant="secondary">Coopération</Badge>
                        <Badge variant="secondary">Francophonie</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Partenaires Internationaux */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Globe className="h-6 w-6 text-accent" />
                    <span>Partenaires Internationaux</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">FR</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">Université de Lyon</h3>
                          <p className="text-xs text-muted-foreground">France</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Échanges étudiants et recherche collaborative</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600">CA</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">Université de Montréal</h3>
                          <p className="text-xs text-muted-foreground">Canada</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Programmes de formation et bourses d'études</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-green-600">ZA</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">Université du Cap</h3>
                          <p className="text-xs text-muted-foreground">Afrique du Sud</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Coopération en sciences de la terre</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-yellow-600">DE</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">TU Munich</h3>
                          <p className="text-xs text-muted-foreground">Allemagne</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Recherche en physique et ingénierie</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-purple-600">BE</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">UCLouvain</h3>
                          <p className="text-xs text-muted-foreground">Belgique</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Programmes doctoraux conjoints</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-orange-600">CH</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">EPFL</h3>
                          <p className="text-xs text-muted-foreground">Suisse</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Innovation technologique et recherche</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Types de Collaboration */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Handshake className="h-6 w-6 text-accent" />
                    <span>Types de Collaboration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-accent/10 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-5 w-5 text-accent" />
                          <h3 className="font-semibold">Échanges Académiques</h3>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Mobilité étudiante (50+ étudiants/an)</li>
                          <li>• Échanges d'enseignants-chercheurs</li>
                          <li>• Programmes de double diplôme</li>
                          <li>• Stages internationaux</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-accent/10 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <BookOpen className="h-5 w-5 text-accent" />
                          <h3 className="font-semibold">Recherche Collaborative</h3>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Projets de recherche conjoints</li>
                          <li>• Publications scientifiques</li>
                          <li>• Laboratoires partagés</li>
                          <li>• Conférences internationales</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-accent/10 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="h-5 w-5 text-accent" />
                          <h3 className="font-semibold">Financement et Bourses</h3>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Bourses d'excellence (20+ bourses/an)</li>
                          <li>• Financement de projets</li>
                          <li>• Équipements scientifiques</li>
                          <li>• Formation continue</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-accent/10 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Building className="h-5 w-5 text-accent" />
                          <h3 className="font-semibold">Développement Institutionnel</h3>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Renforcement des capacités</li>
                          <li>• Modernisation des infrastructures</li>
                          <li>• Formation du personnel</li>
                          <li>• Assurance qualité</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projets en cours */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Projets de Coopération en Cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-accent">ERASMUS+ Sciences Madagascar</h3>
                          <p className="text-sm text-muted-foreground">Partenariat avec 5 universités européennes</p>
                        </div>
                        <Badge>2023-2026</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Programme de mobilité et de renforcement des capacités en sciences exactes et appliquées.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">€500K budget</Badge>
                        <Badge variant="outline">30 mobilités/an</Badge>
                        <Badge variant="outline">Formation continue</Badge>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-accent">Laboratoire Franco-Malgache</h3>
                          <p className="text-sm text-muted-foreground">Coopération IRD-Université d'Antananarivo</p>
                        </div>
                        <Badge>2022-2027</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Recherche collaborative en biodiversité et changement climatique dans l'Océan Indien.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Recherche</Badge>
                        <Badge variant="outline">Publications</Badge>
                        <Badge variant="outline">Formation doctorale</Badge>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-accent">Campus Numérique Francophone</h3>
                          <p className="text-sm text-muted-foreground">Initiative AUF pour la digitalisation</p>
                        </div>
                        <Badge>2024-2026</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Modernisation des infrastructures numériques et développement de l'enseignement à distance.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Infrastructure IT</Badge>
                        <Badge variant="outline">Formation en ligne</Badge>
                        <Badge variant="outline">Certification</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
