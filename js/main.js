/**
 * Willem Grasso Portfolio - Main JavaScript
 * Handles navigation, scroll animations, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initScrollAnimations();
  handleHashOnLoad();
});

/**
 * Handle hash navigation on page load (instant scroll, no animation)
 */
function handleHashOnLoad() {
  if (window.location.hash) {
    // Disable smooth scroll temporarily
    document.documentElement.style.scrollBehavior = 'auto';
    
    const target = document.querySelector(window.location.hash);
    if (target) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        // Re-enable smooth scroll after navigation
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'smooth';
        }, 100);
      }, 10);
    }
  }
}

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMobile = document.getElementById('nav-mobile');
  
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (navClose && navMobile) {
    navClose.addEventListener('click', () => {
      navMobile.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close on link click
  const mobileLinks = navMobile?.querySelectorAll('.nav-link');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Header Background on Scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('nav-header');
  
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Scroll-based Animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.pillar, .statement, .project-card, .contact-content h2, .contact-content p, .contact-buttons, .social-links'
  );
  
  if (!animatedElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

