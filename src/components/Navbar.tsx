import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';
import logoImg from '../assets/logo.jpg';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Find Us', href: '#location' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why ClickShot', href: '#why-us' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-header py-1 shadow-subtle'
          : 'bg-white/70 backdrop-blur-md py-1 border-b border-zinc-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-lg"
            aria-label="ClickShot Home"
          >
            <img src={logoImg} alt="ClickShot Logo" className="h-45 w-auto object-contain" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-surface-800 hover:text-brand-600 transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={SITE_CONTENT.brand.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-700 hover:text-emerald-600 transition-colors py-1.5 px-2 rounded-full hover:bg-zinc-100"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-600 text-white text-sm font-semibold shadow-md shadow-brand-600/20 hover:bg-brand-700 hover:shadow-glow transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <span className="hidden sm:inline">Book a ClickShot</span>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-zinc-800 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-2xl p-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Navigation</span>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center justify-between py-2 text-base font-semibold text-surface-900 hover:text-brand-600 text-left transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </button>
            ))}

            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-brand-600 text-white font-bold text-center shadow-lg shadow-brand-600/25 active:scale-98"
              >
                <span>Book a ClickShot</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <a
                href={SITE_CONTENT.brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-50 text-emerald-800 font-semibold text-sm text-center border border-emerald-200 hover:bg-emerald-100"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Talk to Us on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
