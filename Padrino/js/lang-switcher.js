/**
 * Padrino — Language Switcher (FR/EN)
 * Injects toggle into the navbar (desktop + mobile)
 */
(function () {
  'use strict';

  var path = window.location.pathname;
  var isEN = path.indexOf('/en/') !== -1;
  var currentFile = path.split('/').pop() || 'index.html';

  var switchURL = isEN ? '../' + currentFile : 'en/' + currentFile;
  var label = isEN ? '🇫🇷 FR' : '🇬🇧 EN';
  var title = isEN ? 'Version française' : 'English version';

  // Style
  var style = document.createElement('style');
  style.textContent = '\
.lang-btn{display:inline-flex;align-items:center;gap:4px;background:#1a1a1a;color:#fff;font-size:12px;font-weight:700;padding:5px 10px;border-radius:20px;text-decoration:none;letter-spacing:0.5px;transition:all 0.2s}\
.lang-btn:hover{background:#ed1c24}';
  document.head.appendChild(style);

  // Desktop nav only (hidden on mobile via lg:flex)
  var desktopNav = document.querySelector('#sticky-header nav');
  if (desktopNav) {
    var a = document.createElement('a');
    a.href = switchURL;
    a.className = 'lang-btn hidden lg:inline-flex';
    a.innerHTML = label;
    a.title = title;
    desktopNav.appendChild(a);
  }

  // Mobile only (hidden on desktop via lg:hidden)
  var hamburger = document.getElementById('hamburger');
  if (hamburger) {
    var a2 = document.createElement('a');
    a2.href = switchURL;
    a2.className = 'lang-btn lg:hidden';
    a2.innerHTML = label;
    a2.title = title;
    hamburger.parentNode.insertBefore(a2, hamburger);
  }
})();
