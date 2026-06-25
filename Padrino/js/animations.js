/**
 * Padrino - GSAP Animations
 * Page load animations, scroll-triggered reveals, floating elements
 */

(function () {
  'use strict';

  // Skip all animations if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Wait for GSAP to load
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initAnimations, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // --- Page Load Animations ---
    var logo = document.querySelector('#sticky-header img');
    if (logo) {
      gsap.from(logo, { rotation: -10, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' });
    }

    // --- Hero Pizza Animation ---
    var mascotte = document.getElementById('mascotte');
    if (mascotte) {
      gsap.from(mascotte, { scale: 0.8, opacity: 0, duration: 1, ease: 'back.out(1.5)', delay: 0.3 });
      gsap.to(mascotte, { y: -8, duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.5 });
    }

    // Header nav links stagger
    var navLinks = document.querySelectorAll('#sticky-header nav a');
    if (navLinks.length) {
      gsap.from(navLinks, {
        y: -20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3
      });
    }

    // Hero text fade + scale
    var heroContent = document.querySelector('#hero-slider .relative.z-10 > div');
    if (heroContent) {
      gsap.from(heroContent, {
        scale: 0.9, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.5
      });
    }

    // --- ScrollTrigger: Sections ---
    // Product cards staggered fade-up
    gsap.utils.toArray('.product-card').forEach(function (card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        y: 60, opacity: 0, duration: 0.6, delay: i % 3 * 0.15, ease: 'power2.out'
      });
    });

    // Sections alternate slide-in
    gsap.utils.toArray('section').forEach(function (section, i) {
      var direction = i % 2 === 0 ? -60 : 60;
      gsap.from(section, {
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        x: direction, opacity: 0, duration: 0.7, ease: 'power2.out'
      });
    });

    // Section titles bounce
    gsap.utils.toArray('section h1, section h3').forEach(function (title) {
      gsap.from(title, {
        scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, duration: 0.5, ease: 'back.out(1.5)'
      });
    });

    // --- Card Hover Effects ---
    document.querySelectorAll('.product-card').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        gsap.to(card, { rotation: 2, scale: 1.05, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(card, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });

    // --- CTA Hover ---
    document.querySelectorAll('.btn-commander, .btn-appeler').forEach(function (btn) {
      btn.addEventListener('mouseenter', function () {
        gsap.to(btn, { scale: 1.08, duration: 0.2, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' });
      });
    });
  }

  // Start when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
