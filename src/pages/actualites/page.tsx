import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  Camera,
  TreePine,
  Trophy,
  User,
} from "lucide-react";

export default function ActualitesPage() {
  const actualites = [
    {
      id: 1,
      title: "Cérémonie de remise des diplômes 2024",
      description:
        "Plus de 300 étudiants ont reçu leur diplôme lors de la cérémonie annuelle de remise des diplômes.",
      image: "/images/graduation.jpg",
      date: "15 Décembre 2024",
      auteur: "Administration",
      categorie: "Événement",
      type: "graduation",
      contenu:
        "La cérémonie s'est déroulée dans l'amphithéâtre principal en présence des familles et du corps professoral.",
    },
    {
      id: 2,
      title: "Compétition sportive inter-facultés",
      description:
        "La Faculté des Sciences remporte le tournoi de football et se classe deuxième en basketball.",
      image: "/university-sports-competition-football-students.png",
      date: "8 Décembre 2024",
      auteur: "Bureau des Sports",
      categorie: "Sport",
      type: "sport",
      contenu:
        "Nos équipes ont brillé lors de la compétition annuelle qui s'est tenue sur le campus principal.",
    },
    {
      id: 3,
      title: "Programme de reboisement du campus",
      description:
        "Initiative écologique : plantation de 500 arbres endémiques dans les espaces verts du campus.",
      image: "/tree-planting-environmental-students-madagascar-ca.png",
      date: "1 Décembre 2024",
      auteur: "Club Environnement",
      categorie: "Environnement",
      type: "environment",
      contenu:
        "Cette action s'inscrit dans notre engagement pour la préservation de l'environnement malgache.",
    },
    {
      id: 4,
      title: "Sortie pédagogique - Parc National d'Andasibe",
      description:
        "Les étudiants en Sciences Naturelles découvrent la biodiversité unique de Madagascar.",
      image: "/madagascar-national-park-students-field-trip-biodi.png",
      date: "25 Novembre 2024",
      auteur: "Département Sciences Naturelles",
      categorie: "Pédagogie",
      type: "field-trip",
      contenu:
        "Une expérience enrichissante pour comprendre les écosystèmes forestiers malgaches.",
    },
    {
      id: 5,
      title: "Conférence sur l'Intelligence Artificielle",
      description:
        "Intervention du Dr. Rakoto sur les applications de l'IA dans le développement durable.",
      image: "/artificial-intelligence-conference-university-lect.png",
      date: "20 Novembre 2024",
      auteur: "Département Informatique",
      categorie: "Conférence",
      type: "conference",
      contenu:
        "Une conférence passionnante sur les enjeux de l'IA pour Madagascar.",
    },
    {
      id: 6,
      title: "Journée Portes Ouvertes 2024",
      description:
        "Découverte des formations et des laboratoires pour les futurs étudiants.",
      image: "/images/campus-courtyard.jpg",
      date: "15 Novembre 2024",
      auteur: "Service Communication",
      categorie: "Événement",
      type: "open-day",
      contenu:
        "Plus de 1000 visiteurs ont découvert notre faculté lors de cette journée spéciale.",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "sport":
        return Trophy;
      case "environment":
        return TreePine;
      case "graduation":
      case "field-trip":
      case "open-day":
        return Camera;
      default:
        return Calendar;
    }
  };

  const getCategoryColor = (categorie: string) => {
    switch (categorie) {
      case "Sport":
        return "bg-green-100 text-green-800";
      case "Environnement":
        return "bg-emerald-100 text-emerald-800";
      case "Événement":
        return "bg-blue-100 text-blue-800";
      case "Pédagogie":
        return "bg-purple-100 text-purple-800";
      case "Conférence":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Actualités
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Suivez la vie de notre faculté : événements, réussites sportives,
              initiatives environnementales et sorties pédagogiques.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8">À la une</h2>
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <img
                      src={actualites[0].image || "/placeholder.svg"}
                      alt={actualites[0].title}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge
                      className={getCategoryColor(actualites[0].categorie)}
                    >
                      {actualites[0].categorie}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {actualites[0].date}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    {actualites[0].title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {actualites[0].description}
                  </p>
                  <p className="text-sm mb-6">{actualites[0].contenu}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-1" />
                      {actualites[0].auteur}
                    </div>
                    <Button variant="outline" size="sm">
                      Lire la suite
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <h2 className="text-2xl font-bold mb-8">Toutes les actualités</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actualites.slice(1).map((actualite) => {
              const IconComponent = getIcon(actualite.type);
              return (
                <Card
                  key={actualite.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={actualite.image || "/placeholder.svg"}
                      alt={actualite.title}
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(actualite.categorie)}>
                        {actualite.categorie}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{actualite.date}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {actualite.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3 mb-4">
                      {actualite.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-1" />
                        {actualite.auteur}
                      </div>
                      <Button variant="ghost" size="sm">
                        <IconComponent className="h-4 w-4 mr-1" />
                        Lire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Restez informé</CardTitle>
              <CardDescription>
                Recevez les dernières actualités de la Faculté des Sciences
                directement dans votre boîte mail.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-2 border border-input rounded-md bg-background"
                />
                <Button>S'abonner</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
