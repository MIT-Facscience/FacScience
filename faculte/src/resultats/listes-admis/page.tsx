import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Users, Trophy, Calendar } from "lucide-react"
// import { Footer } from "@/components/footer"
// import { Navigation } from "@/components/navigation"

const admisL1 = [
  { nom: "RAKOTO Jean", numero: "001", filiere: "Mathématiques-Informatique", mention: "Très Bien", note: 16.5 },
  { nom: "RABE Marie", numero: "002", filiere: "Physique", mention: "Bien", note: 14.8 },
  { nom: "ANDRY Paul", numero: "003", filiere: "Chimie", mention: "Très Bien", note: 17.2 },
  { nom: "HERY Sophie", numero: "004", filiere: "Biologie", mention: "Bien", note: 15.1 },
  { nom: "NIVO Lucas", numero: "005", filiere: "Géologie", mention: "Assez Bien", note: 13.7 },
  { nom: "FARA Anna", numero: "006", filiere: "MIT", mention: "Très Bien", note: 16.9 },
  { nom: "SOLO David", numero: "007", filiere: "Mathématiques-Informatique", mention: "Bien", note: 14.3 },
  { nom: "VOLA Emma", numero: "008", filiere: "Physique", mention: "Très Bien", note: 17.8 },
]

const admisM1 = [
  { nom: "RATSIMBA Michel", numero: "M001", filiere: "IGCRR", mention: "Très Bien", note: 16.2 },
  { nom: "RAZAFY Claire", numero: "M002", filiere: "IPSS", mention: "Bien", note: 15.4 },
  { nom: "RANDRIA Thomas", numero: "M003", filiere: "Bioinformatique", mention: "Très Bien", note: 17.1 },
  { nom: "RABARY Julie", numero: "M004", filiere: "Géophysique", mention: "Bien", note: 14.9 },
  { nom: "RATOVO Marc", numero: "M005", filiere: "Chimie Analytique", mention: "Assez Bien", note: 13.8 },
]

const admisDoctorat = [
  {
    nom: "Dr. RASOLOFO Pierre",
    numero: "D001",
    specialite: "Physique Théorique",
    directeur: "Prof. ANDRIANARY",
    note: 18.5,
  },
  {
    nom: "Dr. RAKOTOSON Marie",
    numero: "D002",
    specialite: "Biologie Moléculaire",
    directeur: "Prof. RAZANAMPARANY",
    note: 17.9,
  },
  {
    nom: "Dr. RANDRIAMAMPIONONA Jean",
    numero: "D003",
    specialite: "Géologie Structurale",
    directeur: "Prof. RABEMANANJARA",
    note: 16.8,
  },
]

export default function ListesAdmisPage() {
  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Listes des Admis</h1>
              <p className="text-xl text-muted-foreground">
                Résultats des concours d'admission et sélections de dossier - Année académique 2025-2026
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Admis L1</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{admisL1.length}</div>
                  <p className="text-xs text-muted-foreground">Sur 450 candidats</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Admis M1</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{admisM1.length}</div>
                  <p className="text-xs text-muted-foreground">Sur 120 candidats</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admis Doctorat</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{admisDoctorat.length}</div>
                  <p className="text-xs text-muted-foreground">Sur 25 candidats</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="l1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="l1">Licence 1 (L1)</TabsTrigger>
                <TabsTrigger value="m1">Master 1 (M1)</TabsTrigger>
                <TabsTrigger value="doctorat">Doctorat</TabsTrigger>
              </TabsList>

              <TabsContent value="l1" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Liste des Admis en Licence 1</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger PDF
                      </Button>
                    </CardTitle>
                    <CardDescription>Concours d'admission en première année - Session 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Rechercher par nom ou numéro..." className="pl-10" />
                      </div>
                      <Select>
                        <SelectTrigger className="w-full sm:w-[200px]">
                          <SelectValue placeholder="Filtrer par filière" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les filières</SelectItem>
                          <SelectItem value="math-info">Math-Informatique</SelectItem>
                          <SelectItem value="physique">Physique</SelectItem>
                          <SelectItem value="chimie">Chimie</SelectItem>
                          <SelectItem value="biologie">Biologie</SelectItem>
                          <SelectItem value="geologie">Géologie</SelectItem>
                          <SelectItem value="mit">MIT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4 font-medium">N°</th>
                            <th className="text-left p-4 font-medium">Nom et Prénom</th>
                            <th className="text-left p-4 font-medium">Filière</th>
                            <th className="text-left p-4 font-medium">Note</th>
                            <th className="text-left p-4 font-medium">Mention</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admisL1.map((admis, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="p-4">{admis.numero}</td>
                              <td className="p-4 font-medium">{admis.nom}</td>
                              <td className="p-4">{admis.filiere}</td>
                              <td className="p-4">{admis.note}/20</td>
                              <td className="p-4">
                                <Badge
                                  variant={
                                    admis.mention === "Très Bien"
                                      ? "default"
                                      : admis.mention === "Bien"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {admis.mention}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="m1" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Liste des Admis en Master 1</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger PDF
                      </Button>
                    </CardTitle>
                    <CardDescription>Sélection sur dossier - Session 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4 font-medium">N°</th>
                            <th className="text-left p-4 font-medium">Nom et Prénom</th>
                            <th className="text-left p-4 font-medium">Spécialité</th>
                            <th className="text-left p-4 font-medium">Note</th>
                            <th className="text-left p-4 font-medium">Mention</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admisM1.map((admis, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="p-4">{admis.numero}</td>
                              <td className="p-4 font-medium">{admis.nom}</td>
                              <td className="p-4">{admis.filiere}</td>
                              <td className="p-4">{admis.note}/20</td>
                              <td className="p-4">
                                <Badge
                                  variant={
                                    admis.mention === "Très Bien"
                                      ? "default"
                                      : admis.mention === "Bien"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {admis.mention}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="doctorat" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Liste des Admis en Doctorat</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger PDF
                      </Button>
                    </CardTitle>
                    <CardDescription>École Doctorale - Sélection 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4 font-medium">N°</th>
                            <th className="text-left p-4 font-medium">Nom et Prénom</th>
                            <th className="text-left p-4 font-medium">Spécialité</th>
                            <th className="text-left p-4 font-medium">Directeur de thèse</th>
                            <th className="text-left p-4 font-medium">Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admisDoctorat.map((admis, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="p-4">{admis.numero}</td>
                              <td className="p-4 font-medium">{admis.nom}</td>
                              <td className="p-4">{admis.specialite}</td>
                              <td className="p-4">{admis.directeur}</td>
                              <td className="p-4">
                                <Badge variant="default">{admis.note}/20</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      {/* <Footer /> */}
    </div>
        
  
  )
}
