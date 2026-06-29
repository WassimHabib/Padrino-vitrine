# Campagne Google Ads — Le Padrino (guide complet)

Page de destination des pubs (déjà prête, suivi de conversion inclus) :
**https://www.lepadrino.fr/livraison-pizza-le-blanc-mesnil.html**

---

## Feuille de route (ordre conseillé)

- [ ] **Étape 0** — Fiche Google Business Profile au top (GRATUIT, priorité n°1)
- [ ] **Étape 1** — Créer le compte Google Ads
- [ ] **Étape 2** — Créer les 2 actions de conversion → me donner les IDs
- [ ] **Étape 3** — Créer la campagne (réglages ci-dessous)
- [ ] **Étape 4** — Coller les annonces (titres/descriptions ci-dessous)
- [ ] **Étape 5** — Lancer petit (10 €/jour) et mesurer le coût par commande

---

## Étape 0 — Google Business Profile (avant de payer !)
Pour une pizzeria, la fiche Google (Maps + « près de moi ») rapporte souvent plus que les pubs.
- Photos appétissantes (pizzas, salle, équipe)
- Horaires exacts : 11h30–15h et 18h–23h, 7j/7
- Bouton de commande → lien `https://lepadrino.dishop.co/`
- Catégorie : « Pizzeria » + « Livraison de repas »
- **Demander des avis** aux clients (tu es à 4,7/5 — c'est un aimant à clients)

---

## Étape 1 — Mots-clés

### À cibler (forte intention locale)
- pizza livraison blanc-mesnil / livraison pizza le blanc-mesnil
- pizzeria blanc-mesnil / pizza halal blanc-mesnil
- pizza à emporter blanc-mesnil / commander pizza blanc-mesnil
- livraison pizza drancy / pizzeria drancy / pizza halal drancy
- livraison pizza aulnay-sous-bois / pizzeria aulnay / pizza halal aulnay
- livraison pizza dugny / livraison pizza le bourget
- livraison pizza sevran / livraison pizza villepinte / livraison pizza tremblay
- pizza halal près de moi / pizza livraison près de moi

### Mots-clés négatifs (pour ne pas gaspiller le budget)
emploi, recrutement, job, stage, recette, recettes, four à pizza, achat,
surgelée, picard, gratuit, gluten, comment faire, pâte à pizza, halal traiteur

> Astuce : ne pas faire d'Ads sur « le padrino » (ton nom) si tu ressors déjà n°1
> gratuitement — tu paierais des clics que tu aurais eus gratuitement.

---

## Étape 2 — Actions de conversion à créer dans Google Ads
Crée 2 actions (Outils → Conversions → Nouvelle) :
1. **Commande en ligne** (site web → clic)
2. **Appel téléphonique** (site web → clic sur numéro)

Chacune donne un identifiant `send_to` du type `AW-1234567890/AbC-DefGhI`.
👉 **Donne-moi ces 2 IDs** : je les mets dans `js/ads-tracking.js` et je déploie.

---

## Étape 3 — Réglages de la campagne
- **Type** : Réseau de Recherche (Search)
- **Objectif** : Ventes / Prospects (commandes + appels)
- **Zone géographique** : UNIQUEMENT tes zones de livraison →
  Le Blanc-Mesnil, Drancy, Aulnay-sous-Bois, Dugny, Le Bourget, Sevran,
  Villepinte, Tremblay-en-France (ou rayon ~5 km autour du resto).
  ⚠️ Choisir « Présence : personnes **dans** cette zone » (pas « intérêt »).
- **Horaires de diffusion** : seulement quand c'est ouvert →
  11h30–14h30 et 18h30–22h30, 7j/7 (sinon tu payes des clics quand c'est fermé)
- **Budget** : démarrer à **10 €/jour**
- **Enchères** : 2 premières semaines « Maximiser les clics » avec un plafond CPC
  ~0,80 €, puis passer à « Maximiser les conversions » une fois les données collectées
- **Appareils** : laisser tout (le mobile domine pour la pizza)
- **Page de destination (URL finale)** :
  `https://www.lepadrino.fr/livraison-pizza-le-blanc-mesnil.html`
- **Suffixe d'URL finale** (pour le suivi Umami) :
  `utm_source=google&utm_medium=cpc&utm_campaign=search_blancmesnil`

### Assets à ajouter (gratuits, augmentent les clics)
- **Liens annexes** : Menu, Nos pizzas, Nos offres, Commander
- **Accroches** : Halal, Livraison 7j/7, Fait maison, CB & Ticket resto
- **Extension d'appel** : 01 45 91 25 93
- **Extension de lieu** : relier ta fiche Google Business
- **Promotion** : « 1 pizza achetée = 1 offerte »

---

## Étape 4 — Annonces (à copier-coller)

### Titres (max 30 caractères chacun)
1. Padrino Pizza Blanc-Mesnil
2. Livraison Pizza 7j/7
3. 1 Pizza Achetée = 1 Offerte
4. Pizzas Halal Faites Maison
5. Commandez en Ligne
6. Livré Rapidement Chez Vous
7. -10% avec le code BIENV10
8. Pizza Halal Près de Chez Vous
9. Pâtes, Tex-Mex, Salades
10. Noté 4,7/5 (500+ avis)
11. Livraison Drancy, Aulnay…
12. À Emporter ou Livré
13. Pizza au Feu de Bois
14. Commande en 2 Clics
15. Padrino, Votre Pizzeria

### Descriptions (max 90 caractères chacune)
1. Pizzas halal maison, livrées 7j/7. 1 achetée = 1 offerte à emporter !
2. Commandez en ligne en quelques clics. Livraison rapide au Blanc-Mesnil et alentours.
3. Pâtes, tex-mex, salades, desserts. -10% sur la 1ère commande, code BIENV10.
4. Noté 4,7/5 par 500+ clients. Pizza au feu de bois, ingrédients frais.

---

## Étape 5 — Liens UTM pour mesurer (Umami + GA4)
Colle ces liens selon le canal :

| Canal | Lien à utiliser |
|---|---|
| Google Ads | `…/livraison-pizza-le-blanc-mesnil.html?utm_source=google&utm_medium=cpc&utm_campaign=search_blancmesnil` |
| Instagram (pub) | `https://www.lepadrino.fr/?utm_source=instagram&utm_medium=paid_social&utm_campaign=promo` |
| Facebook (pub) | `https://www.lepadrino.fr/?utm_source=facebook&utm_medium=paid_social&utm_campaign=promo` |
| Bio Instagram | `https://www.lepadrino.fr/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| Flyer / QR code | `https://www.lepadrino.fr/?utm_source=flyer&utm_medium=print&utm_campaign=quartier` |

---

## Étape 6 — Mesurer (la seule chose qui compte)
Regarde le **coût par commande** :
- Marge ~10 €/commande et coût pub < 5 €/commande → **rentable, on augmente**
- Sinon → on coupe ou on ajuste (mots-clés, zone, annonce)
Suivi : Umami (referrers + filtre UTM) et GA4 (Acquisition → canaux).
