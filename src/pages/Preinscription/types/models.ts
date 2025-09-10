// models.ts
// Auto-generated from C# EF Core models → TypeScript interfaces
// -------------------------------------------------------------

export interface Bachelier {
  idBachelier: number;
  annee: Date;
  numeroCandidat: string;
  moyenne: number;
  idPersonne?: number | null;
  idOption?: number | null;
  idCentre?: number | null;
  idEtablissement?: number | null;
  idMention?: number | null;

  /* navigation properties */
  idCentreNavigation?: Centre | null;
  idEtablissementNavigation?: Etablissement | null;
  idMentionNavigation?: Mention1 | null;
  idOptionNavigation?: Option1 | null;
  idPersonneNavigation?: Personne | null;
  notes: Note[];
}

export interface Centre {
  idCentre: number;
  nomCentre: string;
  idProvince?: number | null;

  /* navigation properties */
  idProvinceNavigation?: Province | null;
  bacheliers: Bachelier[];
}

export interface Etablissement {
  idEtablissement: number;
  nomEtablissement: string;

  /* navigation properties */
  bacheliers: Bachelier[];
}

export interface Faculte {
  id: number;
  nomFaculte?: string | null;

  /* navigation properties */
  mentions: Mention[];
}

export interface Matiere {
  idMatiere: number;
  nomMatiere: string;

  /* navigation properties */
  notes: Note[];
}

export interface Mention {
  id: number;
  idFaculte?: number | null;
  nomMention?: string | null;

  /* navigation properties */
  idFaculteNavigation?: Faculte | null;
  parcours: Parcour[];
}

export interface Mention1 {
  idMention: number;
  nomMention: string;
  min?: number | null;
  max?: number | null;

  /* navigation properties */
  bacheliers: Bachelier[];
}

export interface Note {
  idNote: number;
  valeurNote: number;
  estOptionnel?: boolean | null;
  idMatiere?: number | null;
  idBachelier?: number | null;

  /* navigation properties */
  idBachelierNavigation?: Bachelier | null;
  idMatiereNavigation?: Matiere | null;
}

export interface Option {
  id: number;
  nom: string;
}

export interface Option1 {
  idOption: number;
  serie?: string | null;

  /* navigation properties */
  bacheliers: Bachelier[];
}

export interface Parcour {
  id: number;
  idMention?: number | null;
  nomParcours?: string | null;

  /* navigation properties */
  idMentionNavigation?: Mention | null;
}

export interface Personne {
  idPersonne: number;
  nomPrenom: string;
  dateNaissance: Date;
  lieuNaissance: string;
  sexe?: 'F' | 'M' | null;

  /* navigation properties */
  bacheliers: Bachelier[];
}

export interface Preinscription {
  numBacc: number;
  anneeBacc: number;
  email?: string | null;
  tel?: string | null;
  recuBancaire: string;
  datePreinscription?: Date | null;
  idParcours?: number | null;
  cheminPreuvePaiement?: string | null;
  estValide?: boolean | null;
  nomPrenoms?: string | null;
  idOption: number;

  /* navigation properties */
  idOptionNavigation?: Option;          // required
  idParcoursNavigation?: Parcour | null;
}

export interface Province {
  idProvince: number;
  nomProvince: string;

  /* navigation properties */
  centres: Centre[];
}

export interface  ResData {
    nom_prenom: string;
    date_naissaince: Date;
    lieu_naissance: string;
    mention: string;
    option: string;
    num_bacc: string;
}