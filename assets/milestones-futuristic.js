// ==========================================================================
// Futuristic Milestones Timeline JavaScript
// Enhanced animations and interactions for growth timeline experience
// ==========================================================================

class FuturisticTimeline {
    constructor() {
        this.milestoneItems = document.querySelectorAll('.milestone-item');
        this.projectCards = document.querySelectorAll('.enhanced-project-card');
        this.leadershipCards = document.querySelectorAll('.leadership-card');
        this.timelineContainer = document.querySelector('.timeline-container');
        this.timelineLine = document.querySelector('.timeline-line');
        this.counters = document.querySelectorAll('.counter');
        this.animatedTitles = document.querySelectorAll('.animated-title');
        this.currentMilestone = 0;
        this.hasInitialized = false;
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupTimelineObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupCounterAnimations();
        this.setupTitleAnimations();
        this.setupParticleEffects();
        
        // Add scroll listener for timeline progression
        window.addEventListener('scroll', () => this.updateTimelineProgress());
        
        // Initialize particles
        this.initializeParticles();
        
        console.log('🚀 Futuristic Timeline initialized');
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate milestone marker
                    const marker = entry.target.querySelector('.milestone-marker');
                    if (marker) {
                        setTimeout(() => {
                            marker.style.animation = 'marker-pulse 0.6s ease-out';
                        }, 200);
                    }
                    
                    // Animate achievements
                    const achievements = entry.target.querySelectorAll('.achievement-item');
                    achievements.forEach((achievement, index) => {
                        setTimeout(() => {
                            achievement.style.animation = 'fadeInUp 0.5s ease-out forwards';
                        }, 300 + (index * 100));
                    });
                }
            });
        }, options);

        // Observe all animated elements
        this.milestoneItems.forEach(item => observer.observe(item));
        this.projectCards.forEach(card => observer.observe(card));
        this.leadershipCards.forEach(card => observer.observe(card));
    }

    setupTimelineObserver() {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasInitialized) {
                    this.hasInitialized = true;
                    this.timelineContainer.classList.add('animating');
                    this.animateTimelineProgress();
                }
            });
        }, { threshold: 0.2 });

        if (this.timelineContainer) {
            timelineObserver.observe(this.timelineContainer);
        }
    }

    updateTimelineProgress() {
        if (!this.timelineContainer) return;

        const containerTop = this.timelineContainer.offsetTop;
        const containerHeight = this.timelineContainer.offsetHeight;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Calculate progress based on scroll position
        const startPoint = containerTop - windowHeight + 200;
        const endPoint = containerTop + containerHeight - 200;
        const scrollProgress = Math.max(0, Math.min(1, (scrollTop - startPoint) / (endPoint - startPoint)));

        // Update timeline line
        if (this.timelineLine) {
            const timelineLineBefore = this.timelineLine.querySelector('::before') || this.timelineLine;
            timelineLineBefore.style.setProperty('--progress', `${scrollProgress * 100}%`);
        }

        // Highlight current milestone
        this.highlightCurrentMilestone(scrollProgress);
    }

    highlightCurrentMilestone(progress) {
        const milestoneIndex = Math.floor(progress * this.milestoneItems.length);
        
        if (milestoneIndex !== this.currentMilestone && milestoneIndex < this.milestoneItems.length) {
            // Remove previous highlight
            this.milestoneItems.forEach(item => item.classList.remove('highlighted'));
            
            // Add new highlight
            if (milestoneIndex >= 0) {
                this.milestoneItems[milestoneIndex].classList.add('highlighted');
                this.currentMilestone = milestoneIndex;
                
                // Trigger milestone celebration
                this.celebrateMilestone(this.milestoneItems[milestoneIndex]);
            }
        }
    }

    celebrateMilestone(milestone) {
        const marker = milestone.querySelector('.milestone-marker');
        if (marker) {
            // Add celebration effect
            marker.style.animation = 'celebration-pulse 1s ease-out';
            
            // Create particle burst
            this.createParticleBurst(marker);
            
            // Reset animation
            setTimeout(() => {
                marker.style.animation = '';
            }, 1000);
        }
    }

    createParticleBurst(element) {
        const rect = element.getBoundingClientRect();
        const particles = 8;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'celebration-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                width: 4px;
                height: 4px;
                background: var(--accent-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: particle-burst 0.8s ease-out forwards;
                --angle: ${(360 / particles) * i}deg;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }

    setupScrollAnimations() {
        // Smooth scroll behavior for milestone navigation
        const milestoneLinks = document.querySelectorAll('[data-milestone]');
        milestoneLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetMilestone = document.querySelector(link.getAttribute('href'));
                if (targetMilestone) {
                    targetMilestone.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            });
        });
    }

    setupHoverEffects() {
        // Enhanced hover effects for project cards
        this.projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addRippleEffect(card);
            });
        });

        // Enhanced hover effects for leadership cards
        this.leadershipCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addGlowEffect(card);
            });
        });

        // CTA button enhancements
        const ctaButtons = document.querySelectorAll('.hover-glow-btn');
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.addButtonGlow(button);
            });
        });
    }

    addRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 255, 0, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addGlowEffect(element) {
        element.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.4)';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 300);
    }

    addButtonGlow(button) {
        const glow = button.querySelector('.btn-glow');
        if (glow) {
            glow.style.animation = 'btn-glow-sweep 0.6s ease-out';
        }
    }

    setupCounterAnimations() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            counter.textContent = '0';
            counterObserver.observe(counter);
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            counter.textContent = current;
            
            // Add visual effect during counting
            if (progress < 1) {
                counter.style.color = `hsl(${120 + (progress * 60)}, 100%, 50%)`;
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
                counter.style.color = '';
                
                // Celebration effect when counter completes
                this.celebrateCounter(counter);
            }
        };
        
        requestAnimationFrame(animate);
    }

    celebrateCounter(counter) {
        counter.style.animation = 'counter-celebrate 0.5s ease-out';
        setTimeout(() => {
            counter.style.animation = '';
        }, 500);
    }

    setupTitleAnimations() {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('title-animated');
                }
            });
        }, { threshold: 0.3 });

        this.animatedTitles.forEach(title => {
            titleObserver.observe(title);
        });
    }

    setupParticleEffects() {
        // Create floating particles for ambiance
        this.createFloatingParticles();
        
        // Setup particle system
        setInterval(() => {
            this.createFloatingParticles();
        }, 5000);
    }

    createFloatingParticles() {
        const particleCount = 5;
        const container = document.querySelector('.timeline-particles') || document.body;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createSingleParticle(container);
            }, i * 200);
        }
    }

    createSingleParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: var(--accent-primary);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            bottom: -5px;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: float-up ${Math.random() * 3 + 2}s linear forwards;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    initializeParticles() {
        // Add initial particle burst on page load
        setTimeout(() => {
            this.createInitialBurst();
        }, 1000);
    }

    createInitialBurst() {
        const hero = document.querySelector('.futuristic-hero');
        if (!hero) return;
        
        const burstCount = 15;
        const heroRect = hero.getBoundingClientRect();
        
        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'burst-particle';
                particle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${heroRect.top + Math.random() * heroRect.height}px;
                    width: 3px;
                    height: 3px;
                    background: var(--accent-primary);
                    border-radius: 50%;
                    animation: burst-fade 2s ease-out forwards;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 2000);
            }, i * 50);
        }
    }

    animateTimelineProgress() {
        // Progressive timeline drawing
        let progress = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            progress = Math.min(elapsed / duration, 1);
            
            // Update CSS custom property for timeline progress
            document.documentElement.style.setProperty('--timeline-progress', `${progress * 100}%`);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Additional CSS keyframes injection
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes celebration-pulse {
        0% { transform: scale(1); box-shadow: 0 0 10px var(--accent-primary); }
        50% { transform: scale(1.2); box-shadow: 0 0 30px var(--accent-primary); }
        100% { transform: scale(1); box-shadow: 0 0 10px var(--accent-primary); }
    }
    
    @keyframes particle-burst {
        0% { 
            transform: translate(0, 0) scale(1); 
            opacity: 1; 
        }
        100% { 
            transform: translate(
                calc(cos(var(--angle)) * 100px), 
                calc(sin(var(--angle)) * 100px)
            ) scale(0); 
            opacity: 0; 
        }
    }
    
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
    
    @keyframes counter-celebrate {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); color: var(--accent-primary); }
    }
    
    @keyframes float-up {
        to { 
            transform: translateY(-100vh); 
            opacity: 0; 
        }
    }
    
    @keyframes burst-fade {
        0% { opacity: 1; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(1); }
    }
    
    @keyframes btn-glow-sweep {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    .title-animated {
        animation: title-glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes title-glow {
        from { text-shadow: 0 0 10px var(--accent-primary); }
        to { text-shadow: 0 0 20px var(--accent-primary), 0 0 30px var(--accent-secondary); }
    }
    
    .milestone-item.highlighted .milestone-marker {
        box-shadow: 0 0 20px var(--accent-primary);
        animation: highlighted-pulse 2s ease-in-out infinite;
    }
    
    @keyframes highlighted-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;

document.head.appendChild(additionalStyles);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new FuturisticTimeline();
    });
} else {
    new FuturisticTimeline();
}

// Export for use in other modules
window.FuturisticTimeline = FuturisticTimeline;
