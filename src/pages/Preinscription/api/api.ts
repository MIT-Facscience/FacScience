import type { ForeignApplicationData } from './../types/index';
import type { ApplicationData } from '../types';
import type { ResData } from '../types/models';
import { BACKEND_WEBSERVICES_URL } from '@/lib/api';
import { BACKEND_PREINSCRIPTION_URL } from '@/lib/api';

// import { Preinscription, ResData } from '../types/models';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCandidateInfo = async (
  num_bacc: string,
  annee_bacc: number
) => {
  await delay(1000); // Simulate network delay

  const res = await fetch(`${BACKEND_WEBSERVICES_URL}/preinscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({num_bacc, annee_bacc})
  })
  if (!res.ok) {
    throw new Error("request Error")
  }
  const candidate: ResData = await res.json();
  
  // const candidate = mockCandidates.find(
  //   c => c.num_bacc === num_bacc && 
  //        c.graduationYear === annee_bacc
  // );
  
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
    const response = await fetch(`${BACKEND_PREINSCRIPTION_URL}/api/Register/RegisterTry`, {
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
    const response = await fetch(`${BACKEND_PREINSCRIPTION_URL}/api/Register/RegisterTry`, {
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
