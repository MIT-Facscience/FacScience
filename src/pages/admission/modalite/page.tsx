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

export default function AdmissionPage() {
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
                  {t("conditionadmission")}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                  {t("detailsandmodality")}
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
                      <CardTitle className="text-lg">{t("datelimit")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">
                      15 Novembre 2025
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("depositdossiers")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 border-l-4 border-l-secondary rounded-none">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-secondary" />
                      <CardTitle className="text-lg">
                        {t("preinscriptionfee")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-secondary">
                      50 000 Ar
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("nonrefundable")}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 border-l-4 border-l-accent rounded-none">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">{t("targetaudience")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{t("bacheliers")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("session")}
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
                        {t("generaladmission")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {t("admissionmodalities")}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {t("admissionprocess")}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          {t("selectionprocess")}
                        </h4>
                        <ol className="space-y-2 text-sm">
                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              1
                            </Badge>
                            <span>{t("step1")}</span>
                          </li>
                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              2
                            </Badge>
                            <span>{t("step2")}</span>
                          </li>
                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              3
                            </Badge>
                            <span>{t("step3")}</span>
                          </li>
                          <li className="flex gap-3">
                            <Badge
                              variant="outline"
                              className="min-w-6 h-6 rounded-full p-0 flex items-center justify-center"
                            >
                              4
                            </Badge>
                            <span>{t("step4")}</span>
                          </li>
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
                        {t("documentsrequired")}
                      </CardTitle>
                      <CardDescription>
                        {t("documentsnote")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          {
                            text: t("document1"),
                            hasDownload: true,
                          },
                          {
                            text: t("document2"),
                            hasDownload: false,
                          },
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
                            {t("deadlinedossier")}
                          </span>
                          <Badge variant="default" className="rounded-none">
                            15 Novembre
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted">
                          <span className="text-sm font-medium">{t("results")}</span>
                          <Badge variant="outline" className="rounded-none">
                            Mi-Décembre
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground pt-2 border-t">
                        <p>• {t("onsitedeposit")}</p>
                        <p>• {t("postmarkproof")}</p>
                        <p>• {t("onlineregistration")}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Call to Action */}
                  <Card className="bg-primary text-primary-foreground rounded-none">
                    <CardHeader>
                      <CardTitle>{t("readytoapply")}</CardTitle>
                      <CardDescription className="text-primary-foreground/80">
                        {t("ensuredocuments")}
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
                        {t("startregistration")}
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