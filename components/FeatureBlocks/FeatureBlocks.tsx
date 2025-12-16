'use client';

import { useEffect, useRef, useState } from 'react';

interface FeatureBlock {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

const features: FeatureBlock[] = [
  {
    id: 'outlet',
    title: 'Outlet',
    description: 'Exceptional quality at accessible prices. Discover premium pieces from previous collections.',
    features: ['Up to 50% off', 'Premium brands', 'Limited availability'],
    image: 'placeholder-outlet',
  },
  {
    id: 'showrooms',
    title: 'Showrooms',
    description: 'Visit our showrooms to experience our designs firsthand and consult with our experts.',
    features: ['Expert consultation', 'Full-scale displays', 'Multiple locations'],
    image: 'placeholder-showrooms',
  },
  {
    id: 'services',
    title: 'Services',
    description: 'Comprehensive design and installation services from concept to completion.',
    features: ['Design consultation', 'Project management', 'Installation & after-care'],
    image: 'placeholder-services',
  },
];

export default function FeatureBlocks() {
  const [visibleBlocks, setVisibleBlocks] = useState<Set<string>>(new Set());
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = blocksRef.current.map((block, index) => {
      if (!block) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleBlocks((prev) => new Set(prev).add(features[index].id));
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(block);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-background-secondary">
      <div className="container-custom">
        <div className="space-y-24 lg:space-y-32">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              id={feature.id}
              ref={(el) => {
                blocksRef.current[index] = el;
              }}
              className={`reveal ${visibleBlocks.has(feature.id) ? 'active' : ''}`}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-accent-200" />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-h1 lg:text-display-md font-serif text-text-primary mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-body-lg text-text-secondary mb-8">{feature.description}</p>
                  <ul className="space-y-3 mb-8">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-body text-text-primary">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={`#${feature.id}`} className="btn btn-secondary">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
