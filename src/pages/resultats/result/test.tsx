// import { useSearchParams } from "react-router-dom";

// const [searchParams, setSearchParams] = useSearchParams();

// const page = Number(searchParams.get("page") ?? 1);
// const limit = Number(searchParams.get("limit") ?? 10);
// const idPortail = searchParams.get("idPortail") ?? "";
// useEffect(() => {
//     fetch(
//         `/api/selection/list-result?page=${page}&limit=${limit}&idPortail=${idPortail}`
//     )
//         .then(res => res.json())
//         .then(data => {
//             setListResult(data.data);
//             setTotal(data.total);
//         });
// }, [page, limit, idPortail]);

/*{<button
    disabled={page <= 1}
    onClick={() =>
        setSearchParams({
            page: String(page - 1),
            limit: String(limit),
            idPortail
        })
    }
>
    Précédent
</button>

<span>Page {page} / {totalPages}</span>

<button
    disabled={page >= totalPages}
    onClick={() =>
        setSearchParams({
            page: String(page + 1),
            limit: String(limit),
            idPortail
        })
    }
>
    Suivant
</button>}*/

// const handlePortailChange = (newPortail: string) => {
//     setSearchParams({
//         page: "1",
//         limit: String(limit),
//         idPortail: newPortail
//     });
// };

     {/* Statistiques globales */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          <Card className="rounded-none border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{getGlobalTotalCandidatures()}</div>
              <div className="text-sm font-medium opacity-90">Candidatures Totales</div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-none shadow-lg bg-purple-50 text-primary transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{getGlobalTotalAcademique()}</div>
              <div className="text-sm font-medium opacity-90">Inscrits Académiques</div>
              <div className="text-xs opacity-70 mt-1">({portailsAcademiques.length} portails)</div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-none shadow-lg bg-gray-50 text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{getGlobalTotalProfessionalisante()}</div>
              <div className="text-sm font-medium opacity-90">Inscrits Professionalisants</div>
              <div className="text-xs opacity-70 mt-1">({portailsProfessionalisants.length} portails)</div>
            </CardContent>
          </Card>

          <Card className="border-none rounded-none shadow-lg bg-purple-50 text-primary transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{getGlobalTotalPortails()}</div>
              <div className="text-sm font-medium opacity-90">Portails Disponibles</div>
            </CardContent>
          </Card>
        </div>*/}

          // Statistiques globales (indépendantes des filtres) - basées sur TOUTES les données
  // const getGlobalTotalAcademique = () => {
  //   const nomsPortails = portailsAcademiques.map(p => p.nomPortail)
  //   return allResultsForStats.filter(r => nomsPortails.includes(r.portail)).length
  // }

  // const getGlobalTotalProfessionalisante = () => {
  //   const nomsPortails = portailsProfessionalisants.map(p => p.nomPortail)
  //   return allResultsForStats.filter(r => nomsPortails.includes(r.portail)).length
  // }

  // const getGlobalTotalCandidatures = () => {
  //   return allResultsForStats.length
  // }

  // const getGlobalTotalPortails = () => {
  //   return listPort.length
  // }
   {/* Outils de recherche */}
        // <Card className="rounded-none mb-8 border-none shadow-xl mt-8">
        //   <CardHeader className="bg-purple-50">
        //     <CardTitle className="flex items-center gap-2 text-slate-800">
        //       <Filter className="h-5 w-5 text-purple-600" />
        //       Rechercher un Candidat
        //     </CardTitle>
        //     <CardDescription>
        //       Utilisez les filtres ci-dessous pour trouver rapidement un candidat
        //       {loading && <span className="ml-2 text-blue-600">• Recherche en cours...</span>}
        //     </CardDescription>
        //   </CardHeader>
        //   <CardContent className="p-6">
        //     <div className="grid md:grid-cols-2 gap-2">
        //       {/* <Input 
        //         placeholder="N° BAC, nom ou prénom..." 
        //         value={searchTerm}
        //         onChange={(e) => setSearchTerm(e.target.value)}
        //         className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
        //         disabled={loading}
        //       /> */}
        //       <Select value={selectedPortail} onValueChange={setSelectedPortail} disabled={loading}>
        //         <SelectTrigger className="border-slate-300">
        //           <SelectValue placeholder={`Tous les portails ${isAcademique ? 'académiques' : 'professionalisants'}`} />
        //         </SelectTrigger>
        //         <SelectContent>
        //           <SelectItem value="all">Tous les portails {isAcademique ? 'académiques' : 'professionalisants'}</SelectItem>
        //           {getCurrentPortails().map((portail) => (
        //             <SelectItem key={portail.idPortail} value={portail.idPortail.toString()}>
        //               {portail.nomPortail} ({portail.abbreviation})
        //             </SelectItem>
        //           ))}
        //         </SelectContent>
        //       </Select>
        //       <Button 
        //         variant="outline" 
        //         className="rounded-none hover:bg-primary"
        //         onClick={handleResetFilters}
        //         disabled={loading}
        //       >
        //         <Filter className="h-4 w-4 mr-2" />
        //         Réinitialiser
        //       </Button>
             
        //     </div>
        //   </CardContent>
        // </Card>

        // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Search, Download, Users, FileText, Calendar, CheckCircle2, GraduationCap, Filter } from "lucide-react"
// import { useEffect, useState } from "react"
// import jsPDF from 'jspdf'
// import autoTable from 'jspdf-autotable'
// // import { BACKEND_PREINSCRIPTION_URL } from "@/lib/api"
// // import { t } from "node_modules/i18next"

// type PortalType = {
//   idPortail: number;
//   nomPortail: string;
//   abbreviation: string;
//   estAcademique: boolean;
// }

// type ListResultatType = {
//   id: string;
//   bacNumber: string;
//   prenom: string;
//   nom?: string;
//   anneeBacc: string;
//   portail: string;
//   abrevi: string;
//   date: string;
//   rang: number;
//   limite: number;
//   statut: string;
//   positionDansPortail: number;
// }
// type PaginatedResultType = {
//   data: ListResultatType[];
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   pageSize: number;
//   hasPrevious: boolean;
//   hasNext: boolean;
// }

// export default function CandidatsPreinscrits() {
//   const [listPort, setListPort] = useState<PortalType[]>([])
//   const [listResult, setListResult] = useState<ListResultatType[]>([])
//   // const [allResultsForStats, setAllResultsForStats] = useState<ListResultatType[]>([]) // Données complètes pour les statistiques
//   const [searchTerm, setSearchTerm] = useState("")
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
//   const [selectedPortail, setSelectedPortail] = useState("all")
//   const [activeTab, setActiveTab] = useState("academique")
//   const [statusFilter, setStatusFilter] = useState<"all" | "selected" | "waiting">("all")
//   const [loading, setLoading] = useState(true)
//   const [paginationInfo, setPaginationInfo] = useState({
//   currentPage: 1,
//   totalPages: 1,
//   totalItems: 0,
//   pageSize: 5,
//   hasPrevious: false,
//   hasNext: false
// })
// const [pageSize, setPageSize] = useState(5)
// const [currentPage, setCurrentPage] = useState(1)
//   // Debounce pour la recherche
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm)
//     }, 500) // Attendre 500ms après que l'utilisateur arrête de taper

//     return () => clearTimeout(timer)
//   }, [searchTerm])

// const fetchResults = (
//   portailId: string = "all", 
//   search: string = "", 
//   page: number = 1,
//   size: number = 5
// ) => {
//   setLoading(true)
  
//   type RequestBody = {
//     pageNumber: number;
//     pageSize: number;
//     idPortail?: number;
//     searchTerm?: string;
//   }

//   const requestBody: RequestBody = {
//     pageNumber: page,
//     pageSize: size
//   }
  
//   if (portailId !== "all") {
//     requestBody.idPortail = parseInt(portailId)
//   }
  
//   if (search.trim()) {
//     requestBody.searchTerm = search.trim()
//   }
  
//   console.log('Requête avec pagination:', requestBody)
  
//   fetch(`https://siansa.univ-antananarivo.mg/admin/api/Selection/list-result`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(requestBody)
//   })
//     .then(async (response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const text = await response.text()
//       if (!text || text.trim() === '') {
//         console.warn('Réponse vide de l\'API')
//         return null
//       }
//       return JSON.parse(text) as PaginatedResultType
//     })
//     .then((paginatedResult) => {
//       if (paginatedResult) {
//         console.log(`Page ${paginatedResult.currentPage}/${paginatedResult.totalPages} - ${paginatedResult.data.length} résultats`)
//         setListResult(paginatedResult.data || [])
//         setPaginationInfo({
//           currentPage: paginatedResult.currentPage,
//           totalPages: paginatedResult.totalPages,
//           totalItems: paginatedResult.totalItems,
//           pageSize: paginatedResult.pageSize,
//           hasPrevious: paginatedResult.hasPrevious,
//           hasNext: paginatedResult.hasNext
//         })
//       } else {
//         setListResult([])
//       }
//       setLoading(false)
//     })
//     .catch((error) => {
//       console.error("Erreur lors de la récupération des résultats:", error)
//       setListResult([])
//       setLoading(false)
//     })
// }

// // Fonction pour récupérer TOUTES les données pour les statistiques (une seule fois au chargement)
// const fetchAllResultsForStats = () => {
//   const requestBody = {
//     pageNumber: 1,
//     pageSize: 10000 // Récupérer toutes les données
//   }

//   fetch(`https://siansa.univ-antananarivo.mg/admin/api/Selection/list-result`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(requestBody)
//   })
//     .then(async (response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const text = await response.text()
//       if (!text || text.trim() === '') {
//         console.warn('Réponse vide de l\'API pour les statistiques')
//         return null
//       }
//       return JSON.parse(text) as PaginatedResultType
//      // console.log(t)
//     })
//     .then((paginatedResult) => {
//       if (paginatedResult) {
//         console.log(`Données complètes pour statistiques: ${paginatedResult.data.length} résultats`)
//         // setAllResultsForStats(paginatedResult.data || [])
//       }
//     })
//     .catch((error) => {
//       console.error("Erreur lors de la récupération des données pour statistiques:", error)
//     })
// }

// // Récupération des portails (une seule fois)
// useEffect(() => {
//   fetch(`https://siansa.univ-antananarivo.mg/admin/api/Selection/list-portail`, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Portails reçus:', data)
//         setListPort(data || [])
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la récupération des portails:", error)
//         setListPort([])
//       })
  
//   // Récupérer toutes les données pour les statistiques (une seule fois)
//   fetchAllResultsForStats()
//   }, [])

//  useEffect(() => {
//   fetchResults(selectedPortail, debouncedSearchTerm, currentPage, pageSize)
// }, [selectedPortail, debouncedSearchTerm, currentPage, pageSize])

// useEffect(() => {
//   setCurrentPage(1) // Reset à la page 1
//   fetchResults(selectedPortail, debouncedSearchTerm, 1, pageSize)
// }, [selectedPortail, debouncedSearchTerm, pageSize])
// // Recharger quand la page change
// useEffect(() => {
//   fetchResults(selectedPortail, debouncedSearchTerm, currentPage, pageSize)
// }, [currentPage, selectedPortail, debouncedSearchTerm, pageSize])
//   // Filtrer les portails par type
//   const portailsAcademiques = listPort.filter(p => p.estAcademique === true)
//   const portailsProfessionalisants = listPort.filter(p => p.estAcademique === false)
// const handlePageChange = (newPage: number) => {
//   if (newPage >= 1 && newPage <= paginationInfo.totalPages) {
//     setCurrentPage(newPage)
//     // Scroll en haut de la page
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }
// }

// const handlePageSizeChange = (newSize: number) => {
//   setPageSize(newSize)
//   setCurrentPage(1) // Reset à la page 1
// }

// const handleResetFilters = () => {
//   setSearchTerm("")
//   setSelectedPortail("all")
//   setCurrentPage(1)
// }
//   // Obtenir les portails actuels selon l'onglet actif
//   const getCurrentPortails = () => 
//     activeTab === "academique" ? portailsAcademiques : portailsProfessionalisants


//   // Filtrer les candidats (simplifié car le filtrage est fait côté backend)
//   const getFilteredCandidats = () => {
//     if (!Array.isArray(listResult) || listResult.length === 0) {
//       return []
//     }
    
//     // Filtrer seulement par type (académique ou professionalisante)
//     const portailsActuels = getCurrentPortails()
//     const nomsPortails = portailsActuels.map(p => p.nomPortail)
    
//     let filtered = listResult.filter(c => nomsPortails.includes(c.portail))
    
//     // Filtrer par statut
//     if (statusFilter === "selected") {
//       filtered = filtered.filter(c => c.statut === "Sélectionné(e)")
//     } else if (statusFilter === "waiting") {
//       filtered = filtered.filter(c => c.statut !== "Sélectionné(e)")
//     }
    
//     return filtered
//   }

//   const filteredCandidats = getFilteredCandidats()
//   const isAcademique = activeTab === "academique"
//   const gradientClass = isAcademique ? "purple-50" : "amber-50"
//   const hoverClass = isAcademique ? "hover:bg-blue-50" : "hover:bg-green-50"
//   const numeroColor = isAcademique ? "text-primary" : "text-secondary"

//   // Fonction pour obtenir le nom du portail par ID
//   const getPortailNameById = (idPortail: number) => {
//     const portail = listPort.find(p => p.idPortail === idPortail)
//     return portail ? portail.nomPortail : "N/A"
//   }

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF()

//     doc.setFontSize(18)
//     doc.text("Résultat de la selection des dossiers", 14, 22)
    
//     doc.setFontSize(11)
//     let subtitle = `Total candidats: ${filteredCandidats.length}`
//     if (selectedPortail !== "all") {
//       subtitle += ` - Portail: ${getPortailNameById(parseInt(selectedPortail))}`
//     } else {
//       subtitle += ` - ${isAcademique ? "Académique" : "Professionalisante"}`
//     }
//     if (searchTerm) {
//       subtitle += ` - Recherche: "${searchTerm}"`
//     }
//     doc.text(subtitle, 14, 30)

//     const tableColumn = ["Rang","N° Bac",  "Nom et Prénom"]
//     const tableRows: (string | number)[][] = []

//     filteredCandidats.forEach(candidat => {
//       const candidateData = [
//         candidat.rang,
//         candidat.bacNumber,
       
//         candidat.prenom + (candidat.nom ? " " + candidat.nom : "")
//       ]
//       tableRows.push(candidateData)
//     })

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 35,
//     })

//     doc.save(`Resultats_Selection_FacScience_${isAcademique ? 'Academique' : 'Pro'}.pdf`)
//   }

//   // Composant de pagination
//   const PaginationControls = () => {
//     const startItem = (paginationInfo.currentPage - 1) * paginationInfo.pageSize + 1
//     const endItem = Math.min(
//       paginationInfo.currentPage * paginationInfo.pageSize, 
//       paginationInfo.totalItems
//     )

//     // Générer les numéros de pages à afficher
//     const getPageNumbers = () => {
//       const pages: (number | string)[] = []
//       const maxVisible = 5 // Nombre max de pages visibles
      
//       if (paginationInfo.totalPages <= maxVisible) {
//         // Afficher toutes les pages
//         for (let i = 1; i <= paginationInfo.totalPages; i++) {
//           pages.push(i)
//         }
//       } else {
//         // Logique pour afficher avec "..."
//         if (paginationInfo.currentPage <= 3) {
//           for (let i = 1; i <= 4; i++) pages.push(i)
//           pages.push('...')
//           pages.push(paginationInfo.totalPages)
//         } else if (paginationInfo.currentPage >= paginationInfo.totalPages - 2) {
//           pages.push(1)
//           pages.push('...')
//           for (let i = paginationInfo.totalPages - 3; i <= paginationInfo.totalPages; i++) {
//             pages.push(i)
//           }
//         } else {
//           pages.push(1)
//           pages.push('...')
//           pages.push(paginationInfo.currentPage - 1)
//           pages.push(paginationInfo.currentPage)
//           pages.push(paginationInfo.currentPage + 1)
//           pages.push('...')
//           pages.push(paginationInfo.totalPages)
//         }
//       }
      
//       return pages
//     }

//     return (
//       <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-slate-200 bg-white gap-4 md:gap-0">
//         {/* Info gauche */}
//         <div className="flex flex-col sm:flex-row items-center gap-4">
//           <span className="text-sm text-slate-600">
//             Affichage de <span className="font-semibold">{startItem}</span> à{' '}
//             <span className="font-semibold">{endItem}</span> sur{' '}
//             <span className="font-semibold">{paginationInfo.totalItems}</span> résultats
//           </span>
          
//           {/* Sélecteur de taille de page */}
//           <Select 
//             value={pageSize.toString()} 
//             onValueChange={(value) => handlePageSizeChange(parseInt(value))}
//           >
//             <SelectTrigger className="w-32">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="5">5 par page</SelectItem>
//               <SelectItem value="10">10 par page</SelectItem>
//               <SelectItem value="25">25 par page</SelectItem>
//               <SelectItem value="50">50 par page</SelectItem>
//               <SelectItem value="100">100 par page</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Boutons de pagination */}
//         <div className="flex items-center gap-2">
//           {/* Bouton Première page */}
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handlePageChange(1)}
//             disabled={!paginationInfo.hasPrevious || loading}
//             className="rounded-none hidden sm:inline-flex"
//           >
//             <span className="sr-only">Première page</span>
//            Première page
//           </Button>

//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={!paginationInfo.hasPrevious || loading}
//             className="rounded-none"
//           >
//             <span className="sr-only">Page précédente</span>
//             Précédent
//           </Button>

//           {/* Indicateur mobile */}
//           <span className="text-sm font-medium sm:hidden">
//             Page {currentPage} / {paginationInfo.totalPages}
//           </span>
          
//           {/* Numéros de pages (Desktop uniquement) */}
//           <div className="hidden sm:flex items-center gap-1">
//           {getPageNumbers().map((page, index) => (
//             page === '...' ? (
//               <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
//                 ...
//               </span>
//             ) : (
//               <Button
//                 key={page}
//                 variant={currentPage === page ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => handlePageChange(page as number)}
//                 disabled={loading}
//                 className={`rounded-none min-w-[40px] ${
//                   currentPage === page 
//                     ? "bg-primary text-white" 
//                     : "hover:bg-secondary"
//                 }`}
//               >
//                 {page}
//               </Button>
//             )
//           ))}
//           </div>

//           {/* Bouton Suivant */}
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={!paginationInfo.hasNext || loading}
//             className="rounded-none"
//           >
//             <span className="sr-only">Page suivante</span>
//             Suivant
//           </Button>

//           {/* Bouton Dernière page */}
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handlePageChange(paginationInfo.totalPages)}
//             disabled={!paginationInfo.hasNext || loading}
//             className="rounded-none hidden sm:inline-flex"
//           >
//             <span className="sr-only">Dernière page</span>
//             Dernière page
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
//           <p className="text-slate-600">Chargement des données...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//        <div className="text-center mb-8 md:mb-12 animate-fade-in">
//         <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary mb-4 md:mb-6 shadow-lg">
//           <Users className="h-8 w-8 md:h-10 md:w-10 text-white" />
//         </div>
//         <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-primary bg-clip-text text-transparent mb-3 md:mb-4 px-4">
//           Resultat de la selection des dossiers
//         </h1>
//         <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
//           Consultez la liste des candidats qui ont été selectionnés en Licence 1 - Année Académique 2025-2026
//         </p>
//       </div>

//             {/* Barre de recherche à droite */}
//               <div className="flex gap-2 items-center w-full mb-3">
//                 <div className="relative flex-grow">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
//                     <Input 
//                       placeholder="N° BAC, nom ou prénom..." 
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10 w-full border-slate-300 focus:border-purple-500 focus:ring-purple-500 rounded-none"
//                       disabled={loading}
//                     />
//                 </div>
//                  <Button 
//                 className="rounded-none bg-primary" 
//                 disabled={loading}
//                  >
//                 <Search className="h-4 w-4 mr-2" />
//                 {loading ? "Recherche..." : `Rechercher`}
//               </Button>
//               </div>

   

//      <Tabs value={activeTab} onValueChange={(value) => {
//           setActiveTab(value)
//           setSelectedPortail("all")
//         }} className="space-y-6">
//           <TabsList className="rounded-none grid w-full grid-cols-1 bg-white shadow-md p-2 h-auto gap-2">
//             <TabsTrigger 
//               value="academique" 
//               className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-white py-3 px-2 text-xs sm:text-sm font-medium transition-all whitespace-normal leading-tight min-h-[50px] flex items-center justify-center"
//             >
//               <span className="text-center">
//                 Académique<br className="sm:hidden" />
//                 <span className="sm:ml-1">({portailsAcademiques.length} portails)</span>
//               </span>
//             </TabsTrigger>
//             {/* <TabsTrigger 
//               value="professionalisante" 
//               className="rounded-none data-[state=active]:bg-secondary data-[state=active]:text-white py-3 px-2 text-xs sm:text-sm font-medium transition-all whitespace-normal leading-tight min-h-[50px] flex items-center justify-center"
//             >
//               <span className="text-center">
//                 Professionalisante<br className="sm:hidden" />
//                 <span className="sm:ml-1">({portailsProfessionalisants.length} portails)</span>
//               </span>
//             </TabsTrigger> */}
//           </TabsList>
//         </Tabs>
     

//         {/* Liste des candidats */}
//         <Card className="rounded-none mb-8 border-none shadow-xl">
//           <CardHeader className={`bg-${gradientClass}`}>
//             <div className="flex justify-between items-center mb-4">
//               <CardTitle className="text-2xl text-slate-800 capitalize">
//                 Liste des candidats {isAcademique ? "académiques" : "professionalisants"}
//               </CardTitle>
//             </div>
//             {/* Boutons de filtre par statut et recherche sur la même ligne */}
//             <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
//               {/* Boutons de filtre à gauche */}
//               <div className="flex flex-wrap gap-2 md:gap-3">
//                 <Button
//                   variant={statusFilter === "all" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setStatusFilter("all")}
//                   className={`rounded-none hover:bg-primary ${statusFilter === "all" ? (isAcademique ? "bg-primary" : "bg-secondary") : ""}`}
//                 >
//                   <Users className="h-4 w-4 mr-2" />
//                   Tous ({listResult.filter(c => getCurrentPortails().map(p => p.nomPortail).includes(c.portail)).length})
//                 </Button>
//                 <Button
//                   variant={statusFilter === "selected" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setStatusFilter("selected")}
//                   className={`rounded-none ${statusFilter === "selected" ? "bg-primary hover:bg-primary" : "border-primary text-slate-700 hover:bg-primary"}`}
//                 >
//                   <CheckCircle2 className="h-4 w-4 mr-2" />
//                   Sélectionné(e)s ({listResult.filter(c => getCurrentPortails().map(p => p.nomPortail).includes(c.portail) && c.statut === "Sélectionné(e)").length})
//                 </Button>
//                 <Button
//                   variant={statusFilter === "waiting" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setStatusFilter("waiting")}
//                   className={`rounded-none ${statusFilter === "waiting" ? "bg-red-600 hover:bg-orange-700" : "border-orange-600 text-orange-600 hover:bg-red-500"}`}
//                 >
//                   <Calendar className="h-4 w-4 mr-2" />
//                   Non Admis ({listResult.filter(c => getCurrentPortails().map(p => p.nomPortail).includes(c.portail) && c.statut !== "Sélectionné(e)").length})
//                 </Button>
//               </div>
              
          
//             </div>
//             {/* <CardDescription>
//               {selectedPortail !== "all" 
//                 ? `Portail sélectionné : ${getPortailNameById(parseInt(selectedPortail))}` 
//                 : `Tous les portails ${isAcademique ? 'académiques' : 'professionalisants'}`}
//               {searchTerm && ` • Recherche : "${searchTerm}"`}
//             </CardDescription> */}
//           </CardHeader>
//           <CardContent className="p-0">
//             {loading ? (
//               <div className="p-8 text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
//                 <p className="text-slate-600">Chargement des résultats...</p>
//               </div>
//             ) : filteredCandidats.length > 0 ? (
//               <>
//                 <div className="hidden md:block overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-slate-100 border-b-2 border-slate-200">
//                       <tr>
//                           <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Rang</th>
//                         <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">N° Bac</th>
//                           {/* <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Année Bac</th> */}
//                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Portail</th>
//                         <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nom et Prénom</th>
                       
                      
                      
//                         <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
//                         {/* <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th> */}
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-200">
//                       {filteredCandidats.map((candidat, idx) => (
//                         <tr key={candidat.id || idx} className={`transition-colors duration-200 ${hoverClass}`}>
//                           <td className="px-6 py-4">
//                             <span className="font-mono text-sm font-medium">
//                               {candidat.rang}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className={`font-medium ${numeroColor}`}>
//                               {candidat.bacNumber}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex flex-col gap-1">
//                               <Badge variant="outline" className="text-xs w-fit">
//                                 {candidat.abrevi}
//                               </Badge>
//                               <span className="text-xs text-slate-500">
//                                 {candidat.portail}
//                               </span>
//                             </div>
//                           </td>
//                           {/* <td className="px-6 py-4">
//                             <span className="text-sm text-slate-600">{candidat.anneeBacc}</span>
//                           </td> */}
//                           <td className="px-6 py-4">
//                             <span className="text-sm font-semibold text-slate-700">{candidat.prenom}</span>
//                           </td>
//                           <td className="px-6 py-4">
//                             {candidat.statut === "Sélectionné(e)" ? (
//                               <span className="text-sm font-semibold text-green-700">{candidat.statut}</span>
//                             ) : (
//                               <span className="text-sm font-semibold text-red-700">{candidat.statut}</span>
//                             )}
//                           </td>
//                           {/* <td className="px-6 py-4">
//                             <div className="flex items-center gap-2 text-sm text-slate-600">
//                               <Calendar className="h-4 w-4" />
//                               {candidat.date}
//                             </div>
//                           </td> */}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

         

//                 {/* Vue Mobile (Cartes) */}
//                 <div className="md:hidden space-y-4 px-4 pb-4 pt-2">
//                   {filteredCandidats.map((candidat, idx) => (
//                     <div key={candidat.id || idx} className={`p-4 bg-white border border-slate-100 rounded-lg shadow-sm border-l-4 ${isAcademique ? "border-l-primary" : "border-l-secondary"}`}>
//                         <div className="flex justify-between items-start mb-2">
//                             <span className="font-bold text-lg text-slate-800">Rang {candidat.rang}</span>
//                             {candidat.statut === "Sélectionné(e)" ? (
//                                 <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-50 rounded-full">{candidat.statut}</span>
//                             ) : (
//                                 <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-50 rounded-full">{candidat.statut}</span>
//                             )}
//                         </div>
//                         <div className="text-sm text-slate-600 mb-1 flex justify-between">
//                           <span className="font-semibold">N° Bac:</span> 
//                           <span className={`font-medium ${numeroColor}`}>{candidat.bacNumber}</span>
//                         </div>
//                         <div className="text-sm text-slate-600 mb-1">
//                           <span className="font-semibold block">Nom:</span> 
//                           {candidat.prenom} {candidat.nom ? " " + candidat.nom : ""}
//                         </div>
//                         <div className="text-sm text-slate-600 flex justify-between">
//                           <span className="font-semibold">Portail:</span> 
//                           {candidat.portail}
//                         </div>
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Pagination */}
//                 <PaginationControls />
//               </>
//             ) : (
//               <div className="p-8 text-center">
//                 <Users className="h-12 w-12 mx-auto mb-4 text-slate-400" />
//                 <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun candidat trouvé</h3>
//                 <p className="text-sm text-slate-600">Essayez d'ajuster vos critères de recherche.</p>
//               </div>
//             )}
//           </CardContent>
//           <CardHeader className={`rounded-none bg-${gradientClass} mt-4 border-t`}>
//             <Button 
//               className={`rounded-none ${isAcademique ? "bg-primary" : "bg-secondary hover:bg-secondary"}`}
//               onClick={handleDownloadPDF}
//               disabled={loading || filteredCandidats.length === 0}
//             >
//               <Download className="h-4 w-4 mr-2" />
//               Exporter en PDF
//             </Button>
//           </CardHeader>
//         </Card>
//       <Card className="rounded-none mb-8 border-none shadow-xl mt-8">
//           <CardHeader className="bg-purple-50">
//             <CardTitle className="flex items-center gap-2 text-slate-800">
//               <Filter className="h-5 w-5 text-purple-600" />
//               Rechercher un Candidat
//             </CardTitle>
//             <CardDescription>
//               Utilisez les filtres ci-dessous pour trouver rapidement un candidat
//               {loading && <span className="ml-2 text-blue-600">• Recherche en cours...</span>}
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="grid md:grid-cols-2 gap-2">
//               {/* <Input 
//                 placeholder="N° BAC, nom ou prénom..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border-slate-300 focus:border-purple-500 focus:ring-purple-500"
//                 disabled={loading}
//               /> */}
//               <Select value={selectedPortail} onValueChange={setSelectedPortail} disabled={loading}>
//                 <SelectTrigger className="border-slate-300">
//                   <SelectValue placeholder={`Tous les portails ${isAcademique ? 'académiques' : 'professionalisants'}`} />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Tous les portails {isAcademique ? 'académiques' : 'professionalisants'}</SelectItem>
//                   {getCurrentPortails().map((portail) => (
//                     <SelectItem key={portail.idPortail} value={portail.idPortail.toString()}>
//                       {portail.nomPortail} ({portail.abbreviation})
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <Button 
//                 variant="outline" 
//                 className="rounded-none hover:bg-primary"
//                 onClick={handleResetFilters}
//                 disabled={loading}
//               >
//                 <Filter className="h-4 w-4 mr-2" />
//                 Réinitialiser
//               </Button>
             
//             </div>
//           </CardContent>
//         </Card>
//         {/* Note importante */}
//         <Card className={`rounded-none border-${isAcademique ? "purple" : "amber"}-200 bg-${isAcademique ? "purple" : "amber"}-50 mb-10`}>
//           <CardContent className="p-6">
//             <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//               <div className="flex-shrink-0">
//                 <div className={`w-10 h-10 rounded-full bg-${isAcademique ? "purple" : "amber"}-600 flex items-center justify-center`}>
//                   {isAcademique ? <FileText className="h-5 w-5 text-white" /> : <GraduationCap className="h-5 w-5 text-white" />}
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-2">Information importante</h3>
//                 <p className="text-sm text-gray-800 leading-relaxed">
//                   Cette liste présente tous les candidats ayant effectué leur préinscription. La validation du dossier ne garantit pas l'admission définitive. 
//                   Les résultats finaux de la sélection seront publiés après l'étude approfondie de tous les dossiers.
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }