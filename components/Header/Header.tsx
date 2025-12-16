'use client';

import { useState, useEffect } from 'react';
import FullscreenMenu from './FullscreenMenu';

export default function Header({ onAppointmentClick }: { onAppointmentClick: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = ['Español', 'English', 'Deutsch'];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-fixed transition-all duration-normal ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-h3 font-serif text-primary-900">
                ESPACIO
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* Language Selector */}
              <div className="relative group">
                <button className="text-body-sm text-text-secondary hover:text-text-primary transition-colors flex items-center space-x-1">
                  <span>{currentLang}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-[140px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-normal">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCurrentLang(lang)}
                      className={`block w-full text-left px-4 py-2 text-body-sm hover:bg-background-secondary transition-colors ${
                        lang === currentLang ? 'text-accent-500 font-medium' : 'text-text-secondary'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Make an appointment button */}
              <button
                onClick={onAppointmentClick}
                className="btn btn-primary"
                aria-label="Make an appointment"
              >
                Make an appointment
              </button>

              {/* Menu toggle */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex flex-col space-y-1.5 w-8 h-8 justify-center items-end group"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
              >
                <span className="block w-8 h-0.5 bg-primary-900 transition-all group-hover:w-6"></span>
                <span className="block w-6 h-0.5 bg-primary-900 transition-all group-hover:w-8"></span>
                <span className="block w-8 h-0.5 bg-primary-900 transition-all group-hover:w-6"></span>
              </button>
            </nav>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden flex flex-col space-y-1.5 w-8 h-8 justify-center items-end"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <span className="block w-8 h-0.5 bg-primary-900"></span>
              <span className="block w-6 h-0.5 bg-primary-900"></span>
              <span className="block w-8 h-0.5 bg-primary-900"></span>
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
