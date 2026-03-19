/**
 * Padrino — Offres flash selon l'heure
 * Midi (11h-16h) : offre déjeuner
 * Soir (18h-23h) : offre dîner
 */
(function () {
  'use strict';

  var now = new Date();
  // Mode test: sessionStorage.setItem('padrino_fake_hour', '13')
  var fakeHour = sessionStorage.getItem('padrino_fake_hour');
  var fakeDay = sessionStorage.getItem('padrino_fake_day');
  var hour = fakeHour !== null ? parseInt(fakeHour, 10) : now.getHours();
  var day = fakeDay !== null ? parseInt(fakeDay, 10) : now.getDay(); // 0=dim, 1=lun ... 6=sam
  var offre = null;

  if (hour >= 11 && hour < 16) {
    offre = {
      badge: 'OFFRE MIDI',
      emoji: '☀️',
      titre: 'Offre Flash Midi',
      description: 'Pizza Senior + Boisson 33cl',
      prix: '10€',
      ancien: '14,50€',
      condition: 'Valable du lundi au vendredi de 11H30 à 15H',
      couleur: 'from-orange-500 to-padrino-yellow',
      bg: '#ff9800'
    };
  } else if (hour >= 18 && hour < 23 && day >= 1 && day <= 4) {
    offre = {
      badge: 'OFFRE DU SOIR',
      emoji: '🌙',
      titre: 'Offre Flash Soirée',
      description: '2 Pizzas Senior + 1 Boisson 1,5L',
      prix: '25€',
      ancien: '34€',
      condition: 'Valable tous les soirs de 18H à 23H',
      couleur: 'from-purple-600 to-indigo-700',
      bg: '#7c3aed'
    };
  }

  if (!offre) return;

  // Check if dismissed this session
  var dismissed = sessionStorage.getItem('padrino_offre_horaire_dismissed');
  if (dismissed) return;

  var style = document.createElement('style');
  style.textContent = '\
#offre-horaire{position:fixed;top:0;left:0;right:0;z-index:55;transform:translateY(-100%);transition:transform 0.5s cubic-bezier(0.16,1,0.3,1)}\
#offre-horaire.visible{transform:translateY(0)}\
#offre-horaire-inner{display:flex;align-items:center;justify-content:center;gap:12px;padding:10px 16px;flex-wrap:wrap;position:relative}\
#offre-horaire .badge{background:rgba(0,0,0,0.2);color:white;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:1.5px}\
#offre-horaire .emoji{font-size:22px}\
#offre-horaire .text{color:white;font-size:14px;font-weight:600}\
#offre-horaire .text strong{font-size:18px}\
#offre-horaire .prix{background:white;color:#1a1a1a;font-weight:800;font-size:16px;padding:4px 14px;border-radius:20px}\
#offre-horaire .ancien{color:rgba(255,255,255,0.7);font-size:12px;text-decoration:line-through}\
#offre-horaire .cta{background:white;color:#ed1c24;font-weight:700;font-size:13px;padding:6px 16px;border-radius:20px;text-decoration:none;transition:transform 0.2s}\
#offre-horaire .cta:hover{transform:scale(1.05)}\
#offre-horaire .close{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,0.7);font-size:18px;cursor:pointer;padding:4px 8px}\
#offre-horaire .close:hover{color:white}\
@media(max-width:640px){#offre-horaire-inner{padding:8px 40px 8px 12px;gap:6px}#offre-horaire .text{font-size:12px}#offre-horaire .text strong{font-size:14px}#offre-horaire .cta{font-size:11px;padding:5px 12px}}';
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.id = 'offre-horaire';
  bar.style.background = 'linear-gradient(135deg, ' + offre.bg + ', #1a1a1a)';
  bar.innerHTML = '\
<div id="offre-horaire-inner">\
<span class="badge">' + offre.badge + '</span>\
<span class="emoji">' + offre.emoji + '</span>\
<span class="text">' + offre.titre + ' — <strong>' + offre.description + '</strong></span>\
<span class="ancien">' + offre.ancien + '</span>\
<span class="prix">' + offre.prix + '</span>\
<a href="tel:+33145912593" class="cta"><i class="fa-solid fa-phone"></i> Appeler</a>\
<button class="close" aria-label="Fermer">&times;</button>\
</div>';
  document.body.appendChild(bar);

  // Push page content down
  setTimeout(function () {
    bar.classList.add('visible');
    document.body.style.paddingTop = bar.offsetHeight + 'px';
  }, 1500);

  bar.querySelector('.close').addEventListener('click', function () {
    bar.classList.remove('visible');
    document.body.style.paddingTop = '0';
    sessionStorage.setItem('padrino_offre_horaire_dismissed', '1');
    setTimeout(function () { bar.remove(); }, 500);
  });

})();
