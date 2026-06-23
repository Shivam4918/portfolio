import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Icon } from '@iconify/react';

// Counter component that runs on view
const CountUpStat = ({ target, label, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const numTarget = parseFloat(target);
      if (isNaN(numTarget)) {
        setValue(target); // Fallback for string-based targets
        return;
      }

      let start = 0;
      const duration = 2; // seconds
      const steps = 60;
      const increment = numTarget / steps;
      const stepTime = (duration * 1000) / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        start += increment;
        if (currentStep >= steps) {
          setValue(numTarget);
          clearInterval(timer);
        } else {
          setValue(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  const displayVal = typeof value === 'number' 
    ? value.toLocaleString(undefined, { 
        minimumFractionDigits: target.includes('.') ? 2 : 0, 
        maximumFractionDigits: target.includes('.') ? 2 : 0 
      })
    : value;

  return (
    <div ref={ref} className="glass-card-3d hover:border-[#6366F1]/50 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 glow-indigo-hover border-slate-200/50 dark:border-white/10">
      <h3 className="heading-font text-4xl font-extrabold text-[#6366F1] mb-2 tracking-tight">
        {prefix}{displayVal}{suffix}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 font-sans text-xs tracking-wide uppercase">{label}</p>
    </div>
  );
};

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="py-24 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Background glow orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-violet-400/5 dark:bg-purple-500/5 filter blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-indigo-400/5 dark:bg-[#6366F1]/5 filter blur-[90px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <span className="mono-font text-xs text-[#06B6D4] tracking-widest uppercase mb-2 block">// about me</span>
          <h2 className="heading-font text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Backend Engineer by choice, Problem Solver by nature
          </h2>
          <div className="w-16 h-1 bg-[#6366F1] mt-5 rounded-full" />
        </motion.div>

        {/* Section Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Text / Timeline - 7/12 width */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-7 space-y-8"
          >
            <motion.p variants={itemVariants} className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans text-base">
              I am an MCA student and backend engineer specializing in building high-performance APIs, transactional systems, and event-driven architectures. Passionate about object-oriented programming, clean code patterns, and database query optimizations, I build backend solutions that help products scale efficiently.
            </motion.p>

            {/* Education timeline */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="heading-font text-lg font-bold text-[#06B6D4] flex items-center gap-2">
                <Icon icon="lucide:graduation-cap" className="text-xl" />
                Academic Background
              </h3>

              <div className="relative pl-6 border-l-2 border-[#6366F1]/30 space-y-8">
                
                {/* MCA Card */}
                <div className="relative">
                  <div className="absolute w-3.5 h-3.5 rounded-full bg-[#6366F1] -left-[33px] top-1.5 glow-indigo" />
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="glass-card-3d px-3 py-1 font-mono text-[10px] text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-white/10">
                      2024 – 2026
                    </span>
                    <span className="text-xs text-[#06B6D4] font-mono">MCA Post Graduate</span>
                  </div>
                  <h4 className="heading-font text-base font-extrabold text-slate-900 dark:text-white">Master of Computer Applications</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-sans mt-1">Parul Institute of Engineering & Technology, Vadodara</p>
                  <p className="text-xs text-[#6366F1] font-mono mt-1 font-semibold">CGPA: 8.88 / 10</p>
                </div>

                {/* BCA Card */}
                <div className="relative">
                  <div className="absolute w-3.5 h-3.5 rounded-full bg-[#06B6D4] -left-[33px] top-1.5 glow-cyan" />
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="glass-card-3d px-3 py-1 font-mono text-[10px] text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-white/10">
                      2021 – 2024
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">BCA Graduate</span>
                  </div>
                  <h4 className="heading-font text-base font-extrabold text-slate-900 dark:text-white">Bachelor of Computer Application</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-sans mt-1">Veer Narmad South Gujarat University, Surat</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">CGPA: 7.59 / 10</p>
                </div>

              </div>
            </motion.div>
          </motion.div>

          {/* Right Stats Grid - 5/12 width */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <CountUpStat target="8.88" label="MCA CGPA" />
            <CountUpStat target="50" prefix="40–" suffix="%" label="Wait Time Reduced" />
            <CountUpStat target="20" prefix="15–" suffix="%" label="API Efficiency Imp." />
            <CountUpStat target="3" label="Live Projects" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
