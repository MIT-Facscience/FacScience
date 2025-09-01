import { HeroSection } from "../components/hero-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { BookOpen, Microscope, Users, Award, Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Sections principales */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Découvrez notre Faculté</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une institution d'excellence dédiée à la formation scientifique et à la recherche innovante
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Formations d'Excellence</CardTitle>
                <CardDescription>8 départements et filières couvrant tous les domaines scientifiques</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link to="/formation">Découvrir nos formations</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Microscope className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Recherche Innovante</CardTitle>
                <CardDescription>
                  Laboratoires de pointe et projets de recherche d'envergure internationale
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link to="/recherche">Explorer la recherche</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Communauté Dynamique</CardTitle>
                <CardDescription>Plus de 3000 étudiants et 200 enseignants-chercheurs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link to="/presentation">En savoir plus</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Actualités récentes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Actualités</h2>
            <Button asChild variant="outline">
              <Link to="/actualites">Voir toutes les actualités</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>11-12 Septembre 2025</span>
                </div>
                <CardTitle className="text-lg">Salon des Étudiants à Ankatso</CardTitle>
                <CardDescription>
                  La Faculté des Sciences participera au salon des étudiants organisé à Ankatso
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Award className="h-4 w-4" />
                  <span>Septembre 2025</span>
                </div>
                <CardTitle className="text-lg">Nouvelles Formations</CardTitle>
                <CardDescription>Lancement des parcours professionnalisants IGCRR et IPSS</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Campus</span>
                </div>
                <CardTitle className="text-lg">Journée Portes Ouvertes</CardTitle>
                <CardDescription>Découvrez nos laboratoires et rencontrez nos équipes pédagogiques</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}