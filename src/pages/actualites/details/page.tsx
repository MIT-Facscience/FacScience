import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Données des actualités (en production, ceci viendrait d'une base de données)
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
    contenu: `La cérémonie s'est déroulée dans l'amphithéâtre principal en présence des familles et du corps professoral.

Cette année, nous avons eu l'honneur de diplômer plus de 300 étudiants issus de différentes filières : Sciences Naturelles, Informatique, Mathématiques et Physique. La cérémonie a été marquée par les discours inspirants du Doyen de la Faculté et du major de promotion.

Les familles étaient nombreuses à assister à cet événement exceptionnel, témoignant de l'importance de ce moment dans la vie académique de nos étudiants. La remise des diplômes s'est déroulée dans une atmosphère solennelle et festive.

Nous félicitons chaleureusement tous nos nouveaux diplômés et leur souhaitons une brillante carrière professionnelle. Ils sont désormais ambassadeurs de notre faculté et nous sommes fiers de leur réussite.`,
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
    contenu: `Nos équipes ont brillé lors de la compétition annuelle qui s'est tenue sur le campus principal.

La compétition inter-facultés 2024 a été un véritable succès pour notre Faculté des Sciences. Nos étudiants-athlètes ont démontré leur excellence tant sur le terrain qu'en salle de classe.

L'équipe de football, menée par le capitaine Rakoto Jean, a remporté le tournoi après une finale palpitante contre la Faculté de Médecine (2-1). Cette victoire couronne une saison exceptionnelle marquée par un jeu collectif remarquable.

En basketball, notre équipe s'est hissée en finale mais s'est inclinée de justesse face à la Faculté de Droit (78-82). Malgré cette défaite, nos joueurs ont montré un niveau de jeu impressionnant tout au long du tournoi.

Ces résultats témoignent de l'engagement de nos étudiants dans la pratique sportive et de l'excellence de notre programme sport-études.`,
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
    contenu: `Cette action s'inscrit dans notre engagement pour la préservation de l'environnement malgache.

Le Club Environnement de la Faculté des Sciences a organisé une grande journée de reboisement sur le campus. Plus de 200 étudiants volontaires ont participé à cette initiative écologique d'envergure.

Les 500 arbres plantés sont tous des espèces endémiques de Madagascar : tamarins, palissandres, ébènes et autres essences précieuses. Cette sélection a été faite en collaboration avec le Département de Botanique pour garantir l'adaptation des espèces au climat local.

L'objectif de ce programme est double : contribuer à la lutte contre le changement climatique et sensibiliser notre communauté universitaire aux enjeux environnementaux. Chaque arbre planté représente un engagement pour les générations futures.

Cette initiative s'inscrit dans le cadre du plan de développement durable de l'université et sera suivie d'autres actions écologiques tout au long de l'année académique.`,
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
    contenu: `Une expérience enrichissante pour comprendre les écosystèmes forestiers malgaches.

La sortie pédagogique au Parc National d'Andasibe-Mantadia a été une expérience inoubliable pour nos 45 étudiants de troisième année en Sciences Naturelles. Accompagnés de leurs professeurs et de guides locaux expérimentés, ils ont pu observer la faune et la flore exceptionnelles de cette réserve.

Au programme : observation des lémuriens indri-indri, étude de la canopée forestière, identification des espèces végétales endémiques et analyse des écosystèmes aquatiques. Les étudiants ont également participé à des ateliers pratiques de collecte et d'analyse d'échantillons.

Cette sortie s'inscrit dans le cadre du cours "Écologie tropicale" et permet aux étudiants d'appliquer concrètement les connaissances théoriques acquises en amphithéâtre. L'immersion dans cet environnement naturel exceptionnel renforce leur compréhension des enjeux de conservation.

Les étudiants devront maintenant rédiger un rapport d'observation qui sera évalué dans le cadre de leur cursus. Cette expérience terrain est essentielle pour former les futurs biologistes et écologues malgaches.`,
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
    contenu: `Une conférence passionnante sur les enjeux de l'IA pour Madagascar.

Le Dr. Hery Rakoto, expert international en Intelligence Artificielle et ancien diplômé de notre faculté, a donné une conférence remarquable sur les applications de l'IA dans le développement durable. Plus de 300 personnes ont assisté à cet événement dans l'amphithéâtre principal.

La conférence a abordé plusieurs thématiques cruciales : l'utilisation de l'IA pour l'agriculture de précision à Madagascar, les applications dans la gestion des ressources naturelles, et les opportunités de développement technologique pour notre pays.

Le Dr. Rakoto a présenté des cas concrets d'utilisation de l'IA dans l'agriculture malgache, notamment pour l'optimisation des rendements de riz et la prédiction des conditions climatiques. Il a également évoqué les défis éthiques et sociaux liés au déploiement de ces technologies.

Cette conférence s'inscrit dans le cycle "Sciences et Société" organisé par le Département Informatique. Elle a été suivie d'une session de questions-réponses très interactive avec les étudiants et les enseignants-chercheurs.`,
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
    contenu: `Plus de 1000 visiteurs ont découvert notre faculté lors de cette journée spéciale.

La Journée Portes Ouvertes 2024 a été un franc succès avec plus de 1000 visiteurs, principalement des lycéens et leurs familles. Cet événement annuel permet de faire découvrir l'excellence de nos formations et la richesse de notre vie étudiante.

Les visiteurs ont pu explorer nos laboratoires de recherche, assister à des démonstrations scientifiques et rencontrer nos enseignants-chercheurs. Des stands d'information étaient installés pour chaque département : Sciences Naturelles, Informatique, Mathématiques et Physique.

Les étudiants ambassadeurs ont joué un rôle clé en partageant leur expérience et en guidant les visiteurs à travers le campus. Leurs témoignages authentiques ont permis aux futurs étudiants de mieux comprendre la réalité de la vie universitaire.

Cette journée a également été l'occasion de présenter nos partenariats internationaux, nos programmes d'échange et les débouchés professionnels de nos formations. L'objectif est d'attirer les meilleurs talents pour renforcer l'excellence de notre faculté.`,
  },
];

const getCategoryColor = (categorie: string) => {
  switch (categorie) {
    case "Sport":
      return "bg-emerald-500 text-white font-medium";
    case "Environnement":
      return "bg-green-600 text-white font-medium";
    case "Événement":
      return "bg-blue-600 text-white font-medium";
    case "Pédagogie":
      return "bg-purple-600 text-white font-medium";
    case "Conférence":
      return "bg-orange-600 text-white font-medium";
    default:
      return "bg-slate-600 text-white font-medium";
  }
};

export default function ActualiteDetail() {
  const { id } = useParams<{ id: string }>();
  const actualite = actualites.find(
    (item) => item.id === Number.parseInt(id ?? "")
  );

  if (!actualite) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section avec image */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={actualite.image || "/placeholder.svg"}
          alt={actualite.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6 xl:px-8">
            <Link to="/actualites">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux actualités
              </Button>
            </Link>
            <Badge
              className={`${getCategoryColor(
                actualite.categorie
              )} px-4 py-2 mb-4`}
            >
              {actualite.categorie}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              {actualite.title}
            </h1>
            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {actualite.date}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {actualite.auteur}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu de l'article */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-8">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {actualite.description}
                  </p>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  {actualite.contenu.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-slate-700 leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Articles similaires */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8 text-slate-900">
                Articles similaires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {actualites
                  .filter(
                    (item) =>
                      item.categorie === actualite.categorie &&
                      item.id !== actualite.id
                  )
                  .slice(0, 2)
                  .map((item) => (
                    <Link key={item.id} to={`/actualites/${item.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white">
                        <div className="relative h-48">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <Badge
                              className={`${getCategoryColor(
                                item.categorie
                              )} px-3 py-1`}
                            >
                              {item.categorie}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg line-clamp-2 text-slate-900">
                            {item.title}
                          </CardTitle>
                          <div className="flex items-center text-sm text-slate-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {item.date}
                          </div>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
