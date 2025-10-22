"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, User, FileText, CheckCircle, GraduationCap, UserRoundPen, AlertCircle, ArrowLeft, ArrowRight, Mail, Phone } from "lucide-react";
import { BACKEND_URL } from "@/lib/api";

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  master: "M1" | "M2" | "";
  referencePaiement: string;
  parcours: string;
  grade: "L3" | "M1" | "M2" | "";
  cv: File | null;
  justificatifPaiement: File | null;
  baccalaureat: File | null;
  notes: (File | null)[];
}

interface FormErrors {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  master?: string;
  referencePaiement?: string;
  parcours?: string;
  grade?: string;
  cv?: string;
  justificatifPaiement?: string;
  baccalaureat?: string;
  notes?: string[];
  form?: string;
}

export default function INTForm() {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    master: "",
    referencePaiement: "",
    parcours: "",
    grade: "",
    cv: null,
    justificatifPaiement: null,
    baccalaureat: null,
    notes: [null, null, null],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Informations candidature",
    "Informations personnelles",
    "Dossier académique",
    "Frais de dossier",
    "Récapitulatif"
  ];

  const validateStep = (step: number): FormErrors => {
    const newErrors: FormErrors = {};
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    
    if (step === 1) {
      if (!formData.master) newErrors.master = "Veuillez sélectionner un niveau de Master";
    }
    if (step === 2) {
      if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
      if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
      if (!formData.email.trim()) {
        newErrors.email = "L'email est requis";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Format d'email invalide";
      }
      if (!formData.telephone.trim()) {
        newErrors.telephone = "Le téléphone est requis";
      } else if (!/^\+?\d{10,15}$/.test(formData.telephone.replace(/\s/g, ''))) {
        newErrors.telephone = "Numéro de téléphone invalide (10-15 chiffres)";
      }
    }
    if (step === 3) {
      if (!formData.parcours.trim()) newErrors.parcours = "Le parcours est requis";
      if (!formData.grade) newErrors.grade = "Veuillez sélectionner un grade";
      if (formData.master === "M2" && formData.grade === "L3") {
        newErrors.grade = "Pour Master 2, L3 n'est pas autorisé";
      }
      if (!formData.cv) newErrors.cv = "Le CV est requis";
      if (!formData.baccalaureat) newErrors.baccalaureat = "Le relevé de notes du baccalauréat est requis";
      const notesErrors = formData.notes.map((note, index) => 
        !note ? `Le relevé de notes pour l'année ${index + 1} est requis` : null
      ).filter(Boolean) as string[];
      if (notesErrors.length > 0) newErrors.notes = notesErrors;
      
      if (formData.cv && formData.cv.size > maxFileSize) {
        newErrors.cv = "Le CV ne doit pas dépasser 5MB";
      }
      if (formData.baccalaureat && formData.baccalaureat.size > maxFileSize) {
        newErrors.baccalaureat = "Le relevé de notes du baccalauréat ne doit pas dépasser 5MB";
      }
      formData.notes.forEach((note, index) => {
        if (note && note.size > maxFileSize) {
          if (!newErrors.notes) newErrors.notes = [];
          newErrors.notes[index] = `Le relevé de notes pour l'année ${index + 1} ne doit pas dépasser 5MB`;
        }
      });
    }
    if (step === 4) {
      if (!formData.referencePaiement.trim()) newErrors.referencePaiement = "La référence de paiement est requise";
      if (!formData.justificatifPaiement) newErrors.justificatifPaiement = "Le justificatif de paiement est requis";
      if (formData.justificatifPaiement && formData.justificatifPaiement.size > maxFileSize) {
        newErrors.justificatifPaiement = "Le justificatif de paiement ne doit pas dépasser 5MB";
      }
    }

    return newErrors;
  };

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

    if (name === "master" && value === "M2" && formData.grade === "L3") {
      setFormData((current) => ({ ...current, grade: "" }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const handleNext = () => {
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const master = formData.master === "M1" ? 1 : 2;
    const grade = formData.grade === "L3" ? 3 : formData.grade === "M1" ? 4 : 5;
    const fd = new FormData();
    fd.append("Nom", formData.nom);
    fd.append("Prenom", formData.prenom);
    fd.append("Email", formData.email);
    fd.append("Tel", formData.telephone);
    fd.append("Master", master.toString());
    fd.append("ReferencePaiement", formData.referencePaiement);
    fd.append("Parcours", formData.parcours);
    fd.append("Grade", grade.toString());
    if (formData.cv) fd.append("Cv", formData.cv);
    if (formData.justificatifPaiement) fd.append("JustificatifPaiement", formData.justificatifPaiement);
    if (formData.baccalaureat) fd.append("Baccalaureat", formData.baccalaureat);
    formData.notes.forEach((note) => {
      if (note) fd.append("Notes", note);
    });

    try {
      const response = await fetch(`${BACKEND_URL}/api/Parcours/int-application`, {
        method: "POST",
        body: fd,
      });

      if (!response.ok) {
        console.log(response.status)
        if (response.status >= 500) {
          throw new Error("Erreur du serveur. Veuillez réessayer plus tard.");
        }

        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Erreur lors de la soumission du formulaire.");
      }

      const data = await response.json();
      console.log("Success:", data);
      setIsSubmitted(true);

    } catch (error) {
      console.error("Error:", error);
      let message = "Une erreur inattendue est survenue.";
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        message = "Impossible de contacter le serveur. Vérifiez votre connexion ou démarrez le backend.";
      } else if (error instanceof Error) {
        message = error.message;
      }

      setErrors({
        form: message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      master: "",
      referencePaiement: "",
      parcours: "",
      grade: "",
      cv: null,
      justificatifPaiement: null,
      baccalaureat: null,
      notes: [null, null, null],
    });
    setErrors({});
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  const renderFileName = (file: File | null) => file ? file.name : "Aucun fichier choisi";

  const isL3Disabled = formData.master === "M2";
  

  const renderStepContent = () => {
    if (isSubmitted) {
      return (
        <div className="space-y-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <CheckCircle className="h-16 w-16 text-green-500" />
          </motion.div>
            <h3 className="font-semibold text-2xl text-indigo-800">
            Candidature déposée avec succès !
            </h3>
            <p className="text-base text-gray-700">
              Un email de confirmation a été envoyé à <span className="font-semibold">{formData.email}</span>.
            </p>
          <p className="text-gray-600">
            Votre dossier a été soumis avec succès.
          </p>
          <Button
            onClick={handleReset}
            className="mt-4 flex items-center gap-2 mx-auto"
          >
            <GraduationCap className="h-5 w-5" />
            Déposer une nouvelle candidature
          </Button>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-indigo-800 border-b pb-2">
              Informations candidature
            </h3>
            <div className="flex flex-col gap-2">
              <Label htmlFor="master">Choisir Master</Label>
              <select
                id="master"
                name="master"
                value={formData.master}
                onChange={handleChange}
                className={`mt-1 w-full rounded-none border ${errors.master ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
              >
                <option value="">-- Choisir Master --</option>
                <option value="M1">Master 1</option>
                <option value="M2">Master 2</option>
              </select>
              {errors.master && (
                <p className="text-xs text-red-500 mt-1">{errors.master}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
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
                  className={errors.nom ? 'border-red-500' : ''}
                />
                {errors.nom && (
                  <p className="text-xs text-red-500 mt-1">{errors.nom}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  name="prenom"
                  placeholder="Entrez votre prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={errors.prenom ? 'border-red-500' : ''}
                />
                {errors.prenom && (
                  <p className="text-xs text-red-500 mt-1">{errors.prenom}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" /> Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="exemple@domaine.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="telephone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> Téléphone
                </Label>
                <Input
                  id="telephone"
                  name="telephone"
                  placeholder="Ex: +225 01 23 45 67"
                  value={formData.telephone}
                  onChange={handleChange}
                  className={errors.telephone ? 'border-red-500' : ''}
                />
                {errors.telephone && (
                  <p className="text-xs text-red-500 mt-1">{errors.telephone}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-indigo-800 border-b pb-2">
              Dossier académique
            </h3>
            <div className="flex flex-col gap-2">
              <Label htmlFor="parcours">
                <UserRoundPen className="h-4 w-4 text-primary" />
                Parcours actuel
              </Label>
              <Input
                id="parcours"
                name="parcours"
                placeholder="Entrez votre parcours"
                value={formData.parcours}
                onChange={handleChange}
                className={errors.parcours ? 'border-red-500' : ''}
              />
              {errors.parcours && (
                <p className="text-xs text-red-500 mt-1">{errors.parcours}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="grade">
                <GraduationCap className="h-4 w-4 text-primary" />
                Niveau & Grade
              </Label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className={`mt-1 w-full rounded-none border ${errors.grade ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`}
              >
                <option value="">-- Sélectionner votre niveau et grade --</option>
                <option value="L3" disabled={isL3Disabled}>License 3</option>
                <option value="M1">Master 1</option>
                <option value="M2">Master 2</option>
              </select>
              {errors.grade && (
                <p className="text-xs text-red-500 mt-1">{errors.grade}</p>
              )}
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
                className={`cursor-pointer ${errors.cv ? 'border-red-500' : ''}`}
              />
              <p className="text-xs text-muted-foreground mt-1">{renderFileName(formData.cv)}</p>
              {errors.cv && (
                <p className="text-xs text-red-500 mt-1">{errors.cv}</p>
              )}
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
                className={`cursor-pointer ${errors.baccalaureat ? 'border-red-500' : ''}`}
              />
              <p className="text-xs text-muted-foreground mt-1">{renderFileName(formData.baccalaureat)}</p>
              {errors.baccalaureat && (
                <p className="text-xs text-red-500 mt-1">{errors.baccalaureat}</p>
              )}
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
                      className={`cursor-pointer ${errors.notes?.[index] ? 'border-red-500' : ''}`}
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      {formData.notes[index]?.name || `Année ${index + 1}`}
                    </p>
                    {errors.notes?.[index] && (
                      <p className="text-xs text-red-500 mt-1">{errors.notes[index]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
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
                  className={`cursor-pointer ${errors.justificatifPaiement ? 'border-red-500' : ''}`}
                />
                <p className="text-xs text-muted-foreground mt-1">{renderFileName(formData.justificatifPaiement)}</p>
                {errors.justificatifPaiement && (
                  <p className="text-xs text-red-500 mt-1">{errors.justificatifPaiement}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="referencePaiement">Référence du paiement</Label>
                <Input
                  id="referencePaiement"
                  name="referencePaiement"
                  placeholder="Ex: 12345678 / reçu BOA"
                  value={formData.referencePaiement}
                  onChange={handleChange}
                  className={errors.referencePaiement ? 'border-red-500' : ''}
                />
                {errors.referencePaiement && (
                  <p className="text-xs text-red-500 mt-1">{errors.referencePaiement}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-indigo-800 border-b pb-2">
              Récapitulatif de votre dossier
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-indigo-700">Informations candidature</h4>
                <p><strong>Master:</strong> {formData.master || "Non spécifié"}</p>
              </div>
              <div>
                <h4 className="font-medium text-indigo-700">Informations personnelles</h4>
                <p><strong>Nom:</strong> {formData.nom || "Non spécifié"}</p>
                <p><strong>Prénom:</strong> {formData.prenom || "Non spécifié"}</p>
                <p><strong>Email:</strong> {formData.email || "Non spécifié"}</p>
                <p><strong>Téléphone:</strong> {formData.telephone || "Non spécifié"}</p>
              </div>
              <div>
                <h4 className="font-medium text-indigo-700">Dossier académique</h4>
                <p><strong>Parcours:</strong> {formData.parcours || "Non spécifié"}</p>
                <p><strong>Niveau & Grade:</strong> {formData.grade || "Non spécifié"}</p>
                <p><strong>CV:</strong> {renderFileName(formData.cv)}</p>
                <p><strong>Relevé de notes du Baccalauréat:</strong> {renderFileName(formData.baccalaureat)}</p>
                <p><strong>Relevés de notes:</strong></p>
                <ul className="list-disc pl-5">
                  {formData.notes.map((note, index) => (
                    <li key={index}>{renderFileName(note)} (Année {index + 1})</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-indigo-700">Frais de dossier</h4>
                <p><strong>Justificatif de paiement:</strong> {renderFileName(formData.justificatifPaiement)}</p>
                <p><strong>Référence du paiement:</strong> {formData.referencePaiement || "Non spécifié"}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
            {/* Stepper */}
            {!isSubmitted && (
              <div className="flex justify-between items-center mb-6 overflow-x-auto">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center min-w-[100px]">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep > index + 1 ? 'bg-green-500 text-white' :
                        currentStep === index + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {currentStep > index + 1 ? <CheckCircle className="h-5 w-5" /> : index + 1}
                    </div>
                    <p className="text-xs mt-2 text-center">{step}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={currentStep === steps.length ? handleSubmit : (e) => e.preventDefault()} className="space-y-6">

              {renderStepContent()}

              {errors.form && !isSubmitted && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errors.form}</span>
                </div>
              )}
              
              {/* Navigation Buttons */}
              {!isSubmitted && (
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" /> Précédent
                  </Button>
                  {currentStep < steps.length && (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2"
                    >
                      Suivant <ArrowRight className="h-5 w-5" />
                    </Button>
                  )}
                  {currentStep === steps.length && (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-5 w-5" />
                      {isSubmitting ? "Envoi en cours..." : "Soumettre mon dossier"}
                    </Button>
                  )}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}