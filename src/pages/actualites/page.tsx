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
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useActuality } from "@/hooks/use-actuality"
import { VideoPlayer } from "@/components/video-player";
import MediaCarousel from "@/components/media-carousel";

export default function ActualitesPage() {

  const {actualities} = useActuality();
  console.log("Data from api/actualite/actualities <<<< ", JSON.stringify(actualities, null, 2));

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

  if(actualities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-slate-600">Aucune actualité disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-muted">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 md:px-6 xl:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-balance tracking-tight">
              Actualités
            </h1>
            <p className="text-xl md:text-2xl  mb-12 text-pretty leading-relaxed">
              Suivez la vie de notre faculté : événements, réussites sportives,
              initiatives environnementales et sorties pédagogiques.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 -mt-12 relative">
         <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <div className="grid gap-3 mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">À la une</h2>
            {actualities.length >= 0 && actualities.map((a) => 
              <Card className="shadow-2xl border-0 bg-white rounded-none">
                
                <div className="md:flex grid">
                  <div className="md:w-1/2">
                    <div className={"flex h-full"}>
                      <MediaCarousel 
                        media={a.media ?? []} title={a.title} 
                        // autoPlayInterval={3000} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <Badge
                        className={`${getCategoryColor(
                          a.category
                        )} px-4 py-2`}
                      >
                        {a.category}
                      </Badge>
                      <div className="flex items-center text-sm text-slate-600 font-medium">
                        <Calendar className="h-4 w-4 mr-2" />
                        {a.createdAt.toString().split('T')[0]}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">
                      {a.title}
                    </h3>
                    <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                      {a.description}
                    </p>
                    <p className="text-slate-700 mb-8 leading-relaxed">
                      {a.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-slate-600 font-medium">
                        <User className="h-4 w-4 mr-2" />
                        {/* {a.auteur}  */}
                      </div> 
                      <Button
                        variant="default"
                        size="lg"
                        className="bg-primary/90 hover:bg-primary text-white px-6"
                      >
                        Lire la suite
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>)}
            </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">
            Toutes les actualités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualities.map((actualite) => {
              // const IconComponent = getIcon(actualite.type);
              return (
                <Card
                  key={actualite.id}
                  className="overflow-hidden rounded-none hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white"
                >
                  <Link to={`/actualites/${actualite.id}`}>
                    <div className="relative h-56 overflow-hidden">
                      
                      {actualite.media?.length === 0 ? 
                        (<img
                          src="/placeholder.svg"
                          alt={actualite.title}
                          className="w-full h-full object-cover"
                        />) : 
                     
                        <div className="grid grid-cols-2 w-full gap-2">
                          {actualite.media?.map((m) => 
                              m.type === "Image" ? <img
                                src={m.url || "/placeholder.svg"}
                                alt={actualite.title}
                                className="w-full h-full object-cover"
                              /> :   
                              <VideoPlayer 
                                src={"Kpop.mp4"}
                                poster={m.url}
                                className="w-[50%] h-[50%] relative z-50"
                              />
                              // <iframe
                              //   src='Kpop.mp4'
                              //   title=''
                              //   allow="encrypted-media"
                              //   className="flex w-full h-[100%]"
                              // />
                          )}
                          </div>
                      }

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`${getCategoryColor(
                            actualite.category
                          )} px-3 py-1`}
                        >
                          {actualite.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3 font-medium">
                        <Calendar className="h-4 w-4" />
                        <span>{actualite.beginedAt?.toString().split('T')[0]}</span>
                      </div>
                      <CardTitle className="text-xl line-clamp-2 text-slate-900 leading-tight">
                        {actualite.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="line-clamp-3 mb-6 text-slate-600 leading-relaxed">
                        {actualite.description}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-slate-600 font-medium">
                          <User className="h-4 w-4 mr-2" />
                          {/* {actualite.auteur} */}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary/90 hover:text-primary hover:bg-blue-50"
                        >
                          {/* <IconComponent className="h-4 w-4 mr-2" /> */}
                          Lire
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6 xl:px-8">
          <Card className="max-w-2xl mx-auto rounded-none text-center border-0 shadow-2xl bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl text-slate-900">
                Restez informés
              </CardTitle>
              <CardDescription className="text-lg text-slate-600 leading-relaxed">
                  Recevez les dernières actualités de la Faculté des Sciences directement dans votre boîte mail.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-4 border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:border-border focus:outline-none transition-colors"
                />
                <button className="bg-primary text-primary-foreground px-8 py-4 font-medium m-0 h-full rounded-none border-2 border-primary cursor-pointer">
                  S'abonner
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
