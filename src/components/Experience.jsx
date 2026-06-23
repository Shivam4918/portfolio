import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function Experience() {
  const bullets = [
    "Improved API response efficiency 15–20% — Django + DRF",
    "Reduced frontend-backend latency 15% via RESTful APIs",
    "Cut future dev effort 15% via clean code architecture",
    "Reduced code conflicts 10–15% using Git + GitHub"
  ];

  return (
    <section id="experience" className="py-24 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Background glow orbs */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-400/5 dark:bg-[#6366F1]/5 filter blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-400/5 dark:bg-[#06B6D4]/5 filter blur-[90px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <span className="mono-font text-xs text-[#06B6D4] tracking-widest uppercase mb-2 block">// work experience</span>
          <h2 className="heading-font text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Professional Track
          </h2>
          <div className="w-16 h-1 bg-[#6366F1] mt-5 rounded-full" />
        </motion.div>

        {/* Experience Glass Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full relative pl-0.5 rounded-[20px] overflow-hidden bg-gradient-to-r from-[#6366F1]/60 to-transparent shadow-xl"
        >
          {/* Card Body */}
          <div className="w-full glass-card-3d border border-slate-200/50 dark:border-white/10 p-8 md:p-10 relative z-10 glow-indigo-hover transition-all duration-300">
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/50 dark:border-white/10 pb-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl glass-card-3d text-[#6366F1] border border-slate-200/50 dark:border-white/10 flex items-center justify-center glow-indigo">
                  <Icon icon="lucide:briefcase" className="text-2xl" />
                </div>
                <div>
                  <h3 className="heading-font text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">Software Development Intern</h3>
                  <div className="text-base text-[#06B6D4] font-medium mt-1">AccioJob Pvt. Ltd.</div>
                </div>
              </div>

              {/* Badges / Meta info */}
              <div className="flex flex-col sm:items-start md:items-end gap-2">
                <span className="glass-card-3d px-4 py-1.5 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-white/10 font-bold">
                  Jan 2026 – Mar 2026
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                  <Icon icon="lucide:map-pin" className="text-slate-400 dark:text-slate-500" />
                  On-site (Parul University Campus)
                </span>
              </div>
            </div>

            {/* Bullets List */}
            <ul className="space-y-4">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3.5 text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
                  <Icon icon="lucide:check-circle-2" className="text-[#06B6D4] text-lg flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
