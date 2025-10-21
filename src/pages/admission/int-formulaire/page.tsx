"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, User, FileText, CheckCircle, GraduationCap, UserRoundPen } from "lucide-react";
import { BACKEND_URL } from "@/lib/api";

interface FormData {
  nom: string;
  prenom: string;
  master: "M1" | "M2" | "";
  referencePaiement: string;
  parcours : string | null;
  grade : "L3" | "M1" | "M2" | "";
  cv: File | null;
  justificatifPaiement: File | null;
  baccalaureat: File | null;
  notes: (File | null)[];
}

export default function INTForm() {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    master: "",
    referencePaiement: "",
    parcours : "",
    grade : "",
    cv: null,
    justificatifPaiement: null,
    baccalaureat: null,
    notes: [null, null, null],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      if (name === "notes" && index !== undefined) {
        const newNotes = [...formData.notes];
        newNotes[index] = files[0];
        setFormData({ ...formData, notes: newNotes });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${BACKEND_URL}/api/Parcours`, {
      method: "POST",
      body: JSON.stringify({
        Nom : formData.nom,
        Prenom : formData.prenom,
        Master : formData.master,
        ReferencePaiement : formData.referencePaiement,
        Parcours : formData.parcours,
        Grade : formData.grade,
        Cv : formData.cv,
        JustificatifPaiement : formData.justificatifPaiement,
        Baccalaureat : formData.baccalaureat,
        Notes : formData.notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Une erreur est survenue lors de la soumission de votre dossier.");
    });
    console.log("Form data:", formData);
    alert("Votre dossier a été soumis avec succès !");
  };

  const renderFileName = (file: File | null) => file ? file.name : "Aucun fichier choisi";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4"
      >
        <Card className="shadow-lg border border-gray-200 pt-0 overflow-hidden gap-0">
          <CardHeader className="relative bg-primary text-white py-10 text-center">
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative space-y-3">
              <div className="flex justify-center">
                <div className="bg-white/20 p-3 rounded-full">
                  <GraduationCap className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold tracking-wide">
                Formulaire de Préinscription
              </CardTitle>
              <CardDescription className="text-indigo-100 text-base">
                Parcours <strong>Innovation et Technologie</strong> – Master 1 & 2
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section candidature */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-indigo-800 border-b pb-2">
                  Information candidature
                </h3>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="master">Choisir Master</Label>
                  <select
                    id="master"
                    name="master"
                    value={formData.master}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="">-- Choisir Master --</option>
                    <option value="M1">Master 1</option>
                    <option value="M2">Master 2</option>
                  </select>
                </div>
              </div>

              {/* Section Identité */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-indigo-800 border-b pb-2">
                  Informations personnelles
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                      id="nom"
                      name="nom"
                      placeholder="Entrez votre nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input
                      id="prenom"
                      name="prenom"
                      placeholder="Entrez votre prénom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

              </div>

              {/* Section Dossier académique */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-indigo-800 border-b pb-2">
                  Dossier académique
                </h3>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="nom">
                      <UserRoundPen className="h-4 w-4 text-primary" />
                      Parcours
                    </Label>
                    <Input
                      id="parcours"
                      name="parcours"
                      placeholder="Entrez votre parcours"
                      value={formData.parcours ?? ""}
                      onChange={handleChange}
                      required
                    />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="master">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Niveau & Grade
                  </Label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="">-- Sélectionner votre niveau et grade --</option>
                    <option value="L3">License 3</option>
                    <option value="M1">Master 1</option>
                    <option value="M2">Master 2</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="cv" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> Curriculum Vitae (PDF)
                  </Label>
                  <Input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf"
                    onChange={handleChange}
                    required
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{renderFileName(formData.cv)}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="baccalaureat" className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-primary" /> Relevé de notes du Baccalauréat
                  </Label>
                  <Input
                    id="baccalaureat"
                    name="baccalaureat"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleChange}
                    required
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{renderFileName(formData.baccalaureat)}</p>
                </div>

                <div className="flex flex-col">
                  <Label className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-primary" /> Relevés de notes (3 dernières années)
                  </Label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index}>
                        <Input
                          type="file"
                          name="notes"
                          accept="image/*,.pdf"
                          onChange={(e) => handleChange(e, index)}
                          required
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-center">
                          {formData.notes[index]?.name || `Année ${index + 1}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section Paiement */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-indigo-800 border-b pb-2">
                  Frais de dossier
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="justificatifPaiement" className="flex items-center gap-2">
                      <Upload className="h-4 w-4 text-primary" /> Justificatif de paiement
                    </Label>
                    <Input
                      id="justificatifPaiement"
                      name="justificatifPaiement"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleChange}
                      required
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{renderFileName(formData.justificatifPaiement)}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="referencePaiement">Référence du paiement</Label>
                    <Input
                      id="referencePaiement"
                      name="referencePaiement"
                      placeholder="Ex: 12345678 / reçu BOA"
                      value={formData.referencePaiement}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full text-lg flex items-center justify-center"
                >
                  <CheckCircle className="h-5 w-5" /> Soumettre mon dossier
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
