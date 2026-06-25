/**
 * Padrino - Google Ads conversion tracking
 * Used only on landing pages targeted by paid Ads campaigns.
 *
 * Setup steps after creating actions in Google Ads:
 *   1. Create 2 conversion actions in your Google Ads account:
 *        - "Online order click" (web — page view or click)
 *        - "Phone call click"   (web — click on tel: link)
 *   2. Each action gives you a `send_to` ID like 'AW-10953067553/AbC-DefGhI'
 *   3. Replace the TODO placeholders below with your real IDs.
 *
 * Until the IDs are filled in, conversions are pushed to dataLayer only
 * (visible in GTM debug + GA4 events) but not counted as Ads conversions.
 */

(function () {
  'use strict';

  // TODO: replace with real send_to from Google Ads after creating conversion actions
  var ORDER_CONVERSION_ID = null; // e.g. 'AW-10953067553/AbC-DefGhI'
  var PHONE_CONVERSION_ID = null; // e.g. 'AW-10953067553/JkL-MnoPqR'

  function trackConversion(type) {
    var category = type === 'order' ? 'order_online_click' : 'phone_call_click';

    // Always push to dataLayer (works without Ads IDs - visible in GTM/GA4)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ads_conversion',
      event_category: category,
      event_label: 'landing_blanc_mesnil'
    });

    // Push to Google Ads if configured
    if (typeof gtag === 'function') {
      var sendTo = type === 'order' ? ORDER_CONVERSION_ID : PHONE_CONVERSION_ID;
      if (sendTo) {
        gtag('event', 'conversion', { send_to: sendTo });
      }
    }
  }

  // Wire up all CTA buttons via the data-ads-cta attribute
  document.querySelectorAll('[data-ads-cta]').forEach(function (el) {
    var ctaType = el.getAttribute('data-ads-cta');

    el.addEventListener('click', function () {
      if (ctaType === 'order') {
        trackConversion('order');
      } else if (ctaType === 'phone') {
        // Direct tel: link click - real call attempt
        trackConversion('phone');
      } else if (ctaType === 'call') {
        // "Appeler" button click - opens phone modal (intent, not yet a call)
        trackConversion('phone');
      }
    });
  });

  // Hero "Appeler" button - main.js only binds #btn-appeler-desktop/mobile/bottom,
  // so we wire #btn-appeler-hero here to open the phone modal too.
  var heroCallBtn = document.getElementById('btn-appeler-hero');
  var phoneModal = document.getElementById('phone-modal');
  if (heroCallBtn && phoneModal) {
    heroCallBtn.addEventListener('click', function () {
      phoneModal.classList.remove('hidden');
      phoneModal.classList.add('flex');
    });
  }
})();
