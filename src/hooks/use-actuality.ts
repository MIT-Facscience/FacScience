import { BACKEND_URL } from "@/lib/api";
import {type Actuality } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

export function useActuality () {
    const [actualities, setActualities] = useState<Actuality[]>([]);

    const fetchActualities = useCallback(async () => {
        try {
        const response = await fetch(`${BACKEND_URL}/api/Actualite/actualities`);
          if (!response.ok) throw new Error("Erreur de récupération de l'actualité");
          const data = await response.json();

          if(!data) throw Error("Error on loading Actualities Data.")
          setActualities(data)
          
        } catch (err) {
          if (err instanceof Error) {
            console.error(err.message);
          } else {
            console.error(String(err));
          }
        }
    },[])

        
    useEffect(() => {
        fetchActualities()
    }, [fetchActualities]);
    
    return {
        actualities
    }
}