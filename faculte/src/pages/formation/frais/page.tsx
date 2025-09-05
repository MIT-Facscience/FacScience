// import { Navigation } from "../../components/navigation"
// import { Footer } from "../../components/footer"
import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
// import { Button } from "../../components/ui/button"
import { Award, CreditCard, DollarSign, Info, Users } from "lucide-react";
import { Alert, AlertDescription } from "../../../components/ui/alert";
// import { Link } from "react-router-dom";

export default function FraisPage() {
  const fraisLicence = [
    {
      niveau: "Licence 1",
      inscription: 50000,
      scolarite: 200000,
      total: 250000,
    },
    {
      niveau: "Licence 2",
      inscription: 50000,
      scolarite: 220000,
      total: 270000,
    },
    {
      niveau: "Licence 3",
      inscription: 50000,
      scolarite: 250000,
      total: 300000,
    },
  ];

  const fraisMaster = [
    {
      niveau: "Master 1",
      inscription: 75000,
      scolarite: 350000,
      total: 425000,
    },
    {
      niveau: "Master 2",
      inscription: 75000,
      scolarite: 400000,
      total: 475000,
    },
  ];

  const fraisParcours = [
    {
      parcours: "IGCRR",
      niveau: "Master",
      inscription: 100000,
      scolarite: 500000,
      total: 600000,
    },
    {
      parcours: "IPSS",
      niveau: "Master",
      inscription: 100000,
      scolarite: 500000,
      total: 600000,
    },
  ];

  const fraisSupplementaires = [
    { service: "Carte d'étudiant", prix: 5000, obligatoire: true },
    { service: "Assurance étudiante", prix: 15000, obligatoire: true },
    { service: "Frais de bibliothèque", prix: 10000, obligatoire: true },
    { service: "Activités sportives", prix: 20000, obligatoire: false },
    {
      service: "Restauration universitaire",
      prix: 150000,
      obligatoire: false,
      note: "par an",
    },
  ];

  const modalitesPaiement = [
    {
      type: "Paiement comptant",
      description: "Paiement intégral en une fois",
      reduction: "5% de réduction",
      echeance: "À l'inscription",
    },
    {
      type: "Paiement en 2 fois",
      description: "50% à l'inscription, 50% en janvier",
      reduction: "Aucune réduction",
      echeance: "Septembre et Janvier",
    },
    {
      type: "Paiement en 3 fois",
      description: "40% à l'inscription, 30% en décembre, 30% en mars",
      reduction: "Aucune réduction",
      echeance: "Septembre, Décembre, Mars",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Frais de Scolarité</h1>
              <p className="text-xl text-muted-foreground">
                Année académique 2024-2025 - Tarifs en Ariary (Ar)
              </p>
            </div>

            {/* Alerte importante */}
            <Alert className="mb-8">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Les frais de scolarité sont payables
                avant le début des cours. Des facilités de paiement sont
                disponibles. Les étudiants boursiers bénéficient d'exonérations
                selon leur statut.
              </AlertDescription>
            </Alert>

            {/* Frais Licence */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                  <span>Frais de Scolarité - Licence</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Niveau</th>
                        <th className="text-right py-3 px-4">Inscription</th>
                        <th className="text-right py-3 px-4">Scolarité</th>
                        <th className="text-right py-3 px-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fraisLicence.map((frais) => (
                        <tr
                          key={frais.niveau}
                          className="border-b hover:bg-muted/30"
                        >
                          <td className="py-3 px-4 font-medium">
                            {frais.niveau}
                          </td>
                          <td className="text-right py-3 px-4">
                            {frais.inscription.toLocaleString()} Ar
                          </td>
                          <td className="text-right py-3 px-4">
                            {frais.scolarite.toLocaleString()} Ar
                          </td>
                          <td className="text-right py-3 px-4 font-semibold text-purple-600">
                            {frais.total.toLocaleString()} Ar
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Frais Master */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span>Frais de Scolarité - Master</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Niveau</th>
                        <th className="text-right py-3 px-4">Inscription</th>
                        <th className="text-right py-3 px-4">Scolarité</th>
                        <th className="text-right py-3 px-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fraisMaster.map((frais) => (
                        <tr
                          key={frais.niveau}
                          className="border-b hover:bg-muted/30"
                        >
                          <td className="py-3 px-4 font-medium">
                            {frais.niveau}
                          </td>
                          <td className="text-right py-3 px-4">
                            {frais.inscription.toLocaleString()} Ar
                          </td>
                          <td className="text-right py-3 px-4">
                            {frais.scolarite.toLocaleString()} Ar
                          </td>
                          <td className="text-right py-3 px-4 font-semibold text-purple-600">
                            {frais.total.toLocaleString()} Ar
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Parcours professionnalisants */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Parcours Professionnalisants</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Parcours</th>
                        <th className="text-left py-3 px-4">Niveau</th>
                        <th className="text-right py-3 px-4">Inscription</th>
                        <th className="text-right py-3 px-4">Scolarité</th>
                        <th className="text-right py-3 px-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fraisParcours.map((frais) => (
                        <tr
                          key={frais.parcours}
                          className="border-b hover:bg-muted/30"
                        >
                          <td className="py-3 px-4 font-medium">
                            {frais.parcours}
                          </td>
                          <td className="py-3 px-4">{frais.niveau}</td>
                          <td className="text-right py-3 px-4">
                            {frais.inscription.toLocaleString()} Ar
                          </td>
                          <td className="text-right py-3 px-4">
                            {frais.scolarite.toLocaleString()} Ar
                          </td>
                          <td className="text-right py-3 px-4 font-semibold text-purple-600">
                            {frais.total.toLocaleString()} Ar
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-purple-600/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Les parcours professionnalisants
                    incluent des équipements spécialisés, des sorties terrain et
                    des certifications professionnelles.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Frais supplémentaires */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Frais Supplémentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {fraisSupplementaires.map((frais, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{frais.service}</span>
                        {frais.obligatoire ? (
                          <Badge variant="destructive">Obligatoire</Badge>
                        ) : (
                          <Badge variant="secondary">Optionnel</Badge>
                        )}
                        {frais.note && (
                          <span className="text-sm text-muted-foreground">
                            ({frais.note})
                          </span>
                        )}
                      </div>
                      <span className="font-semibold">
                        {frais.prix.toLocaleString()} Ar
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Modalités de paiement */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <span>Modalités de Paiement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {modalitesPaiement.map((modalite, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-purple-600 mb-2">
                        {modalite.type}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {modalite.description}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Réduction:</span>
                          <span
                            className={
                              modalite.reduction.includes("5%")
                                ? "text-green-600 font-medium"
                                : ""
                            }
                          >
                            {modalite.reduction}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Échéances:</span>
                          <span>{modalite.echeance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Moyens de paiement */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Moyens de Paiement Acceptés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-purple-600">
                      Paiement en Espèces
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Directement au service financier</li>
                      <li>• Horaires: Lundi-Vendredi 8h-16h</li>
                      <li>• Reçu officiel délivré immédiatement</li>
                      <li>• Possibilité de paiement partiel</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-purple-600">
                      Paiement Bancaire
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Virement bancaire (BNI-CL, BOA, BFV-SG)</li>
                      <li>• Mobile Money (Orange Money, Mvola)</li>
                      <li>• Chèque bancaire (à l'ordre de la Faculté)</li>
                      <li>• Délai de traitement: 2-3 jours ouvrables</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
