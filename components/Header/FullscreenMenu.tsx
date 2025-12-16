'use client';

import { useEffect } from 'react';

interface MenuItem {
  number: string;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { number: '01', label: 'Kitchens', href: '#kitchens' },
  { number: '02', label: 'Interior Design', href: '#interior-design' },
  { number: '03', label: 'Projects', href: '#projects' },
  { number: '04', label: 'Services', href: '#services' },
  { number: '05', label: 'Showrooms', href: '#showrooms' },
  { number: '06', label: 'About us', href: '#about' },
  { number: '07', label: 'Outlet', href: '#outlet' },
  { number: '08', label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Pinterest', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

export default function FullscreenMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-primary-900/30 backdrop-blur-sm z-modal-backdrop transition-opacity duration-normal ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu */}
      <div
        className={`fixed inset-0 z-modal bg-background-secondary transform transition-transform duration-slow ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="container-custom h-full flex flex-col py-8">
          {/* Close button */}
          <div className="flex justify-end mb-16">
            <button
              onClick={onClose}
              className="relative w-10 h-10 group"
              aria-label="Close menu"
            >
              <span className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-primary-900 transform -translate-x-1/2 -translate-y-1/2 rotate-45 transition-all group-hover:w-10"></span>
              <span className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-primary-900 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-all group-hover:w-10"></span>
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="space-y-6 lg:space-y-8">
              {menuItems.map((item, index) => (
                <li
                  key={item.number}
                  className={`reveal reveal-stagger-${Math.min(index + 1, 5)} ${isOpen ? 'active' : ''}`}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="flex items-baseline space-x-6 group"
                  >
                    <span className="text-label text-text-muted font-mono">{item.number}</span>
                    <span className="text-h1 lg:text-display-md font-serif text-text-primary group-hover:text-accent-500 transition-colors duration-normal">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="mt-16">
            <div className="flex flex-wrap gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-body-sm text-text-secondary hover:text-accent-500 transition-colors duration-normal link-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
