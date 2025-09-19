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

//  export type Student = {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
//     program: string;
//     year: string;
//     department: string;
//     photo?: string;
//   };

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
