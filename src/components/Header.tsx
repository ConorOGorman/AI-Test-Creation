"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-[calc(100%-70px)] z-50 grid grid-cols-[170px_1fr_65px] gap-[70px] px-[35px] pt-[35px] pb-0 justify-center content-center transition-all duration-300 bg-transparent">
        <div className="relative self-center" id="header-logo">
          <Link href="/" className="text-primary-white block w-[125px]">
            <svg enableBackground="new 0 0 514.99 204.57" version="1.1" viewBox="0 0 514.99 204.57" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto fill-current">
              <path id="test" d="m79.1 79.26h8.56c0.61 0 1.11 0.44 1.23 1.04 1.62 8.2 7.84 12.55 18.27 12.55 11.16 0 17.31-5.44 17.31-13.02 0-20.88-44.49-5.01-44.49-34.48 0-12.59 11.3-20.74 26.89-20.74 13.25 0 24.37 7.46 26.16 20.06 0.1 0.74-0.5 1.39-1.24 1.39h-8.42c-0.61 0-1.11-0.44-1.23-1.03-1.36-6.44-6.6-10.7-15.98-10.7-9.3 0-15.31 4.58-15.31 11.01 0 18.88 44.63 3.15 44.63 33.9 0 14.02-11.59 23.46-28.9 23.46-17 0-26.92-8.94-28.73-22.06-0.1-0.72 0.5-1.38 1.25-1.38"/>
              <path d="m214.36 63.53c0-17.45-10.59-28.75-26.18-28.75-16.16 0-25.89 13.16-25.89 28.75 0 18.31 11.44 28.9 26.18 28.9 15.31-0.01 25.89-12.02 25.89-28.9m-61.47-37.05h7.94c0.81 0 1.46 0.66 1.46 1.46v10.27h0.86c1.86-2.72 9.58-13.59 25.75-13.59 21.89 0 37.05 16.16 37.05 38.91 0 22.89-15.16 39.19-36.19 39.19-15.59 0-23.89-10.01-26.18-13.87h-0.86v39.14c0 0.81-0.66 1.46-1.46 1.46h-8.37c-0.81 0-1.46-0.66-1.46-1.46v-100.05c-0.01-0.8 0.65-1.46 1.46-1.46"/>
              <path d="m299.94 63.81c0-18.31-11.44-28.9-26.18-28.9-15.31 0-25.89 12.02-25.89 28.9 0 17.45 10.58 28.75 26.18 28.75 16.16 0.01 25.89-13.15 25.89-28.75m-63.66 0c0-22.89 15.16-39.19 36.19-39.19 15.59 0 23.89 10.01 26.18 13.87h0.86v-10.49c0-0.84 0.68-1.52 1.53-1.52h8.25c0.84 0 1.53 0.68 1.53 1.52v71.33c0 0.84-0.68 1.53-1.53 1.53h-7.82c-0.84 0-1.53-0.68-1.53-1.53v-10.2h-0.86c-1.86 2.72-9.58 13.59-25.75 13.59-21.88 0-37.05-16.16-37.05-38.91"/>
              <path d="m324.96 63.67c0-22.03 16.16-39.05 38.05-39.05 15.55 0 30.04 9 34.68 24.45 0.28 0.93-0.4 1.87-1.37 1.87h-8.82c-0.61 0-1.14-0.4-1.35-0.97-3.32-9.17-12.48-15.05-22.85-15.05-15.88 0-26.61 12.59-26.61 28.75 0 16.74 11.3 28.75 26.89 28.75 10.36 0 19.65-5.87 22.85-15.03 0.21-0.59 0.74-0.99 1.36-0.99h8.68c0.96 0 1.65 0.93 1.38 1.86-4.53 15.46-19.15 24.46-34.7 24.46-22.45 0-38.19-17.02-38.19-39.05"/>
              <path d="m413.97 26.48h8.21c0.85 0 1.55 0.69 1.55 1.55v71.29c0 0.85-0.69 1.55-1.55 1.55h-8.21c-0.85 0-1.55-0.69-1.55-1.55v-71.29c0-0.86 0.7-1.55 1.55-1.55"/>
              <path d="m503.4 63.67c0-16.45-11.3-28.75-27.32-28.75s-27.18 12.44-27.18 28.75c0 16.74 11.3 28.75 27.18 28.75 16.02 0 27.32-12.16 27.32-28.75m-66.09 0c0-22.46 16.74-39.05 38.91-39.05 22.46 0 38.77 16.74 38.77 39.05s-16.59 39.05-38.91 39.05-38.77-16.45-38.77-39.05"/>
              <path d="m68.48 10.1v-8.16c0-0.67-0.54-1.21-1.21-1.21h-66.06c-0.67 0-1.21 0.54-1.21 1.21v8.16c0 0.67 0.54 1.21 1.21 1.21h66.05c0.67 0.01 1.22-0.54 1.22-1.21"/>
            </svg>
          </Link>
        </div>
        
        <div id="header-menu-items" className="uppercase justify-self-center self-center text-primary-white hidden lg:block">
           <ul className="overflow-hidden grid grid-flow-col auto-cols-max gap-[35px] list-none p-[3px] relative -left-[10%]">
             <li><Link href="/kitchens">Kitchens</Link></li>
             <li><Link href="/interior-design">Interior Design</Link></li>
             <li><Link href="/projects">Projects</Link></li>
             <li><Link href="/services">Services</Link></li>
             <li><Link href="/showrooms">Showrooms</Link></li>
           </ul>
        </div>

        <div 
          id="header-menu-toggle"
          onClick={toggleMenu}
          className="relative cursor-pointer flex justify-center items-center -right-[17.5px] gap-[70px] transition-transform duration-300 group"
          aria-label="Toggle Menu"
        >
          <div id="header-toggle-svg" className="w-[35px] h-[19px] flex flex-col justify-between">
             <span className="h-[3px] bg-primary-white w-full transition-transform duration-300 origin-center group-hover:scale-x-50"></span>
             <span className="h-[3px] bg-primary-white w-full transition-transform duration-300 group-hover:scale-x-200"></span>
             <span className="h-[3px] bg-primary-white w-full transition-transform duration-300 origin-center group-hover:scale-x-50"></span>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div className={`fixed inset-0 bg-primary-white z-[15000] transition-opacity duration-[0.7s] ease-[cubic-bezier(0.56,0,0.38,1)] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div id="full-menu-header" className="relative w-[calc(100%-70px)] grid grid-cols-[170px_1fr_1fr_50px] z-10 p-[35px] justify-center text-center items-center mx-auto">
            <div className="relative justify-self-start w-full text-left">
                <span className="text-primary-black uppercase font-silka font-medium text-lg">Espacio Home Design</span>
            </div>
            <div className="relative flex gap-[35px] overflow-hidden justify-self-end top-[6px]">
                <span className="text-sm font-silka font-semibold">ESPAÑOL</span>
                <span className="text-sm font-silka font-semibold text-gray-400">ENGLISH</span>
                <span className="text-sm font-silka font-semibold">DEUTSCH</span>
            </div>
            <div className="relative flex gap-[35px] overflow-hidden justify-self-center top-[6px]">
                <span className="text-sm font-silka font-semibold uppercase">Make an appointment</span>
            </div>
            <div className="justify-self-end relative w-[50px] h-[50px] cursor-pointer flex justify-center items-center left-[10px]" onClick={() => setIsMenuOpen(false)}>
                <div className="w-[25px] h-[25px] relative">
                    <span className="absolute top-1/2 left-0 w-full h-[3px] bg-primary-black rotate-45"></span>
                    <span className="absolute top-1/2 left-0 w-full h-[3px] bg-primary-black -rotate-45"></span>
                </div>
            </div>
        </div>

        <div id="full-menu-wrapper" className="relative w-full left-0 h-[calc(100vh-109px-50px)] overflow-x-hidden overflow-y-scroll z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-min">
            {['Kitchens', 'Interior Design', 'Projects', 'Services', 'Showrooms', 'About Us', 'Outlet', 'Contact'].map((item, index) => (
              <div key={item} className="relative p-[35px] pb-0 border-r border-border-light last:border-r-0">
                  <div className="relative mb-[15px]">
                    <Link 
                        href={`/${item.toLowerCase().replace(' ', '-')}`}
                        className="text-[0.85em] uppercase text-primary-black hover:text-primary-black font-silka font-semibold"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="mr-4">0{index + 1}</span>
                        {item}
                    </Link>
                  </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
