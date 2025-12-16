"use client";

import React, { useState, useEffect, memo } from 'react';

const VideoBackground = memo(() => (
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-black/20 z-10"></div>
    <iframe 
      src="https://player.vimeo.com/video/1140325670?dnt=1&color=fff&title=0&byline=0&loop=1&muted=1&autoplay=1&autopause=0&background=1" 
      className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none min-w-full min-h-full object-cover"
      frameBorder="0" 
      allow="autoplay; fullscreen; picture-in-picture"
      style={{ width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.77vh' }}
    ></iframe>
  </div>
));

VideoBackground.displayName = 'VideoBackground';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full bg-primary-black text-primary-white overflow-hidden flex items-center justify-center layout-portada">
      {/* Background Video */}
      <VideoBackground />
      
      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-[1500px] px-[35px]">
        <h1 className="text-[3em] md:text-[5em] lg:text-[7em] leading-[0.9] font-silka font-medium uppercase text-center tracking-tight">
          <span className="block">80 Years Designing Homes</span>
          <span className="block">That Speak About You</span>
        </h1>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-[45px] left-[35px] z-20 flex gap-[10px]">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-[3px] transition-all duration-300 ${index === currentSlide ? 'bg-primary-white opacity-100' : 'bg-primary-white opacity-30 hover:opacity-60'} w-[80px]`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-[45px] left-1/2 -translate-x-1/2 text-sm uppercase font-silka font-semibold tracking-widest animate-bounce cursor-pointer z-20">
        Scroll Down
      </div>
    </section>
  );
}
