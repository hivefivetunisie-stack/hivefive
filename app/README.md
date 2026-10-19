# Hive Five — Propositions, factures et décharges

Application locale pour préparer une proposition commerciale personnalisée, établir une facture comptable sur une seule page et créer une décharge de paiement en espèces.

## Lancer l’application

### Sans installation — recommandé

Ouvrir directement `hive-five-app-autonome.html` dans Chrome, Edge ou Firefox. Ce fichier unique contient les styles, les photos et le moteur PDF : la création des documents fonctionne hors connexion. Seul l’envoi d’un Lead vers Google Sheets nécessite Internet.

### Avec le serveur local

1. Installer [Node.js](https://nodejs.org/) si nécessaire.
2. Ouvrir un terminal dans ce dossier.
3. Lancer :

```bash
npm start
```

4. Ouvrir `http://localhost:4173` dans Chrome, Edge ou Firefox.

Aucune installation de dépendance n’est nécessaire. Une connexion Internet est requise uniquement pour le bouton **Enregistrer** relié à Google Sheets.

## Fonctionnalités

- formulaire client avec choix **Entreprise** ou **Personne physique**, et références de proposition ;
- catalogue de 8 services Hive Five ;
- sélection, quantités, tarifs et périodicité modifiables ;
- calcul automatique HT, remise, TVA et TTC ;
- possibilité de masquer les prix et d’afficher « Sur devis » ;
- texte d’introduction et conditions personnalisables ;
- pages optionnelles : présentation, catalogue et avantages ;
- aperçu A4 en direct ;
- génération directe d’un PDF commercial de 3 à 6 pages ;
- rubrique **Facture** préremplie depuis la proposition, entièrement modifiable et exportée sur une seule page A4 ;
- rubrique **Décharge espèces** avec montant en chiffres et lettres, payeur, motif, référence, date, lieu et signatures ;
- enregistrement automatique des trois brouillons dans le navigateur (`localStorage`) ;
- envoi du Lead vers l’onglet `Leads` du classeur Google Sheets configuré lors du clic sur **Enregistrer** ;
- factures et décharges strictement locales : elles ne sont jamais transmises à Google Sheets.

> Les factures sont émises au nom légal **OTELCO**, avec **HIVE FIVE** comme nom commercial. Le matricule fiscal et le RIB communiqués sont préremplis. La forme juridique et le RNE restent modifiables et non renseignés tant que leurs valeurs exactes ne sont pas fournies.

## Contenu préchargé

Les chiffres, services et coordonnées ont été préparés à partir du site Hive Five :

- 1 300 m² sur 2 étages ;
- 200+ postes ;
- 23 bureaux privés ;
- open space de 250 m² ;
- terrasse rooftop de 300 m² ;
- fibre dédiée 300 Mbps avec secours 4G/5G ;
- émetteur légal des factures : OTELCO, nom commercial HIVE FIVE ;
- matricule fiscal : 1528525 S/A/M/000 ;
- RIB : 25185000000147221579 ;
- adresse : 63 Rue Khartoum, Belvédère 1002, Tunis ;
- téléphone : +216 57 010 915 ;
- e-mail : Hivefivetunisie@gmail.com.

Les tarifs intégrés sont des points de départ modifiables. Les formules « Adresse professionnelle » et « Espace événement » restent par défaut sur devis.

## Personnaliser plus tard

- Les textes et services sont dans `app.js`.
- Le style et les couleurs sont dans `styles.css`.
- Les photos et le logo sont dans `assets/`.
- Le moteur PDF local est dans `vendor/`.

> Conseil : conservez une copie du dossier avant toute modification importante.
