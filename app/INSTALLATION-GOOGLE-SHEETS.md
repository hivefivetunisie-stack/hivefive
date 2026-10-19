# Connexion de l’application HIVE FIVE à Google Sheets

L’application autonome est déjà configurée avec l’URL active du service Apps Script. Elle envoie uniquement les **propositions / Leads** vers l’onglet `Leads` du classeur **Lead Client Hive Five**. Les factures et les décharges restent locales.

## Mise à jour du script existant — à faire après cette livraison

La nouvelle version de `google-apps-script/Code.gs` corrige le tableau, les formats monétaires et les anciens libellés de type `DT / mois`.

1. Ouvrez le classeur Google Sheets **Lead Client Hive Five**.
2. Choisissez **Extensions → Apps Script**.
3. Ouvrez `Code.gs`, remplacez tout son contenu par celui du fichier fourni :
   `google-apps-script/Code.gs`.
4. Cliquez sur **Enregistrer**.
5. Dans la liste des fonctions, choisissez **corrigerTableauLeads**, puis cliquez sur **Exécuter**.
6. Acceptez les autorisations si Google les redemande.
7. Vérifiez le résultat d’exécution : `ok: true`. Le nombre `correctedRows` indique combien d’anciennes lignes ont été corrigées.
8. Cliquez sur **Déployer → Gérer les déploiements**.
9. Ouvrez le déploiement Web existant avec l’icône crayon, sélectionnez **Nouvelle version**, puis cliquez sur **Déployer**.

Conservez le déploiement existant : son URL `/exec` reste alors identique et il n’est pas nécessaire de reconstruire l’application HTML.

## Première installation seulement

### 1. Installer et initialiser le script

1. Ouvrez **Lead Client Hive Five**.
2. Choisissez **Extensions → Apps Script**.
3. Remplacez le contenu de `Code.gs` par le fichier fourni.
4. Cliquez sur **Enregistrer**.
5. Choisissez la fonction **initialiserBase**, puis cliquez sur **Exécuter**.
6. Acceptez les autorisations demandées par Google.

Cette fonction mémorise l’identifiant du classeur, prépare l’onglet `Leads`, fige l’en-tête, crée le filtre, règle les largeurs et applique les formats numériques.

### 2. Déployer le service Web

1. Cliquez sur **Déployer → Nouveau déploiement**.
2. Choisissez **Application Web**.
3. Description : `API Leads Hive Five`.
4. **Exécuter en tant que : Moi**.
5. **Qui a accès : Tout le monde**.
6. Cliquez sur **Déployer**.
7. Copiez l’URL terminée par `/exec`, jamais l’URL `/dev`.

L’URL actuellement configurée dans l’application est :

```text
https://script.google.com/macros/s/AKfycbylYpQU9AJdQhnZzHqPfwlQXnzork1fCSstWgm4hCa1K-cvCbd_rlzpe6a9_DjmlO2H/exec
```

En l’ouvrant dans un navigateur, une réponse de contrôle similaire doit apparaître :

```json
{"ok":true,"message":"API Hive Five opérationnelle"}
```

## Données enregistrées

Chaque ligne de l’onglet `Leads` contient notamment :

- identifiant unique et dates de création / synchronisation ;
- numéro, date, validité et début de proposition ;
- entreprise ou personne physique, contact et coordonnées ;
- durée, remise et TVA ;
- services sélectionnés, quantités, tarifs et cycles ;
- sous-total, remise, net HT, TVA et total TTC ;
- message personnalisé, conditions et note client ;
- options de contenu de la plaquette ;
- copie JSON complète du Lead.

Les montants sont enregistrés comme de vraies valeurs numériques avec trois décimales. Un second clic sur **Enregistrer** met à jour la même ligne grâce à son identifiant persistant au lieu de créer un doublon.

> La génération des propositions, factures et décharges fonctionne localement. Une connexion Internet est nécessaire uniquement pour envoyer un Lead vers Google Sheets.
