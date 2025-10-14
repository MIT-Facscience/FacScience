import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Search, TrendingUp, Trophy, Users } from "lucide-react"
import {Link} from "react-router-dom"
import { useEffect } from "react"
import { BACKEND_URL } from "@/lib/api";
// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"

import { useState } from "react"

type statGType = {
  total: number;
  admis: number;
  nonAdmis: number;
  tauxAdmission: number;
}

  type statPType = [
    {
      nomPortail: string,
      abbrev: string,
      total: number,
      admis: number,
      nonAdmis : number,
      tauxAdmission: number
    }
  ]

export default function ResultatsPage() {

  const [statG,setStatG] = useState<statGType>();
  const [statP,setStatP] = useState<statPType>();


  useEffect(() => {
      fetch(`${BACKEND_URL}/api/stat/preinscrits`)
        .then((response) => response.json())
        .then((data) => {
          setStatG(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des statG :", error);
        });
    }, []);

    useEffect(() => {
      fetch(`${BACKEND_URL}/api/stat/preinscrits-par-mention`)
        .then((response) => response.json())
        .then((data) => {
          setStatP(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des statP :", error);
        });
    }, []);

  const resultats_concours = [
    {
      concours: "Concours d'admission L1 - Mathématiques et Informatique",
      session: "2024-2025",
      date_concours: "2024-09-15",
      date_publication: "2024-10-01",
      candidats: 450,
      admis: 85,
      liste_attente: 25,
      statut: "Résultats publiés",
      seuil_admission: 12.5,
    },
    {
      concours: "Concours d'admission L1 - Physique",
      session: "2024-2025",
      date_concours: "2024-09-16",
      date_publication: "2024-10-02",
      candidats: 320,
      admis: 60,
      liste_attente: 15,
      statut: "Résultats publiés",
      seuil_admission: 11.8,
    },
    {
      concours: "Concours d'admission Master IGCRR",
      session: "2024-2025",
      date_concours: "2024-09-20",
      date_publication: "2024-10-05",
      candidats: 180,
      admis: 25,
      liste_attente: 8,
      statut: "Résultats publiés",
      seuil_admission: 14.2,
    },
  ]

  const selections_dossier = [
    {
      filiere: "Master 2 - Biologie Moléculaire",
      session: "2024-2025",
      date_limite: "2024-08-30",
      date_publication: "2024-09-15",
      dossiers_recus: 95,
      admis: 20,
      liste_attente: 10,
      statut: "Sélection terminée",
      criteres: "Dossier académique + Projet de recherche",
    },
    {
      filiere: "Master 1 - Géologie Appliquée",
      session: "2024-2025",
      date_limite: "2024-08-25",
      date_publication: "2024-09-10",
      dossiers_recus: 75,
      admis: 30,
      liste_attente: 12,
      statut: "Sélection terminée",
      criteres: "Dossier académique + Entretien",
    },
    {
      filiere: "Parcours IPSS - Licence 3",
      session: "2024-2025",
      date_limite: "2024-09-05",
      date_publication: "2024-09-20",
      dossiers_recus: 120,
      admis: 35,
      liste_attente: 15,
      statut: "Sélection terminée",
      criteres: "Dossier académique + Tests techniques",
    },
  ]

  // const calendrier_examens = [
  //   {
  //     niveau: "Licence 1",
  //     periode: "Décembre 2024",
  //     debut: "2024-12-02",
  //     fin: "2024-12-14",
  //     statut: "À venir",
  //   },
  //   {
  //     niveau: "Licence 2",
  //     periode: "Décembre 2024",
  //     debut: "2024-12-02",
  //     fin: "2024-12-14",
  //     statut: "À venir",
  //   },
  //   {
  //     niveau: "Licence 3",
  //     periode: "Décembre 2024",
  //     debut: "2024-12-02",
  //     fin: "2024-12-14",
  //     statut: "À venir",
  //   },
  //   {
  //     niveau: "Master 1",
  //     periode: "Décembre 2024",
  //     debut: "2024-12-16",
  //     fin: "2024-12-21",
  //     statut: "À venir",
  //   },
  //   {
  //     niveau: "Master 2",
  //     periode: "Décembre 2024",
  //     debut: "2024-12-16",
  //     fin: "2024-12-21",
  //     statut: "À venir",
  //   },
  // ]

  // const statistiques_departements = [
  //   {
  //     departement: "Mathématiques et Informatique",
  //     code: "MI",
  //     etudiants: 320,
  //     taux_reussite: 85,
  //     mentions_tb: 45,
  //     mentions_b: 78,
  //   },
  //   {
  //     departement: "Physique",
  //     code: "PHY",
  //     etudiants: 180,
  //     taux_reussite: 79,
  //     mentions_tb: 22,
  //     mentions_b: 38,
  //     mentions_ab: 62,
  //   },
  //   {
  //     departement: "Chimie",
  //     code: "CHI",
  //     etudiants: 220,
  //     taux_reussite: 76,
  //     mentions_tb: 28,
  //     mentions_b: 45,
  //     mentions_ab: 71,
  //   },
  //   {
  //     departement: "Biologie",
  //     code: "BIO",
  //     etudiants: 280,
  //     taux_reussite: 81,
  //     mentions_tb: 38,
  //     mentions_b: 62,
  //     mentions_ab: 89,
  //   },
  //   {
  //     departement: "Géologie",
  //     code: "GEO",
  //     etudiants: 150,
  //     taux_reussite: 73,
  //     mentions_tb: 18,
  //     mentions_b: 28,
  //     mentions_ab: 45,
  //   },
  // ]

  return (

    <div className="min-h-screen">
      {/* <Navigation /> */}
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Résultats d'Admission</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Consultez les résultats des concours d’admission, des sélections de dossiers et les statistiques par filière et par parcours.
              </p>
            </div>

            {/* Statistiques globales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{statG?.total}</div>
                  <div className="text-sm text-slate-600">Candidatures reçues</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{statG?.admis}</div>
                  <div className="text-sm text-slate-600">Admis</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{statG?.nonAdmis}</div>
                  <div className="text-sm text-slate-600">Liste d'attente</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{statG?.tauxAdmission}%</div>
                  <div className="text-sm text-slate-600">Taux d'admission</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="concours" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="concours">Académique</TabsTrigger>
                <TabsTrigger value="selections">Professionalisante</TabsTrigger>
                <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
              </TabsList>

              {/* Onglet Concours */}
              <TabsContent value="concours" className="space-y-6">
                {/* Recherche de résultats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Rechercher vos résultats de concours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <Input placeholder="Numéro de candidat" />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Filière" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mi">Mathématiques-Informatique</SelectItem>
                          <SelectItem value="phy">Physique</SelectItem>
                          <SelectItem value="chi">Chimie</SelectItem>
                          <SelectItem value="bio">Biologie</SelectItem>
                          <SelectItem value="geo">Géologie</SelectItem>
                          <SelectItem value="igcrr">IGCRR</SelectItem>
                          <SelectItem value="ipss">IPSS</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="l1">Licence 1</SelectItem>
                          <SelectItem value="l1">Licence 2</SelectItem>
                          <SelectItem value="l3">Licence 3</SelectItem>
                          <SelectItem value="m1">Master 1</SelectItem>
                          <SelectItem value="m2">Master 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <Search className="h-4 w-4 mr-2" />
                        Rechercher
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Résultats des concours */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Résultats des Concours d'Admission</h2>
                  <div className="space-y-4">
                    {resultats_concours.map((concours, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg text-slate-800">{concours.concours}</CardTitle>
                              <CardDescription>Session {concours.session}</CardDescription>
                            </div>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              {concours.statut}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-5 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{concours.candidats}</div>
                              <div className="text-sm text-slate-600">Candidats</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{concours.admis}</div>
                              <div className="text-sm text-slate-600">Admis</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">{concours.liste_attente}</div>
                              <div className="text-sm text-slate-600">Liste d'attente</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{concours.seuil_admission}/20</div>
                              <div className="text-sm text-slate-600">Seuil d'admission</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-slate-600">Publié le</div>
                              <div className="font-medium">
                                {new Date(concours.date_publication).toLocaleDateString("fr-FR")}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" asChild>
                              <Link to="/resultats/listes-admis">
                                <Trophy className="h-4 w-4 mr-2" />
                                Liste des admis
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline">
                              <Users className="h-4 w-4 mr-2" />
                              Liste d'attente
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Télécharger PDF
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Onglet Sélections */}
              <TabsContent value="selections" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Résultats des Sélections du Dossier</h2>
                  <div className="space-y-4">
                    {selections_dossier.map((selection, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg text-slate-800">{selection.filiere}</CardTitle>
                              <CardDescription>Session {selection.session}</CardDescription>
                            </div>
                            <Badge variant="secondary">{selection.statut}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{selection.dossiers_recus}</div>
                              <div className="text-sm text-slate-600">Dossiers reçus</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{selection.admis}</div>
                              <div className="text-sm text-slate-600">Admis</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">{selection.liste_attente}</div>
                              <div className="text-sm text-slate-600">Liste d'attente</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-slate-600">Publié le</div>
                              <div className="font-medium">
                                {new Date(selection.date_publication).toLocaleDateString("fr-FR")}
                              </div>
                            </div>
                          </div>
                          <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <div className="text-sm text-slate-600">Critères de sélection:</div>
                            <div className="font-medium text-slate-800">{selection.criteres}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" asChild>
                              <Link to="/resultats/listes-admis">
                                <Trophy className="h-4 w-4 mr-2" />
                                Liste des admis
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline">
                              <Users className="h-4 w-4 mr-2" />
                              Liste d'attente
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Télécharger PDF
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Onglet Statistiques */}
              <TabsContent value="statistiques" className="space-y-6">
                {/* Statistiques d'admission */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Statistiques d'Admission par Filière</h2>
                  <div className="space-y-4">
                    {statP?.map((dept, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg text-slate-800">{dept.nomPortail}</CardTitle>
                            <Badge variant="outline">{dept.abbrev}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className="text-center">
                              <div className="text-xl font-bold text-blue-600">{dept.total}</div>
                              <div className="text-xs text-slate-600">Candidats</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-green-600">
                                {dept.admis}
                              </div>
                              <div className="text-xs text-slate-600">Admis</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-purple-600">{dept.tauxAdmission}%</div>
                              <div className="text-xs text-slate-600">Taux d'admission</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-orange-600">{dept.nonAdmis}</div>
                              <div className="text-xs text-slate-600">Liste attente</div>
                            </div>
                            {/* <div className="text-center">
                              <div className="text-xl font-bold text-red-600">{(dept.mentions_tb / 20).toFixed(1)}/20</div>
                              <div className="text-xs text-slate-600">Seuil moyen</div>
                            </div> */}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Évolution du nombre d'admis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Évolution du Nombre d'Admis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-slate-800">2022</div>
                        <div className="text-lg text-blue-600">198 admis</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-slate-800">2023</div>
                        <div className="text-lg text-green-600">225 admis</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-slate-800">2024</div>
                        <div className="text-lg text-purple-600">255 admis</div>
                      </div>
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
