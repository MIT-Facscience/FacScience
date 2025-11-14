import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Filter, Users, FileText, Calendar, CheckCircle2, Clock, GraduationCap } from "lucide-react"
// import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "@/lib/api"

type statGType = {
  total: number;
  admis: number;
  nonAdmis: number;
  tauxAdmission: number;
}

type statPType = [
  {
    nomPortail: string;
    abbrev: string;
    total: number;
    admis: number;
    nonAdmis: number;
    tauxAdmission: number
  }
]

// type StatMentionType = {
//   nomPortail: string;
//   abbrev: string;
//   total: number;
//   inscritsVerifies?: number;
// }

type StatFiliereType = {
  nomFiliere: string;
  abbrev: string;
  total: number;
  inscritsVerifies?: number;
}

type Candidat = {
  numero: string;
  nom: string;
  prenom: string;
  dateInscription: string;
  statut: string;
  parcours: string;
}

export default function CandidatsPreinscrits() {
  const [statG, setStatG] = useState<statGType>()
  const [statPAcademique, setStatPAcademique] = useState<statPType>()
  const [statPProfessionalisante, setStatPProfessionalisante] = useState<StatFiliereType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMention, setSelectedMention] = useState("all")
  const [activeTab, setActiveTab] = useState("academique")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/stat/preinscrits`)
      .then((response) => response.json())
      .then((data) => {
        setStatG(data)
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des statG :", error)
      })
  }, [])

  useEffect(() => {
    // Fetch académique
    fetch(`${BACKEND_URL}/api/stat/preinscrits-par-mention-academique`)
      .then((response) => response.json())
      .then((data) => {
        setStatPAcademique(data)
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des statP académique :", error)
      })

    // Fetch professionalisante (assume endpoint séparé)
    fetch(`${BACKEND_URL}/api/stat/preinscrits-par-filiere-professionalisante`)
      .then((response) => response.json())
      .then((data) => {
        setStatPProfessionalisante(data || [])
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des statP professionalisante :", error)
      })

      console.log(loading)

    setLoading(false)
  }, [loading])

  // Données exemple pour les candidats académique
  const candidatsParMentionAcademique: Record<string, Candidat[]> = {
    informatique: [
      { numero: "INF2024001", nom: "RAKOTO Jean", prenom: "Michel", dateInscription: "2024-09-15", statut: "Validé", parcours: "Informatique Générale" },
      { numero: "INF2024002", nom: "RABE Marie", prenom: "Jasmine", dateInscription: "2024-09-16", statut: "Validé", parcours: "Génie Logiciel" },
      { numero: "INF2024003", nom: "RANDRIA Paul", prenom: "Eric", dateInscription: "2024-09-17", statut: "En attente", parcours: "Réseaux et Télécommunications" },
    ],
    mathematique: [
      { numero: "MAT2024001", nom: "RABARY Sophie", prenom: "Claire", dateInscription: "2024-09-14", statut: "Validé", parcours: "Mathématiques Pures" },
      { numero: "MAT2024002", nom: "RASOLOFO David", prenom: "André", dateInscription: "2024-09-15", statut: "Validé", parcours: "Mathématiques Appliquées" },
    ],
    physique: [
      { numero: "PHY2024001", nom: "RAZAFY Thomas", prenom: "Marc", dateInscription: "2024-09-13", statut: "Validé", parcours: "Physique Fondamentale" },
      { numero: "PHY2024002", nom: "RAKOTONDRA Julie", prenom: "Anna", dateInscription: "2024-09-14", statut: "Validé", parcours: "Physique Appliquée" },
    ],
    svt: [
      { numero: "BIO2024001", nom: "RAHARISON Emma", prenom: "Léa", dateInscription: "2024-09-12", statut: "Validé", parcours: "Biologie" },
      { numero: "BIO2024002", nom: "ANDRIA Lucas", prenom: "Pierre", dateInscription: "2024-09-13", statut: "Validé", parcours: "Géologie" },
    ],
  }

  // Données exemple pour les candidats professionalisante (avec mentions)
  const candidatsParFiliereProfessionalisante: Record<string, Candidat[]> = {
    ipss: [
      { numero: "IPSS2024001", nom: "RAMANANTSOA Alex", prenom: "Christian", dateInscription: "2024-09-11", statut: "Validé", parcours: "Informatique Professionnelle" },
      { numero: "IPSS2024002", nom: "RANDRIANA Nina", prenom: "Olivia", dateInscription: "2024-09-12", statut: "En attente", parcours: "Systèmes et Sécurité" },
    ],
    igcrr: [
      { numero: "IGCRR2024001", nom: "RAKOTOMALALA Sara", prenom: "Isabelle", dateInscription: "2024-09-10", statut: "Validé", parcours: "Génie Civil" },
      { numero: "IGCRR2024002", nom: "RASOANANDRO Theo", prenom: "Louis", dateInscription: "2024-09-11", statut: "Validé", parcours: "Ressources Renouvelables" },
    ],
    genie: [
      { numero: "GEN2024001", nom: "RAZAFIMAHALEO Clara", prenom: "Marie", dateInscription: "2024-09-09", statut: "Validé", parcours: "Génie Mécanique" },
      { numero: "GEN2024002", nom: "RABEHY Victor", prenom: "Hugo", dateInscription: "2024-09-10", statut: "En attente", parcours: "Génie Électrique" },
    ],
  }

  const getTotalInscrits = () => {
    if (activeTab === "academique") {
      return statPAcademique?.reduce((sum, m) => sum + m.total, 0) || 0
    } else {
      return statPProfessionalisante.reduce((sum, f) => sum + f.total, 0) || 0
    }
  }

  const mentionsAcademique = [
    { nom: "Informatique et Technologie", abbrev: "IT", key: "informatique" },
    { nom: "Mathématiques et Informatique", abbrev: "MI", key: "mathematique" },
    { nom: "Physique et Chimie", abbrev: "PC", key: "physique" },
    { nom: "SVT", abbrev: "SVT", key: "svt" },
  ]

  const filieresProfessionalisante = [
    { nom: "IPSS", abbrev: "IPSS", key: "ipss" },
    { nom: "IGCRR", abbrev: "IGCRR", key: "igcrr" },
    { nom: "Génie", abbrev: "GEN", key: "genie" },
  ]

  const getCurrentItems = () => activeTab === "academique" ? mentionsAcademique : filieresProfessionalisante

  const getFilteredCandidats = (): Candidat[] => {
    let baseCandidats: Candidat[] = []
    if (activeTab === "academique") {
      if (selectedMention !== "all") {
        const key = selectedMention as keyof typeof candidatsParMentionAcademique
        baseCandidats = candidatsParMentionAcademique[key] || []
      } else {
        baseCandidats = Object.values(candidatsParMentionAcademique).flat()
      }
    } else {
      if (selectedMention !== "all") {
        const key = selectedMention as keyof typeof candidatsParFiliereProfessionalisante
        baseCandidats = candidatsParFiliereProfessionalisante[key] || []
      } else {
        baseCandidats = Object.values(candidatsParFiliereProfessionalisante).flat()
      }
    }

    return baseCandidats.filter((candidat) =>
      candidat.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${candidat.nom} ${candidat.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidat.parcours.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filteredCandidats = getFilteredCandidats()
  const isAcademique = activeTab === "academique"
  const gradientClass = isAcademique ? "from-slate-50 to-blue-50" : "from-slate-50 to-green-50"
  const hoverClass = isAcademique ? "hover:bg-blue-50" : "hover:bg-green-50"
  const numeroColor = isAcademique ? "text-blue-600" : "text-green-600"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header avec animation */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-6 shadow-lg">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-primary bg-clip-text text-transparent mb-4">
            Candidatures Préinscrits
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Consultez la liste des candidats ayant effectué leur préinscription pour l'admission en Licence 1 - Année Académique 2025-2026
          </p>
          
          {/* Statut de la sélection */}
          <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-amber-100 border border-amber-300 rounded-full">
            <Clock className="h-5 w-5 text-amber-600" />
            <span className="text-amber-800 font-medium">Sélection en cours - Résultats prévus après le 15 Novembre 2025</span>
          </div>
        </div>

        {/* Statistiques globales avec design moderne */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className=" rounded-none border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{statG?.total || 0}</div>
              <div className="text-sm font-medium opacity-90">Candidatures Reçues</div>
            </CardContent>
          </Card>

          <Card className=" rounded-none border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{statG?.admis || 0}</div>
              <div className="text-sm font-medium opacity-90">Dossiers Validés</div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{getTotalInscrits()}</div>
              <div className="text-sm font-medium opacity-90">Inscrit Professionalisante</div>
            </CardContent>
          </Card>

          <Card className=" border-none rounded-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{getTotalInscrits()}</div>
              <div className="text-sm font-medium opacity-90">Inscrits Académiques</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className=" rounded-none grid w-full grid-cols-2 bg-white shadow-md p-1">
            <TabsTrigger 
              value="academique" 
              className="rounded-none data-[state=active]:bg-primary data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
            >
              Académique
            </TabsTrigger>
            <TabsTrigger 
              value="professionalisante" 
              className=" rounded-none data-[state=active]:bg-secondary data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              Professionalisante
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academique" className="space-y-6">
            {/* Contenu académique simplifié - liste gérée en bas */}
          </TabsContent>

          <TabsContent value="professionalisante" className="space-y-6">
            {/* Contenu professionalisante simplifié - liste gérée en bas */}
          </TabsContent>
        </Tabs>

        {/* Outils de recherche et filtrage */}
        <Card className="rounded-none mb-8 border-none shadow-xl">
          <CardHeader className="  bg-gradient-to-r from-slate-50 to-blue-50">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Filter className="h-5 w-5 text-blue-600" />
              Rechercher un Candidat
            </CardTitle>
            <CardDescription>Utilisez les filtres ci-dessous pour trouver rapidement un candidat</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Input 
                placeholder={`N° de candidat ou nom (${activeTab === "academique" ? "Mention" : "Filière"})`} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Select value={selectedMention} onValueChange={setSelectedMention}>
                <SelectTrigger className="border-slate-300">
                  <SelectValue placeholder={`Toutes les ${activeTab === "academique" ? "mentions" : "filières"}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Portails</SelectItem>
                  {getCurrentItems().map((item) => (
                    <SelectItem key={item.abbrev} value={item.key}>{item.nom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="hidden md:block"></div>
              <Button className="rounded-none bg-primary hover:from-blue-700 hover:to-indigo-700">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            
            </div>
          </CardContent>
        </Card>

        {/* Section résultats de recherche */}
        <Card className="rounded-none mb-8 border-none shadow-xl">
          <CardHeader className={`bg-gradient-to-r ${gradientClass}`}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-slate-800 capitalize">
                Liste des candidats {isAcademique ? "académiques" : "professionalisants"}
              </CardTitle>
              <div className="text-sm text-slate-600">
                {filteredCandidats.length} candidat(s) trouvé(s)
              </div>
            </div>
            <CardDescription>
              {selectedMention !== "all" ? `Filière/Mention sélectionnée : ${getCurrentItems().find(item => item.key === selectedMention)?.nom || ""}` : "Toutes les filières/mentions"}
              {searchTerm && ` • Recherche : "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {filteredCandidats.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100 border-b-2 border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">N° Candidat</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nom et Prénom</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Parcours</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date d'inscription</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredCandidats.map((candidat, idx) => (
                      <tr key={idx} className={`transition-colors duration-200 ${hoverClass}`}>
                        <td className="px-6 py-4">
                          <span className={`font-mono text-sm font-medium ${numeroColor}`}>{candidat.numero}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-800">{candidat.nom} {candidat.prenom}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">{candidat.parcours}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="h-4 w-4" />
                            {new Date(candidat.dateInscription).toLocaleDateString("fr-FR")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {candidat.statut === "Validé" ? (
                            <Badge className="bg-green-100 text-green-800 border-green-300">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Validé
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                              <Clock className="h-3 w-3 mr-1" />
                              En attente
                            </Badge>
                          )}
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
          <CardHeader className={`rounded-none bg-gradient-to-r ${gradientClass} mt-4 border-t`}>
            <Button className="rounded-none" >
              <Download className="h-4 w-4 mr-2 " />
              Exporter en PDF
            </Button>
          </CardHeader>
        </Card>

      </div>
    </div>
  )
}