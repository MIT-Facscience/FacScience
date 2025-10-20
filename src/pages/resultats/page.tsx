import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Filter, Users, FileText, Calendar, CheckCircle2, Clock, GraduationCap } from "lucide-react"
import { Link } from "react-router-dom"
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

type StatMentionType = {
  nomPortail: string;
  abbrev: string;
  total: number;
  inscritsVerifies?: number;
}

type StatFiliereType = {
  nomFiliere: string;
  abbrev: string;
  total: number;
  inscritsVerifies?: number;
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

    setLoading(false)
  }, [])

  // Données exemple pour les candidats académique
  const candidatsParMentionAcademique = {
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
  const candidatsParFiliereProfessionalisante = {
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
  const getCurrentCandidats = () => activeTab === "academique" ? candidatsParMentionAcademique : candidatsParFiliereProfessionalisante
  const getCurrentStat = () => activeTab === "academique" ? statPAcademique : statPProfessionalisante
  const getCurrentStatKey = () => activeTab === "academique" ? "nomPortail" : "nomFiliere"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
            Consultez la liste des candidats ayant effectué leur préinscription pour l'admission en Licence 1 - Année Académique 2024-2025
          </p>
          
          {/* Statut de la sélection */}
          <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-amber-100 border border-amber-300 rounded-full">
            <Clock className="h-5 w-5 text-amber-600" />
            <span className="text-amber-800 font-medium">Sélection en cours - Résultats prévus le 15 Novembre 2024</span>
          </div>
        </div>

        {/* Statistiques globales avec design moderne */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{statG?.total || 0}</div>
              <div className="text-sm font-medium opacity-90">Candidatures Reçues</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{statG?.admis || 0}</div>
              <div className="text-sm font-medium opacity-90">Dossiers Validés</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{statG?.nonAdmis || 0}</div>
              <div className="text-sm font-medium opacity-90">En Attente de Vérification</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{getTotalInscrits()}</div>
              <div className="text-sm font-medium opacity-90">{activeTab === "academique" ? "Inscrits Académiques" : "Inscrits Pro."}</div>
            </CardContent>
          </Card>
        </div>

        {/* Outils de recherche et filtrage */}
        <Card className="mb-8 border-none shadow-xl">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
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
                  <SelectItem value="all">Toutes</SelectItem>
                  {getCurrentItems().map((item) => (
                    <SelectItem key={item.abbrev} value={item.key}>{item.nom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-slate-300">
                  <SelectValue placeholder="Statut du dossier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="valide">Validé</SelectItem>
                  <SelectItem value="attente">En attente</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary hover:from-blue-700 hover:to-indigo-700">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs principaux: Académique vs Professionalisante */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-md p-1 rounded-lg">
            <TabsTrigger 
              value="academique" 
              className="data-[state=active]:bg-primary data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
            >
              Académique
            </TabsTrigger>
            <TabsTrigger 
              value="professionalisante" 
              className="data-[state=active]:bg-secondary data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              Professionalisante
            </TabsTrigger>
          </TabsList>

          {/* Onglet Académique */}
          <TabsContent value="academique" className="space-y-6">
            {/* Sous-Tabs par mention académique */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-white shadow-md p-1 rounded-lg">
                <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
                  Vue d'ensemble
                </TabsTrigger>
                {mentionsAcademique.map((mention) => (
                  <TabsTrigger key={mention.abbrev} value={mention.key} className="data-[state=active]:bg-primary data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
                    {mention.abbrev}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Sous-Onglet Vue d'ensemble académique */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6">
                  {statPAcademique?.map((mention, index) => (
                    <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-xl text-slate-800 mb-1">{mention.nomPortail}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-white">{mention.abbrev}</Badge>
                              <span>Licence 1 - Année 2024-2025</span>
                            </CardDescription>
                          </div>
                          <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                            <Download className="h-4 w-4 mr-2" />
                            Exporter la liste
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                            <div className="text-3xl font-bold text-blue-600 mb-1">{mention.total}</div>
                            <div className="text-sm text-slate-600 font-medium">Candidatures</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                            <div className="text-3xl font-bold text-green-600 mb-1">{mention.admis}</div>
                            <div className="text-sm text-slate-600 font-medium">Validés</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                            <div className="text-3xl font-bold text-amber-600 mb-1">{mention.nonAdmis}</div>
                            <div className="text-sm text-slate-600 font-medium">En attente</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                            <div className="text-3xl font-bold text-purple-600 mb-1">{mention.tauxAdmission}%</div>
                            <div className="text-sm text-slate-600 font-medium">Taux validation</div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex gap-3">
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                            <Users className="h-4 w-4 mr-2" />
                            Voir la liste complète
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-300">
                            <FileText className="h-4 w-4 mr-2" />
                            Détails par parcours
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Sous-Onglets pour chaque mention académique */}
              {mentionsAcademique.map((mention) => {
                const mentionKey = mention.key
                const candidats = candidatsParMentionAcademique[mentionKey as keyof typeof candidatsParMentionAcademique] || []
                return (
                  <TabsContent key={mentionKey} value={mentionKey} className="space-y-4">
                    <Card className="border-none shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-2xl text-slate-800 capitalize mb-2">
                              {mention.nom}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {candidats.length} candidat(s) préinscrit(s) • Licence 1
                            </CardDescription>
                          </div>
                          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                            <Download className="h-4 w-4 mr-2" />
                            Exporter en PDF
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
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
                              {candidats.map((candidat, idx) => (
                                <tr key={idx} className="hover:bg-blue-50 transition-colors duration-200">
                                  <td className="px-6 py-4">
                                    <span className="font-mono text-sm font-medium text-blue-600">{candidat.numero}</span>
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
                      </CardContent>
                    </Card>

                    {/* Note importante */}
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-blue-900 mb-2">Information importante</h3>
                            <p className="text-sm text-blue-800 leading-relaxed">
                              Cette liste présente tous les candidats ayant effectué leur préinscription. La validation du dossier ne garantit pas l'admission définitive. 
                              Les résultats finaux de la sélection seront publiés après l'étude approfondie de tous les dossiers.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )
              })}
            </Tabs>
          </TabsContent>

          {/* Onglet Professionalisante */}
          <TabsContent value="professionalisante" className="space-y-6">
            {/* Sous-Tabs par filière professionalisante */}
            <Tabs defaultValue="overview-pro" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white shadow-md p-1 rounded-lg">
                <TabsTrigger value="overview-pro" className="data-[state=active]:bg-secondary data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
                  Vue d'ensemble
                </TabsTrigger>
                {filieresProfessionalisante.map((filiere) => (
                  <TabsTrigger key={filiere.abbrev} value={filiere.key} className="data-[state=active]:bg-secondary data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
                    {filiere.abbrev}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Sous-Onglet Vue d'ensemble professionalisante */}
              <TabsContent value="overview-pro" className="space-y-6">
                <div className="grid gap-6">
                  {statPProfessionalisante.map((filiere, index) => (
                    <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
                      <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-xl text-slate-800 mb-1">{filiere.nomFiliere}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-white">{filiere.abbrev}</Badge>
                              <span>Licence 1 Professionnalisante - Année 2024-2025</span>
                            </CardDescription>
                          </div>
                          <Button variant="outline" size="sm" className="border-green-300 text-green-600 hover:bg-green-50">
                            <Download className="h-4 w-4 mr-2" />
                            Exporter la liste
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                            <div className="text-3xl font-bold text-green-600 mb-1">{filiere.total}</div>
                            <div className="text-sm text-slate-600 font-medium">Candidatures</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                            <div className="text-3xl font-bold text-blue-600 mb-1">{filiere.inscritsVerifies || 0}</div>
                            <div className="text-sm text-slate-600 font-medium">Validés</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                            <div className="text-3xl font-bold text-amber-600 mb-1">{filiere.total - (filiere.inscritsVerifies || 0)}</div>
                            <div className="text-sm text-slate-600 font-medium">En attente</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                            <div className="text-3xl font-bold text-purple-600 mb-1">{((filiere.inscritsVerifies || 0) / filiere.total * 100).toFixed(1)}%</div>
                            <div className="text-sm text-slate-600 font-medium">Taux validation</div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex gap-3">
                          <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                            <Users className="h-4 w-4 mr-2" />
                            Voir la liste complète
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-300">
                            <FileText className="h-4 w-4 mr-2" />
                            Détails par parcours
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Sous-Onglets pour chaque filière professionalisante */}
              {filieresProfessionalisante.map((filiere) => {
                const filiereKey = filiere.key
                const candidats = candidatsParFiliereProfessionalisante[filiereKey as keyof typeof candidatsParFiliereProfessionalisante] || []
                return (
                  <TabsContent key={filiereKey} value={filiereKey} className="space-y-4">
                    <Card className="border-none shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-slate-50 to-green-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-2xl text-slate-800 capitalize mb-2">
                              {filiere.nom}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {candidats.length} candidat(s) préinscrit(s) • Licence 1 Professionnalisante
                            </CardDescription>
                          </div>
                          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                            <Download className="h-4 w-4 mr-2" />
                            Exporter en PDF
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
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
                              {candidats.map((candidat, idx) => (
                                <tr key={idx} className="hover:bg-green-50 transition-colors duration-200">
                                  <td className="px-6 py-4">
                                    <span className="font-mono text-sm font-medium text-green-600">{candidat.numero}</span>
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
                      </CardContent>
                    </Card>

                    {/* Note importante pour pro */}
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                              <GraduationCap className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-green-900 mb-2">Information importante</h3>
                            <p className="text-sm text-green-800 leading-relaxed">
                              Cette liste présente tous les candidats ayant effectué leur préinscription en filière professionalisante. La validation du dossier ne garantit pas l'admission définitive. 
                              Les résultats finaux de la sélection seront publiés après l'étude approfondie de tous les dossiers.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )
              })}
            </Tabs>
          </TabsContent>
        </Tabs>

        {/* Calendrier et informations */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Calendar className="h-5 w-5 text-purple-600" />
                Calendrier de Sélection
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Clôture des inscriptions</div>
                  <div className="text-sm text-slate-600">30 Septembre 2024</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600 animate-pulse" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Étude des dossiers</div>
                  <div className="text-sm text-slate-600">1 - 14 Novembre 2024</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Publication des résultats</div>
                  <div className="text-sm text-slate-600">15 Novembre 2024</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
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
              <Button className="w-full bg-primary  hover:from-indigo-700 hover:to-purple-700 mt-4">
                Contacter le service des admissions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}