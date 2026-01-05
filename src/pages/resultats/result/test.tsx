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
