import { useContext } from 'react';
import { ResultsContext } from '@/pages/resultats/ResultatContext';

export const useResults = () => useContext(ResultsContext);