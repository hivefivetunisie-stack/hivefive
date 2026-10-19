# ✅ Fichiers SEO corrigés — HIVE FIVE

**Date :** 11 août 2026
**Contenu visible des pages : strictement inchangé.** Vérifié automatiquement sur les 6 pages — seul le `<head>` et les données structurées ont été modifiés. Ton design, tes textes, tes couleurs, ton JavaScript : rien n'a bougé.

---

## 🚀 Déploiement en 3 étapes

1. **Sauvegarde** ton site actuel (par sécurité).
2. **Uploade** ces fichiers à la racine du site, en écrasant les anciens :
   - `index.html`, `services.html`, `about.html`, `contact.html`, `blog.html`, `international-companies.html`
   - `robots.txt`, `sitemap.xml`
   - `.htaccess` ← *attention, fichier caché : active « afficher les fichiers cachés » dans ton FTP*
3. **Vérifie** que le site s'affiche normalement, puis va sur Google Search Console → Sitemaps → soumets `sitemap.xml`.

> ⚠️ **Le dossier `/fr/` n'était pas dans ton envoi.** Les pages françaises contiennent le même bug `hivefive.tn`. Envoie-les-moi et je les corrige aussi — voir la section en bas.

---

## 🔴 Correction n°1 — Le bug qui bloquait tout

**24 URLs** pointant vers `hivefive.tn` ont été remplacées par `hivefivecoworking.com` (4 par page × 6 pages : canonical, hreflang FR, hreflang EN, og:url).

Le domaine `hivefive.tn` n'existe pas — j'ai vérifié, le DNS ne résout pas. Tes balises canonical disaient à Google : *« la vraie page est ailleurs »*, et cet « ailleurs » était le néant. Google n'indexait donc rien.

**C'est de très loin la correction la plus importante de tout ce lot.**

---

## 📋 Détail de ce qui a été corrigé

### Sur les 6 pages HTML

| Correction | Détail |
|---|---|
| **Domaine** | 24 URLs `hivefive.tn` → `hivefivecoworking.com` |
| **hreflang x-default** | Ajouté sur chaque page : indique à Google quelle version servir aux visiteurs dont la langue n'est ni FR ni EN |
| **og:image absolue** | Était `images/logo-square.png` (chemin relatif → aperçu cassé sur WhatsApp / LinkedIn / Facebook). Maintenant URL complète |
| **og:image = vraie photo** | Un logo carré fait un mauvais aperçu. Chaque page a désormais sa photo : accueil → open space, services → bureau, contact → carte, international → bande, etc. |
| **og:image:width / height / alt** | Ajoutés : les réseaux sociaux affichent l'aperçu sans attendre le téléchargement de l'image |
| **og:site_name** | Ajouté — « HIVE FIVE » s'affiche au-dessus de l'aperçu |
| **og:locale:alternate** | `fr_FR` déclaré, signale la version française |
| **width + height sur 39 images** | Aucune ne les avait. Sans ces attributs, la page « saute » pendant le chargement → mauvais score CLS, un critère de classement Google. Dimensions relevées sur tes vraies images |
| **preload de l'image hero** | `open-space.jpg` chargée en priorité absolue → améliore le LCP, la métrique de vitesse la plus lourde |

### Données structurées (schema.org)

**`index.html` — LocalBusiness enrichi**, avec en plus :
- `openingHoursSpecification` au format structuré (Lun-Ven 7h30-21h, Sam 9h-19h)
- `makesOffer` : tes 4 offres avec prix réels (coworking 25 DT, formation 150 DT) → Google peut afficher « à partir de 25 DT »
- `amenityFeature` : fibre 300 Mbps, accès 24/7, terrasse, parking, réception, ménage, backup 4G/5G…
- `areaServed` : Tunis, Belvédère, Lafayette, Lac 1, Lac 2, Centre Urbain Nord
- `sameAs` → Instagram, `hasMap` → Google Maps, code postal 1002, logo, 4 images
- Bloc `WebSite` lié, structure `@graph` propre

**`index.html` — schema FAQPage ajouté** ⭐
Tu avais **10 questions/réponses** sur ta page d'accueil, totalement invisibles pour Google. Je les ai extraites **mot pour mot** de ton HTML (obligatoire : Google ignore le bloc si le texte diffère du texte visible) et balisées. Elles peuvent maintenant s'afficher en accordéon directement dans les résultats de recherche — ça élargit ton résultat et augmente fortement le taux de clic.

**Les 5 autres pages** — aucune n'avait de données structurées. Ajoutés :
- `services.html` → **Service** (avec provider, areaServed, serviceType)
- `about.html` → **AboutPage**
- `contact.html` → **ContactPage**
- `blog.html` → **Blog**
- `international-companies.html` → **WebPage**
- **+ un fil d'Ariane (BreadcrumbList)** sur chacune → Google affiche « hivefivecoworking.com › Services » au lieu de l'URL brute

*Les 12 blocs JSON-LD ont été validés syntaxiquement.*

### robots.txt

Avant : `https://www.https://www.hivefivecoworking.com//sitemap.xml` (préfixe dupliqué → introuvable)
Après : URL correcte, plus blocage des paramètres de tracking (`utm_`, `fbclid`) qui créent des doublons d'URL.

### sitemap.xml

Avant : 12 URLs dont **10 avec un double slash**, une URL fantôme `/.html` renvoyant une erreur 403, `contact.html` manquant en anglais, et un commentaire de développement resté dedans.

Après : **12 URLs propres et vérifiées** (6 EN + 6 FR), avec les balises `xhtml:link hreflang` qui relient chaque page à sa traduction. Google comprend que ce sont des versions linguistiques, pas du contenu dupliqué. XML validé.

### .htaccess (nouveau)

Tes **4 versions du site** répondaient toutes en 200 sans redirection (`http`/`https` × avec/sans `www`) → contenu dupliqué, autorité diluée sur 4 adresses.

Le fichier force tout en **301** vers `https://www.hivefivecoworking.com`, et ajoute : cache navigateur (1 an sur les images), compression gzip renforcée, type MIME WebP, protection du listing des dossiers.

*Ton serveur est bien un Apache — vérifié dans les en-têtes HTTP. Si tu passes un jour sur Nginx, demande-moi la config équivalente.*

---

## 🔴 Il reste UNE chose que je ne peux pas faire à ta place

**Tes images sont beaucoup trop lourdes.** Mesuré en direct :

| Image | Poids | Dimensions |
|---|---|---|
| `terrasse.jpg` | **8,78 Mo** | 2390 × 1792 px |
| `reunion.jpg` | **7,82 Mo** | 2730 × 1536 px |
| `bande.jpg` | 1,61 Mo | 1344 × 768 px |

Sur une 4G tunisienne, ta page met **30 secondes à 1 minute** à charger. Le visiteur part avant de voir tes tarifs, et Google te pénalise (Core Web Vitals).

**Solution la plus simple, 10 minutes :** va sur [squoosh.app](https://squoosh.app) ou [tinypng.com](https://tinypng.com), glisse tes 3 grosses images, règle la largeur max à **1920 px** et la qualité à **80**, télécharge, remplace sur le serveur.

Le script `optimiser-images.sh` fait la même chose automatiquement si tu as ImageMagick.

> ⚠️ **Important :** si tu redimensionnes les images, mets à jour les attributs `width`/`height` correspondants dans le HTML, ou supprime-les simplement pour ces images-là. Ils doivent refléter les dimensions réelles.

---

## 📁 Le dossier /fr/ à corriger aussi

Les 6 pages françaises (`fr/index.html`, `fr/services.html`, `fr/about.html`, `fr/contact.html`, `fr/blog.html`, `fr/international-companies.html`) ont **exactement le même bug de domaine**, plus une erreur supplémentaire que j'avais repérée dans `fr/index.html` :

```html
<link rel="canonical" href="https://www.hivefive.tn/fr/index.html">>
                                                                   ↑ chevron en trop
```

**Envoie-moi ces 6 fichiers et je te les corrige de la même manière** (mon script gère déjà ce cas). Tant qu'ils ne sont pas corrigés, toute la version française du site reste invisible pour Google.

---

## ✅ Après le déploiement — checklist

1. Ouvre `https://www.hivefivecoworking.com/robots.txt` → l'URL du sitemap doit être propre
2. Ouvre `https://www.hivefivecoworking.com/sitemap.xml` → 12 URLs sans double slash
3. Teste `http://hivefivecoworking.com` → doit rediriger vers `https://www.hivefivecoworking.com`
4. Passe la page d'accueil dans le [test des résultats enrichis](https://search.google.com/test/rich-results) → tu dois voir **LocalBusiness** et **FAQ** détectés
5. Colle le lien du site dans une conversation WhatsApp → l'aperçu doit maintenant montrer la photo de l'open space
6. **Google Search Console** → soumets le sitemap → « Inspection d'URL » sur la page d'accueil → « Demander une indexation »
7. Compresse les 3 grosses images
8. Teste la vitesse sur [PageSpeed Insights](https://pagespeed.web.dev)

---

## ⏱️ Quand verras-tu les résultats ?

- **Ré-indexation après la correction du canonical** : quelques jours à 2 semaines
- **Rich snippets FAQ dans Google** : 1 à 4 semaines après l'indexation
- **Aperçus sociaux corrigés** : immédiat (vide le cache avec le [debugger Facebook](https://developers.facebook.com/tools/debug/))
- **Gain de vitesse après compression** : immédiat

Le plus dur est fait. Reste maintenant le travail de fond décrit dans l'audit : la fiche Google Business Profile et les avis clients, qui sont tes deux plus gros leviers pour dominer « coworking Tunis ».
