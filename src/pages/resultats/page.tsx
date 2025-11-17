import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs,TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Filter, Users, FileText, Calendar, CheckCircle2, Clock, GraduationCap } from "lucide-react"
import { useEffect, useState } from "react"
import { BACKEND_PREINSCRIPTION_URL ,BACKEND_URL} from "@/lib/api"
// type StatGType = {
//   total: number;
//   admis: number;
//   nonAdmis: number;
//   tauxAdmission: number;
// }

type PortalType = {
  idPortail: number;
  nomPortail: string;
  abbreviation: string;
  estAcademique: boolean;
}

type ListResultatType = {
  id: string;
  bacNumber: string;
  prenom: string;
  nom?: string;
  anneeBacc: string;
  portail: string;  // C'est le NOM du portail, pas l'ID
  abrevi: string;
  date: string;
  rang: number;
}

// type StatPortailType = {
//   nomPortail: string;
//   abbrev: string;
//   total: number;
//   admis: number;
//   nonAdmis: number;
//   tauxAdmission: number;
// }

export default function CandidatsPreinscrits() {
  // const [statG, setStatG] = useState<StatGType>()
  const [listPort, setListPort] = useState<PortalType[]>([])
  const [listResult, setListResult] = useState<ListResultatType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPortail, setSelectedPortail] = useState("all")
  const [activeTab, setActiveTab] = useState("academique")
  const [loading, setLoading] = useState(true)

  // Récupération des portails
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/stat/preinscrits`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Portails reçus:', data)
        setListPort(data || [])
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des portails :", error)
        setListPort([])
      })
  }, [])

  // Récupération des résultats
  useEffect(() => {
    fetch(`${BACKEND_PREINSCRIPTION_URL}/api/Preinscription/list-result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        // Vérifier si la réponse contient du contenu
        const text = await response.text()
        if (!text || text.trim() === '') {
          console.warn('Réponse vide de l\'API')
          return []
        }
        
        try {
          return JSON.parse(text)
        } catch (e) {
          console.error('Erreur de parsing JSON:', e)
          return []
        }
      })
      .then((data) => {
        console.log('Résultats reçus:', data)
        setListResult(data || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des résultats :", error)
        setListResult([])
        setLoading(false)
      })
  }, [])

  // Filtrer les portails par type (académique ou professionalisante)
  const portailsAcademiques = listPort.filter(p => p.estAcademique === true)
  const portailsProfessionalisants = listPort.filter(p => p.estAcademique === false)

  // Obtenir les portails actuels selon l'onglet actif
  const getCurrentPortails = () => 
    activeTab === "academique" ? portailsAcademiques : portailsProfessionalisants

  // Obtenir le total des inscrits pour le type actuel
  // const getTotalInscrits = () => {
  //   const portailsActuels = getCurrentPortails()
  //   const nomsPortails = portailsActuels.map(p => p.nomPortail)
  //   return listResult.filter(r => nomsPortails.includes(r.portail)).length
  // }

  // Obtenir le total académique
  const getTotalAcademique = () => {
    const nomsPortails = portailsAcademiques.map(p => p.nomPortail)
    return listResult.filter(r => nomsPortails.includes(r.portail)).length
  }

  // Obtenir le total professionalisante
  const getTotalProfessionalisante = () => {
    const nomsPortails = portailsProfessionalisants.map(p => p.nomPortail)
    return listResult.filter(r => nomsPortails.includes(r.portail)).length
  }

  // Obtenir les statistiques par portail
  // const getStatsByPortail = () => {
  //   const portailsActuels = getCurrentPortails()
  //   return portailsActuels.map(portail => {
  //     const candidats = listResult.filter(r => r.portail === portail.nomPortail)
  //     return {
  //       nomPortail: portail.nomPortail,
  //       abbrev: portail.abbreviation,
  //       total: candidats.length,
  //       idPortail: portail.idPortail
  //     }
  //   })
  // }

  // Filtrer les candidats selon la recherche et le portail sélectionné
  const getFilteredCandidats = () => {
    let candidats = listResult
    
    // Filtrer par type (académique ou professionalisante)
    const portailsActuels = getCurrentPortails()
    const nomsPortails = portailsActuels.map(p => p.nomPortail)
    
    // Par défaut, afficher tous les candidats validés du type actuel
    candidats = candidats.filter(c => nomsPortails.includes(c.portail))
    
    // Filtrer par portail sélectionné si un portail spécifique est choisi
    if (selectedPortail !== "all") {
      const portailSelectionne = listPort.find(p => p.idPortail === parseInt(selectedPortail))
      if (portailSelectionne) {
        candidats = candidats.filter(c => c.portail === portailSelectionne.nomPortail)
      }
    }
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      candidats = candidats.filter(c =>
        c.bacNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.nom && c.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
        c.abrevi.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return candidats
  }

  const filteredCandidats = getFilteredCandidats()
  const isAcademique = activeTab === "academique"
  const gradientClass = isAcademique ? "purple-50" : "amber-50"
  const hoverClass = isAcademique ? "hover:bg-blue-50" : "hover:bg-green-50"
  const numeroColor = isAcademique ? "text-primary" : "text-secondary"

  // Fonction pour obtenir le nom du portail par ID
  const getPortailNameById = (idPortail: number) => {
    const portail = listPort.find(p => p.idPortail === idPortail)
    return portail ? portail.nomPortail : "N/A"
  }

  // // Fonction pour obtenir l'abréviation du portail par ID
  // const getPortailAbbrev = (idPortail: number) => {
  //   const portail = listPort.find(p => p.idPortail === idPortail)
  //   return portail ? portail.abbreviation : "N/A"
  // }

  // // Fonction pour obtenir le nom du portail (déjà dans les données candidat)
  // const getPortailName = (nomPortail: string) => {
  //   return nomPortail
  // }

  // const statsByPortail = getStatsByPortail()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement des données...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-6 shadow-lg">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-primary bg-clip-text text-transparent mb-4">
            Resultat de la selection des dossiers
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Consultez la liste des candidats qui ont été selectionnés en Licence 1 - Année Académique 2025-2026
          </p>
          
          <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-amber-100 border border-amber-300 rounded-full">
            <Clock className="h-5 w-5 text-amber-600" />
            <span className="text-amber-800 font-medium">Sélection en cours -jusqu'au 15 Décembre 2025</span>
          </div>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="rounded-none border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{listResult.length}</div>
              <div className="text-sm font-medium opacity-90">Candidatures Totales</div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-none shadow-lg bg-purple-50 text-primary transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{getTotalAcademique()}</div>
              <div className="text-sm font-medium opacity-90">Inscrits Académiques</div>
              <div className="text-xs opacity-70 mt-1">({portailsAcademiques.length} portails)</div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{getTotalProfessionalisante()}</div>
              <div className="text-sm font-medium opacity-90">Inscrits Professionalisants</div>
              <div className="text-xs opacity-70 mt-1">({portailsProfessionalisants.length} portails)</div>
            </CardContent>
          </Card>

          <Card className="border-none rounded-none shadow-lg bg-purple-50 text-primary transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{listPort.length}</div>
              <div className="text-sm font-medium opacity-90">Portails Disponibles</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value)
          setSelectedPortail("all")
        }} className="space-y-6">
          <TabsList className="rounded-none grid w-full grid-cols-2 bg-white shadow-md p-1">
            <TabsTrigger 
              value="academique" 
              className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Académique ({portailsAcademiques.length} portails)
            </TabsTrigger>
            <TabsTrigger 
              value="professionalisante" 
              className="rounded-none data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              Professionalisante ({portailsProfessionalisants.length} portails)
            </TabsTrigger>
          </TabsList>

          {/* Cartes statistiques par portail */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statsByPortail.length > 0 ? (
              statsByPortail.map((stat) => (
                <Card 
                  key={stat.idPortail} 
                  className={`rounded-none border-none shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                    selectedPortail === stat.idPortail.toString() ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedPortail(stat.idPortail.toString())}
                >
                  <CardHeader className={`bg-gradient-to-r ${gradientClass}`}>
                    <CardTitle className="text-lg">{stat.nomPortail}</CardTitle>
                    <CardDescription className="font-mono font-bold">{stat.abbrev}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-center text-slate-800">{stat.total}</div>
                    <div className="text-sm text-center text-slate-600 mt-1">candidats inscrits</div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-slate-500">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Aucun portail {isAcademique ? 'académique' : 'professionalisante'} disponible</p>
              </div>
            )}
          </div> */}
        </Tabs>

        {/* Outils de recherche */}
        <Card className="rounded-none mb-8 border-none shadow-xl mt-8">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Filter className="h-5 w-5 text-purple-600" />
              Rechercher un Candidat
            </CardTitle>
            <CardDescription>Utilisez les filtres ci-dessous pour trouver rapidement un candidat</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Input 
                placeholder="N° de candidat ou nom" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
              />
              <Select value={selectedPortail} onValueChange={setSelectedPortail}>
                <SelectTrigger className="border-slate-300">
                  <SelectValue placeholder={`Tous les portails ${isAcademique ? 'académiques' : 'professionalisants'}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les portails {isAcademique ? 'académiques' : 'professionalisants'}</SelectItem>
                  {getCurrentPortails().map((portail) => (
                    <SelectItem key={portail.idPortail} value={portail.idPortail.toString()}>
                      {portail.nomPortail} ({portail.abbreviation})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                className="rounded-none  hover:bg-primary"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedPortail("all")
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
              <Button className="rounded-none bg-primary" onClick={() => {
                // Le filtrage est automatique via les states
              }}>
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Liste des candidats */}
        <Card className="rounded-none mb-8 border-none shadow-xl">
          <CardHeader className={`bg-${gradientClass}`}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-slate-800 capitalize">
                Liste des candidats {isAcademique ? "académiques" : "professionalisants"}
              </CardTitle>
              <div className="text-sm text-slate-600">
                {filteredCandidats.length} candidat(s) trouvé(s)
              </div>
            </div>
            <CardDescription>
              {selectedPortail !== "all" 
                ? `Portail sélectionné : ${getPortailNameById(parseInt(selectedPortail))}` 
                : `Tous les portails ${isAcademique ? 'académiques' : 'professionalisants'} - Candidats validés uniquement`}
              {searchTerm && ` • Recherche : "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {filteredCandidats.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100 border-b-2 border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">N° Bac</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nom et Prénom</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Portail</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Année Bac</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Rang</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredCandidats.map((candidat, idx) => (
                      <tr key={candidat.id || idx} className={`transition-colors duration-200 ${hoverClass}`}>
                        <td className="px-6 py-4">
                          <span className={`font-mono text-sm font-medium ${numeroColor}`}>
                            {candidat.bacNumber}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-800">
                            {candidat.prenom}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="text-xs w-fit">
                              {candidat.abrevi}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {candidat.portail}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">{candidat.anneeBacc}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-slate-700">#{candidat.rang}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="h-4 w-4" />
                            {candidat.date}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun candidat trouvé</h3>
                <p className="text-sm text-slate-600">Essayez d'ajuster vos critères de recherche.</p>
              </div>
            )}
          </CardContent>
          <CardHeader className={`rounded-none bg-${gradientClass} mt-4 border-t`}>
            <Button className={`rounded-none bg- ${isAcademique ? "bg-primary" : "bg-secondary hover:bg-secondary "}`}>
              <Download className="h-4 w-4 mr-2" />
              Exporter en PDF
            </Button>
          </CardHeader>
        </Card>

        {/* Note importante */}
        <Card className={`rounded-none border-${isAcademique ? "purple" : "amber"}-200 bg-${isAcademique ? "purple" : "amber"}-50 mb-10`}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full bg-${isAcademique ? "purple" : "amber"}-600 flex items-center justify-center`}>
                  {isAcademique ? <FileText className="h-5 w-5 text-white" /> : <GraduationCap className="h-5 w-5 text-white" />}
                </div>
              </div>
              <div>
                <h3 className={`font-semibold ${isAcademique ? "text-gray-900" : "text-gray-900"} mb-2`}>Information importante</h3>
                <p className={`text-sm ${isAcademique ? "text-gray-800" : "text-gray-800"} leading-relaxed`}>
                  Cette liste présente tous les candidats ayant effectué leur préinscription. La validation du dossier ne garantit pas l'admission définitive. 
                  Les résultats finaux de la sélection seront publiés après l'étude approfondie de tous les dossiers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendrier et informations */}
        {/* <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card className="rounded-none border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Calendar className="h-5 w-5 text-purple-600" />
                Calendrier de Sélection
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 flex items-center justify-center flex-shrink-0 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Clôture des inscriptions</div>
                  <div className="text-sm text-slate-600">15 Decembre 2025</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 flex items-center justify-center flex-shrink-0 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600 animate-pulse" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Étude des dossiers</div>
                  <div className="text-sm text-slate-600">1 - 14 Novembre 2024</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 flex items-center justify-center flex-shrink-0 rounded-full">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Publication des résultats</div>
                  <div className="text-sm text-slate-600">15 Novembre 2024</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Users className="h-5 w-5 text-indigo-600" />
                Besoin d'aide ?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Pour toute question concernant votre candidature ou le processus de sélection, n'hésitez pas à nous contacter.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    📧
                  </div>
                  <span className="text-slate-700">admission@faculte-sciences.mg</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    📞
                  </div>
                  <span className="text-slate-700">+261 34 XX XXX XX</span>
                </div>
              </div>
              <Button className="rounded-none w-full bg-primary hover:from-indigo-700 hover:to-purple-700 mt-4">
                Contacter le service des admissions
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}