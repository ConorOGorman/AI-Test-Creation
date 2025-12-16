'use client';

const footerLinks = {
  company: [
    { label: 'About us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Showrooms', href: '#showrooms' },
    { label: 'Careers', href: '#careers' },
  ],
  services: [
    { label: 'Kitchens', href: '#kitchens' },
    { label: 'Interior Design', href: '#interior-design' },
    { label: 'Projects', href: '#projects' },
    { label: 'Outlet', href: '#outlet' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Cookies', href: '#cookies' },
    { label: 'Legal Notice', href: '#legal' },
    { label: 'Terms of Service', href: '#terms' },
  ],
};

const socialLinks = [
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'Pinterest', href: '#', icon: 'pinterest' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
];

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
  };

  return (
    <footer className="bg-primary-900 text-primary-100 pt-24 pb-12">
      <div className="container-custom">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-h3 font-serif mb-6">ESPACIO</h3>
            <p className="text-body-sm text-primary-300 mb-8">
              80 years of designing homes with a story to tell. Heritage, design and commitment of three generations.
            </p>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-body font-medium mb-4">Subscribe to our newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-2 bg-primary-800 border border-primary-700 rounded-md text-body-sm text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition-colors duration-normal text-body-sm font-medium whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Company links */}
          <div className="lg:col-span-2">
            <h4 className="text-body font-medium mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-sm text-primary-300 hover:text-white transition-colors duration-normal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="lg:col-span-2">
            <h4 className="text-body font-medium mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-sm text-primary-300 hover:text-white transition-colors duration-normal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div className="lg:col-span-2">
            <h4 className="text-body font-medium mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-sm text-primary-300 hover:text-white transition-colors duration-normal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="lg:col-span-2">
            <h4 className="text-body font-medium mb-6">Follow Us</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-800 hover:bg-accent-500 transition-colors duration-normal"
                  aria-label={link.label}
                >
                  <span className="sr-only">{link.label}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-body-sm text-primary-400">
              © {new Date().getFullYear()} Espacio Home Design. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#privacy" className="text-body-sm text-primary-400 hover:text-white transition-colors duration-normal">
                Privacy
              </a>
              <a href="#cookies" className="text-body-sm text-primary-400 hover:text-white transition-colors duration-normal">
                Cookies
              </a>
              <a href="#legal" className="text-body-sm text-primary-400 hover:text-white transition-colors duration-normal">
                Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
