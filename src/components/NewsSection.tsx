import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const newsItems = [
  {
    category: 'Brands',
    title: 'Vitra, the iconic brand joins Espacio',
    image: 'https://api.espaciohomedesign.com/uploads/xlarge_Vitra_SB_EDITADAS_9_279ea733ad.jpg',
    link: '/news/vitra'
  },
  {
    category: 'Novelties',
    title: '80 years of craftsmanship, design, and trust.',
    image: 'https://api.espaciohomedesign.com/uploads/xlarge_Espacio_Home_Design_5_Workshop_21_108bbb0991.jpg',
    link: '/news/80-years'
  },
  {
    category: 'Events',
    title: 'A Christmas to share',
    image: 'https://api.espaciohomedesign.com/uploads/xlarge_Navidad_2025_Edit03_11_35561c1ac8.jpg',
    link: '/news/christmas'
  }
];

export default function NewsSection() {
  return (
    <section className="py-11.25 px-8.75 max-w-375 mx-auto layout-bloque-noticias">
      <div className="flex flex-col gap-12.5">
        {newsItems.map((item, index) => (
          <div key={index} className="layout-noticia-item group cursor-pointer grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-5 items-center">
            <div className="relative overflow-hidden aspect-video img-content">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="layout-noticia-text flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest mb-2 text-gray-500">{item.category}</span>
              <h3 className="text-2xl font-silka font-medium uppercase mb-4 relative left-[0.13em] transition-transform duration-300 group-hover:translate-x-2">{item.title}</h3>
              <div className="noticia-cta opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={item.link} className="text-sm uppercase font-semibold border-b-2 border-primary-black pb-1">
                    Read More
                  </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
