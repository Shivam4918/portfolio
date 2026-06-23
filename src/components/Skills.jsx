import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Backend",
      icon: "lucide:server",
      pillsColorClass: "bg-[#6366F1]/10 text-[#6366F1] dark:text-[#a5b4fc] border-[#6366F1]/20",
      skills: ["Python", "Django", "DRF", "Flask", "REST API", "OOP"]
    },
    {
      title: "Database",
      icon: "lucide:database",
      pillsColorClass: "bg-[#06B6D4]/10 text-[#06B6D4] dark:text-[#67e8f9] border-[#06B6D4]/20",
      skills: ["MySQL", "SQLite", "MongoDB", "PostgreSQL"]
    },
    {
      title: "Frontend",
      icon: "lucide:layout",
      pillsColorClass: "bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-[#c084fc] border-[#8B5CF6]/20",
      skills: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "SortableJS"]
    },
    {
      title: "DevOps",
      icon: "lucide:git-branch",
      pillsColorClass: "bg-[#F59E0B]/10 text-[#F59E0B] dark:text-[#fde047] border-[#F59E0B]/20",
      skills: ["Git", "GitHub", "Docker", "Power BI"]
    },
    {
      title: "AI / ML",
      icon: "lucide:brain",
      pillsColorClass: "bg-purple-500/10 text-purple-500 dark:text-purple-300 border-purple-500/20",
      skills: ["Random Forest", "LightGBM", "Predictive Analytics"]
    },
    {
      title: "Concepts",
      icon: "lucide:puzzle",
      pillsColorClass: "bg-teal-500/10 text-teal-500 dark:text-teal-300 border-teal-500/20",
      skills: ["System Design", "RBAC", "API Design", "OOP"]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="skills" className="py-24 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Background glow orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-purple-400/5 dark:bg-purple-500/5 filter blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-teal-400/5 dark:bg-teal-500/5 filter blur-[90px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <span className="mono-font text-xs text-[#06B6D4] tracking-widest uppercase mb-2 block">// system capabilities</span>
          <h2 className="heading-font text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical Expertise
          </h2>
          <div className="w-16 h-1 bg-[#6366F1] mt-5 rounded-full" />
        </motion.div>

        {/* Skills Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((cat) => (
            <motion.div 
              key={cat.title} 
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="glass-card-3d hover:border-[#6366F1]/40 p-7 relative transition-all duration-300 glow-indigo-hover flex flex-col justify-between border-slate-200/50 dark:border-white/10"
            >
              <div>
                {/* Header with Icon and Title */}
                <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/10 pb-4 mb-5">
                  <div className="p-3 rounded-2xl glass-card-3d text-[#06B6D4] border border-slate-200/50 dark:border-white/10 flex items-center justify-center glow-cyan">
                    <Icon icon={cat.icon} className="text-xl" />
                  </div>
                  <h3 className="heading-font text-lg font-extrabold text-slate-800 dark:text-white tracking-wide uppercase">{cat.title}</h3>
                </div>

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className={`text-xs font-mono font-medium px-3.5 py-1.5 rounded-xl border transition-colors ${cat.pillsColorClass}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
