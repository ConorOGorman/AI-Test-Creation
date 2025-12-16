'use client';

import { useEffect, useRef, useState } from 'react';

interface CategoryBlock {
  id: string;
  title: string;
  description: string;
  image: string;
}

const categories: CategoryBlock[] = [
  {
    id: 'kitchens',
    title: 'Kitchens',
    description: 'Bespoke kitchen design combining functionality with timeless elegance.',
    image: 'placeholder-kitchens',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Comprehensive home transformations tailored to your vision and lifestyle.',
    image: 'placeholder-projects',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    description: 'Curated spaces that reflect your personality and enhance daily living.',
    image: 'placeholder-interior',
  },
];

export default function CategoryBlocks() {
  const [visibleBlocks, setVisibleBlocks] = useState<Set<string>>(new Set());
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = blocksRef.current.map((block, index) => {
      if (!block) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleBlocks((prev) => new Set(prev).add(categories[index].id));
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {categories.map((category, index) => (
            <div
              key={category.id}
              id={category.id}
              ref={(el) => {
                blocksRef.current[index] = el;
              }}
              className={`reveal ${visibleBlocks.has(category.id) ? 'active' : ''}`}
            >
              <div className="group cursor-pointer">
                {/* Image placeholder */}
                <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-accent-200 group-hover:scale-105 transition-transform duration-slower" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-h2 font-serif text-text-primary mb-4 group-hover:text-accent-500 transition-colors duration-normal">
                    {category.title}
                  </h3>
                  <p className="text-body-lg text-text-secondary mb-6">{category.description}</p>
                  <a
                    href={`#${category.id}`}
                    className="inline-flex items-center space-x-2 text-body text-text-primary hover:text-accent-500 transition-colors duration-normal link-underline"
                  >
                    <span>Explore</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
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
