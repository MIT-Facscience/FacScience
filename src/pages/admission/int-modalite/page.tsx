"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  MapPin,
  Users,
} from "lucide-react";

export default function INTAdmissionPage() {

  const handleDownloadFiche = async (): Promise<void> => {
    try {
      const url: string = '/Fiche/FicheFS.pdf';
      
      const response: Response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const blob: Blob = await response.blob();
      const blobUrl: string = URL.createObjectURL(blob);
      const lien: HTMLAnchorElement = document.createElement('a');
      lien.href = blobUrl;
      lien.download = 'fiche-renseignements.pdf';
      document.body.appendChild(lien);
      lien.click();
      document.body.removeChild(lien);
      URL.revokeObjectURL(blobUrl);
      
    } catch (error: unknown) {
      console.error('Erreur de téléchargement:', error);
      // Fallback direct
      window.open('/Fiche/FicheFS.pdf', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <main className="pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          <div className="mx-auto">
            {/* Header */}
                      <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-12 sm:mb-16 overflow-hidden"
            >
              {/* Image de fond */}
              <div className="absolute inset-0">
                <img
                  src="/modern-university-campus-with-science-buildings-an.png"
                  alt="Campus universitaire – Master Innovation et Technologie"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/70 to-transparent"></div>
              </div>

              {/* Contenu principal */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center py-10 sm:py-16 lg:py-20 px-4 sm:px-6 space-y-6">
                {/* Logo + Titre combiné */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="overflow-hidden w-12 h-12 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-md">
                      <img className="w-full" src="/INT logo.png" alt="INT" />
                    </div>
                    <span className="text-white text-2xl sm:text-3xl font-semibold tracking-wide">
                      Innovation et Technologie
                    </span>
                  </div>
                </div>

                {/* Mention et parcours */}
                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-purple-100 drop-shadow-sm">
                    Admission – Master Innovation et Technologie (INT)
                  </h2>
                  <p className="text-sm sm:text-base text-gray-200 italic">
                    Mention Informatique et Technologie (MIT)
                  </p>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-5xl mx-auto leading-relaxed">
                  Cette page est dédiée aux candidats souhaitant intégrer le parcours 
                  <strong> Innovation et Technologie (INT)</strong> du Master en 
                  <strong> Informatique et Technologie (MIT)</strong>. 
                  Vous y trouverez les conditions d’admission, les modalités de sélection et 
                  le lien vers le formulaire de dépôt de dossier en ligne.
                </p>
              </div>
            </motion.div>

            <div className="container mx-auto px-4 py-8">
              <div className="grid md:grid-cols-12 gap-8 mb-12">
                {/* Colonne gauche — plus étroite : info “Date limite” et “Frais / dépôt” */}
                <div className="md:col-span-4 space-y-8">
                  <Card className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="flex items-center gap-3 px-6 py-4">
                      <Calendar className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg font-semibold text-primary">
                        Date limite
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-4">
                      <p className="text-2xl font-bold text-gray-800">15 Novembre 2025</p>
                      <p className="text-sm text-gray-500 mt-1">Dépôt des dossiers</p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="flex items-center gap-3 px-6 py-4">
                      <FileText className="h-6 w-6 text-secondary" />
                      <CardTitle className="text-lg font-semibold text-secondary">
                        Frais de dossier
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-4">
                      <p className="text-2xl font-bold text-gray-800">50 000 Ar</p>
                      <p className="text-sm text-gray-500 mt-1">Non remboursable</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Colonne droite — plus large : “Public concerné” */}
                <div className="md:col-span-8">
                  <Card className="h-full rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
                    <CardHeader className="flex items-center gap-3 px-6 py-4">
                      <Users className="h-6 w-6 text-accent" />
                      <CardTitle className="text-lg font-semibold text-accent">
                        Public concerné
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-2 flex-1 space-y-6">
                      <div className="bg-neutral-50 p-4 rounded-lg space-y-2">
                        <p className="font-semibold text-red-700">Master 1</p>
                        <p className="text-sm text-gray-600">
                          Étudiants titulaires d’une Licence en mathématiques, informatique ou disciplines voisines et d'un baccalauréat série S ou C.
                        </p>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg space-y-2">
                        <p className="font-semibold text-red-700">Master 2</p>
                        <p className="text-sm text-gray-600">
                          Étudiants titulaires d’un Master 1 en mathématiques ou informatique ou disciplines voisines et d'un baccalauréat série S ou C.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>



              {/* Main Content */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Généralités */}
                  <Card className="border-0 rounded-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-primary" />
                        Généralités sur l'admission
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted p-4 space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Modalités d'admission
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            L’admission au parcours <strong>Innovation et Technologie (INT)</strong> de la <strong>Mention Informatique et Technologie (MIT)</strong> repose sur une sélection sur dossier et un entretien. 
                            Les candidats sont évalués à partir des notes des trois dernières années d’études, du baccalauréat et de leur performance à l’entretien.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Dépôt du dossier
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Le dépôt du dossier de candidature s’effectue exclusivement en ligne via 
                            le formulaire disponible sur le site.
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Voici comment se déroule le processus :</h4>
                        <ol className="space-y-2 text-sm">
                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              1
                            </Badge>
                            <span>Dépôt du dossier de candidature</span>
                          </li>

                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              2
                            </Badge>
                            <span>
                              Pré-sélection sur dossier : classement des candidatures et sélection des
                              candidats invités à l’entretien
                            </span>
                          </li>

                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              3
                            </Badge>
                            <span>Publication de la liste des candidats retenus pour l’entretien</span>
                          </li>

                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              4
                            </Badge>
                            <span>Entretien des candidats sélectionnés</span>
                          </li>

                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              5
                            </Badge>
                            <span>Publication de la liste définitive des candidats admis</span>
                          </li>

                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              6
                            </Badge>
                            <span>Inscription définitive des candidats retenus</span>
                          </li>
                        </ol>
                      </div>


                      <div className="bg-destructive/10 border border-destructive/20 p-4">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                          <div>
                            <p className="font-medium text-destructive">
                              Important
                            </p>
                            <p className="text-sm text-destructive/80">
                              Les dossiers incomplets ou déposés après la date
                              limite ne seront pas traités. Les frais
                              d'inscription ne sont pas remboursables.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pièces à fournir */}
                  <Card className="border-0 rounded-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        Pièces à fournir
                      </CardTitle>
                      <CardDescription>
                        Tous les documents doivent être des copies certifiées
                        conformes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
           
                          {/* "Fiche de renseignements dûment remplie",
                          // "Copie certifiée conforme du diplôme du baccalauréat",
                          // "Copie certifiée conforme du relevé de notes du baccalauréat",
                          // "Extrait d'acte de naissance (original de moins de 3 mois)",
                          // "Certificat de résidence (original de moins de 3 mois)",
                          // "Certificat médical délivré par un médecin agréé",
                          // "Quatre (4) photos d'identité récentes",
                          // "Une enveloppe timbrée portant l'adresse du candidat",
                          "Reçu de versement des frais d'inscription (50 000 Ar)",
                        */}

                      <div className="space-y-3">
                        {[
                          {
                            text: "Curriculum vitae (CV)",
                            hasDownload: false,
                          },
                          {
                            text: "Relevés de notes des trois dernières années d'études (licence ou équivalent)",
                            hasDownload: false,
                          },
                          {
                            text: "Attestation ou relevé de notes du baccalauréat",
                            hasDownload: false,
                          },
                          {
                            text: "Justificatif de paiement des frais de dossier (50 000 Ar)",
                            hasDownload: false,
                          }
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-3 bg-muted/50 border-l-2 border-primary/30"
                          >
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1"> 
                              <span className="text-sm block">{item.text}</span> {/* 'block' pour que le bouton passe en dessous */}
                              {item.hasDownload && (
                                  <button
                                      onClick={handleDownloadFiche}
                                      className="mt-1 text-xs text-primary hover:underline flex items-center gap-1"
                                    >
                                      📥 Télécharger la fiche
                                    </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* <div className="mt-4 p-3 bg-blue-50 border border-blue-200">
                        <p className="text-sm text-blue-900">
                          <strong>Note :</strong> Les photocopies doivent être
                          certifiées conformes par les autorités compétentes
                          (Maire, Chef Fokontany, etc.)
                        </p>
                      </div> */}
                    </CardContent>
                  </Card>

                  {/* Conditions par série */}
                  
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Info */}
                  <Card className="border-0 rounded-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Informations de contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">Adresse</p>
                          <p className="text-sm text-muted-foreground">
                            Faculté des Sciences
                            <br />
                            Campus Universitaire d'Ankatso
                            <br />
                            BP 906, Antananarivo 101
                            <br />
                            Madagascar
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">Scolarité</p>
                          <p className="text-sm text-muted-foreground">
                            Bâtiment Administration
                            <br />
                            J-331
                            <br />
                            Lundi - Vendredi : 8h00 - 16h00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">Paiement des frais</p>
                          <p className="text-sm text-muted-foreground">
                            À effectuer à la Banque BOA-Compte
                            N°25979340004,libellé à Monsieur le Doyen de la
                            Faculté
                            <br />
                            Montant : 50 000 Ariary
                            <br />
                            (Non remboursable)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Important Dates */}
                  <Card className="border-0 rounded-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Calendrier 2025
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted">
                          <span className="text-sm font-medium">
                            Fin dépôt dossiers
                          </span>
                          <Badge variant="default" className="rounded-none w-24">
                            15 Novembre
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted">
                          <span className="text-sm font-medium">Résultats de pré-sélection</span>
                          <Badge variant="outline" className="rounded-none w-24">
                            Décembre
                          </Badge>
                        </div>
                         <div className="flex justify-between items-center p-3 bg-muted">
                          <span className="text-sm font-medium">Entretiens</span>
                          <Badge variant="outline" className="rounded-none w-24">
                            Mi-Décembre
                          </Badge>
                        </div>
                      </div>
                      {/* <div className="text-xs text-muted-foreground pt-2 border-t">
                        <p>• Dépôt sur place ou par courrier recommandé</p>
                        <p>
                          • Le cachet de la poste fait foi pour l'envoi postal
                        </p>
                        <p>• Inscription en ligne</p>
                        
                      </div> */}
                    </CardContent>
                  </Card>

                  {/* Call to Action */}
                  <Card className="bg-primary text-primary-foreground rounded-none">
                    <CardHeader>
                      <CardTitle>Prêt à postuler ?</CardTitle>
                      <CardDescription className="text-primary-foreground/80">
                        Accédez au formulaire en ligne pour déposer votre dossier de candidature
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="secondary"
                        className="w-full rounded-none cursor-pointer"
                        onClick={() =>
                          (window.location.href = "/admission/int-formulaire")
                        }
                      >
                        Déposer mon dossier
                      </Button>
                    </CardContent>
                  </Card>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
