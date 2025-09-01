import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {Link} from "react-router-dom"
import { ChevronLeft,ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

   const campusImages = [
    {
      src: "/devant-fac-science.png",
      alt: "Campus principal de la Faculté des Sciences",
      title: "Campus Moderne",
      description: "Un environnement d'apprentissage exceptionnel",
    },
    {
      src: "/chalet.png",
      alt: "Environnement d'apprentissage",
      title: "Environnement d'apprentissage",
      description: "Ressources documentaires complètes",
    },
    {
      src: "/entree.png",
      alt: "Environnement acceuillante",
      title: "Environnement acceuillante",
      description: "Technologies de pointe pour la recherche",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campusImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [campusImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % campusImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + campusImages.length) % campusImages.length)
  }

  return (
     <section className="relative h-[600px] overflow-hidden">
        <div className="relative h-full">
          {campusImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-6">
                  <h1 className="text-5xl font-bold mb-4 text-balance">Faculté des Sciences</h1>
                  <h2 className="text-2xl mb-6 text-balance">{image.title}</h2>
                  <p className="text-lg mb-8 text-pretty">{image.description} - Université d'Antananarivo</p>
                  <div className="flex items-center justify-center gap-x-6">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/formation">Découvrir nos formations</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="border-white text-white hover:bg-white hover:text-black bg-transparent"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
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
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

  )
}
