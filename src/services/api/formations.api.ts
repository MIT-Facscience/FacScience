import baseURL from "..";

export  async function allMentions() {
  try {
    const response = await fetch(`${baseURL}/mentions`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut: ${response.status}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Erreur dans allMentions:", error);
    throw error; // remonte l'erreur
  }
}


export async function getParcoursByMention(id_mention: number) {
  try {
    const response = await fetch(`${baseURL}/parcours/${id_mention}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut: ${response.status}`);
    }

    const data = await response.json();
    return data; // renvoie la liste des parcours
  } catch (error) {
    console.error("Erreur dans getParcoursByMention:", error);
    throw error;
  }
}

export async function getRespoByMention(id_mention: number) {
  try {
    const response = await fetch(`${baseURL}/mentions/respo/${id_mention}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut: ${response.status}`);
    }

    const data = await response.json();
    return data; // renvoie la liste des parcours
  } catch (error) {
    console.error("Erreur dans getParcoursByMention:", error);
    throw error;
  }
}