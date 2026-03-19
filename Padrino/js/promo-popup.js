/**
 * Padrino — Pop-up promo première visite
 * S'affiche 1 seule fois, stocké dans localStorage (30 jours)
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'padrino_promo_seen';
  var DELAY_MS = 8000;
  var EXPIRE_DAYS = 30;

  // Check if already seen
  var seen = localStorage.getItem(STORAGE_KEY);
  if (seen) {
    var expiry = parseInt(seen, 10);
    if (Date.now() < expiry) return;
  }

  // === INJECT CSS ===
  var style = document.createElement('style');
  style.textContent = '\
#promo-overlay{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity 0.4s ease}\
#promo-overlay.visible{opacity:1}\
#promo-popup{background:#fff;border-radius:20px;max-width:420px;width:100%;overflow:hidden;transform:scale(0.9) translateY(20px);transition:transform 0.4s ease;box-shadow:0 20px 60px rgba(0,0,0,0.3)}\
#promo-overlay.visible #promo-popup{transform:scale(1) translateY(0)}\
#promo-top{background:linear-gradient(135deg,#ed1c24,#b71c1c);padding:28px 24px 20px;text-align:center;position:relative}\
#promo-top .close{position:absolute;top:10px;right:14px;background:none;border:none;color:rgba(255,255,255,0.7);font-size:24px;cursor:pointer;padding:4px 8px;line-height:1}\
#promo-top .close:hover{color:white}\
#promo-top .emoji{font-size:48px;margin-bottom:8px}\
#promo-top h2{color:white;font-size:22px;font-weight:800;margin:0 0 4px;font-family:KGHAPPY,cursive}\
#promo-top p{color:rgba(255,255,255,0.85);font-size:14px;margin:0}\
#promo-code-box{margin:20px 24px 0;background:#fff8f0;border:2px dashed #ed1c24;border-radius:12px;padding:16px;text-align:center}\
#promo-code-box .label{font-size:12px;color:#666;margin:0 0 6px;font-weight:500}\
#promo-code-box .code{font-size:28px;font-weight:900;color:#ed1c24;letter-spacing:3px;margin:0;font-family:monospace}\
#promo-code-box .copy{background:none;border:none;color:#ed1c24;font-size:12px;cursor:pointer;margin-top:6px;text-decoration:underline;font-weight:500}\
#promo-code-box .copied{color:#5abc71}\
#promo-bottom{padding:16px 24px 24px;text-align:center}\
#promo-bottom .cta{display:block;width:100%;background:linear-gradient(135deg,#ed1c24,#ff6b35);color:white;font-weight:700;font-size:16px;padding:14px;border:none;border-radius:12px;cursor:pointer;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 15px rgba(237,28,36,0.3)}\
#promo-bottom .cta:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(237,28,36,0.4)}\
#promo-bottom .skip{display:inline-block;margin-top:10px;background:none;border:none;color:#999;font-size:12px;cursor:pointer}\
#promo-bottom .skip:hover{color:#666}';
  document.head.appendChild(style);

  // === CREATE POPUP ===
  setTimeout(function () {
    var overlay = document.createElement('div');
    overlay.id = 'promo-overlay';
    overlay.innerHTML = '\
<div id="promo-popup">\
<div id="promo-top">\
<button class="close" aria-label="Fermer">&times;</button>\
<div class="emoji">🍕</div>\
<h2>-10% sur votre 1ère commande !</h2>\
<p>Bienvenue chez Padrino — utilisez ce code exclusif</p>\
</div>\
<div id="promo-code-box">\
<p class="label">VOTRE CODE PROMO</p>\
<p class="code">BIENV10</p>\
<button class="copy">Copier le code</button>\
</div>\
<div id="promo-bottom">\
<a href="https://lepadrino.dishop.co/" class="cta" target="_blank">Commander maintenant</a>\
<button class="skip">Non merci, peut-être plus tard</button>\
</div>\
</div>';
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('visible');
      });
    });

    // Mark as seen
    var expiry = Date.now() + EXPIRE_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, expiry.toString());

    // Close logic
    function closePopup() {
      overlay.classList.remove('visible');
      setTimeout(function () { overlay.remove(); }, 400);
    }

    overlay.querySelector('.close').addEventListener('click', closePopup);
    overlay.querySelector('.skip').addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });

    // Copy code
    overlay.querySelector('.copy').addEventListener('click', function () {
      var btn = this;
      if (navigator.clipboard) {
        navigator.clipboard.writeText('BIENV10');
      } else {
        var input = document.createElement('input');
        input.value = 'BIENV10';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }
      btn.textContent = 'Copié !';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = 'Copier le code';
        btn.classList.remove('copied');
      }, 2000);
    });

  }, DELAY_MS);

})();
