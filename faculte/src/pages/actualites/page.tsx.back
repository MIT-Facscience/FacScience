import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Calendar, MapPin, Users, Award, Megaphone, Search, Filter } from "lucide-react"
import { Link } from "react-router-dom";
// import { Navigation } from "../components/navigation"
// import { Footer } from "../components/footer"

export default function ActualitesPage() {
  const actualites = [
    {
      titre: "Salon des Étudiants à Ankatso - Participation de la Faculté des Sciences",
      date: "2025-09-11",
      dateFin: "2025-09-12",
      type: "Événement",
      categorie: "Orientation",
      lieu: "Ankatso, Antananarivo",
      description:
        "La Faculté des Sciences participera au grand Salon des Étudiants qui se déroulera à Ankatso les 11 et 12 septembre 2025. Venez découvrir nos formations, rencontrer nos enseignants et étudiants, et obtenir toutes les informations sur les opportunités d'études scientifiques.",
      image: "/salon--tudiant-universit--stand.png",
      urgent: true,
    },
    {
      titre: "Cérémonie de Remise des Diplômes 2025",
      date: "2025-07-15",
      type: "Cérémonie",
      categorie: "Diplômes",
      lieu: "Amphithéâtre Principal",
      description:
        "La cérémonie de remise des diplômes de la promotion 2025 s'est déroulée avec succès. 180 nouveaux diplômés ont reçu leur parchemin en présence de leurs familles et du corps professoral.",
      image: "/c-r-monie-remise-dipl-mes-universit-.png",
      urgent: false,
    },
    {
      titre: "Nouveau Laboratoire de Biotechnologie Inauguré",
      date: "2025-06-20",
      type: "Inauguration",
      categorie: "Infrastructure",
      lieu: "Bâtiment D",
      description:
        "Le nouveau laboratoire de biotechnologie, équipé des dernières technologies, a été officiellement inauguré. Cet investissement de 200 millions d'Ariary permettra de renforcer la recherche en sciences du vivant.",
      image: "/laboratoire-biotechnologie-moderne--quipements.png",
      urgent: false,
    },
    {
      titre: "Conférence Internationale sur les Changements Climatiques",
      date: "2025-05-10",
      dateFin: "2025-05-12",
      type: "Conférence",
      categorie: "Recherche",
      lieu: "Campus Universitaire",
      description:
        "La faculté a organisé une conférence internationale sur l'impact des changements climatiques à Madagascar, réunissant des experts de 15 pays. Plus de 200 participants ont assisté aux présentations.",
      image: "/conf-rence-internationale-changements-climatiques.png",
      urgent: false,
    },
    {
      titre: "Journée Portes Ouvertes 2025",
      date: "2025-04-15",
      type: "Événement",
      categorie: "Orientation",
      lieu: "Tous les départements",
      description:
        "Plus de 500 lycéens et leurs parents ont visité la faculté lors de la journée portes ouvertes. Ils ont pu découvrir les laboratoires, assister à des démonstrations et rencontrer les équipes pédagogiques.",
      image: "/journ-e-portes-ouvertes-universit---tudiants.png",
      urgent: false,
    },
    {
      titre: "Prix d'Excellence en Recherche pour le Prof. RAKOTO",
      date: "2025-03-25",
      type: "Distinction",
      categorie: "Recherche",
      lieu: "Ministère de l'Enseignement Supérieur",
      description:
        "Le Professeur Jean Claude RAKOTO a reçu le Prix National d'Excellence en Recherche Mathématique pour ses travaux sur la modélisation des écosystèmes malgaches.",
      image: "/prix-excellence-recherche-professeur-universit-.png",
      urgent: false,
    },
    {
      titre: "Lancement du Programme d'Échange avec l'Université de La Réunion",
      date: "2025-02-10",
      type: "Partenariat",
      categorie: "International",
      lieu: "Salle de Conférence",
      description:
        "Signature d'un accord de coopération permettant aux étudiants de Master de effectuer un semestre d'études à l'Université de La Réunion. 10 places sont disponibles pour la première promotion.",
      image: "/signature-accord-universit--partenariat-internatio.png",
      urgent: false,
    },
    {
      titre: "Création de l'Association des Étudiants en Sciences (AES)",
      date: "2025-01-20",
      type: "Vie étudiante",
      categorie: "Association",
      lieu: "Campus",
      description:
        "Les étudiants ont créé une nouvelle association pour organiser des activités scientifiques, culturelles et sportives. L'AES compte déjà 150 membres actifs.",
      image: "/association--tudiants-universit--sciences.png",
      urgent: false,
    },
  ]

  const evenements_a_venir = [
    {
      titre: "Séminaire sur l'Intelligence Artificielle",
      date: "2025-10-15",
      heure: "14h00",
      lieu: "Amphithéâtre A",
      intervenant: "Dr. MARTIN Paul (Université de Lyon)",
    },
    {
      titre: "Soutenance de Thèse - Nanomatériaux",
      date: "2025-10-20",
      heure: "09h00",
      lieu: "Salle de Conférence",
      intervenant: "RASOAMANANA Miora",
    },
    {
      titre: "Colloque National de Chimie",
      date: "2025-11-05",
      dateFin: "2025-11-07",
      lieu: "Campus Universitaire",
      intervenant: "Organisé par le Département de Chimie",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}
      {/* <main className="py-16"> */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Actualités</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Suivez toute l'actualité de la Faculté des Sciences : événements, recherches, distinctions et vie étudiante.
              </p>
            </div>

            {/* Événement urgent */}
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-red-600" />
                  <Badge variant="destructive">URGENT</Badge>
                  <CardTitle className="text-red-800">Salon des Étudiants à Ankatso</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-red-700 mb-4">
                      La Faculté des Sciences participera au grand Salon des Étudiants à Ankatso les 11 et 12 septembre
                      2025. Venez nous rencontrer !
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-600" />
                        <span>11-12 Septembre 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-600" />
                        <span>Ankatso, Antananarivo</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button className="bg-red-600 hover:bg-red-700">Plus d'informations</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filtres */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtrer les actualités
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input placeholder="Rechercher..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="evenement">Événement</SelectItem>
                      <SelectItem value="ceremonie">Cérémonie</SelectItem>
                      <SelectItem value="conference">Conférence</SelectItem>
                      <SelectItem value="distinction">Distinction</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recherche">Recherche</SelectItem>
                      <SelectItem value="formation">Formation</SelectItem>
                      <SelectItem value="vie-etudiante">Vie étudiante</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Année" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Actualités principales */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Dernières Actualités</h2>
                <div className="space-y-6">
                  {actualites.map((actu, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <div className="grid md:grid-cols-3 gap-0">
                        <div className="md:col-span-1">
                          <img
                            src={actu.image || "/placeholder.svg"}
                            alt={actu.titre}
                            className="w-full h-48 md:h-full object-cover rounded-l-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg text-slate-800 mb-2">{actu.titre}</CardTitle>
                                <CardDescription className="flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(actu.date).toLocaleDateString("fr-FR")}
                                    {actu.dateFin && ` - ${new Date(actu.dateFin).toLocaleDateString("fr-FR")}`}
                                  </span>
                                  {actu.lieu && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {actu.lieu}
                                    </span>
                                  )}
                                </CardDescription>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="outline">{actu.type}</Badge>
                                <Badge variant="secondary">{actu.categorie}</Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">{actu.description}</p>
                            <Button size="sm" variant="outline">
                              Lire la suite
                            </Button>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Événements à venir */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Événements à Venir
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {evenements_a_venir.map((event, index) => (
                      <div key={index} className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-semibold text-slate-800 text-sm">{event.titre}</h4>
                        <div className="text-xs text-slate-600 space-y-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(event.date).toLocaleDateString("fr-FR")}
                            {event.dateFin && ` - ${new Date(event.dateFin).toLocaleDateString("fr-FR")}`}
                          </div>
                          {event.heure && (
                            <div className="flex items-center gap-1">
                              <span>🕐</span>
                              {event.heure}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.lieu}
                          </div>
                          <div className="text-slate-500">{event.intervenant}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Statistiques */}
                {/* <Card>
                  <CardHeader>
                    <CardTitle>En Chiffres</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Actualités 2025</span>
                      <span className="font-bold text-blue-600">45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Événements organisés</span>
                      <span className="font-bold text-green-600">28</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Distinctions reçues</span>
                      <span className="font-bold text-purple-600">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Partenariats signés</span>
                      <span className="font-bold text-red-600">8</span>
                    </div>
                  </CardContent>
                </Card> */}

                {/* Liens rapides */}
                <Card>
                  <CardHeader>
                    <CardTitle>Liens Rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                      <Link to="/formation">
                        <Users className="h-4 w-4 mr-2" />
                        Formations
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                      <Link to="/recherche">
                        <Award className="h-4 w-4 mr-2" />
                        Recherche
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                      <Link to="/resultats">
                        <Calendar className="h-4 w-4 mr-2" />
                        Résultats
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      {/* </main> */}
      
      {/* <Footer /> */}
    </div>
      
  )
}
