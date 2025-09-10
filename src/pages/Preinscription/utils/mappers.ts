// utils/mappers.ts
import { ResData } from '../types/models';
import { CandidateInfo } from '../types';

// Fonction pour convertir ResData en CandidateInfo
export const mapResDataToCandidateInfo = (resData: ResData, numBacc: string, anneeBacc: number): CandidateInfo => {
  // Séparer nom et prénom de nom_prenom
  const nameParts = resData.nom_prenom.trim().split(' ');
  const firstName = nameParts.slice(0, -1).join(' ') || nameParts[0] || '';
  const lastName = nameParts[nameParts.length - 1] || '';

  // Mapper l'option/série de ResData vers le format CandidateInfo
  const seriesMapping: Record<string, 'S' | 'C' | 'D' | 'A1' | 'A2' | 'L' | 'OSE'> = {
    // Mappings probables selon vos données
    'Scientifique': 'S',
    'Sciences': 'S',
    'S': 'S',
    'Technique': 'C',
    'C': 'C',
    'Sciences de la Nature': 'D',
    'D': 'D',
    'Littéraire A1': 'A1',
    'A1': 'A1',
    'Littéraire A2': 'A2',
    'A2': 'A2',
    'Littéraire': 'L',
    'L': 'L',
    'OSE': 'OSE'
  };

  // Essayer de mapper l'option, sinon utiliser 'OSE' par défaut
  const series = seriesMapping[resData.option] || 
                seriesMapping[resData.option.toUpperCase()] || 
                'OSE';
  
  // Vérifier l'éligibilité (séries scientifiques uniquement pour la faculté des sciences)
  const eligibleSeries = ['S', 'C', 'D'];
  const isEligible = eligibleSeries.includes(series);

  return {
    id: `${numBacc}-${anneeBacc}`,
    firstName,
    lastName,
    baccalaureateNumber: numBacc,
    graduationYear: anneeBacc,
    series,
    isEligible
  };
};

// Fonction pour mapper CandidateInfo et Program vers idOption et idParcours
export const getOptionIdFromSeries = (series: string): number => {
  const seriesMap: Record<string, number> = {
    'S': 1,    // Scientifique
    'C': 2,    // Technique  
    'D': 3,    // Sciences de la Nature
    'A1': 4,   // Littéraire A1
    'A2': 5,   // Littéraire A2
    'L': 6,    // Littéraire
    'OSE': 7   // OSE
  };
  return seriesMap[series] || 7;
};

export const getParcoursIdFromProgram = (programId: string): number => {
  // Mapper vos Program.id vers les idParcours de votre base
  const programMap: Record<string, number> = {
    'math': 1,         // Mathématiques
    'physics': 2,      // Physique
    'chemistry': 3,    // Chimie
    'biology': 4,      // Biologie
    'computer': 5,     // Informatique
    'geology': 6,      // Géologie
    // Ajoutez selon vos programmes
  };
  return programMap[programId] || 1;
};