'use client';

import { useEffect, useRef, useState } from 'react';

export default function TypographicSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 lg:py-40 bg-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className={`text-display-md lg:text-display-lg font-serif text-text-primary leading-tight transition-all duration-slower ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="block">Heritage, Design</span>
            <span className="block mt-4">and Commitment</span>
            <span className="block mt-4 text-accent-500">of Three generations.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
