import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PrimaryButton from "@/components/ui/PrimaryButton";
import {
  // getImageMention,
  // getRespo,
  getStatsById,
} from "@/dataTestFormation/mention";
import { motion } from "framer-motion";
import { Award, BookOpen, Clock, User, Users } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
// import getParoursById from "@/dataTestFormation/parcours";
import ErrorComp from "@/components/Home/error";
import Loader from "@/components/Home/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BACKEND_URL } from "@/lib/api";
import { useEffect, useState } from "react";
import Parcours from "./Parcour";

interface Mention {
  nomMention: string;
  responsable?: {nom: string; prenom: string};
  imagePath?: string;
  logoPath?: string;
}

interface Parcours {
  idParcours: number;
  nomParcours: string;
  niveaux: string[];
}

interface ParcoursProfessionnalisante {
  idParcours: number;
  nomParcours: string;
  nomParcoursProfessionnalisante: string;
  niveaux: string[];
}

export default function FormationItems() {
  const id = useSearchParams()[0].toString().split("=")[0];
  // const data = getRespo(id);
  const stats = getStatsById(id);
  // const image = getImageMention(id);
  const icon = [<Users />, <BookOpen />, <Clock />, <Award />];

  const [ mention, setMention ] = useState<Mention | null>();
  const [ parcours, setParcours ] = useState<Parcours[] | null>();
  const [ parcoursPro, setParcoursPro ] = useState<ParcoursProfessionnalisante[] | null>();
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchParcours = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/Mention/${id}/parcours`);
        if (!response.ok) throw new Error("Erreur réseau");
        const json = await response.json();
        console.log(json)
      
        setParcours(json.pn);
        setParcoursPro(json.pp);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/Mention/${id}`);
        if (!response.ok) throw new Error("Erreur réseau");
        const json = await response.json();
        console.log(json)
        setMention(json);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    const getData = async () => {
      await fetchData();
      await fetchParcours();
    }

    getData()
  }, [id]);

  if (loading) return <Loader/>;
  if (error) return <ErrorComp>{error}</ErrorComp>;
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">
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
                <div className="relative z-10 text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
                  <h1 className="text-2xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
                    {mention?.nomMention}
                    {/* {data?.name} */}
                  </h1>
                  <p className="text-sm sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                    Découvrez les parcours d’excellence dans la mention{" "}
                    {mention?.nomMention.toLowerCase()}
                    {/* {data?.name?.toLowerCase()} */}
                  </p>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5 shadow-lg"
            >
              <Card className="border-none rounded-none flex flex-col items-center">
                <CardHeader className="w-full flex flex-col gap-3 font-bold items-center text-slate-600">
                  <img src={mention?.imagePath}
                    onError={(e) => {
                      e.currentTarget.src = "/fac-science.jpg";
                    }}
                     alt="" className="w-30 md:w-40 h-auto" />
                  <h1 className="text-center">{mention?.nomMention}</h1>
                </CardHeader>
                <CardContent className="flex justify-center text-slate-500 font-medium">
                  <p className="text-center text-sm w-full lg:w-1/2">
                    La mention {mention?.nomMention} a pour objectif de former les étudiants, en leur offrant des compétences théoriques et pratiques adaptées aux exigences académiques et professionnelles.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
              {stats &&
                stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="text-center rounded-none border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="pt-6">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full">
                            {icon[index]}
                          </div>
                        </div>
                        <div className="text-lg lg:text-3xl font-bold text-black-800 mb-2">
                          {stat.value}
                        </div>
                        <div className="text-xs lg:text-sm text-black-600 font-medium">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>

            
            <Tabs defaultValue="normal">
              <TabsList className="w-full h-10 sm:h-12 mt-5 rounded-none">
                {parcours && parcours.length > 0 && (<TabsTrigger
                    value="normal"
                    className=" font-bold text-slate-600 text-sm sm:text-base cursor-pointer data-[state=active]:text-white data-[state=active]:bg-primary rounded-none"
                  >
                    <span className="hidden sm:flex">Académique</span>
                  </TabsTrigger>
                )}
                {parcoursPro && parcoursPro.length > 0 && (<TabsTrigger
                    value="professionalisante"
                    className=" font-bold text-slate-600 text-sm sm:text-base cursor-pointer data-[state=active]:text-white data-[state=active]:bg-primary rounded-none"
                  >
                    <span className="hidden sm:flex">Professionnalisante</span>
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="normal">
                {parcours && (
                  <Parcours
                    parcours={parcours}
                    idMention={id}
                  />
                )}
              </TabsContent>
              <TabsContent value="professionalisante">
                {parcoursPro && (
                  <Parcours
                    parcours={parcoursPro}
                    idMention={id}
                  />
                )}
              </TabsContent>
            </Tabs>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-none rounded-none container mx-auto shadow-lg flex items-center flex-col p-10 mt-5 transition-all duration-300 hover:-translate-y-1 ">
                <CardTitle className="flex flex-col items-center justify-center gap-3 text-xl font-semibold">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary text-white">
                    <User />
                  </div>
                  Responsable de la mention
                </CardTitle>
                <CardContent className="text-sm text-slate-600 font-medium flex flex-col items-center gap-4">
                  <span className="flex flex-col items-center md:flex-row md:gap-1">
                    <span className="font-bold">Chef mention : </span>{" "}
                    {mention?.responsable?.nom + " " + mention?.responsable?.prenom}
                  </span>
                  <p className="w-full lg:w-1/2 text-center font-normal">
                    Le chef de mention est responsable de la coordination
                    pédagogique et administrative de la mention, veillant à la
                    qualité de la formation, à l’encadrement des étudiants et à
                    la gestion des activités académiques en lien avec l’équipe
                    enseignante.
                  </p>
                  <Link to="/contact">
                    <PrimaryButton className="cursor-pointer">
                      Contactez
                    </PrimaryButton>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
