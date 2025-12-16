'use client';

import { useEffect, useRef, useState } from 'react';

const brands = [
  'Brand 1', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5', 'Brand 6',
  'Brand 7', 'Brand 8', 'Brand 9', 'Brand 10', 'Brand 11', 'Brand 12',
];

export default function BrandLogos() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background-secondary">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-h2 lg:text-h1 font-serif text-text-primary mb-4">
            Our Partners
          </h2>
          <p className="text-body text-text-secondary">
            Collaborating with the world's leading design brands
          </p>
        </div>

        {/* Logos grid */}
        <div className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 reveal ${isVisible ? 'active' : ''}`}>
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center aspect-square"
            >
              <div className="w-full h-full flex items-center justify-center bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-normal">
                <div className="text-center">
                  <span className="text-label text-text-muted">{brand}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
