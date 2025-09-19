export interface CandidateInfo {
  id: string;
  firstName: string;
  lastName: string;
  baccalaureateNumber: string;
  graduationYear: number;
  series: 'S' | 'C' | 'D' | 'A1' | 'A2' | 'L' | 'OSE';
  isEligible: boolean;
}

export interface Program {
  idMention: string;
  nomMention: string;
  abbreviation?: string;
  descriptionMention?: string;
  logoPath?: string;
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