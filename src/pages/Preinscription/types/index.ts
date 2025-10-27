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
  bankInfo: {
    reference: string;
    dateRef: string;
    agenceRef: string;
  }
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
  agenceRef: string;
  dateRef: string;
}

export interface ForeignApplicationData {
  personalInfo: ForeignPersonalInfo;
  documents: ForeignDocuments;
  bankInfo: ForeignBankInfo;
  selectedProgram: Program | null;
}

export interface StepStrangerProps {
  onChangeStep: (currentStep: number) => void;
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
  idPreinscription?: number; // ID de préinscription ajouté
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ProblemDetails;
}