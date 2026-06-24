document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');

  const hidePreloader = () => {
    if (preloader && !preloader.classList.contains('hidden')) {
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
  };

  window.addEventListener('load', hidePreloader);
  setTimeout(hidePreloader, 3000);

  // ===== MOBILE MENU (Slide Panel) =====
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.classList.add('translate-x-full');
    });
  }

  document.querySelectorAll('.mobile-nav').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
      }
    });
  });

  // ===== MOBILE DROPDOWN TOGGLE =====
  const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
  const mobileDropdown = document.querySelector('.mobile-dropdown');
  
  if (mobileDropdownToggle && mobileDropdown) {
    mobileDropdownToggle.addEventListener('click', () => {
      mobileDropdown.classList.toggle('active');
    });
    
    // Prevent closing when clicking inside dropdown menu
    const mobileDropdownMenu = mobileDropdown.querySelector('.mobile-dropdown-menu');
    if (mobileDropdownMenu) {
      mobileDropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 80 },
          duration: 1.2,
          ease: 'power3.inOut'
        });
      }
    });
  });

  // ===== CARD MOUSE TRACKING (Glow Effect) =====
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

  // ===== NEWSLETTER FORM =====
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Subscribed!';
      setTimeout(() => {
        btn.innerHTML = originalText;
        newsletterForm.reset();
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

  // Show grid overlay
  setTimeout(() => {
    const gridOverlay = document.getElementById('grid-overlay');
    if (gridOverlay) gridOverlay.classList.add('visible');
  }, 500);

  animateHero();
  initCompanyShowcase();
  animateBgMorph();
  animateOverview();
  animateFounder();
  animateBoard();
  animateEcosystem();
  animateCards();
  animateTimeline();
  animateContact();
  animateCounters();
  createGridDrawLines();
  animateNavbar();
}

// ============================================================
// HERO ANIMATIONS
// ============================================================
function animateHero() {
  const heroLines = document.querySelectorAll('.hero-line');
  const heroSub = document.querySelector('.hero-sub');
  const heroMetric = document.querySelector('.hero-metrics');
  const heroBg = document.querySelector('.hero-bg img');
  const heroFrame = document.querySelector('.hero-frame');
  const heroBadge = document.querySelector('.hero-badge');

  const heroTL = gsap.timeline({ delay: 0.3 });

  if (heroBadge) {
    heroTL.from(heroBadge, {
      opacity: 0, y: 20,
      duration: 0.6,
      ease: 'power3.out'
    });
  }

  heroLines.forEach((line, i) => {
    heroTL.to(line, {
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, i * 0.15);
  });

  if (heroSub) {
    heroTL.to(heroSub, {
      y: 0, opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, heroLines.length * 0.15 + 0.2);
  }

  if (heroMetric) {
    heroTL.to(heroMetric, {
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, heroLines.length * 0.15 + 0.4);
  }

  // Hero scroll: zoom-out + blur background extending into next section
  if (heroBg) {
    // Background blur/zoom continues 100% into the next section
    gsap.to(heroBg, {
      scale: 0.75,
      filter: 'blur(30px)',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top+=100%',
        scrub: 1.5,
      },
      ease: 'none'
    });

    // Overlay darkens progressively into next section
    gsap.to('.overlay', {
      opacity: 1,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top+=100%',
        scrub: 1.5,
      },
      ease: 'none'
    });

    // Hero content stays visible much longer - only fades in the final stretch
    gsap.to('.hero-content', {
      y: -120,
      opacity: 0,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top+=50%',
        scrub: 1.5,
      },
      ease: 'none'
    });
  }
}

// ============================================================
// BACKGROUND METAMORPHOSIS
// ============================================================
function animateBgMorph() {
  const bgMorph = document.getElementById('bg-morph');
  if (!bgMorph) return;

  gsap.to(bgMorph, {
    scrollTrigger: {
      trigger: '#investments',
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1
    },
    backgroundColor: '#f5f5f0',
    duration: 1
  });
  
  // Removed: background stays light for contact section
}

// ============================================================
// HERO COMPANY SHOWCASE
// ============================================================
function initCompanyShowcase() {
  const buttons = document.querySelectorAll('.company-btn');
  const titleEl = document.querySelector('[data-info-title]');
  const categoryEl = document.querySelector('[data-info-category]');
  const descEl = document.querySelector('[data-info-desc]');
  
  if (!buttons.length || !titleEl || !categoryEl || !descEl) return;
  
  const companyData = {
    samara: {
      title: 'Samara Refrigeration',
      category: 'Commercial Cooling',
      desc: 'Leading provider of commercial and industrial refrigeration solutions, serving supermarkets, cold storage, and food processing facilities across the Kingdom since 1984.'
    },
    realestate: {
      title: 'Real Estate & Contracting',
      category: 'Property Development',
      desc: 'Developing premium residential and commercial properties while delivering high-quality general contracting services for major infrastructure projects across Saudi Arabia.'
    },
    sararyah: {
      title: 'Sararyah Healthcare',
      category: 'Medical Services',
      desc: 'Operating and managing hospitals and medical centers, providing world-class healthcare services with a focus on patient care and medical excellence throughout the GCC region.'
    },
    parking: {
      title: 'Samara Parking Solutions',
      category: 'Smart Mobility',
      desc: 'Delivering advanced parking management systems and smart city solutions to optimize urban mobility and traffic flow in major cities, aligned with Vision 2030.'
    },
    builmix: {
      title: 'Builmix LLC',
      category: 'Industrial Growth',
      desc: 'Specialty chemical additives and general construction services delivering quality-driven outcomes for industrial and civil projects across the Kingdom.'
    }
  };
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const company = btn.getAttribute('data-company');
      const data = companyData[company];
      
      if (!data) return;
      
      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Animate content change
      gsap.to([titleEl, categoryEl, descEl], {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          titleEl.textContent = data.title;
          categoryEl.textContent = data.category;
          descEl.textContent = data.desc;
          
          gsap.to([titleEl, categoryEl, descEl], {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out'
          });
        }
      });
    });
  });
}

// ============================================================
// OVERVIEW SECTION ANIMATIONS
// ============================================================
function animateOverview() {
  // Wheel auto-flip functionality
  const wheelInputs = document.querySelectorAll('.radio-input input[type="radio"]');
  let currentWheelIndex = 0;
  
  function flipWheel() {
    currentWheelIndex = (currentWheelIndex + 1) % wheelInputs.length;
    wheelInputs[currentWheelIndex].checked = true;
  }
  
  setInterval(flipWheel, 3000); // Auto-flip every 3 seconds
  
  // Sticky scroll animation for text segments
  const segments = document.querySelectorAll('.about-text-segment');
  
  function updateActiveSegment() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    segments.forEach((segment, index) => {
      const segmentTop = segment.offsetTop;
      const segmentBottom = segmentTop + segment.offsetHeight;
      
      if (scrollPosition >= segmentTop && scrollPosition < segmentBottom) {
        segments.forEach(s => s.classList.remove('active'));
        segment.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveSegment, { passive: true });
  updateActiveSegment(); // Initialize
  
  // Animate about image
  gsap.to('.about-image', {
    scrollTrigger: { trigger: '.about-image', start: 'top 80%' },
    opacity: 1, x: 0,
    duration: 1,
    ease: 'power3.out'
  });
}

// ============================================================
// FOUNDER SECTION ANIMATIONS
// ============================================================
function animateFounder() {
  const founderContent = document.querySelector('.founder-content');
  const founderLabel = document.querySelector('.founder-label');
  const founderPortrait = document.querySelector('.founder-portrait');

  if (founderPortrait) {
    gsap.from(founderPortrait, {
      scrollTrigger: { trigger: founderPortrait, start: 'top 80%' },
      opacity: 0, x: -50,
      duration: 1,
      ease: 'power3.out'
    });
  }

  if (founderLabel) {
    gsap.to(founderLabel, {
      scrollTrigger: { trigger: founderLabel, start: 'top 85%' },
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  if (founderContent) {
    gsap.to(founderContent, {
      scrollTrigger: { trigger: founderContent, start: 'top 80%' },
      opacity: 1, y: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });
  }
}

// ============================================================
// BOARD MEMBERS SECTION
// ============================================================
function animateBoard() {
  const boardSection = document.querySelector('.board-section');
  if (!boardSection) return;

  // Animate section on scroll
  gsap.from(boardSection, {
    scrollTrigger: { trigger: boardSection, start: 'top 80%' },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });

  // Carousel functionality
  const thumbs = document.querySelectorAll('.board-thumb');
  const mainImages = document.querySelectorAll('.board-main-img');
  const indicators = document.querySelectorAll('.board-indicator');
  const prevBtns = document.querySelectorAll('#board-prev, #board-prev-mobile');
  const nextBtns = document.querySelectorAll('#board-next, #board-next-mobile');
  
  const contentElements = {
    subtitle: document.querySelector('[data-board-subtitle]'),
    role: document.querySelector('[data-board-role]'),
    name: document.querySelector('[data-board-name]'),
    desc: document.querySelector('[data-board-desc]')
  };

  // Board member data
  const members = [
    {
      subtitle: 'Samara Group',
      role: 'Chairman & Founder',
      name: 'Board Member 1',
      desc: 'Visionary leader with over 40 years of experience in the GCC business landscape. Founded Samara Group in 1984 and has guided its growth from a single refrigeration company to a diversified conglomerate across multiple sectors.'
    },
    {
      subtitle: 'Samara Group',
      role: 'Vice Chairman',
      name: 'Board Member 2',
      desc: 'Strategic leader overseeing group expansion and diversification initiatives. Instrumental in establishing the group\'s presence in real estate and healthcare sectors, driving sustainable growth across the GCC region.'
    },
    {
      subtitle: 'Samara Group',
      role: 'Managing Director',
      name: 'Board Member 3',
      desc: 'Operational excellence leader managing day-to-day operations across all group entities. Expert in scaling businesses and optimizing performance through innovative management practices and strategic partnerships.'
    },
    {
      subtitle: 'Samara Group',
      role: 'Financial Director',
      name: 'Board Member 4',
      desc: 'Financial steward ensuring the group\'s fiscal health and strategic investment decisions. Oversees financial planning, risk management, and capital allocation to support the group\'s long-term growth objectives.'
    },
    {
      subtitle: 'Samara Group',
      role: 'Operations Director',
      name: 'Board Member 5',
      desc: 'Operations specialist focused on efficiency and quality across manufacturing and service divisions. Implements best practices and technology solutions to enhance operational performance and customer satisfaction.'
    }
  ];

  let currentSlide = 0;

  function showSlide(index) {
    // Update images
    mainImages.forEach(img => img.classList.remove('active'));
    mainImages[index].classList.add('active');

    // Update thumbnails
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbs[index].classList.add('active');

    // Update indicators
    indicators.forEach(ind => ind.classList.remove('active'));
    indicators[index].classList.add('active');

    // Update content with animation
    const member = members[index];
    gsap.to([contentElements.subtitle, contentElements.role, contentElements.name, contentElements.desc], {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        contentElements.subtitle.textContent = member.subtitle;
        contentElements.role.textContent = member.role;
        contentElements.name.textContent = member.name;
        contentElements.desc.textContent = member.desc;
        
        gsap.to([contentElements.subtitle, contentElements.role, contentElements.name, contentElements.desc], {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        });
      }
    });

    currentSlide = index;
  }

  // Thumbnail clicks
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => showSlide(index));
  });

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
  });

  // Navigation buttons
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const newIndex = (currentSlide - 1 + members.length) % members.length;
      showSlide(newIndex);
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const newIndex = (currentSlide + 1) % members.length;
      showSlide(newIndex);
    });
  });

  // Initialize first slide
  showSlide(0);
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
      scrollTrigger: { trigger: labels, start: 'top 85%' },
      opacity: 1, duration: 0.8, ease: 'power2.out'
    });
  }

  if (desc) {
    gsap.to(desc, {
      scrollTrigger: { trigger: desc, start: 'top 85%' },
      opacity: 1, y: 0,
      duration: 0.8, delay: 0.3, ease: 'power3.out'
    });
  }

  if (stats) {
    gsap.utils.toArray('.eco-card', stats).forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%' },
        opacity: 0, y: 40,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out'
      });
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
      scrollTrigger: { trigger: card, start: 'top 85%' },
      opacity: 1, y: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
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
  gsap.to('.timeline-label', {
    scrollTrigger: { trigger: '.timeline-label', start: 'top 85%' },
    opacity: 1, y: 0,
    duration: 0.8, ease: 'power2.out'
  });

  gsap.from('.timeline-title', {
    scrollTrigger: { trigger: '.timeline-title', start: 'top 85%' },
    opacity: 0, y: 40,
    duration: 1, ease: 'power3.out'
  });

  const milestones = document.querySelectorAll('.timeline-milestone');
  const timelineContainer = document.getElementById('timeline-container');
  const timelineNode = document.getElementById('timeline-node');
  const timelineProgress = document.getElementById('timeline-progress');

  if (timelineContainer && timelineNode && timelineProgress) {
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
  }

  milestones.forEach((milestone) => {
    gsap.to(milestone, {
      scrollTrigger: {
        trigger: milestone,
        start: 'top 75%',
        end: 'top 40%',
        scrub: 1
      },
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out'
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
      scrollTrigger: { trigger: label, start: 'top 85%' },
      opacity: 1, duration: 0.8, ease: 'power2.out'
    });
  }

  if (title) {
    gsap.from(title, {
      scrollTrigger: { trigger: title, start: 'top 85%' },
      opacity: 0, y: 40,
      duration: 1, ease: 'power3.out'
    });
  }

  if (desc) {
    gsap.to(desc, {
      scrollTrigger: { trigger: desc, start: 'top 85%' },
      opacity: 1, y: 0,
      duration: 0.8, delay: 0.2, ease: 'power3.out'
    });
  }

  if (info) {
    gsap.to(info, {
      scrollTrigger: { trigger: info, start: 'top 85%' },
      opacity: 1, y: 0,
      duration: 0.8, delay: 0.4, ease: 'power3.out'
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
    if (isNaN(target)) return;

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
            counter.innerText = current >= 1000 ? current.toLocaleString() : current;
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
      scrollTrigger: { trigger: section, start: 'top 80%' },
      width: '100%',
      opacity: 0.08,
      duration: 1.2,
      ease: 'power2.out'
    });
  });
}

// ============================================================
// NAVBAR SCROLL STATE
// ============================================================
function animateNavbar() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 100) {
      nav.classList.add('scrolled');
      nav.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
    } else {
      nav.classList.remove('scrolled');
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
      onEnterBack: () => updateActiveNav(section.id)
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
}, { passive: true });