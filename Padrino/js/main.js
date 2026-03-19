/**
 * Padrino - Main JavaScript
 * Sticky header, mobile menu, phone modal, hero slider, smooth scroll, mobile bottom bar
 */

(function () {
  'use strict';

  // --- Sticky Header Shadow ---
  const header = document.getElementById('sticky-header');
  let lastScrollY = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 10) {
      header.classList.add('shadow-lg');
    } else {
      header.classList.remove('shadow-lg');
    }
    // Mobile bottom bar show/hide
    const bottomBar = document.getElementById('mobile-bottom-bar');
    if (bottomBar) {
      if (scrollY > lastScrollY && scrollY > 300) {
        bottomBar.classList.add('translate-y-full');
      } else {
        bottomBar.classList.remove('translate-y-full');
      }
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobilePanel = document.getElementById('mobile-panel');
  let menuOpen = false;

  function openMobileMenu() {
    menuOpen = true;
    mobileMenu.classList.remove('pointer-events-none');
    mobileBackdrop.classList.remove('opacity-0');
    mobileBackdrop.classList.add('opacity-100');
    mobilePanel.classList.remove('translate-x-full');
    mobilePanel.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
    // Animate hamburger to X
    const bars = hamburger.querySelectorAll('span');
    bars[0].classList.add('rotate-45', 'translate-y-2');
    bars[1].classList.add('opacity-0');
    bars[2].classList.add('-rotate-45', '-translate-y-2');
  }

  function closeMobileMenu() {
    menuOpen = false;
    mobileMenu.classList.add('pointer-events-none');
    mobileBackdrop.classList.add('opacity-0');
    mobileBackdrop.classList.remove('opacity-100');
    mobilePanel.classList.add('translate-x-full');
    mobilePanel.classList.remove('translate-x-0');
    document.body.style.overflow = '';
    const bars = hamburger.querySelectorAll('span');
    bars[0].classList.remove('rotate-45', 'translate-y-2');
    bars[1].classList.remove('opacity-0');
    bars[2].classList.remove('-rotate-45', '-translate-y-2');
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      menuOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on nav link click
  if (mobilePanel) {
    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // --- Phone Modal ---
  const phoneModal = document.getElementById('phone-modal');

  function openPhoneModal() {
    if (phoneModal) {
      phoneModal.classList.remove('hidden');
      phoneModal.classList.add('flex');
    }
  }

  function closePhoneModal() {
    if (phoneModal) {
      phoneModal.classList.add('hidden');
      phoneModal.classList.remove('flex');
    }
  }

  // All "Appeler" buttons
  document.querySelectorAll('#btn-appeler-desktop, #btn-appeler-mobile, #btn-appeler-bottom').forEach(function (btn) {
    if (btn) btn.addEventListener('click', openPhoneModal);
  });

  var closeBtn = document.getElementById('close-phone-modal');
  if (closeBtn) closeBtn.addEventListener('click', closePhoneModal);

  // Close on backdrop click
  if (phoneModal) {
    phoneModal.addEventListener('click', function (e) {
      if (e.target === phoneModal) closePhoneModal();
    });
  }

  // --- Hero Slider ---
  var slides = document.querySelectorAll('#hero-slider .slider-slide');
  var currentSlide = 0;

  function nextSlide() {
    if (slides.length < 2) return;
    slides[currentSlide].style.opacity = '0';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.opacity = '1';
  }

  if (slides.length > 1) {
    setInterval(nextSlide, 5000);
  }

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Tab Navigation (for menu pages) ---
  document.querySelectorAll('[data-tab-target]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetId = this.getAttribute('data-tab-target');
      var tabGroup = this.closest('[data-tab-group]');
      if (!tabGroup) return;

      // Deactivate all tabs
      tabGroup.querySelectorAll('[data-tab-target]').forEach(function (t) {
        t.classList.remove('bg-padrino-red', 'text-white');
        t.classList.add('bg-white', 'text-padrino-brown');
      });
      // Activate clicked tab
      this.classList.remove('bg-white', 'text-padrino-brown');
      this.classList.add('bg-padrino-red', 'text-white');

      // Show/hide panels
      var container = tabGroup.parentElement;
      container.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
        panel.classList.add('hidden');
      });
      var targetPanel = container.querySelector('[data-tab-panel="' + targetId + '"]');
      if (targetPanel) targetPanel.classList.remove('hidden');
    });
  });
})();
