import { Button } from "@/components/ui/button"
<<<<<<< HEAD
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, Calendar, Users, Clock, MapPin, Bell } from "lucide-react"
=======
import { Card } from "@/components/ui/card"
import {Link} from "react-router-dom"
import { ChevronLeft,ChevronRight } from "lucide-react"
>>>>>>> 18e18514e9e6baf27a38898fd6a8913befe38454
import { useState, useEffect } from "react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

<<<<<<< HEAD
  const campusImages = [
=======
   const campusImages = [
>>>>>>> 18e18514e9e6baf27a38898fd6a8913befe38454
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
<<<<<<< HEAD
      src: "/science-pierre.png",
      alt: "Environnement accueillant",
      title: "Environnement accueillant",
=======
      src: "/entree.png",
      alt: "Environnement acceuillante",
      title: "Environnement acceuillante",
>>>>>>> 18e18514e9e6baf27a38898fd6a8913befe38454
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
<<<<<<< HEAD
    <>
      <section className="relative h-[600px] overflow-hidden">
=======
     <section className="relative h-[600px] overflow-hidden">
>>>>>>> 18e18514e9e6baf27a38898fd6a8913befe38454
        <div className="relative h-full">
          {campusImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
<<<<<<< HEAD
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 " />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-6">
                  <h1 className="text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
                    Faculté des Sciences
                  </h1>
                  <h2 className="text-2xl mb-6 text-balance text-amber-100">{image.title}</h2>
                  <p className="text-lg mb-8 text-pretty text-purple-100">{image.description} - Université d'Antananarivo</p>
                  <div className="flex items-center justify-center gap-x-6">
                    <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 border-0 shadow-lg">
=======
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-6">
                  <h1 className="text-5xl font-bold mb-4 text-balance">Faculté des Sciences</h1>
                  <h2 className="text-2xl mb-6 text-balance">{image.title}</h2>
                  <p className="text-lg mb-8 text-pretty">{image.description} - Université d'Antananarivo</p>
                  <div className="flex items-center justify-center gap-x-6">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
>>>>>>> 18e18514e9e6baf27a38898fd6a8913befe38454
                      <Link to="/formation">Découvrir nos formations</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
<<<<<<< HEAD
                      className="border-2 border-amber-300 text-amber-100 hover:bg-amber-300 hover:text-purple-900 bg-transparent backdrop-blur-sm"
=======
                      className="border-white text-white hover:bg-white hover:text-black bg-transparent"
>>>>>>> 18e18514e9e6baf27a38898fd6a8913befe38454
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
<<<<<<< HEAD
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
=======
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
>>>>>>> 18e18514e9e6baf27a38898fd6a8913befe38454
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
<<<<<<< HEAD
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
=======
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
>>>>>>> 18e18514e9e6baf27a38898fd6a8913befe38454
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
<<<<<<< HEAD
                  index === currentSlide ? "bg-amber-300" : "bg-white/50"
=======
                  index === currentSlide ? "bg-white" : "bg-white/50"
>>>>>>> 18e18514e9e6baf27a38898fd6a8913befe38454
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
<<<<<<< HEAD
    </>
  )
}

=======

  )
}
>>>>>>> 18e18514e9e6baf27a38898fd6a8913befe38454
