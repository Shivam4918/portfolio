import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Track scroll status and active sections
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav border-b border-white/8 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* SP Logo */}
        <a href="#home" className="heading-font text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white select-none flex items-center gap-1">
          <span className="text-[#6366F1]">S</span>
          <span className="text-[#06B6D4]">P</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <motion.a 
                key={link.name} 
                href={link.href} 
                whileHover={{ scale: 1.05 }}
                className={`relative text-sm font-medium transition-all duration-300 font-sans tracking-wide hover:text-slate-900 dark:hover:text-white ${
                  isActive 
                    ? 'text-slate-900 dark:text-white drop-shadow-[0_0_8px_rgba(99,102,241,0.4)] font-semibold' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeUnderline" 
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#6366F1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dark / Light Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full glass-card hover:border-[#6366F1]/50 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Toggle Theme Mode"
          >
            {theme === 'dark' ? (
              <Icon icon="lucide:sun" className="text-yellow-400 text-lg" />
            ) : (
              <Icon icon="lucide:moon" className="text-[#6366F1] text-lg" />
            )}
          </button>

          {/* Hire Me CTA Button */}
          <a 
            href="#contact" 
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold font-mono tracking-wider rounded-full group bg-gradient-to-br from-[#6366F1] to-[#06B6D4] focus:ring-2 focus:outline-none focus:ring-indigo-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#050816] rounded-full group-hover:bg-opacity-0 text-slate-800 dark:text-slate-200 group-hover:text-white">
              HIRE ME
            </span>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass-card text-slate-500 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Icon icon="lucide:sun" className="text-yellow-400 text-base" />
            ) : (
              <Icon icon="lucide:moon" className="text-[#6366F1] text-base" />
            )}
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full glass-card text-slate-900 dark:text-white hover:text-[#6366F1] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <Icon icon={isMobileMenuOpen ? "lucide:x" : "lucide:menu"} className="text-lg" />
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-nav border-b border-slate-200/50 dark:border-white/10"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium py-1 transition-all ${
                    activeSection === link.id ? 'text-[#6366F1]' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              
              <a 
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 w-full text-center py-3 rounded-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4] text-white font-bold text-sm tracking-wider font-mono"
              >
                HIRE ME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}
