'use client';

import { useEffect, useRef, useState } from 'react';

interface NewsCard {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
}

const newsItems: NewsCard[] = [
  {
    id: 1,
    category: 'Brands',
    title: 'New Collection Launch',
    excerpt: 'Discover our latest premium brand partnerships bringing exclusive designs to your home.',
    image: 'placeholder-news-1',
  },
  {
    id: 2,
    category: 'Events',
    title: 'Design Showcase 2024',
    excerpt: 'Join us for an exclusive showcase of innovative home design trends and solutions.',
    image: 'placeholder-news-2',
  },
  {
    id: 3,
    category: 'Art',
    title: 'Artisan Craftsmanship',
    excerpt: 'Exploring the intersection of traditional craftsmanship and contemporary design.',
    image: 'placeholder-news-3',
  },
];

export default function NewsCards() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {newsItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`reveal ${visibleCards.has(index) ? 'active' : ''}`}
            >
              <article className="card group cursor-pointer h-full">
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
                  <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-primary-900/20 transition-colors duration-normal" />
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <span className="text-label text-accent-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-h3 font-serif text-text-primary mt-4 mb-3 group-hover:text-accent-500 transition-colors duration-normal">
                    {item.title}
                  </h3>
                  <p className="text-body text-text-secondary mb-6">{item.excerpt}</p>
                  <a
                    href="#"
                    className="inline-flex items-center space-x-2 text-body-sm text-text-primary hover:text-accent-500 transition-colors duration-normal link-underline"
                  >
                    <span>Read more</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
