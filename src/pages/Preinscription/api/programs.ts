import { Program } from '../types';

export const AVAILABLE_PROGRAMS: Program[] = [
  {
    id: 'svt',
    name: 'Sciences de la Vie et de la Terre',
    eligibleSeries: ['S', 'C', 'D'],
  },
  {
    id: 'physics',
    name: 'Physique',
    eligibleSeries: ['S', 'C', 'D'],
  },
  {
    id: 'chemistry',
    name: 'Chimie',
    eligibleSeries: ['S', 'C', 'D'],
  },
  {
    id: 'mathematics',
    name: 'Mathématiques',
    eligibleSeries: ['S', 'C', 'D'],
  },
  {
    id: 'mit',
    name: 'Mention Informatique et Technologies',
    eligibleSeries: ['S', 'C'],
  }
];

export const getProgram = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL_PREINSCRIPTION}/api/Register/mention`, {
      method: "POST"
    })
    if (!res.ok) return
    const data : Program[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  // return 
  return AVAILABLE_PROGRAMS
}