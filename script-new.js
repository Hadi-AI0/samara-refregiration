/**
 * SAMARA GROUP - Redesigned JavaScript
 * Performance-optimized, accessible interactions
 */

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initMobileMenu();
  initHeroAnimations();
  initScrollAnimations();
  initCounters();
  initSmoothScroll();
});

/**
 * Navigation - Sticky header with scroll detection
 */
function initNavigation() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateNavbar();
}

/**
 * Mobile Menu - Full-screen overlay with accordion
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
  const mobileDropdownMenu = document.querySelector('.mobile-dropdown-menu');

  if (!mobileMenu || !mobileMenuBtn || !mobileMenuClose) return;

  // Open menu
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Focus trap - focus first link
    const firstLink = mobileMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  });

  // Close menu
  mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    mobileMenuBtn.focus();
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      mobileMenuBtn.focus();
    }
  });

  // Close on outside click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      mobileMenuBtn.focus();
    }
  });

  // Accordion for companies dropdown
  if (mobileDropdownToggle && mobileDropdownMenu) {
    mobileDropdownToggle.addEventListener('click', () => {
      mobileDropdownMenu.classList.toggle('active');
      const isExpanded = mobileDropdownMenu.classList.contains('active');
      mobileDropdownToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Focus trap within mobile menu
  mobileMenu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusableElements = mobileMenu.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  });
}

/**
 * Hero Animations - Staggered fade-in on load + parallax zoom+blur on scroll
 */
function initHeroAnimations() {
  const hero = document.querySelector('.hero, .company-hero');
  if (!hero) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Animate elements in sequence
  tl.to('.hero-badge, .company-badge', {
    y: 0,
    opacity: 1,
    duration: 0.8
  })
  .to('.hero-title, .company-title', {
    y: 0,
    opacity: 1,
    duration: 0.8
  }, '-=0.6')
  .to('.hero-subtitle, .company-subtitle', {
    y: 0,
    opacity: 1,
    duration: 0.8
  }, '-=0.6')
  .to('.hero-metrics, .company-metrics', {
    y: 0,
    opacity: 1,
    duration: 0.8
  }, '-=0.6')
  .to('.hero-cta, .company-cta', {
    y: 0,
    opacity: 1,
    duration: 0.8
  }, '-=0.6');

  // Parallax zoom+blur effect for company hero background on scroll
  const companyHeroBg = document.querySelector('.company-hero-bg img');
  if (companyHeroBg && window.innerWidth > 768) {
    gsap.to(companyHeroBg, {
      scale: 1.2,
      filter: 'blur(8px)',
      scrollTrigger: {
        trigger: '.company-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  }
}

/**
 * Scroll Animations - Fade up elements when in viewport
 */
function initScrollAnimations() {
  // Animate cards with stagger
  const cardGrids = document.querySelectorAll('.card-grid, .services-grid');
  
  cardGrids.forEach(grid => {
    const cards = grid.querySelectorAll('.card, .service-card');
    
    ScrollTrigger.batch(cards, {
      onEnter: batch => {
        gsap.from(batch, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        });
      },
      start: 'top 85%',
      once: true
    });
  });

  // Animate section headers
  const sectionHeaders = document.querySelectorAll('.section-header, .about-content, .about-company-content');
  
  sectionHeaders.forEach(header => {
    ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(header, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out'
        });
      },
      once: true
    });
  });

  // Animate about images
  const aboutImages = document.querySelectorAll('.about-image, .about-company-image');
  
  aboutImages.forEach(img => {
    ScrollTrigger.create({
      trigger: img,
      start: 'top 80%',
      onEnter: () => {
        gsap.from(img, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      },
      once: true
    });
  });

  // Animate timeline section
  const timelineLabel = document.querySelector('.timeline-label');
  const timelineTitle = document.querySelector('.timeline-title');
  
  if (timelineLabel) {
    ScrollTrigger.create({
      trigger: timelineLabel,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(timelineLabel, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      },
      once: true
    });
  }
  
  if (timelineTitle) {
    ScrollTrigger.create({
      trigger: timelineTitle,
      start: 'top 85%',
      onEnter: () => {
        gsap.from(timelineTitle, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out'
        });
      },
      once: true
    });
  }
}

/**
 * Number Counters - Animate once when visible
 */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number, .metric-number');
  const animatedCounters = new WeakSet();

  counters.forEach(counter => {
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      onEnter: () => {
        if (animatedCounters.has(counter)) return;
        animatedCounters.add(counter);

        const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/[\d]/g, '').trim();
        const duration = 2;

        gsap.fromTo(counter,
          {
            innerHTML: 0,
            textContent: '0' + suffix
          },
          {
            innerHTML: target,
            duration: duration,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function() {
              counter.textContent = Math.round(this.targets()[0].innerHTML).toLocaleString() + suffix;
            }
          }
        );
      },
      once: true
    });
  });
}

/**
 * Smooth Scroll - For anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL without jumping
      history.pushState(null, '', href);
    });
  });
}

/**
 * Parallax Effect - Subtle background movement (desktop only)
 */
function initParallax() {
  if (window.innerWidth < 1024) return;

  const heroBgs = document.querySelectorAll('.hero-bg, .company-hero-bg');

  heroBgs.forEach(bg => {
    ScrollTrigger.create({
      trigger: bg.parentElement,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress;
        const moveAmount = progress * 50; // Move at 50% scroll speed
        bg.style.transform = `translateY(${moveAmount}px)`;
      }
    });
  });
}

/**
 * Timeline Section - Progress line and node animation
 */
function initTimeline() {
  const timelineContainer = document.getElementById('timeline-container');
  const timelineNode = document.getElementById('timeline-node');
  const timelineProgress = document.getElementById('timeline-progress');

  if (!timelineContainer || !timelineNode || !timelineProgress) return;

  // Animate the progress line - extends through entire timeline
  gsap.to(timelineProgress, {
    scrollTrigger: {
      trigger: timelineContainer,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 2,
    },
    height: '100%',
    ease: 'none',
  });
  
  // Node follows scroll progress through entire timeline
  ScrollTrigger.create({
    trigger: timelineContainer,
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 2,
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.set(timelineNode, {
        top: progress * 100 + '%',
      });
    }
  });

  // Animate individual milestones
  const milestones = document.querySelectorAll('.timeline-milestone');
  milestones.forEach((milestone) => {
    ScrollTrigger.create({
      trigger: milestone,
      start: 'top 75%',
      end: 'top 40%',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(milestone, {
          opacity: Math.min(1, self.progress * 2),
          scale: 0.9 + (self.progress * 0.1)
        });
      }
    });
  });
}

// Initialize parallax on load if desktop
if (window.innerWidth >= 1024) {
  initParallax();
}

// Initialize timeline
initTimeline();

// Re-initialize parallax on resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth >= 1024) {
      initParallax();
    }
  }, 250);
});
