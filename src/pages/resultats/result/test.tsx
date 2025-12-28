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

