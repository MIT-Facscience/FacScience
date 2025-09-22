import type { ForeignApplicationData } from './../types/index';
import type { ApplicationData } from '../types';
// import type { ResData } from '../types/models';
// import { Preinscription, ResData } from '../types/models';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock candidate database
const mockCandidates = [
 {
    nom_prenom: 'Andry Rasoamanana',
    date_naissaince: new Date('2005-03-15'),
    lieu_naissance: 'Antananarivo',
    mention: 'Assez Bien',
    option: 'C',
    num_bacc: 'BAC2024001234',
    graduationYear: 2024,
  },
  {
    nom_prenom: 'Hery Rakotondrazaka',
    date_naissaince: new Date('2005-07-22'),
    lieu_naissance: 'Antsirabe',
    mention: 'Bien',
    option: 'C',
    num_bacc: 'BAC2024005678',
    graduationYear: 2025,
  },
  {
    nom_prenom: 'Miora Andriantsoa',
    date_naissaince: new Date('2004-11-08'),
    lieu_naissance: 'Fianarantsoa',
    mention: 'Très Bien',
    option: 'D',
    num_bacc: 'BAC2024009876',
    graduationYear: 2022,
  },
  {
    nom_prenom: 'Tahina Rabemananjara',
    date_naissaince: new Date('2005-01-30'),
    lieu_naissance: 'Mahajanga',
    mention: 'Bien',
    option: 'S',
    num_bacc: 'BAC2024001111',
    graduationYear: 2025,
  },
  {
    nom_prenom: 'Fanja Razafy',
    date_naissaince: new Date('2006-05-12'),
    lieu_naissance: 'Toamasina',
    mention: 'Assez Bien',
    option: 'C',
    num_bacc: 'BAC2024002222',
    graduationYear: 2024,
  },
  {
    nom_prenom: 'Rivo Randriamampionona',
    date_naissaince: new Date('2006-09-18'),
    lieu_naissance: 'Antsiranana',
    mention: 'Bien',
    option: 'D',
    num_bacc: 'BAC2024003333',
    graduationYear: 2024,
  },
  {
    nom_prenom: 'Naina Raharison',
    date_naissaince: new Date('2006-02-25'),
    lieu_naissance: 'Antananarivo',
    mention: 'Très Bien',
    option: 'S',
    num_bacc: 'BAC2024004444',
    graduationYear: 2023,
  },
  {
    nom_prenom: 'Kanto Andriamalala',
    date_naissaince: new Date('2005-10-14'),
    lieu_naissance: 'Antsirabe',
    mention: 'Assez Bien',
    option: 'C',
    num_bacc: 'BAC2024005555',
    graduationYear: 2025,
  },
  {
    nom_prenom: 'Volatiana Razanatsoa',
    date_naissaince: new Date('2006-04-07'),
    lieu_naissance: 'Fianarantsoa',
    mention: 'Bien',
    option: 'A1',
    num_bacc: 'BAC2024006666',
    graduationYear: 2024,
  },
  {
    nom_prenom: 'Hasina Rakotomalala',
    date_naissaince: new Date('2006-08-03'),
    lieu_naissance: 'Toliara',
    mention: 'Passable',
    option: 'OSE',
    num_bacc: 'BAC2024007777',
    graduationYear: 2024,
  }
];

export const fetchCandidateInfo = async (
  num_bacc: string,
  annee_bacc: number
) => {
  await delay(1000); // Simulate network delay

  // const res = await fetch(`${import.meta.env.VITE_API_WEB_SERVICE}/preinscription`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({num_bacc, annee_bacc})
  // })
  // if (!res.ok) {
  //   throw new Error("request Error")
  // }
  // const candidate: ResData = await res.json();
  
  const candidate = mockCandidates.find(
    c => c.num_bacc === num_bacc && 
         c.graduationYear === annee_bacc
  );
  
  if (!candidate) {
    throw new Error('Candidat introuvable avec ces informations');
  }
  
  return candidate
};

export const submitApplication = async (applicationData: ApplicationData) => {
  // Simulation d'un délai d'API
  // await new Promise(resolve => setTimeout(resolve, 2000));
  try {
    const app: ApplicationData = applicationData;
    const response = await fetch(`${import.meta.env.VITE_API_URL_PREINSCRIPTION}/api/Register/RegisterTry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(app),
    });

    console.log(await response.json());
    if (!response.ok) 
      return {success: false};

  } catch (error) {
    throw new Error("sending data error");
    console.error(error);
    
    return {
      success: false,
      // applicationNumber: null,
    };
  }
  
  // Simulation d'une réponse réussie
  return { 
    success: true, 
    // applicationNumber: `FS${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` 
  };
};

export const submitForeignPreinscription = async (applicationData: ForeignApplicationData) => {
  try {
    const app: ForeignApplicationData= applicationData;
    const response = await fetch(`${import.meta.env.VITE_API_URL_PREINSCRIPTION}/api/Register/RegisterTry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(app),
    });

    if (!response.ok) 
      return {success: false};

    console.log(await response.json());

  } catch (error) {
    throw new Error("sending data error");
    console.error(error);
    
    return {
      success: false,
      // applicationNumber: null,
    };
  }
  
  // Simulation d'une réponse réussie
  return { 
    success: true, 
    // applicationNumber: `FS${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` 
  };
}

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

export const isValidTel = (tel: string): boolean => {
  const telRegex = /^(?:\+261\d{9}|(?:020|032|033|034|037)\d{7})$/
  return telRegex.test(tel.trim().replace(/\s+/g, ""))
}

// export const submitApplication = async (applicationData: ApplicationData) => {
//   function applicationToPreinscription(
//     data: ApplicationData,
//     recuBancaire: string,
//     cheminPreuvePaiement: string,
//     idParcours: number,
//     idOption: number
//   ): Preinscription {
//     if (!data.candidateInfo) {
//       throw new Error("candidateInfo manquant");
//     }

//     const nomPrenoms = `${data.personalInfo.lastName} ${data.personalInfo.firstName}`.trim();

//     return {
//       numBacc: parseInt(data.candidateInfo.baccalaureateNumber, 10),
//       anneeBacc: data.candidateInfo.graduationYear,
//       email: data.personalInfo.email,
//       tel: data.personalInfo.telephone,
//       recuBancaire,
//       datePreinscription: new Date(),
//       idParcours,
//       cheminPreuvePaiement,
//       estValide: false,
//       nomPrenoms,
//       idOption,
//     };
//   }
//   try {
//     // Vérifiez que cette fonction existe et fonctionne
//     const preinscriptionData = applicationToPreinscription(applicationData);
    
//     // Remplacez '/api/preinscription' par votre vraie URL d'API
//     const response = await fetch('/api/preinscription', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(preinscriptionData)
//     });

//     if (!response.ok) {
//       throw new Error(`Erreur HTTP: ${response.status}`);
//     }

//     return { success: true, applicationNumber: `FS${Date.now()}` };
//   } catch (error) {
//     console.error('Erreur lors de la soumission:', error);
//     return { 
//       success: false, 
//       error: error instanceof Error ? error.message : 'Erreur inconnue' 
//     };
//   }

//   await delay(2000); // Simulate submission delay
  
//   // In a real application, this would send data to the backend
//   console.log('Application submitted:', applicationData);
  
//   // Simulate occasional failures for demo purposes
//   if (Math.random() > 0.9) {
//     throw new Error('Erreur lors de la soumission. Veuillez réessayer.');
//   }
// };