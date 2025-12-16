"use client";
import React from 'react';

export default function FloatingContact() {
  return (
    <div 
      id="pideCitaBubble" 
      className="fixed bottom-[35px] right-[35px] z-[90] flex items-center bg-primary-black p-[10px] rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-primary-white border border-transparent hover:border-primary-black group"
    >
      <div id="pideCitaIcon" className="w-[25px] h-[25px] flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
           <circle cx="32" cy="32" r="30" className="stroke-primary-white stroke-[4] fill-none transition-colors duration-300 group-hover:stroke-primary-black" />
           <line x1="32" y1="14" x2="32" y2="50" className="stroke-primary-white stroke-[4] transition-colors duration-300 group-hover:stroke-primary-black" />
           <line x1="14" y1="32" x2="50" y2="32" className="stroke-primary-white stroke-[4] transition-colors duration-300 group-hover:stroke-primary-black" />
        </svg>
      </div>
      <span id="smallPideCita" className="text-primary-white ml-[10px] uppercase font-silka font-semibold text-sm transition-colors duration-300 group-hover:text-primary-black hidden md:block">
        Make an appointment
      </span>
    </div>
  );
}
