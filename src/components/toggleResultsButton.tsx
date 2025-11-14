import { useResults } from "@/pages/resultats/resultatContext";
import {Eye, EyeOff} from "lucide-react";

export default function ToggleResultsButton () {
    const {showResults} = useResults();

    return (
        <button
        >
            {showResults ? (
                <>
                <EyeOff className="w-5 h-5" />
                <span>Masquer les résultats</span>
                </>
            ) : (
                <>
                <Eye className="w-5 h-5" />
                <span>Afficher les résultats</span>
                </>
            )}
        </button>
    );

}


