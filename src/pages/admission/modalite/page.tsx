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
                  Détails et modalités pour l'année
                  académique 2025
                </p>
              </div>
            </motion.div>

            <div className="container mx-auto px-4 py-8">
              {/* Quick Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className=" border-0 border-l-4 border-l-primary rounded-none ">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Date Limite</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">
                      30 Sept 2025
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
                      Compte BNI CA
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
                    <p className="text-lg font-semibold">Nouveaux Bacheliers</p>
                    <p className="text-sm text-muted-foreground">
                      2024 et 2025
                    </p>
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
                          Préinscription en vue d'une sélection sur dossier.
                          Classification basée sur les notes du baccalauréat, la
                          série et la mention obtenue. Pas d'examen écrit.
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
                            <span>Dépôt du dossier pour la préinscription</span>
                          </li>
                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              2
                            </Badge>
                            <span>
                              Classification des dossiers par ordre de mérite
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
                              Signature d'engagement de non-perception de
                              bourses (si requis)
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
                              Les dossiers incomplets sont automatiquement
                              rejetés.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pièces à fournir */}
                  <Card className=" border-0 rounded-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        Pièces à fournir pour le dossier
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          "Une photo d'identité récente",
                          "Une demande manuscrite signée",
                          "Copie certifiée du diplôme du baccalauréat",
                          "Copie certifiée du relevé de notes du bac",
                          "Acte de naissance original ou copie certifiée",
                          "Certificat de résidence",
                          "Enveloppe timbrée à votre adresse",
                          "Reçu du versement des 50 000 ariary",
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-2 bg-muted/50"
                          >
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Portails et Mentions */}
                  <Card className="border-0 rounded-none">
                    <CardHeader>
                      <CardTitle>Conditions spécifiques par portail</CardTitle>
                      <CardDescription>
                        Les admissions sont organisées par portails avec des
                        conditions adaptées à votre série de baccalauréat.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="portail1">
                          <AccordionTrigger className="text-left">
                            <div>
                              <div className="font-semibold">
                                Portail 1 : Mathématiques-Physique-Chimie
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Séries C et D
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="border-l-4 border-l-primary pl-4">
                                <h5 className="font-medium">
                                  Mention Mathématiques et Informatique
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  Bac série C, mention Très Bien, Bien ou Assez
                                  Bien
                                </p>
                              </div>
                              <div className="border-l-4 border-l-secondary pl-4">
                                <h5 className="font-medium">
                                  Mention Physique et Applications
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  Bac série C ou D, mention Passable (non
                                  délibérée)
                                </p>
                                <p className="text-xs text-destructive">
                                  Condition : engagement de non-perception de
                                  bourses
                                </p>
                              </div>
                              <div className="border-l-4 border-l-accent pl-4">
                                <h5 className="font-medium">Mention Chimie</h5>
                                <p className="text-sm text-muted-foreground">
                                  Bac série C ou D, mention Passable (non
                                  délibérée)
                                </p>
                                <p className="text-xs text-destructive">
                                  Condition : engagement de non-perception de
                                  bourses
                                </p>
                              </div>
                            </div>
                            <div className="pt-3 border-t ">
                              <Button
                                className="w-full rounded-none"
                                onClick={() =>
                                  (window.location.href = "/admission/preinscription")
                                }
                              >
                                S'inscrire au Portail 1
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="portail2">
                          <AccordionTrigger className="text-left">
                            <div>
                              <div className="font-semibold">
                                Portail 2 : Sciences de la Vie et de la Terre
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Séries C et D
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="border-l-4 border-l-primary pl-4">
                                <h5 className="font-medium">
                                  Mention Physique
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  Bac 2024-2025, série D, mention Passable, non
                                  délibérée
                                </p>
                              </div>
                              <div className="border-l-4 border-l-secondary pl-4">
                                <h5 className="font-medium">
                                  Mention Biologie
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  Bac 2024-2025, série D, mention Passable
                                </p>
                              </div>
                              <div className="border-l-4 border-l-accent pl-4">
                                <h5 className="font-medium">
                                  Mention Mathématiques
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  Bac 2024-2025, série C, spécialité
                                  Mathématiques ou Sciences
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
                                S'inscrire au Portail 2
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
                                TGI, TME, TFE
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p className="text-sm">
                                Éligible pour certaines mentions techniques :
                              </p>
                              <ul className="text-sm space-y-1 ml-4">
                                <li>• Technicien Froid Industriel</li>
                                <li>• Maintenance Électrotechnique</li>
                              </ul>
                              <p className="text-xs text-destructive">
                                Condition : engagement de non-perception de
                                bourses et moyenne en matières techniques
                              </p>
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
                <div className="space-y-6 ">
                  {/* Contact Info */}
                  <Card className="border-0 rounded-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Informations de contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">Adresse</p>
                          <p className="text-sm text-muted-foreground">
                            Faculté des Sciences, Ankatso
                            <br />
                            BP 906, Antananarivo
                            <br />
                            Madagascar
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Compte bancaire</p>
                          <p className="text-sm text-muted-foreground font-mono">
                            BNI CA n° 00005 00002 24103 602 00-43
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Important Dates */}
                  <Card className="border-0 rounded-none">
                    <CardHeader className="rounded-none">
                      <CardTitle className="flex items-center gap-2 ">
                        <Calendar className="h-5 w-5 text-primary" />
                        Dates importantes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 rounded-none">
                      <div className="flex justify-between items-center p-3 bg-muted">
                        <span className="font-medium text-primary">
                          Date limite de dépôt
                        </span>
                        <Badge variant="default" className="rounded-none">
                          30 Sept 2025
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>• Dépôt direct ou par voie postale</p>
                        <p>• Le cachet de la poste fait foi</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Call to Action */}
                  <Card className="bg-primary text-primary-foreground rounded-none">
                    <CardHeader>
                      <CardTitle>Prêt à postuler ?</CardTitle>
                      <CardDescription className="text-primary-foreground/80">
                        Assurez-vous d'avoir tous les documents requis avant de
                        soumettre votre dossier.
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
                        S'inscrire
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
