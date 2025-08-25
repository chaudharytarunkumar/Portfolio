// ==========================================================================
// AI-Themed Portfolio JavaScript
// Interactive functionality for modern portfolio website
// ==========================================================================

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navOverlay = document.getElementById('nav-overlay');
const hireModal = document.getElementById('hire-modal');
const projectModal = document.getElementById('project-modal');
const contactForm = document.getElementById('contact-form');

// ==========================================================================
// Theme Management
// ==========================================================================

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    bindEvents() {
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// ==========================================================================
// Navigation Management
// ==========================================================================

class NavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setActiveNavLink();
        this.initScrollHighlighting();
        this.initTypingAnimation();
    }

    initTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (typingElement) {
            // Restart typing animation on page load
            setTimeout(() => {
                typingElement.style.animation = 'none';
                typingElement.offsetHeight; // Trigger reflow
                typingElement.style.animation = 'typing 3s steps(16, end), blink-cursor 0.75s step-end infinite';

                // Add completion class after typing finishes
                setTimeout(() => {
                    typingElement.classList.add('completed');
                }, 3500);
            }, 500);
        }
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active', this.isMenuOpen);
        if (navOverlay) {
            navOverlay.classList.toggle('active', this.isMenuOpen);
        }
        this.updateMenuIcon();
        this.updateAriaExpanded();
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        navMenu.classList.remove('active');
        if (navOverlay) {
            navOverlay.classList.remove('active');
        }
        this.updateMenuIcon();
        this.updateAriaExpanded();
    }

    updateMenuIcon() {
        const icon = navToggle.querySelector('i');
        if (this.isMenuOpen) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }

    updateAriaExpanded() {
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', this.isMenuOpen.toString());
        }
    }

    setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    initScrollHighlighting() {
        // Only apply on homepage
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            const sections = document.querySelectorAll('section[id], main section');
            const navLinks = document.querySelectorAll('.nav-link');

            window.addEventListener('scroll', () => {
                let current = '';

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id') || 'home';
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('scroll-active');
                    if (link.getAttribute('href') === 'index.html' &&
                        (current === '' || current === 'home')) {
                        link.classList.add('scroll-active');
                    }
                });
            });
        }
    }

    bindEvents() {
        if (navToggle) {
            navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close mobile menu when clicking overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', () => this.closeMobileMenu());
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
}

// ==========================================================================
// Neural Network Animation
// ==========================================================================

class NeuralNetworkAnimation {
    constructor(container) {
        this.container = container;
        this.nodes = [];
        this.connections = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        this.createCanvas();
        this.generateNodes();
        this.generateConnections();
        this.startAnimation();
        this.bindResize();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '1861px';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    generateNodes() {
        const nodeCount = 15;
        this.nodes = [];
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    generateConnections() {
        this.connections = [];
        const maxDistance = 150;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(this.nodes[i].x - this.nodes[j].x, 2) +
                    Math.pow(this.nodes[i].y - this.nodes[j].y, 2)
                );
                
                if (distance < maxDistance) {
                    this.connections.push({
                        from: i,
                        to: j,
                        distance: distance,
                        maxDistance: maxDistance
                    });
                }
            }
        }
    }

    updateNodes() {
        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x <= 0 || node.x >= this.canvas.width) node.vx *= -1;
            if (node.y <= 0 || node.y >= this.canvas.height) node.vy *= -1;
            
            // Keep within bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            
            // Update pulse
            node.pulse += 0.02;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections (Terminal Grid Style)
        this.connections.forEach(connection => {
            const nodeA = this.nodes[connection.from];
            const nodeB = this.nodes[connection.to];
            const distance = Math.sqrt(
                Math.pow(nodeA.x - nodeB.x, 2) +
                Math.pow(nodeA.y - nodeB.y, 2)
            );

            const opacity = 1 - (distance / connection.maxDistance);

            // Main terminal green lines
            this.ctx.beginPath();
            this.ctx.moveTo(nodeA.x, nodeA.y);
            this.ctx.lineTo(nodeB.x, nodeB.y);
            this.ctx.strokeStyle = `rgba(0, 255, 0, ${opacity * 0.6})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            // Add terminal glow effect
            this.ctx.beginPath();
            this.ctx.moveTo(nodeA.x, nodeA.y);
            this.ctx.lineTo(nodeB.x, nodeB.y);
            this.ctx.strokeStyle = `rgba(0, 255, 0, ${opacity * 0.2})`;
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        });

        // Draw nodes (Terminal Style)
        this.nodes.forEach(node => {
            const pulseSize = Math.sin(node.pulse) * 0.3 + 1;

            // Outer glow (terminal green)
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulseSize * 1.8, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
            this.ctx.fill();

            // Main node (bright terminal green)
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
            this.ctx.fill();

            // Inner core (bright green)
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulseSize * 0.4, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 255, 0, 1)';
            this.ctx.fill();

            // Terminal-style border
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.6)';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });
    }

    animate() {
        this.updateNodes();
        this.generateConnections();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    startAnimation() {
        this.animate();
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    bindResize() {
        window.addEventListener('resize', () => {
            this.resize();
            this.generateNodes();
        });
    }
}

// ==========================================================================
// Modal Management
// ==========================================================================

class ModalManager {
    constructor() {
        this.activeModal = null;
        this.bindEvents();
    }

    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            this.activeModal = modal;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }

    close(modalId = null) {
        const modal = modalId ? document.getElementById(modalId) : this.activeModal;
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.activeModal = null;
        }
    }

    bindEvents() {
        // Close modal when clicking overlay
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.close();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.close();
            }
        });

        // Close buttons
        document.querySelectorAll('.modal-close').forEach(button => {
            button.addEventListener('click', () => this.close());
        });
    }
}

// ==========================================================================
// Statistics Counter Animation
// ==========================================================================

class StatCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        this.init();
    }

    init() {
        if (this.counters.length > 0) {
            this.bindScroll();
        }
    }

    animateCounters() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;

        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * easeOutCubic);
                
                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target;
                }
            };

            requestAnimationFrame(animate);
        });
    }

    bindScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// ==========================================================================
// AI Assistant Functionality
// ==========================================================================

class AIAssistant {
    constructor() {
        this.speechBubble = document.getElementById('speech-bubble');
        this.messages = [
            "Welcome to my AI-powered portfolio!",
            "Let's explore the future of AI together!",
            "Ready to build intelligent solutions?",
            "Discover cutting-edge AI projects!",
            "Innovation meets intelligence here!"
        ];
        this.currentMessageIndex = 0;
        
        if (this.speechBubble) {
            this.init();
        }
    }

    init() {
        this.startMessageRotation();
    }

    updateMessage() {
        if (this.speechBubble) {
            const messageElement = this.speechBubble.querySelector('p');
            if (messageElement) {
                messageElement.style.opacity = '0';
                
                setTimeout(() => {
                    messageElement.textContent = this.messages[this.currentMessageIndex];
                    messageElement.style.opacity = '1';
                    this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
                }, 300);
            }
        }
    }

    startMessageRotation() {
        setInterval(() => {
            this.updateMessage();
        }, 4000);
    }
}

// ==========================================================================
// Project Filtering
// ==========================================================================

class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    filterProjects(category) {
        this.projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category');
            
            if (category === 'all' || (cardCategories && cardCategories.includes(category))) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    setActiveFilter(activeButton) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-filter');
                this.filterProjects(category);
                this.setActiveFilter(button);
            });
        });
    }
}

// ==========================================================================
// Skills Animation
// ==========================================================================

class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.hasAnimated = false;
        this.init();
    }

    init() {
        if (this.skillBars.length > 0) {
            this.bindScroll();
        }
    }

    animateSkills() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;

        this.skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = bar.style.width || '0%';
                bar.style.transition = 'width 1.5s ease';
            }, index * 100);
        });
    }

    bindScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkills();
                }
            });
        }, { threshold: 0.3 });

        const skillsSection = document.querySelector('.skills-matrix');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }
}

// ==========================================================================
// Contact Form Management
// ==========================================================================

class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.successMessage = document.getElementById('form-success');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Name is required';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Message is required';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                }
                break;
        }

        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = isValid ? 'none' : 'block';
        }

        field.style.borderColor = isValid ? '' : '#ff006e';
        return isValid;
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Create mailto link
        const subject = encodeURIComponent(data.subject || 'Contact Form Submission');
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n\n` +
            `Message:\n${data.message}`
        );
        
        const mailtoLink = `mailto:imtarunchaudharyy@gmail.com?subject=${subject}&body=${body}`;
        
        // Open mailto link
        window.location.href = mailtoLink;
        
        // Show success message
        this.showSuccess();
    }

    showSuccess() {
        this.form.style.display = 'none';
        this.successMessage.style.display = 'block';
        
        // Reset form after delay
        setTimeout(() => {
            this.form.reset();
            this.form.style.display = 'block';
            this.successMessage.style.display = 'none';
            
            // Clear any error messages
            const errorElements = this.form.querySelectorAll('.form-error');
            errorElements.forEach(error => {
                error.style.display = 'none';
            });
        }, 5000);
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                if (field.style.borderColor) {
                    this.validateField(field);
                }
            });
        });
    }
}

// ==========================================================================
// FAQ Management
// ==========================================================================

class FAQManager {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    toggleFAQ(faqItem) {
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        this.faqItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }

    bindEvents() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleFAQ(item));
        });
    }
}

// ==========================================================================
// Smooth Scrolling
// ==========================================================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                // Skip if href is just "#" (empty fragment identifier)
                if (href === '#') {
                    return;
                }

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ==========================================================================
// Intersection Observer for Animations
// ==========================================================================

class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1 }
        );
        this.init();
    }

    init() {
        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll(
            '.skill-card, .project-card, .timeline-item, .certification-card, .stat-item'
        );
        
        animatedElements.forEach(el => {
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// ==========================================================================
// Experience Page Management
// ==========================================================================

class ExperienceManager {
    constructor() {
        this.init();
    }

    init() {
        this.animateSkillBars();
        this.animateTimeline();
        this.initializeCareerPath();
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        if (skillBars.length === 0) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const skillBarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target;
                    const targetWidth = progress.style.width;
                    progress.style.width = '0%';
                    
                    setTimeout(() => {
                        progress.style.width = targetWidth;
                    }, 300);
                    
                    skillBarObserver.unobserve(progress);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => skillBarObserver.observe(bar));
    }

    animateTimeline() {
        const timelineItems = document.querySelectorAll('.experience-item');
        if (timelineItems.length === 0) return;

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px)';
            item.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
            timelineObserver.observe(item);
        });
    }

    initializeCareerPath() {
        const pathSteps = document.querySelectorAll('.path-step');
        if (pathSteps.length === 0) return;

        const pathObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    pathObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        pathSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-30px)';
            step.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            pathObserver.observe(step);
        });
    }
}

// ==========================================================================
// Global Functions (for HTML onclick handlers)
// ==========================================================================

function openHireModal() {
    modalManager.open('hire-modal');
}

function closeHireModal() {
    modalManager.close('hire-modal');
}

function openProjectDemo(projectName) {
    const demoTitle = document.getElementById('demo-title');
    const demoContent = document.getElementById('demo-content');
    
    if (demoTitle && demoContent) {
        demoTitle.textContent = `${projectName.charAt(0).toUpperCase() + projectName.slice(1)} Demo`;
        
        // Update demo content based on project
        let content = `
            <div class="demo-icon">
                <i class="fas fa-play-circle"></i>
            </div>
            <p>Demo will be available once the project is deployed to a live server.</p>
            <p>Visit the GitHub repository to see the complete source code and documentation.</p>
        `;
        
        if (projectName === 'pdfgenie') {
            content = `
                <div class="demo-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <h3>PDFGenie Chatbot Demo</h3>
                <p>This AI-powered PDF assistant can:</p>
                <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                    <li>Extract and summarize PDF content</li>
                    <li>Answer questions about the document</li>
                    <li>Convert text to speech</li>
                    <li>Provide intelligent document insights</li>
                </ul>
                <p><strong>Technologies:</strong> Python, OpenAI API, PyPDF2, pyttsx3</p>
            `;
        } else if (projectName === 'mytherapist') {
            content = `
                <div class="demo-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <h3>MyTherapist Chatbot Demo</h3>
                <p>This mental health support chatbot features:</p>
                <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                    <li>Emotion detection and analysis</li>
                    <li>Supportive conversation flow</li>
                    <li>Motivational content generation</li>
                    <li>Mental wellness resources</li>
                </ul>
                <p><strong>Technologies:</strong> Python, HuggingFace, Streamlit, NLP</p>
            `;
        }
        
        demoContent.innerHTML = content;
    }
    
    modalManager.open('project-modal');
}

function closeProjectDemo() {
    modalManager.close('project-modal');
}

function toggleFAQ(questionElement) {
    const faqItem = questionElement.closest('.faq-item');
    if (faqManager) {
        faqManager.toggleFAQ(faqItem);
    }
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');

    if (email) {
        // Create mailto link for newsletter subscription
        const subject = encodeURIComponent('Newsletter Subscription Request');
        const body = encodeURIComponent(`I would like to subscribe to your newsletter.\n\nEmail: ${email}\n\nThank you!`);
        const mailtoLink = `mailto:imtarunchaudharyy@gmail.com?subject=${subject}&body=${body}`;

        // Open mailto link
        window.location.href = mailtoLink;

        // Show success message
        alert('Thank you for subscribing! Your email client should now open with a subscription request.');

        // Reset form
        event.target.reset();
    }
}

// ==========================================================================
// Initialization
// ==========================================================================

// Global instances
let themeManager;
let navigationManager;
let modalManager;
let neuralNetwork;
let statCounter;
let aiAssistant;
let projectFilter;
let skillsAnimation;
let contactFormManager;
let faqManager;
let smoothScroll;
let animationObserver;
let experienceManager;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    themeManager = new ThemeManager();
    navigationManager = new NavigationManager();
    modalManager = new ModalManager();
    smoothScroll = new SmoothScroll();
    animationObserver = new AnimationObserver();
    
    // Page-specific functionality
    const neuralContainer = document.getElementById('neural-network');
    if (neuralContainer) {
        neuralNetwork = new NeuralNetworkAnimation(neuralContainer);
    }
    
    if (document.querySelector('.stat-number')) {
        statCounter = new StatCounter();
    }
    
    if (document.getElementById('speech-bubble')) {
        aiAssistant = new AIAssistant();
    }
    
    if (document.querySelector('.filter-btn')) {
        projectFilter = new ProjectFilter();
    }
    
    if (document.querySelector('.skill-progress')) {
        skillsAnimation = new SkillsAnimation();
    }
    
    if (document.getElementById('contact-form')) {
        contactFormManager = new ContactFormManager();
    }
    
    if (document.querySelector('.faq-item')) {
        faqManager = new FAQManager();
    }
    
    // Experience page specific functionality
    if (document.querySelector('.experience-item') || document.querySelector('.career-path')) {
        experienceManager = new ExperienceManager();
    }
    
    // Add loaded class for CSS animations
    document.body.classList.add('loaded');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        if (neuralNetwork) {
            neuralNetwork.stopAnimation();
        }
    } else {
        // Resume animations when page is visible
        if (neuralNetwork) {
            neuralNetwork.startAnimation();
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (navigationManager && window.innerWidth > 768) {
        navigationManager.closeMobileMenu();
    }
});

// ==========================================================================
// Performance Optimization
// ==========================================================================

// Lazy load images when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
const preloadResources = () => {
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
};

// Initialize preloading
preloadResources();

// ==========================================================================
// Analytics and Error Handling
// ==========================================================================

// Basic error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can implement error reporting here
});

// Track page performance
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// Service Worker registration (for future PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        NavigationManager,
        ModalManager,
        NeuralNetworkAnimation,
        StatCounter,
        AIAssistant,
        ProjectFilter,
        SkillsAnimation,
        ContactFormManager,
        FAQManager
    };
}
