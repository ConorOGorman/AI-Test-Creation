import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FeatureBlockProps {
  title: string;
  subtitle: string;
  image: string;
  linkText: string;
  linkUrl: string;
  reversed?: boolean;
}

export default function FeatureBlock({ title, subtitle, image, linkText, linkUrl, reversed = false }: FeatureBlockProps) {
  return (
    <section className="py-[45px] px-[35px] max-w-[1500px] mx-auto">
      <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-[35px] items-center`}>
        <div className="w-full md:w-[40%]">
          <div className="relative overflow-hidden aspect-[16/9] group cursor-pointer">
            <Image 
              src={image} 
              alt={title} 
              fill
              className="object-cover transition-transform duration-[0.6s] ease-[cubic-bezier(0,0,0.26,1)] group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
        <div className={`w-full md:w-[60%] flex flex-col justify-center ${reversed ? 'items-end text-right' : 'items-start text-left'} p-8`}>
          <h2 className="text-[2.5em] md:text-[4em] font-silka font-thin uppercase mb-4 leading-none">{title}</h2>
          <h3 className="text-lg font-silka font-medium uppercase mb-8 tracking-wide">{subtitle}</h3>
          <Link href={linkUrl} className="text-sm uppercase font-semibold border-b-2 border-primary-black pb-1 hover:opacity-70 transition-opacity">
            {linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
