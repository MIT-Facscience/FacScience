import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Shield, Users, Target, Award } from "lucide-react"
import {Link} from "react-router-dom"

export default function IGCRRPage() {
  const programme = {
    "Master 1": {
      semestre1: [
        { code: "IGCRR101", nom: "Fondements de la Gestion des Risques", credits: 6, Credit: 3 },
        { code: "IGCRR102", nom: "Géologie et Risques Naturels", credits: 6, Credit: 3 },
        { code: "IGCRR103", nom: "Météorologie et Climatologie", credits: 4, Credit: 2 },
        { code: "IGCRR104", nom: "Systèmes d'Information Géographique", credits: 4, Credit: 2 },
        { code: "IGCRR105", nom: "Statistiques Appliquées aux Risques", credits: 4, Credit: 2 },
        { code: "IGCRR106", nom: "Droit de l'Environnement", credits: 3, Credit: 1 },
        { code: "ANG501", nom: "Anglais Scientifique", credits: 3, Credit: 1 },
      ],
      semestre2: [
        { code: "IGCRR201", nom: "Analyse et Évaluation des Risques", credits: 6, Credit: 3 },
        { code: "IGCRR202", nom: "Risques Technologiques et Industriels", credits: 6, Credit: 3 },
        { code: "IGCRR203", nom: "Modélisation des Catastrophes", credits: 4, Credit: 2 },
        { code: "IGCRR204", nom: "Télédétection et Surveillance", credits: 4, Credit: 2 },
        { code: "IGCRR205", nom: "Communication de Crise", credits: 3, Credit: 1 },
        { code: "IGCRR206", nom: "Économie des Catastrophes", credits: 3, Credit: 1 },
        { code: "STG201", nom: "Stage d'Observation", credits: 4, Credit: 2 },
      ],
    },
    "Master 2": {
      semestre3: [
        { code: "IGCRR301", nom: "Planification d'Urgence", credits: 6, Credit: 3 },
        { code: "IGCRR302", nom: "Systèmes d'Alerte Précoce", credits: 6, Credit: 3 },
        { code: "IGCRR303", nom: "Gestion Post-Catastrophe", credits: 4, Credit: 2 },
        { code: "IGCRR304", nom: "Résilience des Communautés", credits: 4, Credit: 2 },
        { code: "IGCRR305", nom: "Assurance et Financement des Risques", credits: 4, Credit: 2 },
        { code: "IGCRR306", nom: "Projet de Recherche 1", credits: 6, Credit: 3 },
      ],
      semestre4: [
        { code: "IGCRR401", nom: "Gouvernance des Risques", credits: 4, Credit: 2 },
        { code: "IGCRR402", nom: "Coopération Internationale", credits: 4, Credit: 2 },
        { code: "IGCRR403", nom: "Innovation en Gestion des Risques", credits: 4, Credit: 2 },
        { code: "MEM401", nom: "Mémoire de Recherche", credits: 12, Credit: 6 },
        { code: "STG401", nom: "Stage Professionnel", credits: 6, Credit: 3 },
      ],
    },
  }

  const competences = [
    "Évaluation et cartographie des risques naturels et technologiques",
    "Conception de systèmes d'alerte précoce",
    "Planification et coordination des interventions d'urgence",
    "Analyse de vulnérabilité des infrastructures",
    "Communication de crise et sensibilisation",
    "Gestion post-catastrophe et reconstruction",
    "Utilisation des SIG et télédétection",
    "Modélisation et simulation des catastrophes",
  ]

  const partenaires = [
    { nom: "Bureau National de Gestion des Risques et Catastrophes (BNGRC)", type: "Institution nationale" },
    { nom: "Service Météorologique de Madagascar", type: "Service technique" },
    { nom: "Institut et Observatoire de Géophysique d'Antananarivo", type: "Recherche" },
    { nom: "UNICEF Madagascar", type: "Organisation internationale" },
    { nom: "Programme Alimentaire Mondial (PAM)", type: "Organisation internationale" },
    { nom: "Croix-Rouge Malagasy", type: "ONG" },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
                Parcours Professionnalisant
              </Badge>
              <h1 className="text-4xl font-bold mb-4">IGCRR</h1>
              <h2 className="text-2xl text-accent mb-4">
                Ingénierie en Gestion de Catastrophe et Réduction des Risques
              </h2>
              <p className="text-xl text-muted-foreground">
                Formation spécialisée pour les futurs experts en gestion des risques et catastrophes naturelles
              </p>
            </div>

            {/* Informations générales */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <Card>
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Années</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">25</div>
                  <div className="text-sm text-muted-foreground">Places/an</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-muted-foreground">Insertion</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">Master</div>
                  <div className="text-sm text-muted-foreground">Diplôme</div>
                </CardContent>
              </Card>
            </div>

            {/* Présentation */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-accent" />
                  <span>Présentation du Parcours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Le parcours IGCRR forme des experts capables d'analyser, prévenir et gérer les risques naturels et
                    technologiques. Face aux défis climatiques et aux catastrophes récurrentes à Madagascar, cette
                    formation répond à un besoin urgent de professionnels qualifiés dans la gestion des risques.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-accent">Objectifs Pédagogiques</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Maîtriser les concepts fondamentaux de la gestion des risques</li>
                        <li>• Développer des compétences en évaluation et cartographie des risques</li>
                        <li>• Acquérir les outils de modélisation et simulation</li>
                        <li>• Comprendre les enjeux de la gouvernance des risques</li>
                        <li>• Savoir concevoir des plans de prévention et d'intervention</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-accent">Spécificités Malgaches</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Cyclones tropicaux et inondations</li>
                        <li>• Sécheresses et insécurité alimentaire</li>
                        <li>• Risques sismiques et volcaniques</li>
                        <li>• Érosion côtière et montée des eaux</li>
                        <li>• Vulnérabilité des populations rurales</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conditions d'admission */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Conditions d'Admission</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Master 1 IGCRR</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Diplôme:</strong> Licence en Sciences (Géologie, Géographie, Physique, Mathématiques)
                      </li>
                      <li>
                        • <strong>Moyenne:</strong> Minimum 12/20
                      </li>
                      <li>
                        • <strong>Dossier:</strong> Relevés de notes + CV + lettre de motivation
                      </li>
                      <li>
                        • <strong>Entretien:</strong> Évaluation des motivations et du projet professionnel
                      </li>
                      <li>
                        • <strong>Expérience:</strong> Stage ou expérience dans le domaine appréciée
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Master 2 IGCRR</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        • <strong>Diplôme:</strong> Master 1 IGCRR ou équivalent
                      </li>
                      <li>
                        • <strong>Moyenne:</strong> Minimum 12/20
                      </li>
                      <li>
                        • <strong>Projet:</strong> Proposition de sujet de mémoire
                      </li>
                      <li>
                        • <strong>Stage:</strong> Structure d'accueil identifiée
                      </li>
                      <li>
                        • <strong>Validation:</strong> Commission pédagogique
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/formation/inscription">Candidater au Parcours IGCRR</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Programme détaillé */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Programme Détaillé</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {Object.entries(programme).map(([niveau, semestres]) => (
                    <div key={niveau}>
                      <h3 className="text-xl font-semibold mb-4 text-accent">{niveau}</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(semestres).map(([semestre, ues]) => (
                          <div key={semestre} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-3 capitalize">{semestre.replace(/(\d)/, " $1")}</h4>
                            <div className="space-y-2">
                              {ues.map((ue) => (
                                <div key={ue.code} className="flex justify-between items-center text-sm">
                                  <div className="flex-1">
                                    <span className="font-medium">{ue.code}</span> - {ue.nom}
                                  </div>
                                  <div className="flex space-x-2">
                                    <Badge variant="outline">{ue.credits} ECTS</Badge>
                                    <Badge variant="secondary">Credit {ue.Credit}</Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 pt-3 border-t">
                              <div className="flex justify-between text-sm font-semibold">
                                <span>Total:</span>
                                <span>{ues.reduce((sum, ue) => sum + ue.credits, 0)} ECTS</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compétences développées */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Compétences Développées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {competences.map((competence, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Shield className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{competence}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Partenaires */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Partenaires Professionnels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {partenaires.map((partenaire, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-accent mb-1">{partenaire.nom}</h3>
                      <Badge variant="outline" className="text-xs">
                        {partenaire.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Débouchés */}
            <Card>
              <CardHeader>
                <CardTitle>Débouchés Professionnels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-accent">Secteurs d'Emploi</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Administrations publiques (BNGRC, Ministères)</li>
                      <li>• Organisations internationales (ONU, UE, Banque Mondiale)</li>
                      <li>• ONG humanitaires et de développement</li>
                      <li>• Bureaux d'études et consultants</li>
                      <li>• Compagnies d'assurance</li>
                      <li>• Collectivités territoriales</li>
                      <li>• Entreprises industrielles</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-accent">Métiers Visés</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Gestionnaire de risques et catastrophes</li>
                      <li>• Expert en évaluation des risques</li>
                      <li>• Coordinateur d'urgence</li>
                      <li>• Consultant en résilience</li>
                      <li>• Chargé de mission prévention</li>
                      <li>• Analyste en assurance catastrophe</li>
                      <li>• Responsable sécurité civile</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Perspectives de Carrière</h3>
                  <p className="text-sm text-muted-foreground">
                    Les diplômés IGCRR bénéficient d'excellentes perspectives d'emploi avec un taux d'insertion de 95%
                    dans les 6 mois. Le salaire d'entrée varie entre 1,200,000 et 2,000,000 Ar/mois selon le secteur.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
