'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background-secondary overflow-hidden">
      {/* Background placeholder - same aspect ratio as hero images */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-background-secondary to-accent-50 opacity-50" />
      
      {/* Content */}
      <div className="container-custom relative z-10 py-32">
        <div className="max-w-5xl">
          <h1
            className={`text-display-lg lg:text-display-xl font-serif text-text-primary transition-all duration-slower ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="block">80 years of designing homes</span>
            <span className="block mt-4">with a story to tell</span>
          </h1>
        </div>
      </div>

      {/* Scroll Down Affordance */}
      <button
        onClick={scrollDown}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 group"
        aria-label="Scroll down"
      >
        <span className="text-label text-text-muted uppercase tracking-wider">Scroll Down</span>
        <div className="w-px h-16 bg-text-muted relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-full bg-accent-500 animate-scroll-line" />
        </div>
        <svg
          className="w-6 h-6 text-text-muted group-hover:text-accent-500 transition-colors animate-bounce-slow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      <style jsx>{`
        @keyframes scroll-line {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
        
        .animate-scroll-line {
          animation: scroll-line 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-line,
          .animate-bounce-slow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
