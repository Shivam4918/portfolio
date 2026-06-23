import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function Certifications() {
  const certificationsData = [
    {
      title: "Data Science using Python",
      issuer: "SWAYAM MHRD",
      year: "2023",
      icon: "lucide:award",
      colorClass: "text-[#6366F1] bg-[#6366F1]/10 border-[#6366F1]/20",
      glowClass: "glow-indigo"
    },
    {
      title: "Software Development",
      issuer: "LinkedIn Learning",
      year: "2024",
      icon: "lucide:shield-check",
      colorClass: "text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20",
      glowClass: "glow-cyan"
    },
    {
      title: "Power BI",
      issuer: "Microsoft Certification",
      year: "2024",
      icon: "lucide:activity",
      colorClass: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20",
      glowClass: "glow-indigo"
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-transparent text-slate-900 dark:text-white relative border-t border-slate-200/50 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-font text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Credentials & Licenses
          </h2>
          <div className="w-10 h-0.5 bg-[#6366F1] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Scroll Row */}
        <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scrollbar-none scroll-smooth">
          {certificationsData.map((cert, idx) => (
            <motion.div 
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex-shrink-0 w-80 snap-center glass-card-3d hover:border-[#6366F1]/50 p-5 flex items-start gap-4 shadow-md transition-all duration-300 border-slate-200/50 dark:border-white/10"
            >
              {/* Icon */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-center flex-shrink-0 border-slate-200/50 dark:border-white/10 ${cert.colorClass} ${cert.glowClass}`}>
                <Icon icon={cert.icon} className="text-xl" />
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="heading-font text-sm font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug">
                  {cert.title}
                </h3>
                <div className="flex items-center justify-between gap-2 mt-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="truncate">{cert.issuer}</span>
                  <span className="flex-shrink-0 text-slate-400 dark:text-slate-500 font-bold">{cert.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
