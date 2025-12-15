import { createContext } from 'react';

export interface ResultsContextType {
  showResults: boolean;
  loading: boolean;
}

export const ResultsContext = createContext<ResultsContextType>({
  showResults: false,
  loading: true,
});