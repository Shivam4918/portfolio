import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function Contact() {
  const contactMethods = [
    {
      label: "Email",
      value: "shivam4918@gmail.com",
      href: "mailto:shivam4918@gmail.com",
      icon: "lucide:mail",
      colorClass: "text-[#6366F1]"
    },
    {
      label: "Phone",
      value: "+91 84694 28342",
      href: "tel:+918469428342",
      icon: "lucide:phone",
      colorClass: "text-[#06B6D4]"
    },
    {
      label: "LinkedIn",
      value: "prajapati-shivam-647465241",
      href: "https://linkedin.com/in/prajapati-shivam-647465241",
      icon: "lucide:linkedin",
      colorClass: "text-[#8B5CF6]"
    },
    {
      label: "GitHub",
      value: "Shivam4918",
      href: "https://github.com/Shivam4918",
      icon: "lucide:github",
      colorClass: "text-slate-200"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative Orb */}
      <div className="absolute bottom-[-10%] left-[50%] translate-x-[-50%] w-[500px] h-[300px] rounded-full bg-[#6366F1]/8 dark:bg-[#6366F1]/12 filter blur-[100px] pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="mono-font text-xs text-[#06B6D4] tracking-widest uppercase mb-2 block">// get in touch</span>
          <h2 className="heading-font text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's build something great
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-sans text-sm mt-4">
            Open to Backend Engineering Roles Across India
          </p>
          <div className="w-16 h-1 bg-[#6366F1] mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* 2x2 Glass Contact Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10"
        >
          {contactMethods.map((method) => (
            <a 
              key={method.label}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="glass-card-3d hover:border-[#6366F1]/50 p-5 flex items-center gap-4 text-left transition-all duration-300 hover:bg-[#6366F1]/5 glow-indigo-hover border-slate-200/50 dark:border-white/10"
            >
              <div className={`p-3 rounded-xl glass-card-3d border border-slate-200/50 dark:border-white/10 flex items-center justify-center ${method.colorClass}`}>
                <Icon icon={method.icon} className="text-lg" />
              </div>
              <div className="min-w-0">
                <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono tracking-wider">{method.label}</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white truncate font-sans mt-0.5">{method.value}</p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Big Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <a 
            href="/Resume1.pdf" 
            download="Prajapati_Shivam_Resume.pdf"
            className="inline-flex h-12 px-8 rounded-full bg-[#6366F1] hover:bg-[#6366F1]/90 text-white font-mono text-sm font-bold items-center justify-center gap-2.5 transition-all glow-indigo active:scale-95 cursor-pointer"
          >
            <Icon icon="lucide:download" className="text-base" />
            <span>DOWNLOAD RESUME</span>
          </a>
        </motion.div>

        {/* Footer info & Credits */}
        <footer className="pt-10 border-t border-slate-200/50 dark:border-white/5 flex flex-col items-center justify-center gap-4 text-center">
          
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 dark:text-slate-500 font-mono text-[11px]">
            <p>© {new Date().getFullYear()} Prajapati Shivam. All Rights Reserved · ❤ from Gujarat</p>
            <a href="#home" className="hover:text-[#6366F1] transition-colors flex items-center gap-1 group font-bold">
              <span>Back to Top</span>
              <Icon icon="lucide:arrow-up" className="text-[10px] group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </footer>

      </div>
    </section>
  );
}
