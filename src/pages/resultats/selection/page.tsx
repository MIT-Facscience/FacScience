import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Users, FileText, Calendar, CheckCircle2, GraduationCap } from "lucide-react"
import { useEffect, useState } from "react"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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
  portail: string;
  abrevi: string;
  date: string;
  rang: number;
  limite: number;
  statut: string;
  positionDansPortail: number;
}

type PaginatedResultType = {
  data: ListResultatType[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// Composant Skeleton
const TableSkeleton = () => (
  <div className="animate-pulse">
    <div className="hidden md:block">
      <table className="w-full">
        <thead className="bg-slate-100 border-b-2 border-slate-200">
          <tr>
            <th className="px-6 py-4 text-left"><div className="h-4 bg-slate-300 rounded w-16"></div></th>
            <th className="px-6 py-4 text-left"><div className="h-4 bg-slate-300 rounded w-20"></div></th>
            <th className="px-6 py-4 text-left"><div className="h-4 bg-slate-300 rounded w-24"></div></th>
            <th className="px-6 py-4 text-left"><div className="h-4 bg-slate-300 rounded w-32"></div></th>
            <th className="px-6 py-4 text-left"><div className="h-4 bg-slate-300 rounded w-20"></div></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {[...Array(5)].map((_, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-12"></div></td>
              <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-16"></div>
                  <div className="h-3 bg-slate-200 rounded w-32"></div>
                </div>
              </td>
              <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-40"></div></td>
              <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Skeleton Mobile */}
    <div className="md:hidden space-y-4 px-4 pb-4 pt-2">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="p-4 bg-white border border-slate-200 rounded-lg">
          <div className="flex justify-between mb-3">
            <div className="h-6 bg-slate-200 rounded w-20"></div>
            <div className="h-6 bg-slate-200 rounded w-24"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function CandidatsPreinscrits() {
  const [listPort, setListPort] = useState<PortalType[]>([])
  const [listResult, setListResult] = useState<ListResultatType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [selectedPortail, setSelectedPortail] = useState("all")
  const [activeTab, setActiveTab] = useState("academique")
  const [statusFilter, setStatusFilter] = useState<"all" | "selected" | "waiting">("all")
  const [loading, setLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false) // Nouveau état pour la recherche
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10,
    hasPrevious: false,
    hasNext: false
  })
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Debounce pour la recherche
  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearching(true)
    }

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setIsSearching(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, debouncedSearchTerm])

  const fetchResults = (
    portailId: string = "all",
    search: string = "",
    page: number = 1,
    size: number = 10,
    isInitialLoad: boolean = false
  ) => {
    if (isInitialLoad) {
      setLoading(true)
    } else {
      setIsSearching(true)
    }

    type RequestBody = {
      pageNumber: number;
      pageSize: number;
      idPortail?: number;
      searchTerm?: string;
    }

    const requestBody: RequestBody = {
      pageNumber: page,
      pageSize: size
    }

    if (portailId !== "all") {
      requestBody.idPortail = parseInt(portailId)
    }

    if (search.trim()) {
      requestBody.searchTerm = search.trim()
    }

    console.log('Requête avec pagination:', requestBody)

    fetch(`https://siansa.univ-antananarivo.mg/admin/api/Selection/list-result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const text = await response.text()
        if (!text || text.trim() === '') {
          console.warn('Réponse vide de l\'API')
          return null
        }
        return JSON.parse(text) as PaginatedResultType
      })
      .then((paginatedResult) => {
        if (paginatedResult) {
          console.log(`Page ${paginatedResult.currentPage}/${paginatedResult.totalPages} - ${paginatedResult.data.length} résultats`)
          setListResult(paginatedResult.data || [])
          setPaginationInfo({
            currentPage: paginatedResult.currentPage,
            totalPages: paginatedResult.totalPages,
            totalItems: paginatedResult.totalItems,
            pageSize: paginatedResult.pageSize,
            hasPrevious: paginatedResult.hasPrevious,
            hasNext: paginatedResult.hasNext
          })
        } else {
          setListResult([])
        }
        setLoading(false)
        setIsSearching(false)
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des résultats:", error)
        setListResult([])
        setLoading(false)
        setIsSearching(false)
      })
  }

  const fetchAllResultsForStats = () => {
    const requestBody = {
      pageNumber: 1,
      pageSize: 10000
    }

    fetch(`https://siansa.univ-antananarivo.mg/admin/api/Selection/list-result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const text = await response.text()
        if (!text || text.trim() === '') {
          console.warn('Réponse vide de l\'API pour les statistiques')
          return null
        }
        return JSON.parse(text) as PaginatedResultType
      })
      .then((paginatedResult) => {
        if (paginatedResult) {
          console.log(`Données complètes pour statistiques: ${paginatedResult.data.length} résultats`)
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données pour statistiques:", error)
      })
  }

  useEffect(() => {
    fetch(`https://siansa.univ-antananarivo.mg/admin/api/Selection/list-portail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Portails reçus:', data)
        setListPort(data || [])
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des portails:", error)
        setListPort([])
      })

    fetchAllResultsForStats()
    fetchResults("all", "", 1, 10, true) // Initial load
  }, [])

  useEffect(() => {
    if (!loading) {
      fetchResults(selectedPortail, debouncedSearchTerm, currentPage, pageSize)
    }
  }, [selectedPortail, debouncedSearchTerm, currentPage, pageSize, loading])

  useEffect(() => {
    if (!loading) {
      setCurrentPage(1)
      fetchResults(selectedPortail, debouncedSearchTerm, 1, pageSize)
    }
  }, [selectedPortail, debouncedSearchTerm, pageSize, loading])

  const portailsAcademiques = listPort.filter(p => p.estAcademique === true)
  const portailsProfessionalisants = listPort.filter(p => p.estAcademique === false)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= paginationInfo.totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setCurrentPage(1)
  }

  // const handleResetFilters = () => {
  //   setSearchTerm("")
  //   setSelectedPortail("all")
  //   setCurrentPage(1)
  // }

  const getCurrentPortails = () =>
    activeTab === "academique" ? portailsAcademiques : portailsProfessionalisants

  const getFilteredCandidats = () => {
    if (!Array.isArray(listResult) || listResult.length === 0) {
      return []
    }

    const portailsActuels = getCurrentPortails()
    const nomsPortails = portailsActuels.map(p => p.nomPortail)

    let filtered = listResult.filter(c => nomsPortails.includes(c.portail))

    if (statusFilter === "selected") {
      filtered = filtered.filter(c => c.statut === "Sélectionné(e)")
    } else if (statusFilter === "waiting") {
      filtered = filtered.filter(c => c.statut !== "Sélectionné(e)")
    }

    return filtered
  }

  const filteredCandidats = getFilteredCandidats()
  const isAcademique = activeTab === "academique"
  const gradientClass = isAcademique ? "purple-50" : "amber-50"
  const hoverClass = isAcademique ? "hover:bg-blue-50" : "hover:bg-green-50"
  const numeroColor = isAcademique ? "text-primary" : "text-amber-600"

  const getPortailNameById = (idPortail: number) => {
    const portail = listPort.find(p => p.idPortail === idPortail)
    return portail ? portail.nomPortail : "N/A"
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Résultat de la selection des dossiers", 14, 22)

    doc.setFontSize(11)
    let subtitle = `Total candidats: ${filteredCandidats.length}`
    if (selectedPortail !== "all") {
      subtitle += ` - Portail: ${getPortailNameById(parseInt(selectedPortail))}`
    } else {
      subtitle += ` - ${isAcademique ? "Académique" : "Professionalisante"}`
    }
    if (searchTerm) {
      subtitle += ` - Recherche: "${searchTerm}"`
    }
    doc.text(subtitle, 14, 30)

    const tableColumn = ["Rang", "N° Bac", "Nom et Prénom"]
    const tableRows: (string | number)[][] = []

    filteredCandidats.forEach(candidat => {
      const candidateData = [
        candidat.rang,
        candidat.bacNumber,
        candidat.prenom + (candidat.nom ? " " + candidat.nom : "")
      ]
      tableRows.push(candidateData)
    })

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
    })

    doc.save(`Resultats_Selection_FacScience_${isAcademique ? 'Academique' : 'Pro'}.pdf`)
  }

  const PaginationControls = () => {
    const startItem = (paginationInfo.currentPage - 1) * paginationInfo.pageSize + 1
    const endItem = Math.min(
      paginationInfo.currentPage * paginationInfo.pageSize,
      paginationInfo.totalItems
    )

    const getPageNumbers = () => {
      const pages: (number | string)[] = []
      const maxVisible = 5

      if (paginationInfo.totalPages <= maxVisible) {
        for (let i = 1; i <= paginationInfo.totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (paginationInfo.currentPage <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i)
          pages.push('...')
          pages.push(paginationInfo.totalPages)
        } else if (paginationInfo.currentPage >= paginationInfo.totalPages - 2) {
          pages.push(1)
          pages.push('...')
          for (let i = paginationInfo.totalPages - 3; i <= paginationInfo.totalPages; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('...')
          pages.push(paginationInfo.currentPage - 1)
          pages.push(paginationInfo.currentPage)
          pages.push(paginationInfo.currentPage + 1)
          pages.push('...')
          pages.push(paginationInfo.totalPages)
        }
      }

      return pages
    }

    return (
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-slate-200 bg-white gap-4 md:gap-0">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-sm text-slate-600">
            Affichage de <span className="font-semibold">{startItem}</span> à{' '}
            <span className="font-semibold">{endItem}</span> sur{' '}
            <span className="font-semibold">{paginationInfo.totalItems}</span> résultats
          </span>

          <Select
            value={pageSize.toString()}
            onValueChange={(value) => handlePageSizeChange(parseInt(value))}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 par page</SelectItem>
              <SelectItem value="10">10 par page</SelectItem>
              <SelectItem value="25">25 par page</SelectItem>
              <SelectItem value="50">50 par page</SelectItem>
              <SelectItem value="100">100 par page</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={!paginationInfo.hasPrevious || isSearching}
            className="rounded-none hidden sm:inline-flex"
          >
            Première page
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!paginationInfo.hasPrevious || isSearching}
            className="rounded-none"
          >
            Précédent
          </Button>

          <span className="text-sm font-medium sm:hidden">
            Page {currentPage} / {paginationInfo.totalPages}
          </span>

          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page as number)}
                  disabled={isSearching}
                  className={`rounded-none min-w-[40px] ${currentPage === page
                      ? "bg-primary text-white"
                      : "hover:bg-secondary"
                    }`}
                >
                  {page}
                </Button>
              )
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!paginationInfo.hasNext || isSearching}
            className="rounded-none"
          >
            Suivant
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(paginationInfo.totalPages)}
            disabled={!paginationInfo.hasNext || isSearching}
            className="rounded-none hidden sm:inline-flex"
          >
            Dernière page
          </Button>
        </div>
      </div>
    )
  }

  // Loading initial uniquement
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
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary mb-4 md:mb-6 shadow-lg">
            <Users className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-primary bg-clip-text text-transparent mb-3 md:mb-4 px-4">
            Resultat de la selection des dossiers
          </h1>
          <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
            Liste des candidats sélectionnés pour l'année universitaire 2025-2026
          </p>
        </div>

        <div className="flex gap-2 items-center w-full mb-3">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-1 gap-4">
              <Select value={selectedPortail} onValueChange={setSelectedPortail} disabled={isSearching}>
                <SelectTrigger className="border-slate-300">
                  <SelectValue placeholder={`Tous portails`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous portails</SelectItem>
                  {getCurrentPortails().map((portail) => (
                    <SelectItem key={portail.idPortail} value={portail.idPortail.toString()}>
                      {portail.abbreviation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <Button 
                variant="outline" 
                className="rounded-none hover:bg-primary"
                onClick={handleResetFilters}
                disabled={isSearching}
              >
                <Filter className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button> */}
            </div>
          </CardContent>
          <div className="relative flex-grow sm:w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

            <Input
              placeholder="N° BAC, nom ou prénom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border-slate-300 focus:border-purple-500 focus:ring-purple-500 rounded-none"
            />

            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
              </div>
            )}
          </div>

          {/* <Button 
            className="rounded-none bg-primary" 
            
          >
            <Search className="h-4 w-4 mr-2" />
            {isSearching ? "Recherche..." : "Rechercher"}
          </Button> */}
        </div>

        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value)
          setSelectedPortail("all")
        }} className="space-y-6">
          <TabsList className="rounded-none grid w-full grid-cols-2 bg-white shadow-md p-2 h-auto gap-2">
            <TabsTrigger
              value="academique"
              className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-white py-3 px-2 text-xs sm:text-sm font-medium transition-all whitespace-normal leading-tight min-h-[50px] flex items-center justify-center"
            >
              <span className="text-center flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>
                  Académique<br className="sm:hidden" />
                  <span className="sm:ml-1">({portailsAcademiques.length})</span>
                </span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="professionalisante"
              className="rounded-none data-[state=active]:bg-secondary data-[state=active]:text-white py-3 px-2 text-xs sm:text-sm font-medium transition-all whitespace-normal leading-tight min-h-[50px] flex items-center justify-center"
            >
              <span className="text-center flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  Professionnalisante<br className="sm:hidden" />
                  <span className="sm:ml-1">({portailsProfessionalisants.length})</span>
                </span>
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="rounded-none mb-8 border-none shadow-xl">
          <CardHeader className={`bg-${gradientClass}`}>
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="text-2xl text-slate-800 capitalize">
                Liste des candidats {isAcademique ? "académiques" : "professionalisants"}
              </CardTitle>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex flex-wrap gap-2 md:gap-3">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                  className={`rounded-none hover:bg-primary ${statusFilter === "all" ? (isAcademique ? "bg-primary" : "bg-secondary") : ""}`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Tous
                </Button>
                <Button
                  variant={statusFilter === "selected" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("selected")}
                  className={`rounded-none ${statusFilter === "selected" ? "bg-primary hover:bg-primary" : "border-primary text-slate-700 hover:bg-primary"}`}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Sélectionné(e)s
                </Button>
                <Button
                  variant={statusFilter === "waiting" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("waiting")}
                  className={`rounded-none ${statusFilter === "waiting" ? "bg-red-600 hover:bg-orange-700" : "border-orange-600 text-orange-600 hover:bg-red-500"}`}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Non Admis
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isSearching ? (
              <TableSkeleton />
            ) : filteredCandidats.length > 0 ? (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-100 border-b-2 border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Rang</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">N° Bac</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Portail</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nom et Prénom</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredCandidats.map((candidat, idx) => (
                        <tr key={candidat.id || idx} className={`transition-colors duration-200 ${hoverClass}`}>
                          <td className="px-6 py-4">
                            <span className="font-mono text-sm font-medium">
                              {candidat.rang}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`font-medium ${numeroColor}`}>
                              {candidat.bacNumber}
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
                            <span className="text-sm font-semibold text-slate-700">{candidat.prenom}</span>
                          </td>
                          <td className="px-6 py-4">
                            {candidat.statut === "Sélectionné(e)" ? (
                              <span className="text-sm font-semibold text-green-700">{candidat.statut}</span>
                            ) : (
                              <span className="text-sm font-semibold text-red-700">{candidat.statut}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-4 px-4 pb-4 pt-2">
                  {filteredCandidats.map((candidat, idx) => (
                    <div key={candidat.id || idx} className={`p-4 bg-white border border-slate-100 rounded-lg shadow-sm border-l-4 ${isAcademique ? "border-l-primary" : "border-l-secondary"}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-lg text-slate-800">Rang {candidat.rang}</span>
                        {candidat.statut === "Sélectionné(e)" ? (
                          <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-50 rounded-full">{candidat.statut}</span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 rounded-full">{candidat.statut}</span>
                        )}
                      </div>
                      <div className="text-sm text-slate-600 mb-1 flex gap-1">
                        <span className="font-semibold">N° Bac:</span>
                        <span className={`font-medium ${numeroColor}`}>{candidat.bacNumber}</span>
                      </div>
                      <div className="text-sm text-slate-600 mb-1">
                        <span className="font-semibold block">Nom: <span className="font-normal p-2">{candidat.prenom} {candidat.nom ? " " + candidat.nom : ""}</span></span>

                      </div>
                      <div className="text-sm text-slate-600 flex gap-1">
                        <span className="font-semibold">Portail:</span>
                        {candidat.portail}
                      </div>
                    </div>
                  ))}
                </div>

                <PaginationControls />
              </>
            ) : (
              <div className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun candidat trouvé</h3>
                <p className="text-sm text-slate-600">Essayez d'ajuster vos critères de recherche.</p>
              </div>
            )}
          </CardContent>
          <CardHeader className={`rounded-none bg-${gradientClass} mt-4 border-t`}>
            <Button
              className={`rounded-none ${isAcademique ? "bg-primary" : "bg-secondary hover:bg-secondary"}`}
              onClick={handleDownloadPDF}
              disabled={isSearching || filteredCandidats.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter en PDF
            </Button>
          </CardHeader>
        </Card>



        <Card className={`rounded-none border-${isAcademique ? "purple" : "amber"}-200 bg-${isAcademique ? "purple" : "amber"}-50 mb-10`}>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full bg-${isAcademique ? "purple" : "amber"}-600 flex items-center justify-center`}>
                  {isAcademique ? <FileText className="h-5 w-5 text-white" /> : <GraduationCap className="h-5 w-5 text-white" />}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Information importante</h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                  Cette liste présente tous les candidats ayant effectué leur préinscription. La validation du dossier ne garantit pas l'admission définitive.
                  Les résultats finaux de la sélection seront publiés après l'étude approfondie de tous les dossiers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
