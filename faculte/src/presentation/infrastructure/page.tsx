import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Microscope, Computer, BookOpen, Wifi, Car } from "lucide-react"
import Image from "next/image"

export default function InfrastructurePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Infrastructure et Équipements</h1>
              <p className="text-xl text-muted-foreground">
                Découvrez nos installations modernes et équipements de pointe
              </p>
              <div className="mt-8">
                <Image
                  src="/entree.png"
                  alt="Vue d'ensemble du campus de la Faculté des Sciences"
                  width={800}
                  height={400}
                  className="rounded-lg mx-auto shadow-lg"
                />
              </div>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Notre Campus en Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Image
                        src="/devant-fac-science.png"
                        alt="Façade principale de la Faculté des Sciences"
                        width={400}
                        height={250}
                        className="rounded-lg shadow-md w-full"
                      />
                      <h3 className="font-semibold">Façade Principale</h3>
                      <p className="text-sm text-muted-foreground">
                        Entrée principale de la Faculté des Sciences avec son architecture caractéristique
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Image
                        src="/departement.png"
                        alt="Bâtiments des départements"
                        width={400}
                        height={250}
                        className="rounded-lg shadow-md w-full"
                      />
                      <h3 className="font-semibold">Bâtiments Départements</h3>
                      <p className="text-sm text-muted-foreground">
                        Complexe des départements avec salles de cours et laboratoires
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Image
                        src="/chalet.png"
                        alt="Espace d'étude extérieur"
                        width={400}
                        height={250}
                        className="rounded-lg shadow-md w-full"
                      />
                      <h3 className="font-semibold">Espaces d'Étude</h3>
                      <p className="text-sm text-muted-foreground">
                        Chalet d'étude en plein air pour le travail en groupe
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Image
                        src="/science-pierre.png"
                        alt="Monument emblématique de la faculté"
                        width={400}
                        height={250}
                        className="rounded-lg shadow-md w-full"
                      />
                      <h3 className="font-semibold">Monument Emblématique</h3>
                      <p className="text-sm text-muted-foreground">
                        Monument en pierre avec l'emblème de la Faculté des Sciences
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Image
                        src="/dinosaure.png"
                        alt="Fresque artistique du campus"
                        width={400}
                        height={250}
                        className="rounded-lg shadow-md w-full"
                      />
                      <h3 className="font-semibold">Art et Culture</h3>
                      <p className="text-sm text-muted-foreground">
                        Fresque murale représentant un dinosaure, témoignage de notre patrimoine paléontologique
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Image
                        src="/entree.png"
                        alt="Cour centrale du campus"
                        width={400}
                        height={250}
                        className="rounded-lg shadow-md w-full"
                      />
                      <h3 className="font-semibold">Cour Centrale</h3>
                      <p className="text-sm text-muted-foreground">
                        Grande place centrale du campus, lieu de rassemblement des étudiants
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bâtiments */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Building className="h-6 w-6 text-accent" />
                    <span>Bâtiments et Espaces</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                        <Building className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Bâtiment Principal</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Administration, salles de cours magistraux et bureaux des enseignants
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Surface:</span>
                          <span className="font-medium">2,500 m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Niveaux:</span>
                          <span className="font-medium">4 étages</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Salles:</span>
                          <span className="font-medium">25 salles</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                        <Microscope className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Complexe Laboratoires</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Laboratoires de recherche et d'enseignement équipés
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Surface:</span>
                          <span className="font-medium">1,800 m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Laboratoires:</span>
                          <span className="font-medium">15 labs</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Équipements:</span>
                          <span className="font-medium">Haute technologie</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                        <BookOpen className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Bibliothèque Scientifique</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Centre de documentation et d'information scientifique
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Surface:</span>
                          <span className="font-medium">800 m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ouvrages:</span>
                          <span className="font-medium">15,000 livres</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Places:</span>
                          <span className="font-medium">200 places</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                        <Computer className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Centre Informatique</h3>
                      <p className="text-sm text-muted-foreground mb-3">Salles informatiques et serveurs</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Postes:</span>
                          <span className="font-medium">120 ordinateurs</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Salles:</span>
                          <span className="font-medium">6 salles</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Réseau:</span>
                          <span className="font-medium">Fibre optique</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                        <Wifi className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Amphithéâtres</h3>
                      <p className="text-sm text-muted-foreground mb-3">Espaces pour conférences et cours magistraux</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Nombre:</span>
                          <span className="font-medium">3 amphithéâtres</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Capacité:</span>
                          <span className="font-medium">200-400 places</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Équipement:</span>
                          <span className="font-medium">Multimédia</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                        <Car className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Services Annexes</h3>
                      <p className="text-sm text-muted-foreground mb-3">Cafétéria, parking et espaces verts</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Parking:</span>
                          <span className="font-medium">150 places</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cafétéria:</span>
                          <span className="font-medium">300 places</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Espaces verts:</span>
                          <span className="font-medium">2,000 m²</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Équipements par département */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Équipements Spécialisés par Département</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge variant="secondary">Physique</Badge>
                        <h3 className="text-lg font-semibold">Laboratoire de Physique</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <ul className="space-y-2">
                          <li>• Spectromètres UV-Visible et IR</li>
                          <li>• Oscilloscopes numériques</li>
                          <li>• Générateurs de fonctions</li>
                          <li>• Microscopes électroniques</li>
                        </ul>
                        <ul className="space-y-2">
                          <li>• Équipements d'optique laser</li>
                          <li>• Systèmes de mesure de température</li>
                          <li>• Bancs d'essais mécaniques</li>
                          <li>• Stations météorologiques</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge variant="secondary">Chimie</Badge>
                        <h3 className="text-lg font-semibold">Laboratoire de Chimie</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <ul className="space-y-2">
                          <li>• Chromatographes HPLC et GC</li>
                          <li>• Spectromètres de masse</li>
                          <li>• Analyseurs élémentaires</li>
                          <li>• Hottes de sécurité</li>
                        </ul>
                        <ul className="space-y-2">
                          <li>• Réacteurs de synthèse</li>
                          <li>• Évaporateurs rotatifs</li>
                          <li>• pH-mètres et conductimètres</li>
                          <li>• Balances analytiques</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge variant="secondary">Biologie</Badge>
                        <h3 className="text-lg font-semibold">Laboratoire de Biologie</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <ul className="space-y-2">
                          <li>• Microscopes optiques et électroniques</li>
                          <li>• Centrifugeuses réfrigérées</li>
                          <li>• Étuves et autoclaves</li>
                          <li>• Hottes à flux laminaire</li>
                        </ul>
                        <ul className="space-y-2">
                          <li>• Séquenceurs ADN</li>
                          <li>• PCR et thermocycleurs</li>
                          <li>• Congélateurs -80°C</li>
                          <li>• Systèmes de culture cellulaire</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge variant="secondary">Informatique</Badge>
                        <h3 className="text-lg font-semibold">Centre de Calcul</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <ul className="space-y-2">
                          <li>• Serveurs haute performance</li>
                          <li>• Cluster de calcul parallèle</li>
                          <li>• Systèmes de stockage SAN</li>
                          <li>• Équipements réseau Cisco</li>
                        </ul>
                        <ul className="space-y-2">
                          <li>• Logiciels de simulation</li>
                          <li>• Environnements de développement</li>
                          <li>• Systèmes de sauvegarde</li>
                          <li>• Connexion Internet haut débit</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projets d'amélioration */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Projets d'Amélioration en Cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-accent/10 rounded-lg">
                        <h3 className="font-semibold text-accent mb-2">Modernisation des Laboratoires</h3>
                        <p className="text-sm text-muted-foreground">
                          Renouvellement des équipements scientifiques avec l'appui de nos partenaires internationaux.
                        </p>
                        <Badge variant="outline" className="mt-2">
                          En cours
                        </Badge>
                      </div>

                      <div className="p-4 bg-accent/10 rounded-lg">
                        <h3 className="font-semibold text-accent mb-2">Extension Bibliothèque</h3>
                        <p className="text-sm text-muted-foreground">
                          Agrandissement de la bibliothèque et numérisation du fonds documentaire.
                        </p>
                        <Badge variant="outline" className="mt-2">
                          Planifié 2025
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-accent/10 rounded-lg">
                        <h3 className="font-semibold text-accent mb-2">Campus Numérique</h3>
                        <p className="text-sm text-muted-foreground">
                          Déploiement du WiFi sur tout le campus et mise en place d'outils numériques.
                        </p>
                        <Badge variant="outline" className="mt-2">
                          En cours
                        </Badge>
                      </div>

                      <div className="p-4 bg-accent/10 rounded-lg">
                        <h3 className="font-semibold text-accent mb-2">Éco-Campus</h3>
                        <p className="text-sm text-muted-foreground">
                          Installation de panneaux solaires et mise en place d'un système de gestion des déchets.
                        </p>
                        <Badge variant="outline" className="mt-2">
                          Étude
                        </Badge>
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
