import { BACKEND_PREINSCRIPTION_URL, BACKEND_WEBSERVICES_URL } from "@/lib/api";
import type { ApplicationData, PreinscriptionReturn, ProblemDetails, ApiResponse } from "../types";
import type { ResData } from "../types/models";
import type { ForeignApplicationData } from "./../types/index";

// import { Preinscription, ResData } from '../types/models';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchCandidateInfo = async (
  num_bacc: string,
  annee_bacc: number
) => {
  await delay(1000); // Simulate network delay

  const res = await fetch(
    `${BACKEND_WEBSERVICES_URL}/api/preinscription/getDataByNumBacc`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ num_bacc, annee_bacc }),
    }
  );
  if (!res.ok) {
    throw new Error("request Error");
  }
  const candidate: ResData = await res.json();

  // const candidate = mockCandidates.find(
  //   c => c.num_bacc === num_bacc &&
  //        c.graduationYear === annee_bacc
  // );

  if (!candidate) {
    throw new Error("Candidat introuvable avec ces informations");
  }

  return candidate;
};

export const submitApplication = async (applicationData: ApplicationData): Promise<ApiResponse<PreinscriptionReturn>> => {
  try {
    const app: ApplicationData = applicationData;

    console.log("Envoi des données:", app);
    const response = await fetch(
      `${BACKEND_PREINSCRIPTION_URL}/api/Register/RegisterTry`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(app),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      // Le serveur retourne un ProblemDetails en cas d'erreur
      const problemDetails: ProblemDetails = responseData;
      console.error("Erreur du serveur:", problemDetails);
      
      return {
        success: false,
        error: problemDetails
      };
    }

    // Succès - le serveur retourne un PreinscriptionReturn
    const preinscriptionData: PreinscriptionReturn = responseData;
    console.log("Préinscription créée avec succès:", preinscriptionData);

    return {
      success: true,
      data: preinscriptionData
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);
    
    return {
      success: false,
      error: {
        title: "Erreur de connexion",
        detail: "Impossible de se connecter au serveur. Veuillez réessayer.",
        status: 500
      }
    };
  }
};

export const submitForeignPreinscription = async (
  applicationData: ForeignApplicationData
): Promise<ApiResponse<PreinscriptionReturn>> => {
  try {
    const app: ForeignApplicationData = applicationData;
    const response = await fetch(
      `${BACKEND_PREINSCRIPTION_URL}/api/Register/RegisterTry`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(app),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      // Le serveur retourne un ProblemDetails en cas d'erreur
      const problemDetails: ProblemDetails = responseData;
      console.error("Erreur du serveur:", problemDetails);
      
      return {
        success: false,
        error: problemDetails
      };
    }

    // Succès - le serveur retourne un PreinscriptionReturn
    const preinscriptionData: PreinscriptionReturn = responseData;
    console.log("Préinscription étrangère créée avec succès:", preinscriptionData);

    return {
      success: true,
      data: preinscriptionData
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);
    
    return {
      success: false,
      error: {
        title: "Erreur de connexion",
        detail: "Impossible de se connecter au serveur. Veuillez réessayer.",
        status: 500
      }
    };
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidTel = (tel: string): boolean => {
  const telRegex = /^(?:\+261(?:20|32|33|34|37|38)\d{7}|(?:020|032|033|034|037|038)\d{7})$/;
  return telRegex.test(tel.trim().replace(/\s+/g, ""));
};

export interface PreinscriptionStatus {
  isClosed: boolean;
}

export const checkPreinscriptionStatus = async (): Promise<PreinscriptionStatus> => {
  try {
    const response = await fetch(
      `${BACKEND_PREINSCRIPTION_URL}/api/Register/status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { isClosed: false };
    }

    const data: PreinscriptionStatus = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la vérification du statut:", error);
    return { isClosed: false };
  }
};
