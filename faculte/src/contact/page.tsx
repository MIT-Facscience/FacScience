import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Building,
  MessageSquare,
} from "lucide-react"

export default function ContactPage() {
  const departements_contacts = [
    {
      nom: "Mathématiques et Informatique",
      responsable: "Prof. RAKOTO Jean Claude",
      email: "mi@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 45",
      bureau: "Bâtiment A, Bureau 201",
      horaires: "Lun-Ven: 8h-16h",
    },
    {
      nom: "Physique",
      responsable: "Prof. ANDRY Marie Jeanne",
      email: "physique@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 46",
      bureau: "Bâtiment B, Bureau 105",
      horaires: "Lun-Ven: 8h-16h",
    },
    {
      nom: "Chimie",
      responsable: "Dr. RABE Paul Henri",
      email: "chimie@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 47",
      bureau: "Bâtiment C, Bureau 102",
      horaires: "Lun-Ven: 8h-16h",
    },
    {
      nom: "Biologie/Sciences de la Vie",
      responsable: "Prof. HERY Sophie Claudine",
      email: "biologie@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 48",
      bureau: "Bâtiment D, Bureau 201",
      horaires: "Lun-Ven: 8h-16h",
    },
    {
      nom: "Géologie/Sciences de la Terre",
      responsable: "Dr. SOLO Michel André",
      email: "geologie@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 49",
      bureau: "Bâtiment E, Bureau 103",
      horaires: "Lun-Ven: 8h-16h",
    },
  ]

  const services_administratifs = [
    {
      service: "Scolarité",
      responsable: "Mme RAZAFY Hanta",
      email: "scolarite@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 50",
      bureau: "Administration, Rez-de-chaussée",
    },
    {
      service: "Recherche et Coopération",
      responsable: "Dr. RANDRIA Paul",
      email: "recherche@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 51",
      bureau: "Administration, 1er étage",
    },
    {
      service: "Finances",
      responsable: "M. RAKOTO Hery",
      email: "finances@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 52",
      bureau: "Administration, Rez-de-chaussée",
    },
    {
      service: "Informatique",
      responsable: "M. NIVO Tiana",
      email: "informatique@sciences.univ-antananarivo.mg",
      telephone: "+261 20 22 123 53",
      bureau: "Bâtiment F, Sous-sol",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Contact</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Contactez-nous pour toute information concernant la Faculté des Sciences d'Antananarivo.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coordonnées générales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Coordonnées Générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-slate-800">Adresse</h4>
                        <p className="text-slate-600 text-sm">
                          Faculté des Sciences
                          <br />
                          Université d'Antananarivo
                          <br />
                          BP 906, Antananarivo 101
                          <br />
                          Madagascar
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-slate-800">Téléphone</h4>
                        <p className="text-slate-600 text-sm">
                          +261 20 22 123 40
                          <br />
                          +261 20 22 123 41 (Fax)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-slate-800">Email</h4>
                        <p className="text-slate-600 text-sm">
                          contact@sciences.univ-antananarivo.mg
                          <br />
                          doyen@sciences.univ-antananarivo.mg
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-red-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-slate-800">Horaires</h4>
                        <p className="text-slate-600 text-sm">
                          Lundi - Vendredi: 7h30 - 17h00
                          <br />
                          Samedi: 8h00 - 12h00
                          <br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formulaire de contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Formulaire de Contact
                </CardTitle>
                <CardDescription>
                  Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Nom complet</label>
                      <Input placeholder="Votre nom complet" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                      <Input type="email" placeholder="votre.email@exemple.com" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Téléphone</label>
                      <Input placeholder="+261 XX XX XXX XX" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Sujet</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admission">Admission</SelectItem>
                          <SelectItem value="formation">Formation</SelectItem>
                          <SelectItem value="recherche">Recherche</SelectItem>
                          <SelectItem value="partenariat">Partenariat</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Message</label>
                    <Textarea placeholder="Décrivez votre demande en détail..." className="min-h-[120px]" />
                  </div>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contacts par départements */}
            <Card>
              <CardHeader>
                <CardTitle>Contacts par Département</CardTitle>
                <CardDescription>
                  Contactez directement les départements pour des questions spécifiques.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="departements" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="departements">Départements</TabsTrigger>
                    <TabsTrigger value="services">Services Administratifs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="departements" className="space-y-4">
                    {departements_contacts.map((dept, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{dept.nom}</CardTitle>
                          <CardDescription className="text-sm">{dept.responsable}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-purple-600" />
                                <span className="text-slate-600">{dept.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-green-600" />
                                <span className="text-slate-600">{dept.telephone}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-blue-600" />
                                <span className="text-slate-600">{dept.bureau}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-red-600" />
                                <span className="text-slate-600">{dept.horaires}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="services" className="space-y-4">
                    {services_administratifs.map((service, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{service.service}</CardTitle>
                          <CardDescription className="text-sm">{service.responsable}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-purple-600" />
                                <span className="text-slate-600">{service.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-green-600" />
                                <span className="text-slate-600">{service.telephone}</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-blue-600" />
                                <span className="text-slate-600">{service.bureau}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}