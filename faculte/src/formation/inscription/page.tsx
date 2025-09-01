"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Upload, CheckCircle, AlertCircle } from "lucide-react"

export default function InscriptionPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    dateNaissance: "",
    lieuNaissance: "",
    nationalite: "Malgache",
    adresse: "",
    telephone: "",
    email: "",
    serieBac: "",
    anneeBac: "",
    mentionBac: "",
    etablissementBac: "",
    filiere: "",
    niveau: "",
    motivation: "",
  })

  const [files, setFiles] = useState({
    acteNaissance: null,
    diplome: null,
    releves: null,
    photo: null,
  })

  const conditions = {
    "Licence 1": {
      diplome: "Baccalauréat série C, D ou équivalent",
      age: "Moins de 25 ans",
      autres: "Dossier complet et entretien",
    },
    "Licence 2": {
      diplome: "Validation L1 ou équivalent (60 ECTS)",
      age: "Pas de limite d'âge",
      autres: "Moyenne générale ≥ 10/20",
    },
    "Licence 3": {
      diplome: "Validation L2 ou équivalent (120 ECTS)",
      age: "Pas de limite d'âge",
      autres: "Moyenne générale ≥ 10/20",
    },
    "Master 1": {
      diplome: "Licence en sciences ou équivalent",
      age: "Pas de limite d'âge",
      autres: "Moyenne générale ≥ 12/20 et entretien",
    },
    "Master 2": {
      diplome: "Master 1 ou équivalent",
      age: "Pas de limite d'âge",
      autres: "Moyenne générale ≥ 12/20 et projet de recherche",
    },
  }

  const handleVerifyBac = () => {
    if (!formData.serieBac || !formData.anneeBac) {
      alert("Veuillez renseigner la série et l'année de votre baccalauréat")
      return
    }
    setStep(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation de soumission
    setStep(4)
  }

  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Inscription</h1>
              <p className="text-xl text-muted-foreground">
                Rejoignez la Faculté des Sciences - Année académique 2025-2026
              </p>
            </div>

            {/* Étapes */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${step >= 1 ? "text-accent" : "text-muted-foreground"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-accent text-accent-foreground" : "bg-muted"}`}
                  >
                    1
                  </div>
                  <span className="text-sm">Vérification</span>
                </div>
                <div className="w-8 h-px bg-border"></div>
                <div className={`flex items-center space-x-2 ${step >= 2 ? "text-accent" : "text-muted-foreground"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-accent text-accent-foreground" : "bg-muted"}`}
                  >
                    2
                  </div>
                  <span className="text-sm">Formulaire</span>
                </div>
                <div className="w-8 h-px bg-border"></div>
                <div className={`flex items-center space-x-2 ${step >= 3 ? "text-accent" : "text-muted-foreground"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-accent text-accent-foreground" : "bg-muted"}`}
                  >
                    3
                  </div>
                  <span className="text-sm">Documents</span>
                </div>
                <div className="w-8 h-px bg-border"></div>
                <div className={`flex items-center space-x-2 ${step >= 4 ? "text-accent" : "text-muted-foreground"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? "bg-accent text-accent-foreground" : "bg-muted"}`}
                  >
                    4
                  </div>
                  <span className="text-sm">Confirmation</span>
                </div>
              </div>
            </div>

            {/* Étape 1: Vérification du baccalauréat */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span>Vérification du Baccalauréat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Veuillez vérifier votre éligibilité en renseignant les informations de votre baccalauréat.
                    </AlertDescription>
                  </Alert>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serieBac">Série du Baccalauréat *</Label>
                      <Select
                        value={formData.serieBac}
                        onValueChange={(value) => setFormData({ ...formData, serieBac: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre série" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="C">Série C (Mathématiques et Sciences Physiques)</SelectItem>
                          <SelectItem value="D">Série D (Mathématiques et Sciences Naturelles)</SelectItem>
                          <SelectItem value="A">Série A (Littéraire)</SelectItem>
                          <SelectItem value="B">Série B (Économique et Social)</SelectItem>
                          <SelectItem value="Autre">Autre/Équivalent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="anneeBac">Année d'obtention *</Label>
                      <Select
                        value={formData.anneeBac}
                        onValueChange={(value) => setFormData({ ...formData, anneeBac: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Année" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => 2025 - i).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mentionBac">Mention obtenue</Label>
                    <Select
                      value={formData.mentionBac}
                      onValueChange={(value) => setFormData({ ...formData, mentionBac: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre mention" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TB">Très Bien (≥ 16/20)</SelectItem>
                        <SelectItem value="B">Bien (14-15.99/20)</SelectItem>
                        <SelectItem value="AB">Assez Bien (12-13.99/20)</SelectItem>
                        <SelectItem value="P">Passable (10-11.99/20)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleVerifyBac} className="w-full" size="lg">
                    Vérifier le Baccalauréat et Continuer
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Étape 2: Formulaire d'inscription */}
            {step === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setStep(3)
                }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-accent" />
                      <span>Informations Personnelles</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom *</Label>
                        <Input
                          id="nom"
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prenoms">Prénoms *</Label>
                        <Input
                          id="prenoms"
                          value={formData.prenoms}
                          onChange={(e) => setFormData({ ...formData, prenoms: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateNaissance">Date de naissance *</Label>
                        <Input
                          id="dateNaissance"
                          type="date"
                          value={formData.dateNaissance}
                          onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lieuNaissance">Lieu de naissance *</Label>
                        <Input
                          id="lieuNaissance"
                          value={formData.lieuNaissance}
                          onChange={(e) => setFormData({ ...formData, lieuNaissance: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adresse">Adresse complète *</Label>
                      <Textarea
                        id="adresse"
                        value={formData.adresse}
                        onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telephone">Téléphone *</Label>
                        <Input
                          id="telephone"
                          value={formData.telephone}
                          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="filiere">Filière souhaitée *</Label>
                        <Select
                          value={formData.filiere}
                          onValueChange={(value) => setFormData({ ...formData, filiere: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisissez une filière" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="math-info">Mathématiques et Informatique</SelectItem>
                            <SelectItem value="mit">MIT</SelectItem>
                            <SelectItem value="physique">Physique</SelectItem>
                            <SelectItem value="chimie">Chimie</SelectItem>
                            <SelectItem value="biologie">Biologie/Sciences de la Vie</SelectItem>
                            <SelectItem value="geologie">Géologie/Sciences de la Terre</SelectItem>
                            <SelectItem value="igcrr">IGCRR</SelectItem>
                            <SelectItem value="ipss">IPSS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="niveau">Niveau d'inscription *</Label>
                        <Select
                          value={formData.niveau}
                          onValueChange={(value) => setFormData({ ...formData, niveau: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisissez un niveau" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="L1">Licence 1</SelectItem>
                            <SelectItem value="L2">Licence 2</SelectItem>
                            <SelectItem value="L3">Licence 3</SelectItem>
                            <SelectItem value="M1">Master 1</SelectItem>
                            <SelectItem value="M2">Master 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.niveau && conditions[formData.niveau] && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Conditions d'admission pour {formData.niveau}:</strong>
                          <ul className="mt-2 space-y-1">
                            <li>• {conditions[formData.niveau].diplome}</li>
                            <li>• {conditions[formData.niveau].age}</li>
                            <li>• {conditions[formData.niveau].autres}</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="motivation">Lettre de motivation</Label>
                      <Textarea
                        id="motivation"
                        placeholder="Expliquez vos motivations pour cette formation..."
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Continuer vers les Documents
                    </Button>
                  </CardContent>
                </Card>
              </form>
            )}

            {/* Étape 3: Documents */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-accent" />
                    <span>Documents Requis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Tous les documents doivent être au format PDF, JPG ou PNG (max 5MB chacun).
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="font-semibold">Acte de naissance *</Label>
                        <Badge variant="destructive">Requis</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Copie légalisée de moins de 3 mois</p>
                      <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="font-semibold">Diplôme du Baccalauréat *</Label>
                        <Badge variant="destructive">Requis</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Copie légalisée du diplôme</p>
                      <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="font-semibold">Relevés de notes du Bac *</Label>
                        <Badge variant="destructive">Requis</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Relevés de notes officiels</p>
                      <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="font-semibold">Photo d'identité *</Label>
                        <Badge variant="destructive">Requis</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Photo récente format identité</p>
                      <Input type="file" accept=".jpg,.jpeg,.png" />
                    </div>

                    {(formData.niveau === "L2" ||
                      formData.niveau === "L3" ||
                      formData.niveau === "M1" ||
                      formData.niveau === "M2") && (
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="font-semibold">Relevés de notes universitaires *</Label>
                          <Badge variant="destructive">Requis</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Relevés des années précédentes</p>
                        <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1 bg-transparent">
                      Retour
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1">
                      Soumettre le Dossier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Étape 4: Confirmation */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Dossier Soumis avec Succès</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Votre dossier d'inscription a été soumis avec succès. Vous recevrez un email de confirmation sous
                      peu.
                    </AlertDescription>
                  </Alert>

                  <div className="p-6 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-4">
                      Numéro de dossier:{" "}
                      <span className="text-accent">
                        FS2025-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                      </span>
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Nom:</strong> {formData.nom} {formData.prenoms}
                      </p>
                      <p>
                        <strong>Filière:</strong> {formData.filiere}
                      </p>
                      <p>
                        <strong>Niveau:</strong> {formData.niveau}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Prochaines étapes:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs">
                          1
                        </div>
                        <span className="text-sm">Vérification de votre dossier (5-7 jours ouvrables)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs">2</div>
                        <span className="text-sm">Notification par email du résultat</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs">3</div>
                        <span className="text-sm">Si accepté: convocation pour l'entretien/test</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs">4</div>
                        <span className="text-sm">Finalisation de l'inscription et paiement</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Imprimer le Récépissé
                    </Button>
                    <Button className="flex-1">Suivre mon Dossier</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
