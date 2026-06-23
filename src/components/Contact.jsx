import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    topic: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!emailRx.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.topic) {
      newErrors.topic = "Please select a topic.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please write a message.";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Please write a message (at least 20 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);
    setStatus({ type: '', message: '' });

    const topicLabels = {
      job: "Job Opportunity",
      internship: "Internship Inquiry",
      freelance: "Freelance Project",
      collab: "Collaboration",
      research: "Research Paper",
      other: "General Inquiry"
    };

    const selectedTopicLabel = topicLabels[formData.topic] || "General Inquiry";
    const subject = `[${selectedTopicLabel}] ${formData.company ? `at ${formData.company}` : '(Personal)'}`;

    try {
      const response = await fetch('https://portfolio-backend-2ayd.onrender.com/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: subject,
          message: formData.message.trim()
        })
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: "Message sent! I'll get back to you within 24 hours."
        });
        setFormData({
          name: '',
          company: '',
          email: '',
          topic: '',
          message: ''
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        let errorMsg = "Something went wrong. Please email me directly.";
        if (response.status === 429) {
          errorMsg = "Too many submissions. Please try again later.";
        } else if (Object.keys(errorData).length > 0) {
          errorMsg = Object.values(errorData).flat().join(' | ');
        }
        throw new Error(errorMsg);
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || "Something went wrong. Please email me directly at shivam4918@gmail.com"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative Orb */}
      <div className="absolute bottom-[-10%] left-[50%] translate-x-[-50%] w-[500px] h-[300px] rounded-full bg-[#6366F1]/8 dark:bg-[#6366F1]/12 filter blur-[100px] pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="mono-font text-xs text-[#06B6D4] tracking-widest uppercase mb-2 block">// get in touch</span>
          <h2 className="heading-font text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's build something great
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-sans text-sm mt-4">
            Open to Backend Engineering Roles Across India. Drop a message and I'll reply within 24 hours.
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

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto glass-card-3d border border-slate-200/50 dark:border-white/10 p-6 sm:p-8 rounded-[18px] text-left backdrop-blur-xl mb-12"
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-[11px] tracking-wider uppercase text-slate-500 dark:text-slate-400 font-semibold font-mono">
                  Name <span className="text-[#6366F1] font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Rahul Sharma"
                  autoComplete="name"
                  className={`w-full bg-white/3 border ${errors.name ? 'border-red-500' : 'border-slate-200/50 dark:border-white/10'} rounded-lg px-3.5 py-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 focus:border-[#6366F1] focus:bg-[#6366F1]/5 focus:ring-4 focus:ring-[#6366F1]/10`}
                />
                {errors.name && (
                  <span className="text-[11px] text-red-400 font-sans mt-0.5">{errors.name}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="text-[11px] tracking-wider uppercase text-slate-500 dark:text-slate-400 font-semibold font-mono">
                  Company / College
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Acme Corp"
                  autoComplete="organization"
                  className="w-full bg-white/3 border border-slate-200/50 dark:border-white/10 rounded-lg px-3.5 py-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 focus:border-[#6366F1] focus:bg-[#6366F1]/5 focus:ring-4 focus:ring-[#6366F1]/10"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[11px] tracking-wider uppercase text-slate-500 dark:text-slate-400 font-semibold font-mono">
                Email <span className="text-[#6366F1] font-bold">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="rahul@company.com"
                autoComplete="email"
                className={`w-full bg-white/3 border ${errors.email ? 'border-red-500' : 'border-slate-200/50 dark:border-white/10'} rounded-lg px-3.5 py-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 focus:border-[#6366F1] focus:bg-[#6366F1]/5 focus:ring-4 focus:ring-[#6366F1]/10`}
              />
              {errors.email && (
                <span className="text-[11px] text-red-400 font-sans mt-0.5">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="topic" className="text-[11px] tracking-wider uppercase text-slate-500 dark:text-slate-400 font-semibold font-mono">
                Topic <span className="text-[#6366F1] font-bold">*</span>
              </label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className={`w-full bg-white/3 border ${errors.topic ? 'border-red-500' : 'border-slate-200/50 dark:border-white/10'} rounded-lg px-3.5 py-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 focus:border-[#6366F1] focus:bg-[#6366F1]/5 focus:ring-4 focus:ring-[#6366F1]/10 cursor-pointer`}
              >
                <option value="" disabled className="bg-[#151828] text-slate-400">Select a topic…</option>
                <option value="job" className="bg-[#151828] text-slate-100">Job opportunity / full-time role</option>
                <option value="internship" className="bg-[#151828] text-slate-100">Internship</option>
                <option value="freelance" className="bg-[#151828] text-slate-100">Freelance / contract project</option>
                <option value="collab" className="bg-[#151828] text-slate-100">Open source collaboration</option>
                <option value="research" className="bg-[#151828] text-slate-100">Research / paper co-authorship</option>
                <option value="other" className="bg-[#151828] text-slate-100">Something else</option>
              </select>
              {errors.topic && (
                <span className="text-[11px] text-red-400 font-sans mt-0.5">{errors.topic}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[11px] tracking-wider uppercase text-slate-500 dark:text-slate-400 font-semibold font-mono">
                Message <span className="text-[#6366F1] font-bold">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Hi Shivam, I came across your MedQueue AI project and would love to discuss a backend role at…"
                maxLength={1000}
                rows={5}
                className={`w-full bg-white/3 border ${errors.message ? 'border-red-500' : 'border-slate-200/50 dark:border-white/10'} rounded-lg px-3.5 py-3 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 focus:border-[#6366F1] focus:bg-[#6366F1]/5 focus:ring-4 focus:ring-[#6366F1]/10 resize-y min-h-[120px]`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.message ? (
                  <span className="text-[11px] text-red-400 font-sans">{errors.message}</span>
                ) : (
                  <div />
                )}
                <span className={`text-[11px] font-mono ${formData.message.length > 850 ? 'text-[#F59E0B]' : 'text-slate-500'}`}>
                  {formData.message.length} / 1000
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full mt-4 px-6 py-3.5 bg-[#6366F1] hover:bg-[#4f46e5] text-white rounded-full text-xs font-bold font-mono tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <Icon icon="lucide:send" className="text-sm" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {status.message && (
              <div className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs mt-4 border ${
                status.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                <Icon 
                  icon={status.type === 'success' ? "lucide:check-circle" : "lucide:alert-circle"} 
                  className="text-base flex-shrink-0" 
                />
                <span>{status.message}</span>
              </div>
            )}

          </form>

          <p className="text-center font-sans text-xs text-slate-500 dark:text-slate-400 mt-6 pt-6 border-t border-slate-200/50 dark:border-white/5">
            Or email me directly at{' '}
            <a href="mailto:shivam4918@gmail.com" className="text-[#6366F1] hover:underline font-semibold">
              shivam4918@gmail.com
            </a>
          </p>
        </motion.div>

        {/* Big Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-16 text-center"
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

