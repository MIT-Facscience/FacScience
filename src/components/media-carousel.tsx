import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoPlayer } from "@/components/video-player";

export function MediaCarousel({
  media,
  title,
  autoPlayInterval = 5000,
}: {
  media: { type: string; url?: string }[];
  title?: string;
  autoPlayInterval?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Défilement automatique
  useEffect(() => {
    if (!media || media.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [media, isHovered, autoPlayInterval]);

  if (!media || media.length === 0) {
    return (
      <img
        src="/placeholder.svg"
        alt={title}
        className="w-full h-full object-cover"
      />
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (media.length === 1) {
    const m = media[0];
    return m.type === "Image" ? (
      <div className='flex justify-center w-full h-full'>
        <img
          src={m.url || "/placeholder.svg"}
          alt={title}
          className="h-full object-cover"
        />
      </div>
    ) : (
      <div className='flex relative justify-center w-full h-full'>
        <VideoPlayer 
          src={"Kpop.mp4"}
          poster={m.url}
          className="w-[90%] h-full"
        />
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Média actuel */}
      <div className="relative w-full h-full overflow-hidden">
        {media.map((m, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 translate-x-0 z-10'
                : index < currentIndex
                ? 'opacity-0 -translate-x-full z-0'
                : 'opacity-0 translate-x-full z-0'
            }`}
          >
            {m.type === "Image" ? (
              <div className='flex justify-center w-full h-full'>
                <img
                  src={m.url || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className='flex justify-center items-center w-full h-full relative z-30'>
                <VideoPlayer 
                  src={"Kpop.mp4"}
                  poster={m.url}
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Gradient overlay - sous la vidéo mais au-dessus de l'image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-20"></div>

      {/* Boutons de navigation - visibles au survol */}
      {media.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-50"
            aria-label="Précédent"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 z-50"
            aria-label="Suivant"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicateurs */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-50">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Aller à la diapositive ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Compteur - visible au survol si plusieurs médias */}
      {media.length > 1 && (
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          {currentIndex + 1} / {media.length}
        </div>
      )}
    </div>
  );
}

export default MediaCarousel;