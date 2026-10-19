#!/bin/bash
# ==========================================================
# HIVE FIVE — Optimisation des images pour le SEO
# ==========================================================
# PROBLÈME DÉTECTÉ :
#   terrasse.jpg = 8,99 Mo
#   reunion.jpg  = 8,20 Mo
#   bande.jpg    = 1,69 Mo
#   → 18,9 Mo pour seulement 3 images.
#   Sur mobile en 4G tunisienne, la page met 30 s à 1 min à charger.
#   Google pénalise très lourdement ça (Core Web Vitals).
#
# OBJECTIF : passer chaque image sous 200 Ko sans perte visible.
#
# UTILISATION :
#   1. Copie ton dossier /images à côté de ce script
#   2. bash optimiser-images.sh
#   3. Re-uploade le dossier images-optimisees/ sur le serveur
# ==========================================================

set -e

SRC="images"
OUT="images-optimisees"
LARGEUR_MAX=1920      # aucune image n'a besoin d'être plus large
QUALITE=82            # 82 = excellent compromis qualité/poids

if ! command -v convert >/dev/null 2>&1; then
  echo "❌ ImageMagick n'est pas installé."
  echo "   Ubuntu/Debian : sudo apt install imagemagick webp"
  echo "   macOS         : brew install imagemagick webp"
  echo ""
  echo "👉 ALTERNATIVE SANS RIEN INSTALLER :"
  echo "   Va sur https://squoosh.app ou https://tinypng.com"
  echo "   Glisse tes images, règle la largeur à 1920 px, qualité 80,"
  echo "   exporte en WebP (ou JPG si tu préfères rester simple)."
  exit 1
fi

mkdir -p "$OUT"

echo "=== Optimisation en cours ==="
total_avant=0
total_apres=0

for img in "$SRC"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  [ -e "$img" ] || continue
  nom=$(basename "$img")
  base="${nom%.*}"

  avant=$(stat -c%s "$img" 2>/dev/null || stat -f%z "$img")

  # Version JPG optimisée (compatible partout)
  convert "$img" \
    -resize "${LARGEUR_MAX}x${LARGEUR_MAX}>" \
    -strip \
    -interlace Plane \
    -quality $QUALITE \
    "$OUT/${base}.jpg"

  # Version WebP (30 à 50 % plus légère, supportée par tous les navigateurs modernes)
  if command -v cwebp >/dev/null 2>&1; then
    cwebp -quiet -q $QUALITE -resize $LARGEUR_MAX 0 "$img" -o "$OUT/${base}.webp" 2>/dev/null || true
  fi

  apres=$(stat -c%s "$OUT/${base}.jpg" 2>/dev/null || stat -f%z "$OUT/${base}.jpg")
  total_avant=$((total_avant + avant))
  total_apres=$((total_apres + apres))

  printf "  %-28s %8s Ko  →  %6s Ko\n" "$nom" $((avant/1024)) $((apres/1024))
done

echo ""
echo "=== RÉSULTAT ==="
echo "  Avant : $((total_avant/1024/1024)) Mo"
echo "  Après : $((total_apres/1024/1024)) Mo"
if [ $total_avant -gt 0 ]; then
  echo "  Gain  : $(( 100 - (total_apres*100/total_avant) )) %"
fi
echo ""
echo "👉 Vérifie visuellement les images dans $OUT/ puis remplace le dossier images/ sur le serveur."
