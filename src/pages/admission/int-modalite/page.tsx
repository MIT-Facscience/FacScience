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
import { useTranslation } from "react-i18next";

export default function INTAdmissionPage() {
  const { t } = useTranslation("admission");

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
      window.open('/Fiche/FicheFS.pdf', '_blank');
    }
  };

  // Fonction pour formater les textes multilignes
  const renderMultilineText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  // Fonction pour rendre le texte avec HTML
  const renderHTML = (text: string) => {
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
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
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 bg-white/10 backdrop-blur-sm px-6 py-3  shadow-lg">
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
                    {t("intAdmissionTitle")}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-200 italic">
                    {t("intMention")}
                  </p>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-5xl mx-auto leading-relaxed">
                  {renderHTML(t("intDescription"))}
                </p>
              </div>
            </motion.div>

            <div className="container mx-auto px-4 py-8">
              <div className="grid md:grid-cols-12 gap-8 mb-12">
                {/* Colonne gauche — plus étroite : info "Date limite" et "Frais / dépôt" */}
                <div className="md:col-span-4 space-y-8">
                  <Card className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="flex items-center gap-3 px-6 py-4">
                      <Calendar className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg font-semibold text-primary">
                        {t("datelimit")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-4">
                      <p className="text-2xl font-bold text-gray-800">15 Novembre 2025</p>
                      <p className="text-sm text-gray-500 mt-1">{t("depositdossiers")}</p>
                    </CardContent>
                  </Card>

                  <Card className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="flex items-center gap-3 px-6 py-4">
                      <FileText className="h-6 w-6 text-secondary" />
                      <CardTitle className="text-lg font-semibold text-secondary">
                        {t("intApplicationFee")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-4">
                      <p className="text-2xl font-bold text-gray-800">50 000 Ar</p>
                      <p className="text-sm text-gray-500 mt-1">{t("nonrefundable")}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Colonne droite — plus large : "Public concerné" */}
                <div className="md:col-span-8">
                  <Card className="h-full rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
                    <CardHeader className="flex items-center gap-3 px-6 py-4">
                      <Users className="h-6 w-6 text-accent" />
                      <CardTitle className="text-lg font-semibold text-accent">
                        {t("intTargetAudience")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-2 flex-1 space-y-6">
                      <div className="bg-neutral-50 p-4  space-y-2">
                        <p className="font-semibold text-red-700">{t("intMaster1")}</p>
                        <p className="text-sm text-gray-600">
                          {t("intMaster1Description")}
                        </p>
                      </div>
                      <div className="bg-neutral-50 p-4  space-y-2">
                        <p className="font-semibold text-red-700">{t("intMaster2")}</p>
                        <p className="text-sm text-gray-600">
                          {t("intMaster2Description")}
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
                        {t("intGeneralAdmission")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted p-4 space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            {t("intAdmissionModalities")}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {renderHTML(t("intAdmissionProcessDescription"))}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            {t("intApplicationSubmission")}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {t("intApplicationSubmissionDescription")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">{t("intProcessTitle")}</h4>
                        <ol className="space-y-2 text-sm">
                          {[
                            t("intStep1"),
                            t("intStep2"), 
                            t("intStep3"),
                            t("intStep4"),
                            t("intStep5"),
                            t("intStep6")
                          ].map((step, index) => (
                            <li key={index} className="flex gap-3">
                              <Badge
                                variant="outline"
                                className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                              >
                                {index + 1}
                              </Badge>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="bg-destructive/10 border border-destructive/20 p-4">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                          <div>
                            <p className="font-medium text-destructive">
                              {t("important")}
                            </p>
                            <p className="text-sm text-destructive/80">
                              {t("importantnote")}
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
                        {t("intDocumentsRequired")}
                      </CardTitle>
                      <CardDescription>
                        {t("documentsnote")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { text: t("intDocument1"), hasDownload: false },
                          { text: t("intDocument2"), hasDownload: false },
                          { text: t("intDocument3"), hasDownload: false },
                          { text: t("intDocument4"), hasDownload: false }
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-3 bg-muted/50 border-l-2 border-primary/30"
                          >
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1"> 
                              <span className="text-sm block">{item.text}</span>
                              {item.hasDownload && (
                                <button
                                  onClick={handleDownloadFiche}
                                  className="mt-1 text-xs text-primary hover:underline flex items-center gap-1"
                                >
                                  📥 {t("downloadform")}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
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
                        {t("contactinfo")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">{t("address")}</p>
                          <p className="text-sm text-muted-foreground">
                            {renderMultilineText(t("addressdetails"))}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">{t("registrar")}</p>
                          <p className="text-sm text-muted-foreground">
                            {renderMultilineText(t("registrardetails"))}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium">{t("paymentinfo")}</p>
                          <p className="text-sm text-muted-foreground">
                            {renderMultilineText(t("paymentdetails"))}
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
                        {t("calendar2025")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted">
                          <span className="text-sm font-medium">
                            {t("intDeadlineDossier")}
                          </span>
                          <Badge variant="default" className="rounded-none w-24">
                            15 Novembre
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted">
                          <span className="text-sm font-medium">{t("intPreselectionResults")}</span>
                          <Badge variant="outline" className="rounded-none w-24">
                            Décembre
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted">
                          <span className="text-sm font-medium">{t("intInterviews")}</span>
                          <Badge variant="outline" className="rounded-none w-24">
                            Mi-Décembre
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Call to Action */}
                  <Card className="bg-primary text-primary-foreground rounded-none">
                    <CardHeader>
                      <CardTitle>{t("intReadyToApply")}</CardTitle>
                      <CardDescription className="text-primary-foreground/80">
                        {t("intEnsureDocuments")}
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
                        {t("intStartApplication")}
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