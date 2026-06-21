// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Run all features
    initCustomCursor();
    initCanvasParticles();
    initTypingEffect();
    initScrollEffects();
    initTiltEffect();
    initProjectModals();
    initContactForm();
    initMobileNav();
    initSkillsTypewriter();
});

/* ==========================================================================
   Custom Cursor Trail
   ========================================================================== */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Lerp coefficient for smooth delay (0.1 means 10% speed towards cursor)
    const speed = 0.12;
    let active = false;

    window.addEventListener('mousemove', (e) => {
        if (!active) {
            document.body.classList.add('cursor-active');
            active = true;
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for the core dot
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    // Custom animation loop for the lagging outline
    function animateOutline() {
        // Interpolation logic: CurrentPos += (TargetPos - CurrentPos) * Speed
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;

        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effect styles on interactive items
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag-item, .cert-card, .timeline-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
        active = false;
    });
}

/* ==========================================================================
   Interactive Canvas Particles Background
   ========================================================================== */
function initCanvasParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
        x: null,
        y: null,
        radius: 120 // Interaction boundary
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.baseSize = size;
        }

        // Draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Update positions and handle collisions/boundaries
        update() {
            // Check canvas edges
            if (this.x > width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Mouse interaction (repulsion)
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    // Push particles away
                    const pushX = (dx / distance) * force * 3;
                    const pushY = (dy / distance) * force * 3;
                    this.x -= pushX;
                    this.y -= pushY;
                    
                    // Temporarily expand glowing size
                    this.size = this.baseSize * (1 + force * 1.5);
                } else if (this.size > this.baseSize) {
                    this.size -= 0.1;
                }
            } else if (this.size > this.baseSize) {
                this.size -= 0.1;
            }

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;
            
            this.draw();
        }
    }

    // Initialize particle array
    function initParticles() {
        particlesArray = [];
        // Particle density proportional to screen area
        const numberOfParticles = Math.floor((width * height) / 9000);
        const maxParticles = Math.min(numberOfParticles, 120); // Cap at 120 to keep CPU usages lightweight
        
        for (let i = 0; i < maxParticles; i++) {
            let size = Math.random() * 2 + 1;
            let x = Math.random() * (width - size * 2) + size;
            let y = Math.random() * (height - size * 2) + size;
            
            // Speed vectors
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            
            // Randomly pick Indigo/Teal accent colors with semi-transparency
            const colorOptions = [
                'rgba(99, 102, 241, 0.25)', // Indigo
                'rgba(20, 184, 166, 0.25)', // Teal
                'rgba(217, 70, 239, 0.15)'  // Fuchsia
            ];
            let color = colorOptions[Math.floor(Math.random() * colorOptions.length)];

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Core Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        
        connectParticles();
        requestAnimationFrame(animate);
    }

    // Draw lines between close particles
    function connectParticles() {
        let maxDistance = 100;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    // Line opacity drops off with distance
                    let alpha = (1 - (distance / maxDistance)) * 0.12;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    initParticles();
    animate();
}

/* ==========================================================================
   Dynamic Typing Effect
   ========================================================================== */
function initTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const phrases = [
        "Python & Django Developer",
        "Backend & API Engineer",
        "Machine Learning Enthusiast"
    ];
    
    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            textElement.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // State changes
        if (!isDeleting && characterIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1800; // Pause at the end of word
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typingSpeed);
    }
    
    type();
}

/* ==========================================================================
   Scroll Progress, Header Scrolled, Scroll-Spy, and Reveal
   ========================================================================== */
function initScrollEffects() {
    const header = document.querySelector('.main-header');
    const scrollProgress = document.getElementById('scroll-progress');
    const navLinks = document.querySelectorAll('.nav-link');
    const revealItems = document.querySelectorAll('.reveal-item');
    const sections = document.querySelectorAll('section');

    // Scroll progress & Header status
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Reveal items on scroll (IntersectionObserver)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally unobserve after animating
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // Active Navigation scroll spy (IntersectionObserver)
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.35,
        rootMargin: '-10% 0px -40% 0px'
    });

    sections.forEach(section => {
        spyObserver.observe(section);
    });
}

/* ==========================================================================
   3D Tilt Effect on Project Cards
   ========================================================================== */
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    // Skip on touch devices to avoid lagging/choppy scrolling
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    cards.forEach(card => {
        const inner = card.querySelector('.project-card-inner');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Mouse coordinates relative to card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Custom CSS variables for hover glow gradient tracking
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);

            // Rotation angle math
            const width = rect.width;
            const height = rect.height;
            const centerX = width / 2;
            const centerY = height / 2;
            
            // Limit maximum tilt to 8 degrees
            const maxTilt = 8;
            const rotateX = ((centerY - y) / centerY) * maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

/* ==========================================================================
   Project Detail Modals
   ========================================================================== */
const projectData = {
    medqueue: {
        title: "MedQueue AI",
        duration: "Jan 2026 - Apr 2026",
        summary: "Real-Time Hospital Queue Management System featuring AI wait-time predictions.",
        description: "A highly scalable hospital system designed to manage and optimize queue states. It integrates machine learning modules with real-time syncing architectures to cut patient wait times and optimize workflows.",
        bullets: [
            "Developed an AI-powered queue tracker using Django, DRF, and database backends, which <strong>reduced patient waiting times by 40-50%</strong>.",
            "Created a real-time event pipeline using <strong>WebSockets and Redis</strong>, ensuring live updates are broadcasted to all terminals and client dashboards instantly.",
            "Engineered predictive machine learning modules using <strong>Random Forest and LightGBM</strong> to forecast patient processing times based on doctor capacity and case histories.",
            "Optimized query performance for high concurrent loads using Redis caches and schemaindexing, ensuring reliable sub-second responses."
        ],
        tags: ["Django", "Django REST Framework", "MySQL", "MongoDB", "Redis", "WebSockets", "Machine Learning", "LightGBM"],
        link: "#"
    },
    portfoliocraft: {
        title: "PortfolioCraft",
        duration: "Jul 2025 - Oct 2025",
        summary: "AI Powered Portfolio Builder enabling dynamic site generation from CV parsing.",
        description: "A web builder that automatically structures, writes, and deploys professional portfolios. By integrating generative AI, users can upload a CV and directly receive a fully customized, styled website in seconds.",
        bullets: [
            "Engineered a <strong>Flask-based backend</strong> with modular Python service workers to execute PDF text parsing and parsing.",
            "Integrated <strong>Google Gemini API</strong> to run structured data extractions on raw CV texts to identify projects, skills, education, and roles.",
            "Designed a responsive drag-and-drop website editor using <strong>SortableJS and Tailwind CSS</strong>, allowing custom sorting and saving layout changes instantly.",
            "Configured secure REST API endpoints enabling dynamic page previews, templates selection, and data exports."
        ],
        tags: ["Flask", "Python", "Google Gemini API", "SortableJS", "Tailwind CSS", "SQLite"],
        link: "#"
    },
    bharatsuraksha: {
        title: "BharatSuraksha.com",
        duration: "Oct 2023 - Feb 2024",
        summary: "Scalable Crime Management System featuring online reporting portals.",
        description: "A digital policing workspace designed to streamline crime report logging, case management, and investigation status updates. It replaces slow offline pipelines with role-based dashboard control.",
        bullets: [
            "Developed the core portal using <strong>PHP, MySQL, and JavaScript</strong>, supporting FIR submissions, media uploads, and case logs.",
            "Implemented strict <strong>Role-Based Access Control (RBAC)</strong> defining workflows for Citizens, Officers, and Admins.",
            "Optimized database schema design and SQL query patterns, resulting in faster load times and secure database sessions.",
            "Styled the responsive dashboard interface using Bootstrap, ensuring compatibility on mobile policing terminals."
        ],
        tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "RBAC", "Crime Management"],
        link: "#"
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body-content');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    if (!modal || !modalClose || !modalBody) return;

    // Helper to convert markdown **bold** to <strong>bold</strong>
    const formatMarkdown = (text) => {
        if (!text) return '';
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    // Open Modal Handlers
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project-id');
            const data = projectData[projectId];

            if (data) {
                // Populate Modal Markup
                modalBody.innerHTML = `
                    <h3 class="modal-detail-title">${data.title}</h3>
                    <span class="modal-detail-date">${data.duration}</span>
                    
                    <p class="modal-detail-desc">${formatMarkdown(data.description)}</p>
                    
                    <h4 class="modal-section-title">Key Contributions</h4>
                    <ul class="modal-bullets">
                        ${data.bullets.map(b => `
                            <li>
                                <i data-lucide="check"></i>
                                <span>${formatMarkdown(b)}</span>
                            </li>
                        `).join('')}
                    </ul>
                    
                    <h4 class="modal-section-title">Technologies Used</h4>
                    <div class="modal-tech-list">
                        ${data.tags.map(t => `<span class="modal-tech-item">${t}</span>`).join('')}
                    </div>

                    ${data.link && data.link !== '#' ? `
                        <a href="${data.link}" target="_blank" class="btn btn-primary">
                            <span>Visit Live Project</span>
                            <i data-lucide="external-link" class="btn-icon"></i>
                        </a>
                    ` : ''}
                `;
                
                // Initialize new icons rendered in modal
                if (window.lucide) {
                    window.lucide.createIcons();
                }

                // Show modal overlay
                modal.classList.add('open');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Stop body scrolling
            }
        });
    });

    // Close Modal Functions
    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Resume body scrolling
    };

    modalClose.addEventListener('click', closeModal);
    
    // Close on clicking outside container
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   Contact Form Validation & Sim Submissions
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Helper to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Helper to validate email format
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Gather and trim inputs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        // 2. Client-side Validations
        if (!name) {
            showToast("Name is required.", "error");
            nameInput.focus();
            return;
        }
        if (name.length < 2 || name.length > 100) {
            showToast("Name must be between 2 and 100 characters.", "error");
            nameInput.focus();
            return;
        }

        if (!email) {
            showToast("Email address is required.", "error");
            emailInput.focus();
            return;
        }
        if (!validateEmail(email)) {
            showToast("Please enter a valid email address.", "error");
            emailInput.focus();
            return;
        }

        if (!subject) {
            showToast("Subject is required.", "error");
            subjectInput.focus();
            return;
        }
        if (subject.length < 5 || subject.length > 200) {
            showToast("Subject must be between 5 and 200 characters.", "error");
            subjectInput.focus();
            return;
        }

        if (!message) {
            showToast("Message is required.", "error");
            messageInput.focus();
            return;
        }
        if (message.length < 10 || message.length > 2000) {
            showToast("Message must be between 10 and 2000 characters.", "error");
            messageInput.focus();
            return;
        }

        // 3. UI Loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span><span>Sending...</span>';

        // 4. API Request
        try {
            const csrfToken = getCookie('csrftoken');
            const headers = {
                'Content-Type': 'application/json'
            };
            if (csrfToken) {
                headers['X-CSRFToken'] = csrfToken;
            }

            const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? ''
                : 'https://portfolio-backend-2ayd.onrender.com';

            const response = await fetch(`${apiBase}/api/contact/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name, email, subject, message })
            });

            const data = await response.json();

            if (response.ok) {
                // Success Flow
                showToast("Message sent successfully! Thank you.", "success");
                form.reset();
            } else {
                // Backend validation or rate limiting failure
                let errorMsg = "Failed to send message. Please try again.";
                if (response.status === 429) {
                    errorMsg = "Too many submissions. Please try again later.";
                } else if (data) {
                    // Extract error messages from DRF response
                    const errors = [];
                    for (const key in data) {
                        if (Array.isArray(data[key])) {
                            errors.push(`${key}: ${data[key].join(', ')}`);
                        } else {
                            errors.push(data[key]);
                        }
                    }
                    if (errors.length > 0) {
                        errorMsg = errors.join(' | ');
                    }
                }
                showToast(errorMsg, "error");
            }
        } catch (error) {
            console.error(error);
            showToast("Network error. Please check your internet connection.", "error");
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    });
}

// Global Toast notification system
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconSvg = type === 'success' 
        ? `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
        : `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `
        ${iconSvg}
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
        toast.classList.add('toast-out');
        // Wait for transitions to finish before removing from DOM
        toast.addEventListener('transitionend', () => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        });
    }, 5000);
}

/* ==========================================================================
   Mobile Nav Menu Overlay Drawer
   ========================================================================== */
function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
        const isOpen = menu.classList.contains('open');
        toggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    // Close when clicking nav items
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('open')) {
                menu.classList.remove('open');
                toggle.innerHTML = '<i data-lucide="menu"></i>';
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            }
        });
    });

    // Close menu when resizing past breaking limits
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menu.classList.contains('open')) {
            menu.classList.remove('open');
            toggle.innerHTML = '<i data-lucide="menu"></i>';
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }
    });
}

/* ==========================================================================
   IDE Skills Typewriter Effect
   ========================================================================== */
function initSkillsTypewriter() {
    const container = document.getElementById('skills-list');
    if (!container) return;
    
    const skills = ["Python", "Django", "DRF", "Flask", "SQL", "JavaScript", "Docker", "Git"];
    let currentHTML = '';
    let skillIndex = 0;
    let charIndex = 0;
    
    function typeNextChar() {
        if (skillIndex < skills.length) {
            const skill = skills[skillIndex];
            
            if (charIndex === 0) {
                // Prepend string highlight span
                currentHTML += '<span class="code-string">"';
            }
            
            if (charIndex < skill.length) {
                // Type character
                currentHTML += skill[charIndex];
                charIndex++;
                container.innerHTML = currentHTML + '"</span>';
                setTimeout(typeNextChar, 60 + Math.random() * 40); // Natural typewriter speed
            } else {
                // Finished a word, add closing quote and comma
                container.innerHTML = currentHTML + '"</span>';
                skillIndex++;
                charIndex = 0;
                
                if (skillIndex < skills.length) {
                    currentHTML += '"</span>, ';
                    // For formatting: wrap to next line on the 4th skill
                    if (skillIndex === 4) {
                        currentHTML += '\n        ';
                    }
                    setTimeout(typeNextChar, 250); // Pause before next word
                } else {
                    // Fully done typing all skills
                    container.innerHTML = currentHTML + '</span>';
                }
            }
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeNextChar, 1000);
}
