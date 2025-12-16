import { useCallback, useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import Button from '../Button';
import './HomeBanner.css';

const HomeBanner = ({ slides }) => {
  const [cur, setCur] = useState(0);
  const [direction, setDirection] = useState('next');

  const len = slides.length;

  const rightHandle = useCallback(() => {
    setDirection('next');
    setCur(cur + 1 > len - 1 ? 0 : cur + 1);
  }, [cur, len]);

  const handleDotClick = (index) => {
    setDirection(index > cur ? 'next' : 'prev');
    setCur(index);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      rightHandle();
    }, 5000);
    return () => clearTimeout(interval);
  }, [rightHandle]);

  return (
    <div className="carousel-container relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] w-full overflow-hidden">
      {/* Google Fonts Import */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');`}
      </style>

      {slides.map((slide, index) => {
        const isActive = cur === index;
        const isPrev = (cur - 1 + len) % len === index;
        const isNext = (cur + 1) % len === index;

        return (
          <div
            key={index}
            className={`carousel-slide absolute inset-0 w-full transition-all duration-700 ease-in-out ${
              isActive
                ? 'carousel-slide-active opacity-100 z-10'
                : isPrev || isNext
                ? 'opacity-0 z-0'
                : 'opacity-0 z-0'
            } ${
              isActive && direction === 'next'
                ? 'animate-slideInRight'
                : isActive && direction === 'prev'
                ? 'animate-slideInLeft'
                : ''
            }`}
          >
            {slide.textData ? (
              <div className="grid min-h-[400px] md:min-h-[500px] w-full items-center justify-center gap-10 px-8 py-16">
                <h5
                  className={`m-auto text-sm font-semibold tracking-[0.3em] uppercase text-gray-600 ${
                    isActive ? 'animate-fadeInUp animation-delay-200' : ''
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  TESTIMONIAL
                </h5>
                <p
                  className={`m-auto max-w-3xl items-center text-center text-2xl md:text-3xl leading-relaxed ${
                    isActive ? 'animate-fadeInUp animation-delay-400' : ''
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  <strong className="text-gray-800">{slide.textData}</strong>
                </p>

                <div
                  className={`flex items-center justify-center gap-4 mt-8 ${
                    isActive ? 'animate-fadeInUp animation-delay-600' : ''
                  }`}
                >
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className="group relative p-2 transition-all duration-300"
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      <div
                        className={`rounded-full transition-all duration-500 ${
                          cur === idx
                            ? 'w-10 h-3 bg-gradient-to-r from-blue-600 to-purple-600'
                            : 'w-3 h-3 bg-gray-400 group-hover:bg-gray-600 group-hover:scale-125'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative flex h-full w-full select-none items-center justify-center">
                {/* Image with fade transition */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={slide.img}
                    alt={slide.text || 'Carousel image'}
                    className={`h-full w-full object-cover transition-all duration-1000 ${
                      isActive ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
                    }`}
                  />
                  {/* Gradient overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                </div>

                {/* Animated text content */}
                <div className="absolute left-8 md:left-16 lg:left-24 flex flex-col items-start gap-y-4 text-white max-w-2xl z-20 px-4">
                  <h2
                    className={`text-sm md:text-base lg:text-lg font-semibold tracking-[0.2em] uppercase ${
                      isActive ? 'animate-slideInLeft animation-delay-200' : 'opacity-0'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {slide.Category}
                  </h2>
                  <h1
                    className={`text-3xl md:text-5xl lg:text-7xl font-black leading-tight drop-shadow-2xl ${
                      isActive ? 'animate-slideInLeft animation-delay-400' : 'opacity-0'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {slide.text}
                  </h1>
                  <div
                    className={`${
                      isActive ? 'animate-fadeInUp animation-delay-600' : 'opacity-0'
                    }`}
                  >
                    <Button
                      textColer="text-black"
                      title="SHOP NOW"
                      className="mt-4 rounded-lg bg-white px-6 py-3 md:px-8 md:py-4 font-bold text-sm md:text-base transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:shadow-2xl hover:scale-105 transform"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Enhanced navigation dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className="group relative p-2 transition-all duration-300"
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      <div
                        className={`rounded-full transition-all duration-500 ${
                          cur === idx
                            ? 'w-12 h-3 bg-white shadow-lg shadow-white/50'
                            : 'w-3 h-3 bg-white/50 group-hover:bg-white group-hover:scale-150'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HomeBanner;
