// ============================================================
// MERIDIAN HOLDINGS — Main Script
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== INITIALIZE LUCIDE ICONS =====
    lucide.createIcons();

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                preloader.classList.add('hidden');
                preloader.style.display = 'none';
                initAnimations();
            }
        });
    });

    // Fallback: hide preloader after 3 seconds if load event already fired
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    preloader.classList.add('hidden');
                    preloader.style.display = 'none';
                    initAnimations();
                }
            });
        }
    }, 3000);

    // ===== MOBILE MENU =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
        });
    }

    document.querySelectorAll('.mobile-nav').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
        });
    });

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: { y: target, offsetY: 80 },
                    duration: 1.2,
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // ===== CARD MOUSE TRACKING =====
    document.querySelectorAll('[data-card]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const glow = card.querySelector('.card-bg-glow');
            if (glow) {
                glow.style.setProperty('--mouse-x', x + 'px');
                glow.style.setProperty('--mouse-y', y + 'px');
                glow.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.card-bg-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show success feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Inquiry Submitted</span>';
            btn.style.backgroundColor = '#1d4f91';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                contactForm.reset();
            }, 3000);
        });
    }
});

// ============================================================
// MAIN ANIMATION INITIALIZATION
// ============================================================
let animationsInitialized = false;

function initAnimations() {
    if (animationsInitialized) return;
    animationsInitialized = true;

    // ===== SHOW GRID OVERLAY =====
    setTimeout(() => {
        document.getElementById('grid-overlay').classList.add('visible');
    }, 500);

    // ===== CREATE CROSSHAIRS =====
    createCrosshairs();

    // ===== HERO ANIMATIONS =====
    animateHero();

    // ===== BACKGROUND METAMORPHOSIS =====
    animateBgMorph();

    // ===== OVERVIEW SECTION ANIMATIONS =====
    animateOverview();

    // ===== ECOSYSTEM SECTION ANIMATIONS =====
    animateEcosystem();

    // ===== COMPANY CARD ANIMATIONS =====
    animateCards();

    // ===== HISTORY TIMELINE ANIMATIONS =====
    animateTimeline();

    // ===== CONTACT SECTION ANIMATIONS =====
    animateContact();

    // ===== COUNTER ANIMATIONS =====
    animateCounters();

    // ===== GRID DRAW LINES =====
    createGridDrawLines();

    // ===== NAVBAR SCROLL STATE =====
    animateNavbar();

    // ===== CROSSHAIR ACTIVATION ON SCROLL =====
    activateCrosshairsOnScroll();
}

// ============================================================
// CROSSHAIR CREATION
// ============================================================
function createCrosshairs() {
    const container = document.getElementById('crosshairs-container');
    const positions = [
        { top: '15%', left: '10%' },
        { top: '15%', left: '90%' },
        { top: '40%', left: '25%' },
        { top: '40%', left: '75%' },
        { top: '65%', left: '10%' },
        { top: '65%', left: '90%' },
        { top: '85%', left: '25%' },
        { top: '85%', left: '75%' },
        { top: '25%', left: '50%' },
        { top: '50%', left: '50%' },
        { top: '75%', left: '50%' },
    ];

    positions.forEach(pos => {
        const marker = document.createElement('div');
        marker.className = 'crosshair-marker';
        marker.style.top = pos.top;
        marker.style.left = pos.left;
        container.appendChild(marker);
    });
}

function activateCrosshairsOnScroll() {
    const markers = document.querySelectorAll('.crosshair-marker');
    
    markers.forEach((marker, i) => {
        gsap.to(marker, {
            scrollTrigger: {
                trigger: 'body',
                start: () => {
                    const top = parseFloat(marker.style.top);
                    const scrollPos = (top / 100) * document.body.scrollHeight;
                    return `${scrollPos - 300}px top`;
                },
                end: () => {
                    const top = parseFloat(marker.style.top);
                    const scrollPos = (top / 100) * document.body.scrollHeight;
                    return `${scrollPos + 200}px top`;
                },
                toggleActions: 'play none none none',
            },
            opacity: 1,
            rotation: 45,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.05,
        });
    });
}

// ============================================================
// HERO ANIMATIONS
// ============================================================
function animateHero() {
    const heroLines = document.querySelectorAll('.hero-line');
    const heroSub = document.querySelector('.hero-sub');
    const heroMetric = document.querySelector('.hero-metric');
    const heroScroll = document.querySelector('.hero-scroll');
    const heroBg = document.querySelector('.hero-bg img');
    const heroFrame = document.querySelector('.hero-frame');

    // Text reveal: lines slide up from below the baseline
    const heroTL = gsap.timeline({ delay: 0.3 });

    heroLines.forEach((line, i) => {
        heroTL.to(line, {
            y: 0,
            duration: 1,
            ease: 'power3.out',
        }, i * 0.15);
    });

    if (heroSub) {
        heroTL.to(heroSub, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
        }, heroLines.length * 0.15 + 0.2);
    }

    if (heroMetric) {
        heroTL.to(heroMetric, {
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
        }, heroLines.length * 0.15 + 0.4);
    }

    if (heroScroll) {
        heroTL.to(heroScroll, {
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
        }, heroLines.length * 0.15 + 0.6);
    }

    // Hero scroll: zoom-and-mask out
    if (heroBg && heroFrame) {
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: '+=800',
                scrub: 1,
            }
        })
        .to(heroBg, {
            scale: 1.0,
            duration: 1,
        }, 0)
        .to(heroFrame, {
            borderColor: 'rgba(29, 79, 145, 0.3)',
            duration: 1,
        }, 0)
        .to('#hero', {
            opacity: 0.3,
            duration: 1,
        }, 0.3);
    }
}

// ============================================================
// BACKGROUND METAMORPHOSIS
// ============================================================
function animateBgMorph() {
    const bgMorph = document.getElementById('bg-morph');

    // Transition from dark to light as user scrolls into ecosystem section
    gsap.to(bgMorph, {
        scrollTrigger: {
            trigger: '#ecosystem',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        backgroundColor: '#f5f5f0',
        duration: 1,
    });

    // Transition back to dark when scrolling into history section
    gsap.to(bgMorph, {
        scrollTrigger: {
            trigger: '#history',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        backgroundColor: '#0a0f1a',
        duration: 1,
    });

    // Contact section stays dark
}

// ============================================================
// OVERVIEW SECTION ANIMATIONS
// ============================================================
function animateOverview() {
    // Section label
    gsap.to('.section-grid-line', {
        scrollTrigger: {
            trigger: '.section-grid-line',
            start: 'top 85%',
        },
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
    });

    // Section title
    gsap.from('.section-title', {
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
    });

    // Override the CSS-set opacity
    gsap.set('.section-title', { opacity: 0 });

    gsap.to('.section-title', {
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
    });

    // Reveal text paragraphs
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
        });
    });

    // Metrics
    gsap.utils.toArray('.metric-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
        });
    });
}

// ============================================================
// ECOSYSTEM SECTION ANIMATIONS
// ============================================================
function animateEcosystem() {
    const labels = document.querySelector('[data-ecosystem-label]');
    const title = document.querySelector('[data-ecosystem-title]');
    const desc = document.querySelector('[data-ecosystem-desc]');
    const stats = document.querySelector('[data-ecosystem-stats]');

    if (labels) {
        gsap.to(labels, {
            scrollTrigger: {
                trigger: labels,
                start: 'top 85%',
            },
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
        });
    }

    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
            },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',
        });
        gsap.set(title, { opacity: 0 });
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
        });
    }

    if (desc) {
        gsap.to(desc, {
            scrollTrigger: {
                trigger: desc,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power3.out',
        });
    }

    if (stats) {
        gsap.to(stats, {
            scrollTrigger: {
                trigger: stats,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: 'power3.out',
        });
    }
}

// ============================================================
// COMPANY CARD ANIMATIONS
// ============================================================
function animateCards() {
    const cards = document.querySelectorAll('.company-card');

    cards.forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
        });

        // Add bounding corners
        ['tl', 'tr', 'bl', 'br'].forEach(pos => {
            const corner = document.createElement('div');
            corner.className = `bounding-corner bounding-corner--${pos}`;
            card.appendChild(corner);
        });
    });
}

// ============================================================
// HISTORY TIMELINE ANIMATIONS
// ============================================================
function animateTimeline() {
    // Section label
    gsap.to('.timeline-label', {
        scrollTrigger: {
            trigger: '.timeline-label',
            start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
    });

    gsap.set('.timeline-title', { opacity: 0 });
    gsap.to('.timeline-title', {
        scrollTrigger: {
            trigger: '.timeline-title',
            start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
    });

    // Timeline progress and node follow scroll
    const milestones = document.querySelectorAll('.timeline-milestone');
    const timelineContainer = document.getElementById('timeline-container');
    const timelineNode = document.getElementById('timeline-node');
    const timelineProgress = document.getElementById('timeline-progress');

    if (timelineContainer && timelineNode) {
        // Animate the progress line
        gsap.to(timelineProgress, {
            scrollTrigger: {
                trigger: timelineContainer,
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 1,
            },
            height: '100%',
            ease: 'none',
        });

        // Node follows scroll progress
        ScrollTrigger.create({
            trigger: timelineContainer,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const containerRect = timelineContainer.getBoundingClientRect();
                const containerTop = timelineContainer.offsetTop;
                const containerHeight = timelineContainer.offsetHeight;
                const nodeTop = containerTop + (progress * containerHeight);
                
                // Position the node
                gsap.set(timelineNode, {
                    top: progress * 100 + '%',
                });
            }
        });
    }

    // Animate each milestone
    milestones.forEach((milestone, i) => {
        gsap.to(milestone, {
            scrollTrigger: {
                trigger: milestone,
                start: 'top 75%',
                end: 'top 40%',
                scrub: 1,
            },
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
        });
    });
}

// ============================================================
// CONTACT SECTION ANIMATIONS
// ============================================================
function animateContact() {
    const label = document.querySelector('.contact-label');
    const title = document.querySelector('.contact-title');
    const desc = document.querySelector('.contact-desc');
    const info = document.querySelector('.contact-info');

    if (label) {
        gsap.to(label, {
            scrollTrigger: {
                trigger: label,
                start: 'top 85%',
            },
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
        });
    }

    if (title) {
        gsap.set(title, { opacity: 0 });
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
        });
    }

    if (desc) {
        gsap.to(desc, {
            scrollTrigger: {
                trigger: desc,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
        });
    }

    if (info) {
        gsap.to(info, {
            scrollTrigger: {
                trigger: info,
                start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out',
        });
    }
}

// ============================================================
// COUNTER ANIMATIONS
// ============================================================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(counter, {
                    innerText: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    onUpdate: function() {
                        const current = Math.round(parseFloat(counter.innerText));
                        if (target >= 1000) {
                            counter.innerText = current.toLocaleString();
                        } else {
                            counter.innerText = current;
                        }
                    }
                });
            }
        });
    });
}

// ============================================================
// GRID DRAW LINES
// ============================================================
function createGridDrawLines() {
    // Create horizontal draw lines at section boundaries
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const line = document.createElement('div');
        line.className = 'grid-draw-line horizontal';
        line.style.position = 'absolute';
        line.style.top = '0';
        line.style.left = '0';
        line.style.right = '0';
        section.style.position = 'relative';
        section.appendChild(line);

        gsap.to(line, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            },
            width: '100%',
            opacity: 0.08,
            duration: 1.2,
            ease: 'power2.out',
        });
    });
}

// ============================================================
// NAVBAR SCROLL STATE
// ============================================================
function animateNavbar() {
    const nav = document.getElementById('main-nav');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            nav.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => updateActiveNav(section.id),
            onEnterBack: () => updateActiveNav(section.id),
        });
    });

    function updateActiveNav(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
            }
        });
    }
}

// ============================================================
// REFRESH SCROLL TRIGGER ON RESIZE
// ============================================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// ============================================================
// SMOOTH SCROLL POLYFILL (cubic-bezier(0.16, 1, 0.3, 1))
// ============================================================
(function() {
    const ease = t => 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2);
    
    let isScrolling = false;
    let targetY = 0;
    let currentY = window.scrollY;

    function smoothScrollLoop() {
        if (Math.abs(targetY - currentY) > 0.5) {
            currentY += (targetY - currentY) * 0.08;
            window.scrollTo(0, currentY);
            requestAnimationFrame(smoothScrollLoop);
        } else {
            isScrolling = false;
        }
    }

    // We rely on GSAP ScrollTrigger for scroll-based animations
    // The smoothness is handled by the browser's native scroll
    // with GSAP's scrub property providing the momentum feel
})();