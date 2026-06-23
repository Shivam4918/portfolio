import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Icon } from '@iconify/react';

// Custom 3D Tilt Card Component with Dynamic Glare & preserve-3d
const TiltCard = ({ children, className }) => {
  const cardRef = React.useRef(null);
  const [tiltStyle, setTiltStyle] = React.useState({});
  const [glareStyle, setGlareStyle] = React.useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg tilt
    const rotateY = ((x - centerX) / centerX) * 15;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
      transition: 'transform 0.1s ease-out',
      transformStyle: 'preserve-3d'
    });

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 0.4,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 65%)`,
      transition: 'opacity 0.15s ease-out',
      mixBlendMode: 'overlay'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease-out',
      transformStyle: 'preserve-3d'
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease-out'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`relative ${className}`}
    >
      {children}
      <div 
        className="absolute inset-0 pointer-events-none z-30 rounded-[inherit]" 
        style={glareStyle}
      />
    </div>
  );
};

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#6366F1]/10 filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#06B6D4]/8 filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/8 filter blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Text Side - 55% Column width */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Glass Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 glass-card text-xs font-mono text-[#06B6D4] w-fit border border-slate-200/50 dark:border-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Software Engineer Roles
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="heading-font text-5xl lg:text-7xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            Prajapati Shivam
          </motion.h1>

          {/* Typewriter Line */}
          <motion.div 
            variants={itemVariants}
            className="text-xl lg:text-2xl font-semibold flex items-center min-h-[1.5em]"
          >
            <span className="text-slate-700 dark:text-slate-300 mr-2">I am a</span>
            <TypeAnimation
              sequence={[
                "Python Backend Developer",
                2000,
                "Django & DRF Specialist",
                2000,
                "Building Scalable Systems",
                2000,
                "MCA @ Parul University",
                2000
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              className="text-[#06B6D4] font-mono font-bold"
            />
          </motion.div>

          {/* Body Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-sans"
          >
            Crafting high-performance APIs, real-time systems, and AI-powered backends. CGPA 8.88 · AccioJob intern · 3 live projects.
          </motion.p>

          {/* Buttons Row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <a 
              href="#projects" 
              className="h-12 px-6 rounded-full bg-[#6366F1] hover:bg-[#6366F1]/90 text-white font-medium flex items-center justify-center gap-2 transition-all glow-indigo active:scale-95 cursor-pointer"
            >
              <span>Explore Projects</span>
              <Icon icon="lucide:arrow-right" className="text-base" />
            </a>

            <a 
              href="/Resume1.pdf" 
              download="Prajapati_Shivam_Resume.pdf"
              className="h-12 px-6 rounded-full glass-card hover:bg-[#6366F1]/10 text-slate-800 dark:text-white border-slate-200/50 dark:border-white/10 font-medium flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Icon icon="lucide:download" className="text-base" />
              <span>Download Resume</span>
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-4 ml-2">
              <a 
                href="https://github.com/Shivam4918" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full glass-card border-slate-200/50 dark:border-white/10 hover:border-[#6366F1]/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-lg cursor-pointer" 
                aria-label="GitHub Profile"
              >
                <Icon icon="lucide:github" />
              </a>
              <a 
                href="https://linkedin.com/in/prajapati-shivam-647465241" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full glass-card border-slate-200/50 dark:border-white/10 hover:border-[#06B6D4]/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-lg cursor-pointer" 
                aria-label="LinkedIn Profile"
              >
                <Icon icon="lucide:linkedin" />
              </a>
              <a 
                href="mailto:shivam4918@gmail.com" 
                className="p-2.5 rounded-full glass-card border-slate-200/50 dark:border-white/10 hover:border-[#8B5CF6]/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-lg cursor-pointer" 
                aria-label="Send Email"
              >
                <Icon icon="lucide:mail" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right 3D Visual Side - 45% Column width */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center"
        >
          {/* Framer motion floating loop */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-full max-w-[430px]"
          >
            <TiltCard className="w-full rounded-[20px] preserve-3d shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <div 
                className="w-full bg-[#0a0c16]/90 border border-white/10 p-6 font-mono text-xs leading-relaxed relative select-none rounded-[20px] backdrop-blur-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                {/* Header Dots */}
                <div 
                  className="flex items-center justify-between border-b border-white/10 pb-4 mb-4"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-slate-500 text-[10px] tracking-wide">shivam@portfolio:~</span>
                  <div className="w-10" />
                </div>

                {/* Body Lines */}
                <div 
                  className="space-y-4 text-slate-300 font-mono text-[13px]"
                  style={{ transform: 'translateZ(35px)' }}
                >
                  <div className="space-y-1">
                    <div>
                      <span className="text-[#6366F1]">$</span> whoami
                    </div>
                    <div className="text-white font-semibold pl-4">Prajapati Shivam</div>
                  </div>

                  <div className="space-y-1">
                    <div>
                      <span className="text-[#6366F1]">$</span> cat role.txt
                    </div>
                    <div className="text-[#06B6D4] font-semibold pl-4">Python Backend Developer</div>
                  </div>

                  <div className="space-y-1">
                    <div>
                      <span className="text-[#6366F1]">$</span> echo $CGPA
                    </div>
                    <div className="text-yellow-400 pl-4">8.88 / 10</div>
                  </div>

                  <div className="space-y-1">
                    <div>
                      <span className="text-[#6366F1]">$</span> git log --oneline
                    </div>
                    <div className="pl-4 space-y-1 text-slate-400 text-xs">
                      <div>
                        <span className="text-[#8B5CF6]">a3f9c12</span> MedQueue AI — reduce wait 40–50%
                      </div>
                      <div>
                        <span className="text-[#8B5CF6]">b7e2a01</span> Kirana Store ERP — Django + React
                      </div>
                      <div>
                        <span className="text-[#8B5CF6]">d1c4f88</span> PortfolioCraft — Gemini AI builder
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div>
                      <span className="text-[#6366F1]">$</span> status
                    </div>
                    <div className="text-emerald-400 pl-4 flex items-center gap-1">
                      Open to Software Development Roles ✓
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 pt-1">
                    <span className="text-[#6366F1]">$</span>
                    <span className="w-2 h-4 bg-white animate-pulse" />
                  </div>
                </div>

              </div>
            </TiltCard>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
