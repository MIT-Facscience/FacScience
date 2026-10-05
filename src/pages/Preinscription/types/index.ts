export interface CandidateInfo {
  id: string;
  firstName: string;
  lastName: string;
  baccalaureateNumber: string;
  graduationYear: number;
  series: 'S' | 'C' | 'D' | 'A1' | 'A2' | 'L' | 'OSE' | 'OM' | 'TAMB' | 'CCBTP-PCBTP' | 'TGI' | 'EN' | 'TPFM' | 'TMEL' | 'TFFI' | 'TMA' | 'TA';
  isEligible: boolean;
}

export interface Program {
  idPortail: string;
  nomPortail: string;
  abbreviation?: string;
}

export interface ApplicationData {
  candidateInfo: CandidateInfo | null;
  selectedProgram: Program;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
  };
  // Les champs "agence" et "date de paiement" ont été retirés : ils n'étaient
  // pas exploitables et alourdissaient la saisie du candidat.
  bankInfo: {
    reference: string;
  };
}

export interface CarouselItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface PreinscriptionPayload {
  numBacc: number;
  anneeBacc: number;
  email: string;
  tel: string;
  recuBancaire: string;
  datePreinscription: Date;
  idParcours: number;
  cheminPreuvePaiement: string;
  estValide: boolean;
  nomPrenoms: string;
  idOption: number;
}

export interface ForeignPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  bacNationality: string;
  personalNationality: string;
}

export interface ForeignDocuments {
  diploma: File | null;
}

export interface ForeignBankInfo {
  reference: string;
}

export interface ForeignApplicationData {
  personalInfo: ForeignPersonalInfo;
  documents: ForeignDocuments;
  bankInfo: ForeignBankInfo;
  selectedProgram: Program | null;
}

// Types pour les réponses du contrôleur C#
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}

export interface PreinscriptionReturn {
  email: string;
  tel: string;
  refBancaire: string;
  agence: string;
  datePaiement: string;
  idPortail: string;
  idBac: number;
  modeInscription: string;
  id?: number; // ID de préinscription ajouté
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ProblemDetails;
}