import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border-light pt-8.75 pb-22.5 px-8.75 max-w-375 mx-auto grid gap-17.5">
      <div id="footer-links" className="grid grid-cols-1 lg:grid-cols-[1fr_291px] gap-8.75">
        <div id="footer-main-links" className="flex flex-wrap gap-11.25 text-sm uppercase font-silka font-semibold">
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/cookies">Cookies Policy</Link>
          <Link href="/legal">Legal Notice</Link>
        </div>
        <div id="footer-social-links" className="flex gap-8.75 justify-start lg:justify-end">
          {/* Social Icons */}
          <a href="#" className="w-6.25 h-6.25 bg-primary-black rounded-full block"></a>
          <a href="#" className="w-6.25 h-6.25 bg-primary-black rounded-full block"></a>
          <a href="#" className="w-6.25 h-6.25 bg-primary-black rounded-full block"></a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8.75">
        <div className="text-sm leading-relaxed">
          <p className="mb-4 max-w-100">
            At Espacio Home Design we create spaces for people to build their stories. In our 6 showrooms in Mallorca you will find all the possibilities in kitchens, bathrooms, lighting, cabinets, dressing rooms, furniture, doors and coverings.
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-center">
           <h3 className="text-lg font-silka font-medium uppercase mb-4">Newsletter</h3>
           <div className="w-full max-w-75">
             <input type="email" placeholder="Enter your email" className="border-b border-primary-black w-full py-2 mb-4 bg-transparent uppercase text-sm placeholder-gray-500 focus:outline-none" />
             <button className="text-sm uppercase font-semibold border-b-2 border-primary-black pb-1 hover:opacity-60 transition-opacity">Subscribe</button>
           </div>
        </div>

        <div className="flex flex-col items-start md:items-end">
           <div className="text-2xl font-silka font-medium uppercase mb-4">Espacio Home Design</div>
           <div className="text-xs text-gray-500 uppercase">© 2025 Espacio Home Design</div>
        </div>
      </div>
    </footer>
  );
}
