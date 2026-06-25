/**
 * Padrino Chatbot — Conseiller virtuel
 * Self-contained: injects its own HTML/CSS
 */
(function () {
  'use strict';

  // === DATA ===
  var INFO = {
    horaires: '7J/7 de 11H30 à 15H et de 18H à 23H',
    tel_blm: '01 45 91 25 93',
    tel_vlp: '01 43 83 64 07',
    addr_blm: '2 Rue du Professeur Paul Langevin, 93150 Le Blanc-Mesnil',
    addr_vlp: '22 Avenue de Barbès, 93420 Villepinte',
    zones: 'Le Blanc-Mesnil, Villepinte, Drancy, Aulnay-sous-Bois, Sevran, Tremblay-en-France',
    commander: 'https://lepadrino.dishop.co/',
    app_ios: 'https://apps.apple.com/fr/app/le-padrino/id1635567913',
    app_android: 'https://play.google.com/store/apps/details?id=com.dishop.lepadrino'
  };

  var RESPONSES = [
    {
      keywords: ['horaire', 'ouvert', 'heure', 'fermé', 'ferme', 'quand', 'ouvrir'],
      answer: 'Nous sommes ouverts <strong>7J/7</strong> de <strong>11H30 à 15H</strong> et de <strong>18H à 23H</strong> dans nos deux restaurants !'
    },
    {
      keywords: ['adresse', 'situé', 'trouver', 'aller', 'lieu', 'localisation', 'itinéraire', 'ou etes vous', 'vous etes ou'],
      answer: '📍 <strong>Le Blanc-Mesnil :</strong> ' + INFO.addr_blm + '<br>📍 <strong>Villepinte :</strong> ' + INFO.addr_vlp
    },
    {
      keywords: ['téléphone', 'tel', 'appeler', 'numéro', 'numero', 'contact', 'joindre'],
      answer: '📞 <strong>Le Blanc-Mesnil :</strong> <a href="tel:+33145912593">' + INFO.tel_blm + '</a><br>📞 <strong>Villepinte :</strong> <a href="tel:+33143836407">' + INFO.tel_vlp + '</a>'
    },
    {
      keywords: ['livraison', 'livrer', 'zone', 'secteur', 'ville', 'commune'],
      answer: 'Nous livrons dans les villes suivantes : <strong>' + INFO.zones + '</strong>. Commandez en ligne sur <a href="' + INFO.commander + '" target="_blank">notre site</a> !'
    },
    {
      keywords: ['commander', 'commande', 'en ligne', 'internet', 'dishop'],
      answer: 'Vous pouvez commander en ligne ici : <a href="' + INFO.commander + '" target="_blank"><strong>Commander maintenant</strong></a><br><br>🎉 Code promo <strong>BIENV10</strong> pour -10% sur votre 1ère commande !<br>🎉 Code <strong>LIVRAISON20</strong> pour -20% en livraison !'
    },
    {
      keywords: ['promo', 'offre', 'réduction', 'reduction', 'code', 'coupon', 'remise'],
      answer: '🔥 <strong>Offres du moment :</strong><br>• 1 pizza achetée = 1 pizza offerte (à emporter)<br>• 2 pizzas achetées = 1 pizza offerte (en livraison)<br>• Code <strong>BIENV10</strong> : -10% sur 1ère commande en ligne<br>• Code <strong>LIVRAISON20</strong> : -20% en livraison'
    },
    {
      keywords: ['poulet', 'chicken'],
      answer: '🐔 <strong>Nos pizzas au poulet :</strong><br>• <strong>Chicken</strong> — crème fraîche, poulet fumé, pomme de terre (9€/16,50€/24,50€)<br>• <strong>Suprême Chicken</strong> — poulet fumé, émincé de poulet, poivrons, oignons (10€/17,90€/25,50€)<br>• <strong>Bollywood</strong> — émincé de poulet épicé, sauce curry (10€/17,90€/25,50€)<br>• <strong>Provençale</strong> — poulet fumé, champignons, poivrons, œuf (10€/16,50€/24,50€)<br>• <strong>Chicken BBQ</strong> — sauce barbecue, émincé de poulet, poivrons (10€/17,90€/25,90€)<br>• <strong>Hot Fajitas</strong> — sauce salsa, poulet, piments, poivrons (10€/17,90€/25,90€)<br><br>👉 <a href="pizza.html">Voir toutes nos pizzas</a>'
    },
    {
      keywords: ['saumon', 'poisson', 'norvégienne'],
      answer: '🐟 <strong>Nos pizzas au saumon/poisson :</strong><br>• <strong>Norvégienne</strong> — crème fraîche, saumon fumé, citron (10€/17,90€/25,50€)<br>• <strong>Pesto-Saumon</strong> ⭐ — crème de pesto, mozzarella, saumon, roquette (14,90€)<br>• <strong>Pêcheur</strong> — sauce tomate, thon, œuf, olives (8,70€/15,50€/22€)<br>• <strong>Fruits de Mer</strong> — cocktail de fruits de mer, ail, persil (8,50€/16,50€/24,50€)<br><br>👉 <a href="pizza.html">Voir toutes nos pizzas</a>'
    },
    {
      keywords: ['fromage', '4 fromages', 'chèvre', 'raclette', 'tartiflette', 'boursin'],
      answer: '🧀 <strong>Nos pizzas fromagères :</strong><br>• <strong>4 Fromages</strong> — provolone, parmesan, gorgonzola (8,50€/15,50€/22€)<br>• <strong>Chèvre Miel</strong> — fromage de chèvre, miel, olives (8,50€/16,50€/24,50€)<br>• <strong>Raclette</strong> — fromage à raclette, jambon, pomme de terre (10€/17,90€/25,50€)<br>• <strong>Tartiflette</strong> — tartiflette, lardons, pomme de terre (10€/17,90€/25,50€)<br>• <strong>Boursin</strong> — boursin, jambon, pomme de terre (9,50€/16,90€/24,50€)<br>• <strong>Di-buffala</strong> ⭐ — burrata, roquette, tomates cerise (14,90€)<br><br>👉 <a href="pizza.html">Voir toutes nos pizzas</a>'
    },
    {
      keywords: ['viande', 'jambon', 'merguez', 'chorizo', 'kebab', 'hachée', 'carne'],
      answer: '🥩 <strong>Nos pizzas à la viande :</strong><br>• <strong>Carne</strong> — jambon, viande hachée, merguez, oignons (10€/17,90€/25,50€)<br>• <strong>Kebab</strong> — viande de kebab, tomates, poivrons, oignons (9€/16,50€/24,50€)<br>• <strong>Mexicaine</strong> — chorizo, merguez, poivrons, olives (8,50€/16,50€/24,50€)<br>• <strong>L\'Orientale</strong> — merguez, champignons, œuf (8,50€/15,50€/22€)<br>• <strong>Buffalo</strong> — sauce BBQ, viande hachée, poivrons (10€/17,90€/25,90€)<br>• <strong>Burger</strong> — sauce burger, viande hachée, cheddar, cornichons (10€/17,90€/25,90€)<br><br>👉 <a href="pizza.html">Voir toutes nos pizzas</a>'
    },
    {
      keywords: ['piquant', 'épicé', 'piment', 'hot', 'fajitas', 'spicy'],
      answer: '🌶️ <strong>Nos pizzas épicées :</strong><br>• <strong>Hot Fajitas</strong> — sauce salsa, poulet, piments, poivrons (10€/17,90€/25,90€)<br>• <strong>Hot Spicy</strong> — sauce salsa, viande hachée, piments (10€/17,90€/25,90€)<br>• <strong>Hot Pimento</strong> — sauce salsa, poulet, chorizo, piments (10€/17,90€/25,90€)<br>• <strong>Mexicaine</strong> — chorizo, merguez, poivrons (8,50€/16,50€/24,50€)<br>• <strong>Bollywood</strong> — poulet épicé, sauce curry (10€/17,90€/25,50€)<br><br>👉 <a href="pizza.html">Voir toutes nos pizzas</a>'
    },
    {
      keywords: ['végétarien', 'végé', 'legume', 'légume', 'sans viande'],
      answer: '🌿 <strong>Nos options végétariennes :</strong><br>• <strong>Végétarienne</strong> — tomates, champignons, poivrons, olives, oignons (8,50€/14,90€/21€)<br>• <strong>Margerita</strong> — sauce tomate, fromage, origan (6,50€/12,50€/18€)<br>• <strong>4 Fromages</strong> — provolone, parmesan, gorgonzola (8,50€/15,50€/22€)<br>• <strong>Chèvre Miel</strong> — chèvre, miel, olives (8,50€/16,50€/24,50€)<br>• <strong>Di-buffala</strong> ⭐ — burrata, roquette, tomates cerise (14,90€)<br>• Toutes nos <strong>salades</strong> aussi ! Dès 6€<br><br>👉 <a href="pizza.html">Voir nos pizzas</a> | <a href="salades.html">Voir les salades</a>'
    },
    {
      keywords: ['pizza', 'pizzas', 'carte pizza', 'menu pizza', 'toutes les pizza'],
      answer: '🍕 Nous avons plus de <strong>30 pizzas</strong> ! 3 bases :<br>• <strong>Sauce Tomate</strong> (dès 6,50€) : Margerita, Reine, Campione, Kebab...<br>• <strong>Crème Fraîche</strong> (dès 8,50€) : Milano, Raclette, Bollywood...<br>• <strong>Spéciale</strong> (dès 10€) : Buffalo, Burger, Hot Fajitas...<br>• <strong>Signatures</strong> : Tartufo, Pesto-Saumon, Di-buffala (14,90€)<br><br>Dites-moi ce que vous aimez et je vous conseille ! (poulet, fromage, épicé, viande, poisson, végétarien...)<br><br>👉 <a href="pizza.html">Voir toutes nos pizzas</a>'
    },
    {
      keywords: ['pasta', 'pâte', 'pates', 'spaghetti', 'carbonara', 'bolognaise'],
      answer: '🍝 <strong>Nos Pastas (8€) :</strong><br>• Salmone, Quattro Formaggi, Carbonara, Bolognaise<br>• Menu Pasta à 10€ (plat + boisson + dessert)<br><br>👉 <a href="pasta.html">Voir les pastas</a>'
    },
    {
      keywords: ['panini', 'sandwich'],
      answer: '🥖 <strong>Nos Paninis (5€) :</strong><br>• Jambon, Thon, Saumon Fumé, Poulet, Boursin, Nutella<br>• Menu Panini à 7,50€ (panini + boisson + accompagnement)<br><br>👉 <a href="pasta.html">Voir les paninis</a>'
    },
    {
      keywords: ['tex', 'mex', 'chicken', 'wings', 'nuggets', 'tenders', 'frites', 'potatoes'],
      answer: '🌮 <strong>Nos Tex-Mex (Menu 8€) :</strong><br>• Chicken Wings, Nuggets, Mozza Sticks, Tenders<br>• Frites et Potatoes dès 2,50€<br><br>👉 <a href="texmex.html">Voir le tex-mex</a>'
    },
    {
      keywords: ['salade', 'gratin', 'légume', 'végétarien'],
      answer: '🥗 <strong>Salades :</strong> Grèque, Niçoise, Océane (dès 6€), Chèvre Chaud, Crispy, Burrata (9,90€)<br>Menu Salade à 8€<br><br>🧀 <strong>Gratins Dauphinois</strong> (8,50€) : Classique, Poulet, Jambon, Lardons, Viande Hachée, Saumon<br><br>👉 <a href="salades.html">Voir les salades</a>'
    },
    {
      keywords: ['dessert', 'sucré', 'tiramisu', 'brownie', 'tarte', 'gâteau'],
      answer: '🍰 <strong>Nos Desserts :</strong><br>• Tiramisu (3€) — plusieurs parfums<br>• Tarte aux daims (3€)<br>• Tarte aux pommes (2,50€)<br>• Brownie (2,50€)<br>• Moelleux au chocolat (2,50€)<br><br>👉 <a href="dessert.html">Voir les desserts</a>'
    },
    {
      keywords: ['boisson', 'boire', 'coca', 'eau', 'jus', 'sprite', 'fanta'],
      answer: '🥤 <strong>Boissons :</strong><br>• 33cl : 1,50€ (Coca, Sprite, Fanta, Orangina, Oasis...)<br>• 1,5L : 3€<br>• 2L : 3,50€<br><br>👉 <a href="dessert.html">Voir les boissons</a>'
    },
    {
      keywords: ['menu', 'carte', 'tout', 'complet', 'voir'],
      answer: '📋 Retrouvez toute notre carte sur une seule page :<br><br>👉 <a href="menu.html"><strong>Voir le menu complet</strong></a>'
    },
    {
      keywords: ['halal', 'certifié', 'viande'],
      answer: '✅ Oui, toutes nos viandes sont <strong>100% halal</strong>.'
    },
    {
      keywords: ['app', 'application', 'télécharger', 'mobile', 'iphone', 'android'],
      answer: '📱 Téléchargez notre app :<br>• <a href="' + INFO.app_ios + '" target="_blank">App Store (iPhone)</a><br>• <a href="' + INFO.app_android + '" target="_blank">Google Play (Android)</a><br><br>🎉 -10% avec le code <strong>BIENV10</strong> sur votre 1ère commande !'
    },
    {
      keywords: ['réserver', 'reservation', 'table', 'place'],
      answer: 'Pour réserver, appelez-nous directement :<br>📞 <a href="tel:+33145912593">Le Blanc-Mesnil : ' + INFO.tel_blm + '</a><br>📞 <a href="tel:+33143836407">Villepinte : ' + INFO.tel_vlp + '</a>'
    },
    {
      keywords: ['conseil', 'recommand', 'suggestion', 'populaire', 'meilleur', 'préféré', 'quoi manger', 'choisir'],
      answer: '👨‍🍳 <strong>Nos recommandations :</strong><br>• 🏆 <strong>Tartufo</strong> (14,90€) — notre signature à la truffe<br>• 🔥 <strong>Campione</strong> — viande hachée, champignons, œuf<br>• ❤️ <strong>Bollywood</strong> — poulet épicé, sauce curry<br>• 🧀 <strong>Raclette</strong> — pour les amateurs de fromage<br>• 🌶️ <strong>Hot Fajitas</strong> — pour ceux qui aiment le piquant<br><br>👉 <a href="menu.html">Voir le menu complet</a>'
    },
    {
      keywords: ['prix', 'combien', 'coût', 'tarif', 'cher', 'budget'],
      answer: '💰 <strong>Nos prix :</strong><br>• Pizzas : dès 6,50€ (Junior) à 25,90€ (Méga)<br>• Pastas : 8€ / Menu 10€<br>• Paninis : 5€ / Menu 7,50€<br>• Tex-Mex : Menu 8€<br>• Salades : dès 6€ / Menu 8€<br>• Gratins : 8,50€<br>• Desserts : dès 2,50€<br><br>👉 <a href="menu.html">Voir tous les prix</a>'
    },
    {
      keywords: ['bonjour', 'salut', 'hello', 'coucou', 'hey', 'bonsoir'],
      answer: 'Bonjour ! 👋 Bienvenue chez <strong>Padrino</strong> ! Comment puis-je vous aider ?<br><br>Vous pouvez me demander :<br>• 🍕 Nos pizzas et le menu<br>• 🔥 Les promos en cours<br>• 📍 Nos adresses et horaires<br>• 🛵 Les zones de livraison<br>• 👨‍🍳 Un conseil pour choisir'
    },
    {
      keywords: ['merci', 'super', 'parfait', 'génial', 'top', 'cool'],
      answer: 'Avec plaisir ! 😊 N\'hésitez pas si vous avez d\'autres questions. Bon appétit ! 🍕'
    },
    {
      keywords: ['emporter', 'sur place', 'take away', 'retrait'],
      answer: '🏪 Vous pouvez commander <strong>à emporter</strong> ou <strong>sur place</strong> dans nos 2 restaurants :<br>• Le Blanc-Mesnil : ' + INFO.addr_blm + '<br>• Villepinte : ' + INFO.addr_vlp + '<br><br>🎁 <strong>Offre emporter :</strong> 1 pizza achetée = 1 pizza offerte !'
    }
  ];

  var DEFAULT_ANSWER = 'Je ne suis pas sûr de comprendre votre question 🤔<br><br>Essayez de me demander :<br>• <strong>menu</strong> — voir notre carte<br>• <strong>pizza</strong> — nos pizzas<br>• <strong>promo</strong> — les offres en cours<br>• <strong>horaires</strong> — nos heures d\'ouverture<br>• <strong>livraison</strong> — zones desservies<br>• <strong>conseil</strong> — mes recommandations<br>• <strong>commander</strong> — passer commande';

  var QUICK_REPLIES = [
    { label: '🍕 Pizzas', text: 'pizza' },
    { label: '📋 Menu', text: 'menu' },
    { label: '🔥 Promos', text: 'promo' },
    { label: '👨‍🍳 Conseil', text: 'conseil' },
    { label: '🕐 Horaires', text: 'horaires' },
    { label: '🛵 Livraison', text: 'livraison' }
  ];

  // === MATCH ===
  function findAnswer(input) {
    var lower = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    var words = lower.split(/\s+/);
    var best = null;
    var bestScore = 0;
    for (var i = 0; i < RESPONSES.length; i++) {
      var score = 0;
      for (var j = 0; j < RESPONSES[i].keywords.length; j++) {
        var kw = RESPONSES[i].keywords[j].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        // Match whole words or multi-word keywords
        if (kw.indexOf(' ') !== -1) {
          if (lower.indexOf(kw) !== -1) score += 2;
        } else {
          for (var w = 0; w < words.length; w++) {
            if (words[w] === kw || words[w].indexOf(kw) === 0 && kw.length >= 4) { score++; break; }
          }
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = RESPONSES[i];
      }
    }
    return best ? best.answer : DEFAULT_ANSWER;
  }

  // === INJECT CSS ===
  var style = document.createElement('style');
  style.textContent = '\
#padrino-chat-btn{position:fixed;bottom:80px;right:20px;z-index:45;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#ed1c24,#ff6b35);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(237,28,36,0.4);display:flex;align-items:center;justify-content:center;transition:transform 0.3s,box-shadow 0.3s}\
#padrino-chat-btn:hover{transform:scale(1.1);box-shadow:0 6px 25px rgba(237,28,36,0.5)}\
#padrino-chat-btn svg{width:28px;height:28px;fill:white}\
#padrino-chat-btn .badge{position:absolute;top:-2px;right:-2px;background:#ffc107;color:#1a1a1a;font-size:10px;font-weight:700;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center}\
#padrino-chat{position:fixed;bottom:80px;right:20px;z-index:46;width:360px;max-width:calc(100vw - 24px);height:500px;max-height:calc(100vh - 120px);background:#fff;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.25);display:none;flex-direction:column;overflow:hidden;font-family:Poppins,sans-serif}\
#padrino-chat.open{display:flex}\
#padrino-chat-head{background:linear-gradient(135deg,#ed1c24,#b71c1c);padding:14px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0}\
#padrino-chat-head img{width:36px;height:36px;border-radius:50%;border:2px solid white}\
#padrino-chat-head .info{flex:1}\
#padrino-chat-head .name{color:white;font-weight:700;font-size:14px}\
#padrino-chat-head .status{color:rgba(255,255,255,0.7);font-size:11px}\
#padrino-chat-head .close{background:none;border:none;color:white;font-size:22px;cursor:pointer;padding:4px 8px;opacity:0.7}\
#padrino-chat-head .close:hover{opacity:1}\
#padrino-chat-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:#f9f9f9}\
.chat-msg{max-width:85%;padding:10px 14px;border-radius:14px;font-size:13px;line-height:1.5;word-wrap:break-word}\
.chat-msg a{color:#ed1c24;text-decoration:underline}\
.chat-bot{background:white;color:#1a1a1a;border-bottom-left-radius:4px;align-self:flex-start;box-shadow:0 1px 3px rgba(0,0,0,0.08)}\
.chat-user{background:linear-gradient(135deg,#ed1c24,#ff6b35);color:white;border-bottom-right-radius:4px;align-self:flex-end}\
.chat-quick{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 8px}\
.chat-quick button{background:white;border:1.5px solid #ed1c24;color:#ed1c24;padding:5px 12px;border-radius:20px;font-size:12px;cursor:pointer;font-weight:500;transition:all 0.2s}\
.chat-quick button:hover{background:#ed1c24;color:white}\
#padrino-chat-input{display:flex;border-top:1px solid #eee;padding:8px;gap:6px;flex-shrink:0;background:white}\
#padrino-chat-input input{flex:1;border:1.5px solid #ddd;border-radius:20px;padding:8px 14px;font-size:13px;outline:none;font-family:inherit}\
#padrino-chat-input input:focus{border-color:#ed1c24}\
#padrino-chat-input button{background:#ed1c24;border:none;color:white;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:background 0.2s}\
#padrino-chat-input button:hover{background:#b71c1c}\
@media(max-width:400px){#padrino-chat{width:100%;right:0;bottom:0;height:100vh;max-height:100vh;border-radius:0}}';
  document.head.appendChild(style);

  // === INJECT HTML ===
  var chatBtn = document.createElement('button');
  chatBtn.id = 'padrino-chat-btn';
  chatBtn.setAttribute('aria-label', 'Chat conseiller');
  chatBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg><span class="badge">1</span>';
  document.body.appendChild(chatBtn);

  var chatBox = document.createElement('div');
  chatBox.id = 'padrino-chat';
  chatBox.innerHTML = '\
<div id="padrino-chat-head">\
<img src="img/about/logo-padrino-sm.png" alt="Padrino">\
<div class="info"><div class="name">Padrino Conseiller</div><div class="status">En ligne — Besoin d\'un conseil ?</div></div>\
<button class="close" aria-label="Fermer">&times;</button>\
</div>\
<div id="padrino-chat-msgs"></div>\
<div class="chat-quick" id="padrino-quick"></div>\
<div id="padrino-chat-input">\
<input type="text" placeholder="Posez votre question..." maxlength="200">\
<button aria-label="Envoyer"><i class="fa-solid fa-paper-plane"></i></button>\
</div>';
  document.body.appendChild(chatBox);

  // === LOGIC ===
  var msgs = document.getElementById('padrino-chat-msgs');
  var quickDiv = document.getElementById('padrino-quick');
  var inputEl = chatBox.querySelector('#padrino-chat-input input');
  var sendBtn = chatBox.querySelector('#padrino-chat-input button');
  var closeBtn = chatBox.querySelector('.close');
  var badge = chatBtn.querySelector('.badge');
  var isOpen = false;

  function addMsg(text, isUser) {
    var div = document.createElement('div');
    div.className = 'chat-msg ' + (isUser ? 'chat-user' : 'chat-bot');
    div.innerHTML = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showQuickReplies() {
    quickDiv.innerHTML = '';
    QUICK_REPLIES.forEach(function (qr) {
      var btn = document.createElement('button');
      btn.textContent = qr.label;
      btn.addEventListener('click', function () { handleInput(qr.text); });
      quickDiv.appendChild(btn);
    });
  }

  function handleInput(text) {
    if (!text.trim()) return;
    addMsg(text, true);
    inputEl.value = '';
    // Typing delay
    setTimeout(function () {
      addMsg(findAnswer(text), false);
      showQuickReplies();
    }, 400 + Math.random() * 400);
  }

  function openChat() {
    isOpen = true;
    chatBox.classList.add('open');
    chatBtn.style.display = 'none';
    if (msgs.children.length === 0) {
      addMsg('Bonjour ! 👋 Je suis le conseiller <strong>Padrino</strong>.<br><br>Comment puis-je vous aider ?', false);
      showQuickReplies();
    }
    inputEl.focus();
  }

  function closeChat() {
    isOpen = false;
    chatBox.classList.remove('open');
    chatBtn.style.display = 'flex';
    badge.style.display = 'none';
  }

  chatBtn.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
  sendBtn.addEventListener('click', function () { handleInput(inputEl.value); });
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleInput(inputEl.value);
  });

})();
