import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface CarouselProps {
  images: string[];
  altPrefix?: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, altPrefix = "Image" }) => {
  const [current, setCurrent] = React.useState(0);
  const startX = React.useRef<number | null>(null);
  const moved = React.useRef(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  // Keyboard navigation
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    moved.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    if (Math.abs(dx) > 10) moved.current = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX.current;
    startX.current = null;
    const threshold = 50; // px
    if (Math.abs(dx) > threshold) {
      if (dx > 0) prev();
      else next();
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="w-full h-[40vh] md:h-[60vh] lg:h-[70vh] overflow-hidden rounded-xl shadow-2xl flex items-center justify-center bg-black"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`${altPrefix} ${idx + 1}`}
            // prioritize preserving full image height and quality
            className={`max-w-full max-h-full transition-opacity duration-500 ease-in-out object-contain ${
              idx === current
                ? "opacity-100 z-10"
                : "opacity-0 pointer-events-none absolute inset-0 m-auto"
            }`}
            loading={idx === current ? "eager" : "lazy"}
            // keep high-quality rendering
            style={{ imageRendering: "auto" }}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-1 md:left-10 top-1/2 transform -translate-y-1/2 p-3 bg-white/25 text-white rounded-full transition-all z-10"
        aria-label="Previous image"
      >
        <ArrowLeft />
      </button>
      <button
        onClick={next}
        className="absolute right-1 md:right-10 top-1/2 transform -translate-y-1/2 p-3 bg-white/25 text-white rounded-full transition-all z-10"
        aria-label="Next image"
      >
        <ArrowRight />
      </button>

      {/* Indicators */}
      <div className="hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "w-5" : "bg-gray-400 bg-opacity-70"
            }`}
            style={
              index === current
                ? { backgroundColor: "var(--accent-500)" }
                : undefined
            }
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
