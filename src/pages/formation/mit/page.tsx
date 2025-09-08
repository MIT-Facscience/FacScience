import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Users, Award, Clock, MapPin, Phone, Mail } from "lucide-react"
import {Link} from "react-router-dom"
// import Image from "next/image"

export default function MITPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">MIT - MISA</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Mention Informatique et Technologique - Mathematique Informatique et Statistique Appliquées
          </p>
          <img
            src="/departement.png"
            alt="Bâtiment du département MIT"
            width={800}
            height={400}
            className="rounded-lg mx-auto shadow-lg"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Présentation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Présentation du Département MIT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Le département MIT (Mention Informatique et Technologique), également appelé MISA (Mathematique Informatique
                  et Statistique Appliquées), forme des informaticiens de haut niveau capables de répondre aux défis
                  technologiques du développement de Madagascar.
                </p>
                <p>
                  Notre formation allie théorie informatique fondamentale et applications pratiques, préparant nos
                  étudiants aux métiers de l'ingénierie logicielle, des systèmes d'information, de l'intelligence
                  artificielle et des nouvelles technologies.
                </p>
              </CardContent>
            </Card>

            {/* Programmes par niveau */}
            <Card>
              <CardHeader>
                <CardTitle>Programmes de Formation</CardTitle>
                <CardDescription>Cursus complet de la Licence au Master</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Licence */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Badge variant="secondary">L1-L2-L3</Badge>
                      Licence Informatique
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">L1 - Fondamentaux</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Algorithmique et Programmation</li>
                          <li>• Mathématiques pour l'Informatique</li>
                          <li>• Architecture des Ordinateurs</li>
                          <li>• Systèmes d'Exploitation</li>
                          <li>• Anglais Technique</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">L2 - Approfondissement</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Structures de Données</li>
                          <li>• Programmation Orientée Objet</li>
                          <li>• Bases de Données</li>
                          <li>• Réseaux Informatiques</li>
                          <li>• Génie Logiciel</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">L3 - Spécialisation</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Développement Web et Mobile</li>
                          <li>• Intelligence Artificielle</li>
                          <li>• Sécurité Informatique</li>
                        </ul>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Systèmes Distribués</li>
                          <li>• Interface Homme-Machine</li>
                          <li>• Projet de Fin d'Études</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Master */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Badge variant="secondary">M1-M2</Badge>
                      Master Informatique
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Parcours Recherche</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Intelligence Artificielle Avancée</li>
                          <li>• Traitement d'Images</li>
                          <li>• Optimisation et Recherche Opérationnelle</li>
                          <li>• Mémoire de Recherche</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Parcours Professionnel</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Gestion de Projets IT</li>
                          <li>• Architecture des SI</li>
                          <li>• Développement d'Applications</li>
                          <li>• Stage en Entreprise</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conditions d'admission */}
            <Card>
              <CardHeader>
                <CardTitle>Conditions d'Admission</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Licence L1</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Série du Bac :</strong> C, S
                      </li>
                      <li>
                        • <strong>Année du Bac :</strong> Maximum 2 ans
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Master M1</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • <strong>Diplôme requis :</strong> Licence en Informatique ou équivalent
                      </li>
                      <li>
                        • <strong>Dossier :</strong> CV, lettre de motivation, relevés de notes
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Débouchés */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Débouchés Professionnels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Secteur Privé</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Développeur d'Applications</li>
                      <li>• Ingénieur Logiciel</li>
                      <li>• Administrateur Systèmes</li>
                      <li>• Chef de Projet IT</li>
                      <li>• Consultant en SI</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Secteur Public</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Informaticien dans l'Administration</li>
                      <li>• Enseignant-Chercheur</li>
                      <li>• Responsable IT Ministériel</li>
                      <li>• Analyste de Données</li>
                      <li>• Expert en Cybersécurité</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations pratiques */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations Pratiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>~200 étudiants par promotion</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Cours : 8h-17h</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Bâtiment MISA, Campus Ankatso</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Département</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+261 20 22 227 13</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>mit@univ-antananarivo.mg</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/formation/inscription">S'inscrire</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link to="/formation">Retour aux Formations</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
