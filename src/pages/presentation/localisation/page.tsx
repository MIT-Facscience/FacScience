import { Footer } from "@/components/footer";
import Navigation from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, Car, Clock, MapPin, NavigationIcon, Phone } from "lucide-react";

export default function LocalisationPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Localisation et Plan du Campus
              </h1>
              <p className="text-xl text-muted-foreground">
                Trouvez-nous facilement au cœur d'Antananarivo
              </p>
            </div>

            <div className="space-y-8">
              {/* Adresse principale */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <MapPin className="h-6 w-6 text-accent" />
                    <span>Adresse et Coordonnées</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-6 bg-accent/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-accent mb-4">
                          Adresse Postale
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p className="font-medium">Faculté des Sciences</p>
                          <p>Université d'Antananarivo</p>
                          <p>BP 906, Antananarivo 101</p>
                          <p>Madagascar</p>
                        </div>
                      </div>

                      <div className="p-6 bg-accent/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-accent mb-4">
                          Coordonnées GPS
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Latitude:</span>
                            <span className="font-mono">-18.9186° S</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Longitude:</span>
                            <span className="font-mono">47.5297° E</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Altitude:</span>
                            <span>1,280 m</span>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-4 bg-transparent"
                          variant="outline"
                        >
                          <NavigationIcon className="h-4 w-4 mr-2" />
                          Ouvrir dans Google Maps
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-accent/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-accent mb-4">
                          Contact
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-accent" />
                            <div>
                              <p className="text-sm font-medium">Secrétariat</p>
                              <p className="text-sm text-muted-foreground">
                                +261 20 22 227 13
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-accent" />
                            <div>
                              <p className="text-sm font-medium">Décanat</p>
                              <p className="text-sm text-muted-foreground">
                                +261 20 22 227 14
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Clock className="h-4 w-4 text-accent" />
                            <div>
                              <p className="text-sm font-medium">Horaires</p>
                              <p className="text-sm text-muted-foreground">
                                Lun-Ven: 7h30-17h00
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-accent/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-accent mb-4">
                          Quartier
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Quartier:</span>{" "}
                            Ankatso
                          </p>
                          <p>
                            <span className="font-medium">Arrondissement:</span>{" "}
                            4ème arrondissement
                          </p>
                          <p>
                            <span className="font-medium">Commune:</span>{" "}
                            Antananarivo Renivohitra
                          </p>
                          <p>
                            <span className="font-medium">Région:</span>{" "}
                            Analamanga
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plan du campus */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Plan du Campus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2">
                      <div className="bg-muted/30 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-16 w-16 text-accent mx-auto mb-4" />
                          <p className="text-lg font-semibold mb-2">
                            Plan Interactif du Campus
                          </p>
                          <p className="text-muted-foreground">
                            Plan détaillé avec localisation des bâtiments,
                            laboratoires et services
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <span className="text-sm font-medium">
                            Bâtiment Principal
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Administration, salles de cours
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span className="text-sm font-medium">
                            Laboratoires
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Recherche et travaux pratiques
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-sm font-medium">
                            Bibliothèque
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Centre de documentation
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                          <span className="text-sm font-medium">
                            Amphithéâtres
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Cours magistraux, conférences
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 bg-purple-500 rounded"></div>
                          <span className="text-sm font-medium">Services</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Cafétéria, parking, espaces verts
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accès et transport */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Bus className="h-6 w-6 text-accent" />
                    <span>Accès et Transport</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <Bus className="h-5 w-5 text-accent" />
                          <h3 className="font-semibold">Transport Public</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Ligne 174:</span>
                            <Badge variant="outline">Analakely - Ankatso</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Ligne 175:</span>
                            <Badge variant="outline">67 Ha - Université</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxi-be:</span>
                            <Badge variant="outline">Plusieurs lignes</Badge>
                          </div>
                          <p className="text-muted-foreground mt-2">
                            Arrêt: "Faculté des Sciences" ou "Université"
                          </p>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <Car className="h-5 w-5 text-accent" />
                          <h3 className="font-semibold">Accès Routier</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-medium">
                              Depuis le centre-ville:
                            </span>{" "}
                            Route d'Ankatso (15 min)
                          </p>
                          <p>
                            <span className="font-medium">
                              Depuis l'aéroport:
                            </span>{" "}
                            RN4 puis Route d'Ankatso (45 min)
                          </p>
                          <p>
                            <span className="font-medium">Parking:</span> 150
                            places disponibles
                          </p>
                          <p className="text-muted-foreground">
                            Entrée principale par la Route d'Ankatso
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-3">Points de Repère</h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            • <span className="font-medium">En face:</span>{" "}
                            Lycée Technique d'Ankatso
                          </p>
                          <p>
                            • <span className="font-medium">À proximité:</span>{" "}
                            Marché d'Ankatso
                          </p>
                          <p>
                            • <span className="font-medium">500m:</span> Hôpital
                            Universitaire
                          </p>
                          <p>
                            • <span className="font-medium">1km:</span> Centre
                            commercial Shoprite
                          </p>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-3">
                          Services à Proximité
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p>• Restaurants et cafés</p>
                          <p>• Pharmacies</p>
                          <p>• Banques et distributeurs</p>
                          <p>• Cybercafés</p>
                          <p>• Librairies et papeteries</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations pratiques */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Informations Pratiques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <h3 className="font-semibold text-accent mb-3">
                        Horaires d'Ouverture
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Lundi - Vendredi:</span>
                          <span>7h30 - 17h00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Samedi:</span>
                          <span>8h00 - 12h00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dimanche:</span>
                          <span>Fermé</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-accent/10 rounded-lg">
                      <h3 className="font-semibold text-accent mb-3">
                        Sécurité
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>• Gardiennage 24h/24</p>
                        <p>• Contrôle d'accès</p>
                        <p>• Vidéosurveillance</p>
                        <p>• Éclairage sécurisé</p>
                      </div>
                    </div>

                    <div className="p-4 bg-accent/10 rounded-lg">
                      <h3 className="font-semibold text-accent mb-3">
                        Accessibilité
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>• Rampes d'accès PMR</p>
                        <p>• Ascenseurs</p>
                        <p>• Toilettes adaptées</p>
                        <p>• Places de parking réservées</p>
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
  );
}
