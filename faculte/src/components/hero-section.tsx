import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const campusImages = [
    {
      src: "/1.jpg",
      alt: "Campus principal de la Faculté des Sciences",
      title: "Campus Moderne",
      description: "Un environnement d'apprentissage exceptionnel",
    },
    {
      src: "/2.jpg",
      alt: "Environnement d'apprentissage",
      title: "Environnement d'apprentissage",
      description: "Ressources documentaires complètes",
    },
    {
      src: "/3.jpg",
      alt: "Environnement accueillant",
      title: "Environnement accueillant",
      description: "Technologies de pointe pour la recherche",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campusImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [campusImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % campusImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + campusImages.length) % campusImages.length
    );
  };

  return (
    <>
      <section className="relative h-[700px] overflow-hidden">
        <div className="relative h-full">
          {campusImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 " />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-6">
                  <h1 className="text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                    Faculté des Sciences
                  </h1>
                  <h2 className="text-2xl mb-6 font-bold text-balance text-amber-100">
                    {image.title}
                  </h2>
                  <p className="text-xl mb-8 text-pretty text-gray-100">
                    {image.description} - Université d'Antananarivo
                  </p>
                  <div className="flex items-center justify-center gap-x-6">
                    <Button
                      asChild
                      size="lg"
                      className="border-0 shadow-lg rounded-none"
                    >
                      <Link to="/formation">Découvrir nos formations</Link>
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      asChild
                      className="border-2 rounded-none text-amber-100 backdrop-blur-sm"
                    >
                      <Link to="/presentation">En savoir plus</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slider controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-none transition-colors backdrop-blur-sm"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-none transition-colors backdrop-blur-sm"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slider indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {campusImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-amber-300" : "bg-white/50"
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
