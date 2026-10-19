# 📦 Tous les fichiers à uploader — HIVE FIVE

**26 fichiers** : le site complet, FR + EN, corrigé et avec 12 articles de blog.

📥 **Tout récupérer d'un coup :** `hive-five-seo-corrige.zip`

---

## ✅ Racine du site (version anglaise)

| Fichier | Ce qui a changé |
|---|---|
| `index.html` | Domaine · schema LocalBusiness enrichi · schema FAQ (10 Q) · width/height sur 25 images · fix logo · og:image · preload hero · lien Blog · hreflang |
| `services.html` | Domaine · schema Service + fil d'Ariane · fix logo · lien Blog · hreflang |
| `about.html` | Domaine · schema AboutPage + fil d'Ariane · fix logo · lien Blog · hreflang |
| `contact.html` | Domaine · schema ContactPage + fil d'Ariane · fix logo · lien Blog · hreflang |
| `international-companies.html` | Domaine · schema WebPage + fil d'Ariane · fix logo · lien Blog · hreflang |
| `blog.html` | **Refait** — 6 articles cliquables · schema Blog |
| `robots.txt` | URL sitemap réparée |
| `sitemap.xml` | **Refait** — 24 URLs (12 EN + 12 FR) |
| `.htaccess` | **Nouveau** — redirections 301, cache, gzip ⚠️ fichier caché |

## ✅ Dossier `blog/` — NOUVEAU (6 articles anglais)

```
coworking-vs-traditional-office-tunis.html          1 117 mots
how-to-set-up-remote-team-tunisia.html              1 155 mots
start-business-team-tunisia-without-office.html       959 mots
why-belvedere-strategic-business-location-tunis.html  830 mots
why-companies-choose-flexible-offices-tunis.html      920 mots
hackathons-ai-workshops-hive-five.html                883 mots
```

## ✅ Dossier `fr/` — version française corrigée

| Fichier | Ce qui a changé |
|---|---|
| `fr/index.html` | Domaine · **chevron `>>` en trop corrigé** · schema LocalBusiness · schema FAQ (10 Q en français) · width/height · fix logo · lien Blog · hreflang |
| `fr/services.html` | Domaine · chevron · schema Service + fil d'Ariane · fix logo · lien Blog |
| `fr/about.html` | Domaine · chevron · schema AboutPage + fil d'Ariane · fix logo · lien Blog |
| `fr/contact.html` | Domaine · chevron · schema ContactPage + fil d'Ariane · fix logo · lien Blog |
| `fr/international-companies.html` | Domaine · chevron · schema WebPage + fil d'Ariane · fix logo · lien Blog |
| `fr/blog.html` | **Refait** — 6 articles cliquables · schema Blog |

## ✅ Dossier `fr/blog/` — NOUVEAU (6 articles français)

```
coworking-vs-bureau-traditionnel-tunis.html                 1 199 mots
monter-equipe-distante-tunisie.html                         1 297 mots
lancer-equipe-tunisie-sans-bureau-traditionnel.html         1 041 mots
pourquoi-entreprises-choisissent-bureaux-flexibles-tunis.html 1 026 mots
belvedere-emplacement-strategique-tunis.html                  949 mots
hackathons-ateliers-ia-hive-five.html                         976 mots
```

**Ce ne sont pas des traductions automatiques** — chaque article a été réécrit en français naturel, avec les mots-clés que les Tunisiens tapent réellement : *location bureau Tunis*, *prix bureau Tunis*, *créer entreprise Tunisie*, *quartier affaires Tunis*.

---

## 📖 Documentation — à garder, ne pas uploader

`AUDIT-SEO-HIVE-FIVE.md` · `LISEZ-MOI-DEPLOIEMENT.md` · `BLOG-GUIDE.md` · `FICHIERS-A-UPLOADER.md` · `optimiser-images.sh`

---

## Arborescence finale

```
/
├── index.html · services.html · about.html
├── contact.html · international-companies.html · blog.html
├── robots.txt · sitemap.xml · .htaccess
├── blog/          ← NOUVEAU · 6 articles EN
├── fr/            ← 6 pages corrigées
│   └── blog/      ← NOUVEAU · 6 articles FR
└── images/        ← ne pas toucher
```

---

## Ordre de déploiement

1. **Sauvegarde** le site actuel.
2. Uploade les 6 HTML de la racine + `robots.txt` + `sitemap.xml`.
3. Crée `blog/` et uploade les 6 articles anglais.
4. Uploade les 6 pages de `fr/` (écrase les anciennes).
5. Crée `fr/blog/` et uploade les 6 articles français.
6. Uploade `.htaccess` **en dernier**. S'il pose problème, renomme-le `.htaccess-off` et tout revient à la normale.
7. **Ctrl + F5** pour vider le cache.

---

## Vérifications après upload

| # | Test | Attendu |
|---|---|---|
| 1 | `/robots.txt` | URL sitemap propre |
| 2 | `/sitemap.xml` | 24 URLs |
| 3 | `/blog.html` et `/fr/blog.html` | 6 articles cliquables chacun |
| 4 | Ouvrir un article FR | Sommaire à droite, puces visibles, logo net |
| 5 | `http://hivefivecoworking.com` | Redirige vers `https://www.` |
| 6 | [Test résultats enrichis](https://search.google.com/test/rich-results) sur l'accueil | **LocalBusiness** + **FAQ** |
| 7 | Idem sur un article FR | **Article** + **Breadcrumbs** + **FAQ** |
| 8 | Lien partagé sur WhatsApp | Aperçu avec photo |

Puis **Google Search Console** : soumets le sitemap, demande l'indexation de l'accueil FR, l'accueil EN et 2–3 articles.

---

## Ce qui a été vérifié automatiquement

- ✅ **0 occurrence** de `hivefive.tn` sur 24 pages
- ✅ **59 blocs JSON-LD**, 0 invalide
- ✅ Sitemap XML valide, 24 URLs uniques (12 EN + 12 FR)
- ✅ **hreflang réciproques** FR ↔ EN sur toutes les paires
- ✅ Fix logo sur **24/24** pages · lien Blog sur **24/24**
- ✅ Rendu testé dans un vrai navigateur, desktop + mobile
- ✅ Aucun débordement horizontal mobile

Trois bugs de rendu ont été détectés et corrigés en cours de route : chemins d'images cassés dans `/fr/blog/` (deux niveaux de profondeur), puces de listes invisibles, sommaire latéral qui ne suivait pas le défilement.

---

## Il reste une seule chose

**Compresser les images** — impossible sans les fichiers sources.

`terrasse.jpg` = **8,78 Mo** · `reunion.jpg` = **7,82 Mo**

Passe-les sur [squoosh.app](https://squoosh.app) : largeur max 1920 px, qualité 80. Dix minutes de travail, et c'est le dernier gros frein à la vitesse sur mobile.

---

## Correctif affichage mobile (11/08/2026)

**Symptome signale** : sur telephone, la page se decalait sur le cote, le texte etait
coupe a gauche et le calculateur debordait a droite.

**3 causes trouvees** (elles etaient masquees par `body{overflow-x:hidden}`) :

| # | Cause | Ou | Correctif |
|---|-------|-----|-----------|
| 1 | `.hero-in{padding:120px 0 64px}` ecrasait le `padding:0 24px` de `.container` → titre hero colle au bord | **24 pages** | `padding:120px 24px 64px` |
| 2 | `.art-wrap{padding:64px 0 20px}` idem → texte des articles colle/coupe | **14 articles** | `padding:64px 24px 20px` |
| 3 | Les `<select>` du calculateur imposaient une largeur minimum > ecran (cellule grid `min-width:auto`) | index EN + FR | `min-width:0` sur les enfants de grille + `max-width:100%` sur les champs |
| 4 | Tableaux comparatifs plus larges que l'ecran | 14 articles | encapsules dans `.table-wrap` (defilement horizontal local, 14 tableaux) |
| 5 | Boutons a libelle long qui depassaient | 24 pages | retour a la ligne autorise sous 680 px |

**Verification** : 24 pages x 4 largeurs (320 / 360 / 390 / 414 px) en mode mobile reel
→ **0 debordement, 0 texte colle au bord**.

**A re-uploader** : les 24 fichiers HTML (racine, blog/, fr/, fr/blog/).

---

## Hero mobile en plein fond (11/08/2026)

L'image `open-space.jpg` est en 1024x768 (paysage). Sur telephone le hero est en
portrait : `object-fit:cover` ne gardait qu'une bande centrale tres zoomee, la salle
n'etait plus reconnaissable.

**Solution** : une seconde image au format portrait, servie uniquement sur mobile via
`<picture>` + `<source media="(max-width:700px)">`. Le desktop continue d'utiliser
l'image d'origine, inchangee.

| Fichier | Format | Usage |
|---|---|---|
| `images/open-space.jpg` | 1024x768 | desktop / tablette (inchange) |
| `images/open-space-mobile.jpg` | **1080x1500, 164 Ko** | **NOUVEAU** - ecrans <= 700 px |

L'image mobile est construite a partir de la photo d'origine (vrais pixels, aucune
retouche AI) : photo complete en haut, qui se fond progressivement (smoothstep) vers un aplat
sombre sur lequel se posent le titre et les boutons. Aucun etirement de pixels.

Ajuste aussi : voile du hero renforce sous 700 px pour la lisibilite du texte.

**A uploader** : `images/open-space-mobile.jpg` (nouveau fichier, dans le dossier
`images/`) + `index.html` + `fr/index.html`.

---

## Avis Google : 12 -> 49 (11/08/2026)

Le schema `aggregateRating` declarait encore **12 avis**. Corrige a **49 avis / 4,9**
sur `index.html` et `fr/index.html`.

Ajoute aussi : un **badge de preuve sociale** dans le hero, juste au-dessus des
boutons — « ★★★★★ 4,9/5 · 49 avis Google » — cliquable vers la fiche Google Maps.
Visible des l'arrivee sur mobile comme sur desktop, sans debordement.

**A re-uploader** : `index.html` + `fr/index.html`.

---

## Google Analytics 4 installe (11/08/2026)

Balise `G-YEFWQL2WFJ` ajoutee **juste apres `<head>`** sur les **24 pages**
(racine, `blog/`, `fr/`, `fr/blog/`). Une seule balise par page, verifie.

**Bonus** : le site contenait deja une fonction `track()` qui attendait GA4 sans
jamais l'avoir. Elle est maintenant active — **7 evenements** remontent
automatiquement dans Analytics sans configuration supplementaire :

| Evenement | Declenche quand |
|---|---|
| `whatsapp_click` | clic sur un bouton WhatsApp |
| `phone_click` | clic sur le numero de telephone |
| `cta_click` | clic sur un bouton d'appel a l'action |
| `lead_submit` | envoi du formulaire de contact |
| `calculator_use` | utilisation du Business Calculator |
| `quote_from_calculator` | demande de devis depuis le calculateur |
| `gallery_open` | ouverture de la galerie photo |

**Verifie en navigateur reel** : `gtag` = function · dataLayer actif ·
requetes envoyees a `google-analytics.com/g/collect` · evenements pousses OK.

**A re-uploader** : les **24 fichiers HTML**.

### A faire dans l'interface GA4 apres l'upload

1. **Tester l'installation** : bouton en haut a droite de l'ecran ou tu as pris
   la capture, ou Rapports > Temps reel (ouvre ton site en parallele).
2. **Marquer les conversions** : Admin > Evenements cles > activer
   `lead_submit`, `whatsapp_click`, `phone_click`, `quote_from_calculator`.
   Sans ca, Analytics les enregistre mais ne les compte pas comme objectifs.
3. **Lier a Google Search Console** : Admin > Liens vers les produits >
   Search Console. Tu verras les requetes Google qui amenent du trafic.
4. **Si campagne Google Ads** : Admin > Liens Google Ads. Indispensable pour
   savoir quel mot-cle paye genere un vrai contact.
