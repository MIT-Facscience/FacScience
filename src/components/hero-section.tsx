import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

interface CampusImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  backgroundColor : string;
  buttonBorder : string;
  buttonText : string;
  buttonLinkForm : string;
  buttonLinkInfo : string;
  buttonIcon : JSX.Element | null;
}

export function HeroSection(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const campusImages: CampusImage[] = [
    {
      src: "/fs_facade_2.jpg",
      alt: "Campus principal de la Faculté des Sciences",
      title: "Campus Moderne",
      description: "Un environnement d'apprentissage exceptionnel",
      backgroundColor : "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
      buttonBorder : "",
      buttonText : "Découvrir nos formations",
      buttonLinkForm : "/formation",
      buttonLinkInfo : "/presentation",
      buttonIcon : null,
    },
    {
      src: "/fs_amphi.jpg",
      alt: "Environnement d'apprentissage",
      title: "Environnement d'apprentissage",
      description: "Ressources documentaires complètes",
      backgroundColor : "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
      buttonBorder : "",
      buttonText : "Découvrir nos formations",
      buttonLinkForm : "/formation",
      buttonLinkInfo : "/presentation",
      buttonIcon : null,
    },
    {
      src: "/mit.jpeg",
      alt: "INT",
      title: "Innovation et Technologies",
      description: "Inscrivez-vous au parcours INT de la mention Informatique et Technologies",
      backgroundColor : "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
      buttonBorder : "",
      buttonText : "Inscription INT",
      buttonLinkForm : "/admission/int-formulaire",
      buttonLinkInfo : "/admission/int-modalite",
      buttonIcon : <ArrowRight/>,
    },
  ];

  // Generate squares for animation
  const generateSquares = (): JSX.Element[] => {
    const squares: JSX.Element[] = [];
    const rows: number = 8;
    const cols: number = 12;
    
    for (let i = 0; i < rows * cols; i++) {
      squares.push(
        <div
          key={i}
          className={`square-transition absolute bg-gradient-to-br from-white/60 to-gray-100/60 opacity-0 ${
            isTransitioning ? 'animate-square' : ''
          }`}
          style={{
            left: `${(i % cols) * (100 / cols)}%`,
            top: `${Math.floor(i / cols) * (100 / rows)}%`,
            width: `${100 / cols}%`,
            height: `${100 / rows}%`,
            animationDelay: `${(i % cols) * 0.05 + Math.floor(i / cols) * 0.02}s`,
          }}
        />
      );
    }
    return squares;
  };

  const changeSlide = (newSlide: number): void => {
    if (newSlide === currentSlide || isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentSlide(newSlide);
    }, 600);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  useEffect(() => {
    const timer: NodeJS.Timeout = setInterval(() => {
      setIsTransitioning(true);
      
      // Changer l'image après que l'animation des carrés commence
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % campusImages.length);
      }, 600); // Changement au milieu de l'animation des carrés
      
      // Terminer la transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [campusImages.length]);

  const nextSlide = (): void => {
    const next: number = (currentSlide + 1) % campusImages.length;
    changeSlide(next);
  };

  const prevSlide = (): void => {
    const prev: number = (currentSlide - 1 + campusImages.length) % campusImages.length;
    changeSlide(prev);
  };

  return (
    <>
      <section className="relative h-[700px] overflow-hidden">
        <div className="relative h-full">
          {campusImages.map((image, index) =>  (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ${
                index === currentSlide 
                  ? "opacity-100 scale-100 pointer-events-auto" 
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 transition-opacity duration-500 ${
                isTransitioning 
                  ? "bg-gradient-to-r from-gray-900/70 via-purple-900/30 to-amber-900/20 opacity-100" 
                  : "bg-transparent opacity-0"
              }`} />
              
              {/* Content avec titre fixe et contenu dynamique */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-6">
                  {/* Titre principal fixe qui reste toujours visible - au premier plan */}
                  <h1 className="text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-white via-purple-100 to-amber-100 bg-clip-text text-transparent relative z-50"
                      style={{
                        color: 'white'
                      }}>
                    {(index == 2) ? "Inscription INT" : "Faculté des Sciences"}
                  </h1>
                  
                  {/* Contenu dynamique qui change avec les slides */}
                  <div className={`relative z-20 ${
                    index === currentSlide && !isTransitioning ? 'slide-in-left' : 'opacity-0'
                  }`}>
                    <h2 className="text-2xl mb-6 font-bold text-balance text-amber-100 relative z-20"
                        style={{
                          textShadow: '0 1px 3px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3)'
                        }}>
                      {image.title}
                    </h2>
                  </div>
                  
                  <div className={`relative z-20 ${
                    index === currentSlide && !isTransitioning ? 'slide-in-right' : 'opacity-0'
                  }`}>
                    <p className="text-xl mb-8 text-pretty text-gray-100 relative z-20"
                       style={{
                         textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)'
                       }}>
                      {image.description} - Université d'Antananarivo
                    </p>
                  </div>
                  
                  <div className={`flex items-center justify-center gap-x-6 relative z-20 ${
                    index === currentSlide && !isTransitioning ? 'slide-in-up' : 'opacity-0'
                  }`}>
                    <Button
                          asChild
                          size="lg"
                          className={`border-0 shadow-xl rounded-lg bg-gradient-to-r ${image.backgroundColor} transform hover:scale-105 transition-all duration-200`}
                        >
                          <Link to={image.buttonLinkForm}>
                            <span>{image.buttonText}</span>
                            {image.buttonIcon}
                          </Link>
                        </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      asChild
                      className="border-2 border-amber-300 rounded-lg text-amber-100 backdrop-blur-sm bg-white/10 hover:bg-white/20 transform hover:scale-105 transition-all duration-200"
                    >
                      <Link to={image.buttonLinkInfo}>En savoir plus</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Animated squares overlay - derrière le titre principal */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {generateSquares()}
          </div>

          {/* Enhanced slider controls */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm transform hover:scale-110"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm transform hover:scale-110"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Enhanced slider indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {campusImages.map((_, index: number) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                disabled={isTransitioning}
                className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentSlide 
                    ? "bg-amber-400 shadow-lg shadow-amber-400/50" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-amber-400 transition-all duration-100"
              style={{ 
                width: `${((Date.now() % 6000) / 6000) * 100}%`,
                animation: isTransitioning ? 'none' : 'progress 6s linear infinite'
              }}
            />
          </div>
        </div>
      </section>

      <style >{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </>
  );
}