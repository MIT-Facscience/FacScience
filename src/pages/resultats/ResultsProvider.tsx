import { useState, useEffect } from 'react';
import { ResultsContext } from './ResultatContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5174';

export function ResultsProvider({ children }: { children: React.ReactNode }) {
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchShowResults = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings/show-results`);
      if (res.ok) {
        const data = await res.json();
        setShowResults(data.showResults);
      }
    } catch (err) {
      console.error("Erreur chargement showResults", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowResults();
    // Polling toutes les 30 secondes
    const interval = setInterval(fetchShowResults, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ResultsContext.Provider value={{ showResults, loading }}>
      {children}
    </ResultsContext.Provider>
  );
}