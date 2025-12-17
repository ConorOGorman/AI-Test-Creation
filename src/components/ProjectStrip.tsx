import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  { title: 'Costitx Project', image: 'https://api.espaciohomedesign.com/uploads/0_PORTADA_EHDG_COSTITX_WEB_RES_8_6a1ac764cb.jpg' },
  { title: 'Vanity Project', image: 'https://api.espaciohomedesign.com/uploads/xlarge_VANITY_DRON_FULL_RES_54_5e76afe145.jpg' },
  { title: 'CSI Project', image: 'https://api.espaciohomedesign.com/uploads/xlarge_EHDG_ILLAVEDRA_15_04971c786f.jpg' },
  { title: 'Lonja de Mar Project', image: 'https://api.espaciohomedesign.com/uploads/xlarge_LONJA_DE_MAR_051_2_448af56ce2.jpg' },
  { title: 'Illetas Espanyolet Project', image: 'https://api.espaciohomedesign.com/uploads/xlarge_0_L5_A0135_42f12cf50a.jpg' },
];

export default function ProjectStrip() {
  return (
    <section className="py-11.25 overflow-hidden">
      <div className="flex overflow-x-auto gap-8.75 px-8.75 pb-8 scrollbar-hide snap-x snap-mandatory">
        {projects.map((project, index) => (
          <div key={index} className="shrink-0 w-75 group cursor-pointer snap-center">
            <div className="relative overflow-hidden mb-4 h-105">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill
                className="object-cover transition-transform duration-600 ease-[cubic-bezier(0,0,0.26,1)] group-hover:scale-110"
                sizes="300px"
              />
            </div>
            <h3 className="text-lg font-silka font-medium uppercase mb-2">{project.title}</h3>
            <Link href="#" className="text-xs uppercase font-semibold border-b border-primary-black pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Go to section
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
