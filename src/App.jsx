import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Particles from '@tsparticles/react';
import { createPortal } from 'react-dom';

// Import direct critical components
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';

// Lazy-load sections below the fold
const About = lazy(() => import('./components/About.jsx'));
const Experience = lazy(() => import('./components/Experience.jsx'));
const Projects = lazy(() => import('./components/Projects.jsx'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const Certifications = lazy(() => import('./components/Certifications.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));

// Beautiful skeleton fallback loader
const SectionLoader = () => (
  <div className="w-full py-20 flex items-center justify-center bg-[#050816] text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-[#6366F1]/30 border-t-[#6366F1] rounded-full animate-spin" />
      <span className="mono-font text-xs text-slate-500">Loading module...</span>
    </div>
  </div>
);

// Custom Cursor component (follows mouse with 80ms transition lag)
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const cursorElement = (
    <div 
      className={`custom-cursor hidden md:block ${isHovered ? 'custom-cursor-hover' : ''}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        transition: 'transform 0.08s cubic-bezier(0.1, 1, 0.1, 1), width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s'
      }}
    />
  );

  return createPortal(cursorElement, document.body);
};

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Check desktop sizing
  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Track scroll for "Back to Top" visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const particlesOptions = {
    fpsLimit: 60,
    particles: {
      color: { value: '#ffffff' },
      move: {
        enable: true,
        direction: 'none',
        random: true,
        speed: 0.5,
        straight: false,
        outModes: { default: 'out' }
      },
      number: {
        value: 35,
        density: { enable: false }
      },
      opacity: {
        value: 0.3
      },
      shape: { type: 'circle' },
      size: {
        value: { min: 1, max: 2 }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false }
      }
    },
    detectRetina: true
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-[#050816] text-[#F1F5F9]' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Background Glowing Glass Orbs */}
      <div className="absolute top-[8%] left-[-15%] w-[600px] h-[600px] rounded-full bg-indigo-500/8 dark:bg-[#6366F1]/10 filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] rounded-full bg-cyan-500/6 dark:bg-[#06B6D4]/8 filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[60%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/6 dark:bg-[#8B5CF6]/8 filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-rose-500/4 dark:bg-pink-500/5 filter blur-[120px] pointer-events-none z-0" />

      {/* Background Particles Layer (Desktop + Dark Mode only) */}
      {isDesktop && theme === 'dark' && (
        <Particles 
          id="tsparticles" 
          options={particlesOptions} 
          className="absolute inset-0 z-0 pointer-events-none"
        />
      )}

      {/* Main Layout Components */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      {/* Hero section loads immediately */}
      <Hero />

      {/* Lazy loaded sections wrap under Suspense */}
      <Suspense fallback={<SectionLoader />}>
        <About />
        <Experience />
        <Projects theme={theme} />
        <Skills />
        <Certifications />
        <Contact />
      </Suspense>

      {/* Scroll-to-Top Floating Circle */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleScrollTop}
            className="fixed bottom-6 right-6 w-11 h-11 rounded-full glass-card border border-slate-200 dark:border-white/20 hover:border-[#6366F1] hover:text-[#6366F1] text-slate-800 dark:text-white flex items-center justify-center z-50 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <Icon icon="lucide:arrow-up" className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
