import React from 'react';
import { motion } from 'framer-motion';
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

// Browser Mockup Frame component
const BrowserMockup = ({ gradientClass, children, githubUrl }) => {
  return (
    <div className="w-full aspect-[16/9] rounded-t-xl overflow-hidden flex flex-col bg-[#11131e] border-b border-slate-200/20 dark:border-white/10 relative group">
      
      {/* Chrome Header */}
      <div className="h-7 px-3 flex items-center justify-between bg-[#151828] border-b border-white/5 relative z-20">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="w-[60%] h-4 rounded bg-[#0a0c16]/50 border border-white/5 flex items-center justify-center text-[8px] text-slate-500 font-mono">
          https://shivam.dev/project
        </div>
        <div className="w-10" />
      </div>

      {/* Screen Area */}
      <div className={`flex-1 w-full bg-gradient-to-br ${gradientClass} relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02] flex items-center justify-center`}>
        {children}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-sm">
          <a 
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs hover:bg-white/20 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <Icon icon="lucide:camera" className="text-sm" />
            <span>View Screenshots</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Project Card component
const ProjectCard = ({ project, isFeatured, theme }) => {
  return (
    <TiltCard className="w-full h-full rounded-[20px] preserve-3d">
      <div 
        className={`w-full h-full rounded-[20px] flex flex-col justify-between transition-all duration-300 glass-card-3d border ${
          isFeatured 
            ? 'border-[#6366F1]/50 dark:border-[#6366F1]/60 shadow-[0_15px_35px_rgba(99,102,241,0.15)]' 
            : 'border-slate-200/50 dark:border-white/10'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Top visual section (40% height) */}
        <div className="w-full" style={{ transform: 'translateZ(15px)' }}>
          {project.screenshot ? (
            // If real screenshot prop exists, render it inside browser frame
            <BrowserMockup gradientClass="from-slate-800 to-slate-900" githubUrl={project.github}>
              <img 
                src={project.screenshot} 
                alt={project.name} 
                className="w-full h-full object-cover object-top" 
                loading="lazy"
                width="400"
                height="225"
              />
            </BrowserMockup>
          ) : (
            // Render custom gradient SVGs as mockups
            <BrowserMockup gradientClass={project.gradient} githubUrl={project.github}>
              {project.mockupSvg}
            </BrowserMockup>
          )}
        </div>

        {/* Bottom text section (60% height) */}
        <div className="p-6 md:p-7 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
          <div>
            {/* Name + period */}
            <div className="flex items-start justify-between gap-3 mb-2" style={{ transform: 'translateZ(10px)' }}>
              <h3 className="heading-font text-lg md:text-xl font-extrabold text-slate-900 dark:text-white">{project.name}</h3>
              <span className="glass-card px-2.5 py-0.5 font-mono text-[9px] text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-white/5 flex-shrink-0">
                {project.period}
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-slate-500 dark:text-slate-400 font-sans text-xs mb-4" style={{ transform: 'translateZ(5px)' }}>{project.subtitle}</p>

            {/* Stack badges (alternating style) */}
            <div className="flex flex-wrap gap-1.5 mb-5" style={{ transform: 'translateZ(12px)' }}>
              {project.badges.map((badge, idx) => (
                <span 
                  key={badge} 
                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                    idx % 2 === 0
                      ? 'bg-[#6366F1]/10 text-[#6366F1] dark:text-[#a5b4fc] border-[#6366F1]/20'
                      : 'bg-[#06B6D4]/10 text-[#06B6D4] dark:text-[#67e8f9] border-[#06B6D4]/20'
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Highlights (metric styled in cyan) */}
            <ul className="space-y-2 mb-6" style={{ transform: 'translateZ(15px)' }}>
              {project.metrics.map((metric, idx) => (
                <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  <Icon icon="lucide:arrow-right-circle" className="text-[#06B6D4] text-sm flex-shrink-0 mt-0.5" />
                  <span>
                    {idx === 0 ? (
                      <strong className="text-[#06B6D4] font-semibold">{metric}</strong>
                    ) : (
                      metric
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card footer links */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-white/5 mt-auto" style={{ transform: 'translateZ(20px)' }}>
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Icon icon="lucide:github" className="text-sm" />
              <span>Repository</span>
            </a>
            
            {project.live && project.live !== '#' ? (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 text-xs font-mono font-bold text-[#6366F1] hover:text-[#06B6D4] transition-colors cursor-pointer"
              >
                <span>Live Demo</span>
                <Icon icon="lucide:external-link" className="text-[10px]" />
              </a>
            ) : (
              <span className="flex items-center gap-1 text-xs font-mono text-slate-500 select-none">
                <span>Demo Offline</span>
                <Icon icon="lucide:lock" className="text-[10px]" />
              </span>
            )}
          </div>

        </div>

      </div>
    </TiltCard>
  );
};

export default function Projects({ theme }) {
  const projectsData = [
    {
      name: "MedQueue AI",
      subtitle: "Real-Time Hospital Queue Management System",
      period: "Jan 2026 – Apr 2026",
      gradient: "from-[#6366F1] to-[#06B6D4]",
      badges: ["Django", "DRF", "MySQL", "MongoDB", "Redis", "WebSockets", "LightGBM", "Random Forest"],
      metrics: [
        "40–50% wait time reduction",
        "Real-time queue sync via WebSockets + Redis",
        "ML-based dynamic wait prediction"
      ],
      github: "https://github.com/Shivam4918/medqueue-ai",
      live: "https://medqueue-ai.onrender.com/",
      isFeatured: true,
      screenshot: "/images/MedQueue-AI.png", // Prop interface left empty for placeholder
      mockupSvg: (
        <svg viewBox="0 0 100 56.25" className="w-full h-full p-4 text-white opacity-80" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="25" height="15" rx="2" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
          <circle cx="10" cy="10" r="2" fill="#6366F1" />
          <line x1="14" y1="10" x2="26" y2="10" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="10" y1="15" x2="26" y2="15" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
          
          <rect x="35" y="5" width="60" height="25" rx="2" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
          <rect x="40" y="10" width="15" height="4" rx="1" fill="#06B6D4" />
          <rect x="40" y="18" width="50" height="2" rx="0.5" fill="white" fillOpacity="0.2" />
          <rect x="40" y="23" width="40" height="2" rx="0.5" fill="white" fillOpacity="0.2" />

          {/* Simple Chart */}
          <rect x="5" y="25" width="25" height="25" rx="2" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
          <path d="M8 45 L13 35 L18 40 L23 28 L28 33" fill="none" stroke="#6366F1" strokeWidth="1.5" />
          <circle cx="23" cy="28" r="1" fill="#06B6D4" />
        </svg>
      )
    },
    {
      name: "PortfolioCraft",
      subtitle: "AI-Powered Portfolio Builder",
      period: "Jul 2025 – Oct 2025",
      gradient: "from-[#8B5CF6] to-[#F59E0B]",
      badges: ["Flask", "Python", "SQLite", "Gemini API", "SortableJS", "Tailwind CSS"],
      metrics: [
        "40% editing time saved (drag-and-drop)",
        "Gemini AI content extraction from PDF",
        "REST-style dynamic preview endpoints"
      ],
      github: "https://github.com/Shivam4918/portfoliocraft21",
      live: "https://portfoliocraft-03vu.onrender.com/",
      isFeatured: false,
      screenshot: "/images/PortfolioCraft.png",
      mockupSvg: (
        <svg viewBox="0 0 100 56.25" className="w-full h-full p-4 text-white opacity-80" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="20" height="46" rx="2" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
          <circle cx="10" cy="10" r="1.5" fill="#8B5CF6" />
          <line x1="14" y1="10" x2="21" y2="10" stroke="white" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="9" y1="18" x2="21" y2="18" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="9" y1="24" x2="21" y2="24" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="9" y1="30" x2="21" y2="30" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />

          {/* Builder area */}
          <rect x="30" y="5" width="65" height="46" rx="2" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.1" />
          <rect x="36" y="10" width="53" height="12" rx="1.5" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
          <circle cx="42" cy="16" r="2.5" fill="#F59E0B" />
          <rect x="48" y="14" width="30" height="4" rx="0.5" fill="white" fillOpacity="0.3" />

          {/* Drag block */}
          <rect x="36" y="27" width="53" height="10" rx="1.5" fill="white" fillOpacity="0.05" stroke="#8B5CF6" strokeWidth="0.8" />
          <rect x="40" y="31" width="10" height="2" rx="0.5" fill="#8B5CF6" />
        </svg>
      )
    },
    {
      name: "BharatSuraksha.com",
      subtitle: "Crime Management System",
      period: "Oct 2023 – Feb 2024",
      gradient: "from-[#475569] to-[#3B82F6]",
      badges: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
      metrics: [
        "Online FIR submission + RBAC auth",
        "Optimized SQL schema, faster load time",
        "Secure digital cases workflow tracking"
      ],
      github: "https://github.com/Shivam4918/BharatSuraksha.com",
      live: "#",
      isFeatured: false,
      screenshot: "/images/BharatSuraksha.png",
      mockupSvg: (
        <svg viewBox="0 0 100 56.25" className="w-full h-full p-4 text-white opacity-80" xmlns="http://www.w3.org/2000/svg">
          {/* Top Panel bar */}
          <rect x="5" y="5" width="90" height="10" rx="2" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
          <rect x="10" y="8.5" width="15" height="3" rx="0.5" fill="#3B82F6" />
          
          {/* Table */}
          <rect x="5" y="20" width="90" height="31" rx="2" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.1" />
          
          {/* Header Row */}
          <line x1="5" y1="28" x2="95" y2="28" stroke="white" strokeWidth="0.8" strokeOpacity="0.1" />
          <rect x="10" y="23" width="12" height="2" rx="0.5" fill="white" fillOpacity="0.4" />
          <rect x="30" y="23" width="15" height="2" rx="0.5" fill="white" fillOpacity="0.4" />
          <rect x="60" y="23" width="10" height="2" rx="0.5" fill="white" fillOpacity="0.4" />

          {/* Rows */}
          <line x1="5" y1="36" x2="95" y2="36" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
          <rect x="10" y="31" width="8" height="2" rx="0.5" fill="white" fillOpacity="0.2" />
          <rect x="30" y="31" width="22" height="2" rx="0.5" fill="white" fillOpacity="0.2" />
          <rect x="60" y="31" width="8" height="3" rx="1" fill="emerald" fillOpacity="0.2" />

          <line x1="5" y1="44" x2="95" y2="44" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
          <rect x="10" y="39" width="8" height="2" rx="0.5" fill="white" fillOpacity="0.2" />
          <rect x="30" y="39" width="25" height="2" rx="0.5" fill="white" fillOpacity="0.2" />
          <rect x="60" y="39" width="8" height="3" rx="1" fill="red" fillOpacity="0.2" />
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Background glow orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-cyan-400/5 dark:bg-[#06B6D4]/5 filter blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-400/5 dark:bg-[#6366F1]/5 filter blur-[90px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <span className="mono-font text-xs text-[#06B6D4] tracking-widest uppercase mb-2 block">// portfolio creations</span>
          <h2 className="heading-font text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-[#6366F1] mt-5 rounded-full" />
        </motion.div>

        {/* Responsive Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project, idx) => (
            <motion.div key={project.name} variants={cardVariants}>
              <ProjectCard project={project} isFeatured={project.isFeatured} theme={theme} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
