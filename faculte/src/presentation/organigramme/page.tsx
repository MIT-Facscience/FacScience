// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Users, Building, Phone, Mail } from "lucide-react"

export default function OrganigrammePage() {
  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Organigramme et Équipe Administrative</h1>
              <p className="text-xl text-muted-foreground">
                Structure organisationnelle et équipe dirigeante de la Faculté des Sciences
              </p>
            </div>

            <div className="space-y-8">
              {/* Direction */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <User className="h-6 w-6 text-purple-600" />
                    <span>Direction de la Faculté</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-6 border rounded-lg bg-purple-600/5">
                      <div className="w-24 h-24 bg-purple-600/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="h-12 w-12 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Prof. RAKOTOMALALA Jean</h3>
                      <Badge variant="secondary" className="mb-3">
                        Doyen
                      </Badge>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>+261 XX XX XXX XX</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>doyen@sciences.univ-antananarivo.mg</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center p-6 border rounded-lg bg-purple-600/5">
                      <div className="w-24 h-24 bg-purple-600/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="h-12 w-12 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Dr. RASOAMANANA Marie</h3>
                      <Badge variant="secondary" className="mb-3">
                        Vice-Doyen
                      </Badge>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>+261 XX XX XXX XX</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>vice-doyen@sciences.univ-antananarivo.mg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chefs de Département */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Building className="h-6 w-6 text-purple-600" />
                    <span>Chefs de Département</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-1">Mathématiques et Informatique</h3>
                      <p className="text-sm font-medium">Prof. ANDRIAMAMPIANINA Paul</p>
                      <p className="text-xs text-muted-foreground">math-info@sciences.univ-antananarivo.mg</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-1">MIT</h3>
                      <p className="text-sm font-medium">Dr. RAKOTONIRINA Sophie</p>
                      <p className="text-xs text-muted-foreground">mit@sciences.univ-antananarivo.mg</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-1">Physique</h3>
                      <p className="text-sm font-medium">Prof. RAHARISON Michel</p>
                      <p className="text-xs text-muted-foreground">physique@sciences.univ-antananarivo.mg</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-1">Chimie</h3>
                      <p className="text-sm font-medium">Dr. RAZAFINDRABE Hery</p>
                      <p className="text-xs text-muted-foreground">chimie@sciences.univ-antananarivo.mg</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-1">Biologie/Sciences de la Vie</h3>
                      <p className="text-sm font-medium">Prof. RANDRIAMAMPIONONA Lala</p>
                      <p className="text-xs text-muted-foreground">biologie@sciences.univ-antananarivo.mg</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-1">Géologie/Sciences de la Terre</h3>
                      <p className="text-sm font-medium">Dr. RAKOTONDRAZAFY Mamy</p>
                      <p className="text-xs text-muted-foreground">geologie@sciences.univ-antananarivo.mg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services Administratifs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Users className="h-6 w-6 text-purple-600" />
                    <span>Services Administratifs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-purple-600 mb-2">Secrétariat Général</h3>
                        <p className="text-sm font-medium">Mme RAZAFY Voahirana</p>
                        <p className="text-xs text-muted-foreground">secretariat@sciences.univ-antananarivo.mg</p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-purple-600 mb-2">Service Scolarité</h3>
                        <p className="text-sm font-medium">M. RAKOTO Hery</p>
                        <p className="text-xs text-muted-foreground">scolarite@sciences.univ-antananarivo.mg</p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-purple-600 mb-2">Service Financier</h3>
                        <p className="text-sm font-medium">Mme ANDRIANAIVO Noro</p>
                        <p className="text-xs text-muted-foreground">finance@sciences.univ-antananarivo.mg</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-purple-600 mb-2">Bibliothèque</h3>
                        <p className="text-sm font-medium">M. RAMAROSON Tovo</p>
                        <p className="text-xs text-muted-foreground">bibliotheque@sciences.univ-antananarivo.mg</p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-purple-600 mb-2">Service Informatique</h3>
                        <p className="text-sm font-medium">M. ANDRIANTSOA Rivo</p>
                        <p className="text-xs text-muted-foreground">informatique@sciences.univ-antananarivo.mg</p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-purple-600 mb-2">Relations Internationales</h3>
                        <p className="text-sm font-medium">Dr. RAKOTOMANGA Fidy</p>
                        <p className="text-xs text-muted-foreground">international@sciences.univ-antananarivo.mg</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organigramme visuel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Structure Organisationnelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="inline-block p-4 bg-purple-600 text-purple-600-foreground rounded-lg mb-6">
                      <h3 className="font-semibold">DOYEN</h3>
                    </div>

                    <div className="flex justify-center mb-6">
                      <div className="w-px h-8 bg-border"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="p-3 bg-secondary text-secondary-foreground rounded-lg">
                        <h4 className="font-medium text-sm">Vice-Doyen</h4>
                      </div>
                      <div className="p-3 bg-secondary text-secondary-foreground rounded-lg">
                        <h4 className="font-medium text-sm">Secrétaire Général</h4>
                      </div>
                      <div className="p-3 bg-secondary text-secondary-foreground rounded-lg">
                        <h4 className="font-medium text-sm">Services Administratifs</h4>
                      </div>
                    </div>

                    <div className="flex justify-center mb-6">
                      <div className="w-px h-8 bg-border"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm">Dépt. Math-Info</h4>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm">Dépt. MIT</h4>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm">Dépt. Physique</h4>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm">Dépt. Chimie</h4>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm">Dépt. Biologie</h4>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm">Dépt. Géologie</h4>
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
