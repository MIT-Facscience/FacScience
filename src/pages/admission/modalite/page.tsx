"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

export default function AdmissionPage() {
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
              <div className="absolute inset-0">
                <img
                  src="/modern-university-campus-with-science-buildings-an.png"
                  alt="Histoire de la faculté"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white-900/80 via-gray-800/60"></div>
              </div>
              <div className="relative z-10 text-center py-10 sm:py-16 lg:py-20 px-4 sm:px-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
                  Conditions d'admission
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                  Détails et modalités pour l'année académique 2024-2025
                </p>
              </div>
            </motion.div>

            <div className="container mx-auto px-4 py-8">
              {/* Quick Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="border-0 border-l-4 border-l-primary rounded-none">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Date Limite</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">
                      15 Novembre 2025
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Dépôt des dossiers
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 border-l-4 border-l-secondary rounded-none">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-secondary" />
                      <CardTitle className="text-lg">
                        Frais d'inscription
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-secondary">
                      50 000 Ar
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Non remboursable
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 border-l-4 border-l-accent rounded-none">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">Public Concerné</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">Session 2024-2025</p>
                    {/* <p className="text-sm text-muted-foreground">
                      Session 2025
                    </p> */}
                  </CardContent>
                </Card>
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
                      <div className="bg-muted p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          Modalités d'admission
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          L'admission à la Faculté des Sciences se fait par voie de la selection de dossier. 
                          Les candidats sont classés selon les notes obtenues au baccalauréat, 
                          en tenant compte de la série et de la mention.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          Processus de sélection :
                        </h4>
                        <ol className="space-y-2 text-sm">
                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              1
                            </Badge>
                            <span>Constitution et dépôt du dossier de candidature</span>
                          </li>
                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              2
                            </Badge>
                            <span>
                              Classement des candidats par ordre de mérite selon les notes du bac
                            </span>
                          </li>
                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              3
                            </Badge>
                            <span>
                              Publication des résultats et liste des admis
                            </span>
                          </li>
                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              4
                            </Badge>
                            <span>
                              Inscription définitive pour les candidats retenus
                            </span>
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
                              Les dossiers incomplets ou déposés après la date limite ne seront pas traités. 
                              Les frais d'inscription ne sont pas remboursables.
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
                        Pièces à fournir pour le dossier
                      </CardTitle>
                      <CardDescription>
                        Tous les documents doivent être des copies certifiées conformes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          "Fiche de renseignements dûment remplie",
                          "Copie certifiée conforme du diplôme du baccalauréat",
                          "Copie certifiée conforme du relevé de notes du baccalauréat",
                          "Extrait d'acte de naissance (original de moins de 3 mois)",
                          "Certificat de résidence (original de moins de 3 mois)",
                          "Certificat médical délivré par un médecin agréé",
                          "Quatre (4) photos d'identité récentes",
                          "Une enveloppe timbrée portant l'adresse du candidat",
                          "Reçu de versement des frais d'inscription (50 000 Ar)",
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-3 bg-muted/50 border-l-2 border-primary/30"
                          >
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200">
                        <p className="text-sm text-blue-900">
                          <strong>Note :</strong> Les photocopies doivent être certifiées conformes 
                          par les autorités compétentes (Maire, Chef Fokontany, etc.)
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Conditions par série */}
                  <Card className="border-0 rounded-none">
                    <CardHeader>
                      <CardTitle>Conditions d'admission par série de baccalauréat</CardTitle>
                      <CardDescription>
                        Les admissions sont organisées selon la série du baccalauréat et la mention obtenue
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="serie-c">
                          <AccordionTrigger className="text-left">
                            <div>
                              <div className="font-semibold">
                                Baccalauréat Série C
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Mathématiques et Sciences Physiques
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="border-l-4 border-l-primary pl-4 py-2">
                                <h5 className="font-medium text-primary">Mention Très Bien</h5>
                                <p className="text-sm text-muted-foreground">
                                  Accès direct à toutes les mentions de la Faculté
                                </p>
                              </div>
                              <div className="border-l-4 border-l-secondary pl-4 py-2">
                                <h5 className="font-medium text-secondary">Mention Bien</h5>
                                <p className="text-sm text-muted-foreground">
                                  Accès prioritaire selon le classement
                                </p>
                              </div>
                              <div className="border-l-4 border-l-accent pl-4 py-2">
                                <h5 className="font-medium text-accent">Mention Assez Bien</h5>
                                <p className="text-sm text-muted-foreground">
                                  Admission selon les places disponibles et classement
                                </p>
                              </div>
                              <div className="border-l-4 border-l-gray-400 pl-4 py-2">
                                <h5 className="font-medium text-gray-700">Mention Passable</h5>
                                <p className="text-sm text-muted-foreground">
                                  Admission limitée selon disponibilité et classement
                                </p>
                              </div>
                            </div>
                            <div className="pt-3 border-t">
                              <Button
                                className="w-full rounded-none"
                                onClick={() =>
                                  (window.location.href = "/admission/preinscription")
                                }
                              >
                                S'inscrire - Série C
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="serie-d">
                          <AccordionTrigger className="text-left">
                            <div>
                              <div className="font-semibold">
                                Baccalauréat Série D
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Sciences de la Vie et de la Terre
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="border-l-4 border-l-primary pl-4 py-2">
                                <h5 className="font-medium text-primary">Mention Très Bien</h5>
                                <p className="text-sm text-muted-foreground">
                                  Accès direct aux mentions scientifiques
                                </p>
                              </div>
                              <div className="border-l-4 border-l-secondary pl-4 py-2">
                                <h5 className="font-medium text-secondary">Mention Bien</h5>
                                <p className="text-sm text-muted-foreground">
                                  Accès prioritaire selon le classement
                                </p>
                              </div>
                              <div className="border-l-4 border-l-accent pl-4 py-2">
                                <h5 className="font-medium text-accent">Mentions Assez Bien et Passable</h5>
                                <p className="text-sm text-muted-foreground">
                                  Admission selon les places disponibles et classement
                                </p>
                              </div>
                            </div>
                            <div className="pt-3 border-t">
                              <Button
                                className="w-full rounded-none"
                                onClick={() =>
                                  (window.location.href = "/admission/preinscription")
                                }
                              >
                                S'inscrire - Série D
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="technique">
                          <AccordionTrigger className="text-left">
                            <div>
                              <div className="font-semibold">
                                Baccalauréats Techniques
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Séries E, F, G selon spécialité
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4">
                            <div className="space-y-3">
                              <p className="text-sm">
                                Les titulaires de baccalauréats techniques peuvent postuler pour certaines mentions :
                              </p>
                              <ul className="text-sm space-y-2 ml-4">
                                <li className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Informatique (Série F - Électronique/Informatique)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Physique-Chimie (Série F - Électronique)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>Sciences Industrielles (Séries E et F)</span>
                                </li>
                              </ul>
                              <div className="bg-amber-50 border border-amber-200 p-3 mt-3">
                                <p className="text-xs text-amber-900">
                                  <strong>Condition :</strong> Moyenne générale minimale de 12/20 au baccalauréat
                                </p>
                              </div>
                            </div>
                            <div className="pt-3 border-t">
                              <Button
                                className="w-full rounded-none"
                                onClick={() =>
                                  (window.location.href = "/admission/preinscription")
                                }
                              >
                                S'inscrire - Bacc Technique
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
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
                            À effectuer à la Banque BOA-Compte N°25979340004,libellé à Monsieur le Doyen de la Faculté
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
                          <span className="text-sm font-medium">Retrait dossiers</span>
                          <Badge variant="outline" className="rounded-none">
                            15 Août
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted">
                          <span className="text-sm font-medium">Dépôt dossiers</span>
                          <Badge variant="default" className="rounded-none">
                            30 Sept
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted">
                          <span className="text-sm font-medium">Résultats</span>
                          <Badge variant="outline" className="rounded-none">
                            Mi-Octobre
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground pt-2 border-t">
                        <p>• Dépôt sur place ou par courrier recommandé</p>
                        <p>• Le cachet de la poste fait foi pour l'envoi postal</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Call to Action */}
                  <Card className="bg-primary text-primary-foreground rounded-none">
                    <CardHeader>
                      <CardTitle>Prêt à postuler ?</CardTitle>
                      <CardDescription className="text-primary-foreground/80">
                        Assurez-vous d'avoir tous les documents requis avant de soumettre votre dossier.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="secondary"
                        className="w-full rounded-none"
                        onClick={() =>
                          (window.location.href = "/admission/preinscription")
                        }
                      >
                        Commencer l'inscription
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