import math from "@/assets/mentions/entree.png";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function MentionsCarousel() {
  const departments = [
    {
      name: "Mathématiques et Informatique",
      students: "800+",
      color: "bg-primary",
      image: "/mathematiques.jpg",
    },
    {
      name: "MIT",
      students: "600+",
      color: "bg-secondary",
      image: "/images/informatique.jpg",
    },
    {
      name: "Physique",
      students: "400+",
      color: "bg-primary/80",
      image: "/images/physique.jpg",
    },
    {
      name: "Chimie",
      students: "350+",
      color: "bg-secondary/80",
      image: "/images/chimie.jpg",
    },
    {
      name: "Biologie",
      students: "500+",
      color: "bg-primary/90",
      image: "/images/biologie.jpg",
    },
    {
      name: "Géologie",
      students: "300+",
      color: "bg-secondary/90",
      image: "/images/geologie.jpg",
    },
    {
      name: "Astronomie",
      students: "150+",
      color: "bg-primary/70",
      image: "/images/astronomie.jpg",
    },
    {
      name: "Biotechnologie",
      students: "250+",
      color: "bg-secondary/70",
      image: "/images/biotechnologie.jpg",
    },
    {
      name: "Sciences de l'Environnement",
      students: "320+",
      color: "bg-primary/60",
      image: "/images/environnement.jpg",
    },
    {
      name: "Statistiques",
      students: "280+",
      color: "bg-secondary/60",
      image: "/images/statistiques.jpg",
    },
    {
      name: "Océanographie",
      students: "180+",
      color: "bg-primary/50",
      image: "/images/oceanographie.jpg",
    },
    {
      name: "Météorologie",
      students: "200+",
      color: "bg-secondary/50",
      image: "/images/meteorologie.jpg",
    },
    {
      name: "Géophysique",
      students: "160+",
      color: "bg-primary/40",
      image: "/images/geophysique.jpg",
    },
    {
      name: "Sciences des Matériaux",
      students: "220+",
      color: "bg-secondary/40",
      image: "/images/materiaux.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(departments.length / itemsPerSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 10000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-4">Nos Mentions</h2>
        <p className="text-xl text-foreground max-w-3xl mx-auto">
          Quatorze mention d'excellence couvrant l'ensemble des disciplines
          scientifiques
        </p>
      </div>

      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {departments.map((dept, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
      >
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/90 backdrop-blur-sm h-full overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative w-full h-48 mb-4">
              <img
                src={dept.image || "/placeholder.svg"}
                alt={`Département ${dept.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <CardTitle className="text-lg text-white leading-tight">
                  {dept.name}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary"
              >
                {dept.students} étudiants
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
              >
                En savoir plus
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div> */}
      <div className="relative">
        <div className="overflow-hidden pt-3 pb-6">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                  {departments
                    .slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    )
                    .map((dept, index) => (
                      <motion.div
                        key={slideIndex * itemsPerSlide + index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                      >
                        <Card className="border-0 p-0 pb-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/90 backdrop-blur-sm h-full overflow-hidden">
                          <CardHeader className="p-0">
                            <div className="relative w-full h-auto mb-4">
                              <img
                                src={math}
                                alt={`Département ${dept.name}`}
                                className="object-cover scale-110"
                              />
                              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /> */}
                              <div className="absolute bottom-4 left-4 right-4">
                                <CardTitle className="text-lg text-white leading-tight">
                                  {dept.name}
                                </CardTitle>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="secondary"
                                className="bg-primary/10 text-primary"
                              >
                                {dept.students} étudiants
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary hover:text-primary/80"
                              >
                                En savoir plus
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          className="absolute -left-4 top-1/2 -translate-y-1/2 backdrop-blur-sm border-primary/20 hover:bg-primary/10 rounded-lg cursor-pointer"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          size="icon"
          className="absolute -right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm border-primary/20 hover:bg-primary/10 rounded-lg cursor-pointer"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-primary" : "bg-primary/30"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default MentionsCarousel;
