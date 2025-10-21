export type Staff = {
    idPat: number;
    nom: string;
    email: string;
    tel: string;
    sexe: string;
    fonction: string;
    // department: string;
    // office: string;
    // hours: string;
    photo?: string;
  };

export interface Media {
  id: number;
  url: string;
  type: "Image" | "vidéo";
}

export interface Actuality {
    id: number;
    title: string;
    category: string;
    description: string | "";
    content: string;
    isUrgent: boolean | false;
    media?: Media[];
    mediaType?: string;
    location?: string;
    
    createdAt: Date;
    updateAt?: Date;
    postedAt?: Date;
    archivedAt?: Date;
    beginedAt?: Date;
    finishAt?: Date;
  };


export type Laboratoires={
  nomLabo: string ;
  idLabo: number;
  mentionRattachementNavigation: string | null;
  mentionRattachement: number | null;
  abbreviation: string | null;
  laboMedia: string[] | null;
  respoLabo: string[] | null;
  ecoleDoctoraleRattachement: string | null;
  ecoleDoctoraleRattachementNavigation: string | null;
  description : string | null;

}

export type Professors = {
    idProfesseur: number;
    nom: string;
    prenom: string;
    email: string;
    tel: string;
    sexe?: string;
    titre: string;
    // department: string;
    // speciality: string;
    // office: string;
    // consultationHours: string;
    photo?: string;
  };
