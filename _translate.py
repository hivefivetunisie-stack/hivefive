# -*- coding: utf-8 -*-
"""
Génère fr/*.html — version française complète des 6 pages HIVE FIVE.
Principe : dictionnaire exhaustif (le plus long d'abord) + adaptation des chemins,
canonical, lang, hreflang, sélecteur de langue.
"""
import os, re

# ── Meta / titles par page ──────────────────────────────────────────────
META = {
"index.html": {
 "title": "HIVE FIVE | Business Center & Coworking à Tunis — Belvédère",
 "desc": "Bureaux flexibles, coworking, espaces d'équipe, salles de réunion et de formation au Belvédère, Tunis. Installez votre équipe et travaillez immédiatement."},
"services.html": {
 "title": "Services business | HIVE FIVE — Business Center Tunis",
 "desc": "Bureaux privés, coworking, bureaux d'équipe, salles de réunion et de formation, bureau virtuel et espace événementiel au Belvédère, Tunis."},
"international-companies.html": {
 "title": "Bureau à Tunis pour entreprises internationales | HIVE FIVE",
 "desc": "Location de bureaux et espace de travail flexible à Tunis pour entreprises internationales. Hub pour équipes distantes en Tunisie : bureaux prêts, fibre 300 Mbps, contrats flexibles."},
"about.html": {
 "title": "À propos | HIVE FIVE — Business Center & Coworking Tunis",
 "desc": "HIVE FIVE : un environnement de travail professionnel au Belvédère à Tunis, pensé pour les entreprises et conçu pour les personnes."},
"contact.html": {
 "title": "Contact | HIVE FIVE — Business Center, Belvédère Tunis",
 "desc": "Contactez HIVE FIVE : 63 Rue de Khartoum, Belvédère, Tunis. Téléphone, WhatsApp, email, itinéraire et réservation de visite."},
"blog.html": {
 "title": "Blog | HIVE FIVE — Business & travail flexible à Tunis",
 "desc": "Analyses sur les bureaux flexibles, les équipes distantes, le coworking et l'entrepreneuriat en Tunisie — par HIVE FIVE, Belvédère Tunis."},
}

# ── Dictionnaire de traduction (appliqué du plus long au plus court) ────
T = [
# ── head / topbar / nav ──
("Belvédère, Tunis — Business Center & Coworking", "Belvédère, Tunis — Business Center & Coworking"),
("Your Business. Your Team. Your Space. — A premium business center and flexible workspace in Belvédère, Tunis.",
 "Your Business. Your Team. Your Space. — Un business center premium et un espace de travail flexible au Belvédère, Tunis."),
("For International Companies", "Entreprises internationales"),
("Book a Visit", "Réserver une visite"),
("Book a visit", "Réserver une visite"),
("Book a Room", "Réserver une salle"),
("aria-label=\"Main navigation\"", "aria-label=\"Navigation principale\""),
("aria-label=\"Open menu\"", "aria-label=\"Ouvrir le menu\""),
("aria-label=\"HIVE FIVE — Home\"", "aria-label=\"HIVE FIVE — Accueil\""),
("title=\"Version française\"", "title=\"English version\""),
(">Gallery<", ">Galerie<"),
(">Meeting &amp; Training<", ">Réunions &amp; Formation<"),
(">Pricing<", ">Tarifs<"),
(">Services<", ">Services<"),
(">About<", ">À propos<"),
(">Contact<", ">Contact<"),
(">Solutions<", ">Solutions<"),
("Space calculator", "Calculateur d'espace"),
("Business services", "Services business"),
("International companies", "Entreprises internationales"),
("About HIVE FIVE", "À propos de HIVE FIVE"),
(">Explore<", ">Explorer<"),
(">Company<", ">Entreprise<"),
("Business Center, Coworking &amp; Remote Team Hub · Tunis, Tunisia", "Business Center, Coworking &amp; Hub d'équipes distantes · Tunis, Tunisie"),

# ── HERO ──
("Business Center · Coworking · Remote Team Hub", "Business Center · Coworking · Hub d'équipes distantes"),
("Your Business Deserves the Right Space.", "Votre entreprise mérite le bon espace."),
("Flexible offices, team spaces, coworking and professional facilities in the heart of Tunis.",
 "Bureaux flexibles, espaces d'équipe, coworking et infrastructures professionnelles au cœur de Tunis."),
("Move in quickly. Scale your team. Focus on your business.",
 "Emménagez vite. Faites grandir votre équipe. Concentrez-vous sur votre business."),
("Request a Quote", "Demander un devis"),
("1,300 m² · 2 floors", "1 300 m² · 2 étages"),
("200+ workstations", "200+ postes de travail"),
("300 Mbps dedicated fiber", "Fibre dédiée 300 Mbps"),
("alt=\"HIVE FIVE workspace — bright professional open space in Belvédère, Tunis\"",
 "alt=\"Espace de travail HIVE FIVE — open space lumineux et professionnel au Belvédère, Tunis\""),

# ── STATS ──
("of workspace", "d'espace de travail"),
("rooftop terrace", "de terrasse rooftop"),
("workstations<", "postes de travail<"),
("private offices<", "bureaux privés<"),
(">private offices", ">bureaux privés"),
("open space<", "d'open space<"),
("dedicated fiber<", "de fibre dédiée<"),
(">workspace<", ">d'espaces<"),
(">workstations", ">postes"),
(">dedicated fiber", ">de fibre dédiée"),

# ── WHY ──
("Why Hive Five", "Pourquoi Hive Five"),
("More Than a Coworking Space.", "Bien plus qu'un espace de coworking."),
("A professional environment designed for companies, teams and professionals who mean business.",
 "Un environnement professionnel conçu pour les entreprises, les équipes et les professionnels ambitieux."),
("Fully equipped professional workspaces ready for immediate use. Bring your laptop, start working.",
 "Espaces de travail professionnels entièrement équipés, prêts à l'emploi. Posez votre ordinateur, travaillez."),
("Scale your workspace up or down according to your business needs. No rigid long-term commitment.",
 "Modulez votre espace à la hausse ou à la baisse selon vos besoins. Aucun engagement rigide à long terme."),
("Dedicated 300 Mbps fiber and reliable professional network infrastructure across the whole building.",
 "Fibre dédiée 300 Mbps et infrastructure réseau professionnelle fiable dans tout le bâtiment."),
("Reception, meeting rooms, business address — a setting that makes the right impression on your clients.",
 "Accueil, salles de réunion, adresse d'affaires — un cadre qui fait bonne impression auprès de vos clients."),
("In Belvédère, central Tunis — minutes from the city center, with parking and public transport nearby.",
 "Au Belvédère, centre de Tunis — à quelques minutes du centre-ville, avec parking et transports à proximité."),
("From one workstation to an entire team of 50+. Grow without changing address.",
 "D'un poste de travail à une équipe entière de 50+. Grandissez sans changer d'adresse."),
(">Move-in ready<", ">Prêt à l'emploi<"),
(">Flexible<", ">Flexible<"),
(">Connected<", ">Connecté<"),
(">Professional<", ">Professionnel<"),
("Central location", "Emplacement central"),
(">Scalable<", ">Évolutif<"),

# ── SOLUTIONS ──
("Choose your space", "Choisissez votre espace"),
("Four Ways to Work at Hive Five.", "Quatre façons de travailler chez Hive Five."),
("Offices, team spaces, coworking and meeting facilities — one address, every option.",
 "Bureaux, espaces d'équipe, coworking et salles de réunion — une adresse, toutes les options."),
("For entrepreneurs, consultants, startups &amp; small teams", "Pour entrepreneurs, consultants, startups &amp; petites équipes"),
("Your own enclosed, furnished office — 23 private offices across 2 floors, ready for business.",
 "Votre bureau fermé et meublé — 23 bureaux privés sur 2 étages, prêts pour le business."),
("Explore Private Offices", "Découvrir les bureaux privés"),
("For teams of 5 to 50+ people", "Pour les équipes de 5 à 50+ personnes"),
("Your team. Your dedicated space. No setup hassle.", "Votre équipe. Votre espace dédié. Zéro installation."),
("Build Your Team Space", "Composer votre espace d'équipe"),
("For freelancers, remote workers &amp; consultants", "Pour freelances, télétravailleurs &amp; consultants"),
("A professional desk in a 250 m² open space — flexible plans, dedicated desks, real community.",
 "Un poste professionnel dans un open space de 250 m² — formules flexibles, postes dédiés, vraie communauté."),
("Join Hive Five", "Rejoindre Hive Five"),
("For trainings, workshops, meetings &amp; corporate events", "Pour formations, workshops, réunions &amp; événements d'entreprise"),
("Equipped rooms by the hour or by the day — with screen, whiteboard, video conferencing and coffee.",
 "Salles équipées à l'heure ou à la journée — écran, tableau blanc, visioconférence et café inclus."),
("alt=\"Private office at HIVE FIVE Belvédère\"", "alt=\"Bureau privé chez HIVE FIVE Belvédère\""),
("alt=\"Team office setup at HIVE FIVE\"", "alt=\"Espace d'équipe chez HIVE FIVE\""),
("alt=\"Coworking desks at HIVE FIVE\"", "alt=\"Postes de coworking chez HIVE FIVE\""),
("alt=\"Training room at HIVE FIVE\"", "alt=\"Salle de formation chez HIVE FIVE\""),
("Private Offices", "Bureaux privés"),
("Team Offices", "Bureaux d'équipe"),
("Training &amp; Meeting Rooms", "Salles de réunion &amp; formation"),
(">Furnished<", ">Meublé<"), (">Lockable<", ">Verrouillable<"), ("24/7 access", "Accès 24/7"),
("Meeting credits", "Crédits de salles"),
(">Desks<", ">Bureaux<"), (">Internet<", ">Internet<"), (">Electricity<", ">Électricité<"),
(">Cleaning<", ">Ménage<"), ("Meeting access", "Accès salles de réunion"), ("Flexible capacity", "Capacité flexible"),
("Flex or dedicated", "Flex ou dédié"), (">Fast internet<", ">Internet rapide<"),
("Lounge &amp; terrace", "Lounge &amp; terrasse"),
("Hourly / daily", "À l'heure / journée"), ("Screen &amp; whiteboard", "Écran &amp; tableau blanc"), (">Video conf<", ">Visio<"),
# mispelled guard
("Screen &amp; whiteboard", "Écran &amp; tableau blanc"),

# ── ENTERPRISE ──
("For companies", "Pour les entreprises"),
("Build Your Team in Tunis. Without Building an Office.", "Montez votre équipe à Tunis. Sans construire de bureau."),
("Need to establish a team in Tunisia without investing in a traditional office? HIVE FIVE gives you the infrastructure, workspace and flexibility you need to get started quickly.",
 "Besoin d'installer une équipe en Tunisie sans investir dans un bureau classique ? HIVE FIVE vous fournit l'infrastructure, l'espace et la flexibilité pour démarrer rapidement."),
("Flexible team capacity — start small, grow when you need.",
 "Capacité d'équipe flexible — commencez petit, grandissez quand il le faut."),
("No construction. No furniture. No complicated setup.", "Pas de travaux. Pas de mobilier. Aucune installation compliquée."),
("Dedicated 300 Mbps fiber connection + business-grade network.", "Fibre dédiée 300 Mbps + réseau professionnel de niveau entreprise."),
("Adapt your workspace as your business grows.", "Adaptez votre espace au fil de la croissance de votre activité."),
("Belvédère, Tunis — easy for your team, credible for your clients.",
 "Belvédère, Tunis — pratique pour votre équipe, crédible pour vos clients."),
(">5 to 50+ workstations", ">5 à 50+ postes"),
("Ready-to-use infrastructure", "Infrastructure prête à l'emploi"),
("Professional connectivity", "Connectivité professionnelle"),
("Flexible terms", "Conditions flexibles"),
("Talk to Our Business Team", "Parler à notre équipe business"),
("alt=\"Team collaborating at HIVE FIVE\"", "alt=\"Équipe en collaboration chez HIVE FIVE\""),
(">workstations<", ">postes<"),
(">to move in<", ">pour emménager<"),

# ── REMOTE TEAM HUB ──
("Remote Team Hub", "Hub équipes distantes"),
("Your Tunis Team Starts Here.", "Votre équipe à Tunis commence ici."),
("A ready-to-use environment for companies building remote or hybrid teams in Tunisia.",
 "Un environnement prêt à l'emploi pour les entreprises qui forment des équipes à distance ou hybrides en Tunisie."),
("From 5 people to a complete team, HIVE FIVE provides a professional environment where your employees can start working immediately.",
 "De 5 personnes à une équipe complète, HIVE FIVE offre un cadre professionnel où vos collaborateurs peuvent travailler dès le premier jour."),
("Dedicated team workspace &amp; workstations", "Espace d'équipe dédié &amp; postes de travail"),
("High-speed internet &amp; IT support", "Internet haut débit &amp; support IT"),
("Meeting rooms, reception &amp; cleaning", "Salles de réunion, accueil &amp; ménage"),
("Flexible expansion as you hire", "Extension flexible au fil de vos recrutements"),
("Build Your Team in Tunis", "Constituez votre équipe à Tunis"),
("For international companies", "Pour les entreprises internationales"),
("alt=\"Remote team working at HIVE FIVE\"", "alt=\"Équipe distante au travail chez HIVE FIVE\""),

# ── COWORKING ──
("Work Around People Who Build Things.", "Travaillez entouré de personnes qui construisent."),
("A 250 m² open space with everything a professional needs to do their best work.",
 "Un open space de 250 m² avec tout ce dont un professionnel a besoin pour faire son meilleur travail."),
("Flexible access — a day, a month, a year", "Accès flexible — un jour, un mois, un an"),
("Comfortable desks, fast internet", "Postes confortables, internet rapide"),
("Meeting spaces when clients come", "Salles de réunion quand vos clients passent"),
("300 m² terrace, lounge &amp; coffee area", "Terrasse de 300 m², lounge &amp; espace café"),
("A community of builders — and hackathons", "Une communauté de créateurs — et des hackathons"),
("View Coworking Options", "Voir les formules de coworking"),
("alt=\"Coworking area with plants and daylight at HIVE FIVE\"", "alt=\"Espace coworking lumineux avec plantes chez HIVE FIVE\""),
(">Coworking<", ">Coworking<"),

# ── TRAINING ──
(">Training &amp; Meeting<", ">Formation &amp; Réunion<"),
("Train. Meet. Create.", "Formez. Réunissez. Créez."),
("Professional rooms designed for training sessions, workshops, meetings, interviews and corporate events.",
 "Des salles professionnelles conçues pour les formations, workshops, réunions, entretiens et événements d'entreprise."),
("Classroom layout, screen, whiteboard — for courses &amp; academies.",
 "Configuration salle de classe, écran, tableau blanc — pour cours &amp; académies."),
("Client-ready rooms with video conferencing and presentation tools.",
 "Salles prêtes pour vos clients, avec visioconférence et outils de présentation."),
("Modular tables for creative sessions, design sprints, hackathons.",
 "Tables modulables pour sessions créatives, design sprints, hackathons."),
("Roomy setups for talks, demos and corporate events.",
 "Grandes configurations pour talks, démos et événements d'entreprise."),
(">Training room<", ">Salle de formation<"),
(">Meeting room<", ">Salle de réunion<"),
(">Workshop room<", ">Salle workshop<"),
("Conference space", "Espace conférence"),
("Book a Training Room", "Réserver une salle de formation"),

# ── GALLERY ──
(">Gallery<", ">Galerie<"),
("Browse the Space.", "Parcourez les lieux."),
("Offices, coworking, meeting rooms, lounge &amp; terrace — click any photo to view it full screen.",
 "Bureaux, coworking, salles de réunion, lounge &amp; terrasse — cliquez sur une photo pour l'agrandir."),
('aria-label="Photo viewer"', 'aria-label="Visionneuse photo"'),
('aria-label="Close"', 'aria-label="Fermer"'),
('aria-label="Previous photo"', 'aria-label="Photo précédente"'),
('aria-label="Next photo"', 'aria-label="Photo suivante"'),
(">All<", ">Tout<"),
(">Offices<", ">Bureaux<"),
("Meeting Rooms", "Salles de réunion"),
("Training Rooms", "Salles de formation"),
(">Lounge<", ">Lounge<"),
(">Terrace<", ">Terrasse<"),
("Common Areas", "Espaces communs"),
("alt=\"Open space\"", "alt=\"Open space\""),
("alt=\"Private office\"", "alt=\"Bureau privé\""),
("alt=\"Meeting room\"", "alt=\"Salle de réunion\""),
("alt=\"Training room\"", "alt=\"Salle de formation\""),
("alt=\"Rooftop terrace\"", "alt=\"Terrasse rooftop\""),
("alt=\"Coffee lounge\"", "alt=\"Lounge café\""),
("alt=\"Dedicated desk\"", "alt=\"Poste dédié\""),
("alt=\"Common area\"", "alt=\"Espace commun\""),
("alt=\"Workshop session\"", "alt=\"Session workshop\""),
("alt=\"Private workspace\"", "alt=\"Espace de travail privé\""),
("alt=\"Community area\"", "alt=\"Espace communauté\""),

# ── TERRACE ──
("Take a Break Above Tunis.", "Une pause au-dessus de Tunis."),
("A 300 m² terrace designed for breaks, informal meetings and moments away from the desk — above Belvédère.",
 "Une terrasse de 300 m² pensée pour les pauses, les réunions informelles et les moments loin du bureau — au-dessus du Belvédère."),
("alt=\"HIVE FIVE 300 m² rooftop terrace above Tunis\"", "alt=\"Terrasse rooftop de 300 m² de HIVE FIVE au-dessus de Tunis\""),

# ── PRICING ──
(">Pricing<", ">Tarifs<"),
("Simple. Flexible. Transparent.", "Simple. Flexible. Transparent."),
("Starting prices below — every plan comes with fiber, cleaning, meeting access and no hidden fees. Get a tailored quote for your team.",
 "Prix de départ ci-dessous — chaque formule inclut fibre, ménage, accès aux salles et aucun frais caché. Demandez un devis sur mesure pour votre équipe."),
("Flexible plans for independents", "Formules flexibles pour indépendants"),
(">From</small><b>25 DT</b><span>/ day · or 250 DT / month</span>",
 ">Dès</small><b>25 DT</b><span>/ jour · ou 250 DT / mois</span>"),
("Open space access", "Accès open space"),
("Fiber, coffee, lounge &amp; terrace", "Fibre, café, lounge &amp; terrasse"),
("Meeting room credits", "Crédits de salles de réunion"),
("No commitment", "Sans engagement"),
(">Get Started<", ">Commencer<"),
(">From</small><b>390 DT</b><span>/ month · 24/7 badge included</span>",
 ">Dès</small><b>390 DT</b><span>/ mois · badge 24/7 inclus</span>"),
("Your own desk, 24/7", "Votre poste rien qu'à vous, 24/7"),
("Fixed desk with your name on it", "Poste fixe à votre nom"),
("Locker + business address", "Casier + adresse professionnelle"),
("4h meeting room / month", "4h de salle de réunion / mois"),
(">From</small><b>290 DT</b><span>/ workstation / month</span>",
 ">Dès</small><b>290 DT</b><span>/ poste / mois</span>"),
("Dedicated Desk", "Poste dédié"),
("Dedicated workspace for teams of 1–50+", "Espace dédié aux équipes de 1 à 50+"),
("Furnished, lockable office", "Bureau meublé et verrouillable"),
("24/7 access for the whole team", "Accès 24/7 pour toute l'équipe"),
("Meeting room credits + IT support", "Crédits de salles de réunion + support IT"),
(">From</small><b>150 DT</b><span>/ day · equipped room</span>",
 ">Dès</small><b>150 DT</b><span>/ jour · salle équipée</span>"),
("Hourly or daily rental", "Location à l'heure ou à la journée"),
("Screen, whiteboard, video conf", "Écran, tableau blanc, visio"),
("Coffee &amp; catering on request", "Café &amp; traiteur sur demande"),
("Reception for your guests", "Accueil de vos invités"),
("🎓 <b>Students &amp; associations: −20%</b> all year. Teams of 10+: volume discounts. Every plan: satisfaction guaranteed or refunded within 14 days.",
 "🎓 <b>Étudiants &amp; associations : −20 %</b> toute l'année. Équipes de 10+ : remises de volume. Chaque formule : satisfait ou remboursé sous 14 jours."),
("Private / Team Office", "Bureau privé / équipe"),

# ── CALCULATEUR ──
("Business calculator", "Calculateur business"),
("How Much Space Does Your Team Need?", "De quel espace votre équipe a-t-elle besoin ?"),
("Select your team size, the type of space and a duration — get an instant ballpark estimate.",
 "Choisissez la taille de votre équipe, le type d'espace et la durée — obtenez une estimation instantanée."),
("Number of people", "Nombre de personnes"),
("Type of space", "Type d'espace"),
("Duration</label>", "Durée</label>"),
("Your estimated workspace solution", "Votre estimation d'espace de travail"),
("Select your options.", "Choisissez vos options."),
("Request Your Custom Quote", "Demander votre devis sur mesure"),
("Indicative estimate — your tailored quote is always confirmed by our business team.",
 "Estimation indicative — votre devis sur mesure est toujours confirmé par notre équipe business."),
(">1 month<", ">1 mois<"), (">3 months<", ">3 mois<"), (">6 months<", ">6 mois<"), (">12 months<", ">12 mois<"),
(">1 week<", ">1 semaine<"), (">1 day<", ">1 jour<"),
("Team office</option>", "Bureau d'équipe</option>"),
("Private office</option>", "Bureau privé</option>"),
("Coworking — dedicated desk</option>", "Coworking — poste dédié</option>"),
("Coworking — flexible</option>", "Coworking — flexible</option>"),
("Training / meeting room</option>", "Salle de formation / réunion</option>"),

# ── TESTIMONIALS ──
("What people say", "Ce qu'ils en disent"),
("Businesses Talk. Google Agrees.", "Ils en parlent. Google confirme."),
("based on our Google reviews", "d'après nos avis Google"),
("Read all reviews ↗", "Lire tous les avis ↗"),
("Google review · 1 year ago", "Avis Google · il y a 1 an"),
('alt="eya wafii"', 'alt="eya wafii"'),

# ── FAQ ──
("Good Questions. Straight Answers.", "Bonnes questions. Réponses franches."),
("Where is HIVE FIVE located?", "Où se trouve HIVE FIVE ?"),
("In Belvédère, central Tunis (63 Rue de Khartoum, Lafayette) — minutes from downtown, with parking on site and metro access nearby.",
 "Au Belvédère, centre de Tunis (63 Rue de Khartoum, Lafayette) — à quelques minutes du centre-ville, avec parking sur place et métro à proximité."),
("How many people can you accommodate?", "Combien de personnes pouvez-vous accueillir ?"),
("Up to 200+ people across 2 floors: 23 private offices, a 250 m² open space and team areas for 5 to 50+ people.",
 "Plus de 200 personnes sur 2 étages : 23 bureaux privés, un open space de 250 m² et des espaces d'équipe de 5 à 50+ personnes."),
("Do you offer private offices?", "Proposez-vous des bureaux privés ?"),
("Yes — furnished, lockable private offices for 1 to 20 people, with 24/7 access and meeting room credits included.",
 "Oui — des bureaux privés meublés et verrouillables pour 1 à 20 personnes, avec accès 24/7 et crédits de salles de réunion inclus."),
("Can I rent space for my entire team?", "Puis-je louer un espace pour toute mon équipe ?"),
("Absolutely. Team offices host 5 to 50+ workstations with desks, internet, electricity, cleaning and meeting access included. We scale with you.",
 "Absolument. Nos bureaux d'équipe accueillent de 5 à 50+ postes : mobilier, internet, électricité, ménage et accès aux salles inclus. Nous grandissons avec vous."),
("Can international companies use HIVE FIVE?", "Les entreprises internationales peuvent-elles venir chez HIVE FIVE ?"),
("Yes — it's one of our specialties. Companies from France and across Europe set up their Tunis teams with us: infrastructure ready, contracts flexible, onboarding in days.",
 "Oui — c'est même une de nos spécialités. Des entreprises de France et d'Europe installent leurs équipes tunisiennes chez nous : infrastructure prête, contrats flexibles, équipe opérationnelle en quelques jours."),
("See our dedicated page →", "Voir notre page dédiée →"),
("Do you offer meeting rooms?", "Proposez-vous des salles de réunion ?"),
("Yes, by the hour or the day: meeting rooms, training rooms, workshop and conference spaces — all equipped.",
 "Oui, à l'heure ou à la journée : salles de réunion, de formation, workshop et conférence — toutes équipées."),
("Can I rent a training room by the day?", "Puis-je louer une salle de formation à la journée ?"),
("Yes. From 150 DT/day you get screen, whiteboard, video conferencing, coffee and reception for your attendees.",
 "Oui. Dès 150 DT/jour : écran, tableau blanc, visioconférence, café et accueil de vos participants inclus."),
("Do you offer flexible contracts?", "Vos contrats sont-ils flexibles ?"),
("Yes — monthly, no long-term lock-in. An email 15 days before month-end is all it takes to change or stop.",
 "Oui — au mois, sans engagement sur la durée. Un simple email 15 jours avant la fin du mois suffit pour changer ou arrêter."),
("Is high-speed internet available?", "Internet haut débit disponible ?"),
("Dedicated 300 Mbps fiber with professional-grade Wi-Fi and a backup 4G/5G link. Uptime is our obsession.",
 "Fibre dédiée 300 Mbps, Wi-Fi professionnel et lien 4G/5G de secours. La disponibilité est notre obsession."),
("Can I visit the space before booking?", "Puis-je visiter les lieux avant de réserver ?"),
("Please do. Visits are free and without commitment — and your first day of coworking is on us.",
 "Avec plaisir. Les visites sont gratuites et sans engagement — et votre première journée de coworking est offerte."),
("Book a visit →", "Réserver une visite →"),
(">FAQ<", ">FAQ<"),

# ── CTA FINAL ──
("Stop Looking for an Office. Start Building Your Business.",
 "Arrêtez de chercher un bureau. Lancez votre activité."),
("Visit HIVE FIVE and discover a workspace built around your business.",
 "Visitez HIVE FIVE et découvrez un espace de travail pensé pour votre entreprise."),
("Talk to Our Team", "Parler à notre équipe"),

# ── CONTACT ──
("Let's talk", "Parlons-en"),
("Let's Build Your Workspace.", "Construisons votre espace de travail."),
("Tell us what you need. Our business team answers within 2 business hours.",
 "Dites-nous ce qu'il vous faut. Notre équipe business répond sous 2 heures ouvrées."),
("Get My Quote", "Obtenir mon devis"),
("Visits, quotes, questions — one form, one quick answer.", "Visites, devis, questions — un formulaire, une réponse rapide."),
("Full Name <i>*</i>", "Nom complet <i>*</i>"),
("Company</label>", "Entreprise</label>"),
("Email <i>*</i>", "Email <i>*</i>"),
("Phone / WhatsApp <i>*</i>", "Téléphone / WhatsApp <i>*</i>"),
(">Number of people <i>*</i><", ">Nombre de personnes <i>*</i><"),
(">Number of people<", ">Nombre de personnes<"),
(">Service required <i>*</i><", ">Service souhaité <i>*</i><"),
(">Service required<", ">Service souhaité<"),
("Expected start date", "Date de début souhaitée"),
("Message</label>", "Message</label>"),
('placeholder="Jane Dupont"', 'placeholder="Sarra Mansour"'),
('placeholder="Acme SAS"', 'placeholder="Acme SARL"'),
('placeholder="jane@company.com"', 'placeholder="sarra@entreprise.tn"'),
('placeholder="+216 / +33 ..."', 'placeholder="+216 ..."'),
('placeholder="Context, budget, questions…"', 'placeholder="Contexte, budget, questions…"'),
(">Private Office<", ">Bureau privé<"), (">Team Office<", ">Bureau d'équipe<"),
("Training / Meeting Room", "Salle de formation / réunion"),
("Business Address / Virtual Office", "Adresse d'affaires / bureau virtuel"),
(">Event Space<", ">Espace événementiel<"),
("Visit — show me everything", "Visite — montrez-moi tout"),
("Thank you. Our business team will contact you shortly.", "Merci. Notre équipe business vous contactera très vite."),
("Meanwhile — the fastest way to reach us:", "En attendant — le moyen le plus rapide de nous joindre :"),
("WhatsApp us", "Écrivez-nous sur WhatsApp"),
(">Address<", ">Adresse<"),
(">Phone &amp; WhatsApp<", ">Téléphone &amp; WhatsApp<"),
(">Email<", ">Email<"),
("Monday – Friday", "Lundi – Vendredi"),
(">Saturday<", ">Samedi<"),
("Offices &amp; dedicated desks", "Bureaux &amp; postes dédiés"),
("aria-label=\"Get directions on Google Maps\"", "aria-label=\"Ouvrir l'itinéraire sur Google Maps\""),
("Get directions", "Itinéraire"),
("View on Google Maps", "Voir sur Google Maps"),
('alt="Map of Lafayette, Tunis — HIVE FIVE at 63 Rue de Khartoum"', 'alt="Carte de Lafayette, Tunis — HIVE FIVE au 63 Rue de Khartoum"'),
(">Directions<", ">Directions<"),

# ── FOOTER ──
(">Contact</h4>", ">Contact</h4>"),
("Chat on WhatsApp", "Discuter sur WhatsApp"),

# ── flottants ──
(">Call<", ">Appeler<"),

# ── HERO PAGES INTERNES ──
(">Home<", ">Accueil<"),
]

# ══════════════════ Chaînes propres aux pages internes ══════════════════
T += [
# SERVICES
("Business Services", "Services business"),
("Everything Your Business Needs. Under One Roof.", "Tout ce dont votre entreprise a besoin. Sous un même toit."),
("Private offices, coworking, team spaces, meeting and training rooms, virtual office — with one flexible contract.",
 "Bureaux privés, coworking, espaces d'équipe, salles de réunion et de formation, bureau virtuel — avec un seul contrat flexible."),
("Furnished, lockable offices for 1–20 people. 24/7 access, meeting credits included.",
 "Bureaux meublés et verrouillables pour 1 à 20 personnes. Accès 24/7, crédits de salles inclus."),
("See pricing", "Voir les tarifs"),
("Flexible and dedicated desks in a 250 m² open space. From 25 DT/day — no commitment.",
 "Postes flexibles et dédiés dans un open space de 250 m². Dès 25 DT/jour — sans engagement."),
(">Explore <", ">Découvrir <"),
("From 5 to 50+ workstations. Infrastructure ready, expandable anytime.",
 "De 5 à 50+ postes. Infrastructure prête, extensible à tout moment."),
("For teams", "Pour les équipes"),
("By the hour or day. Screen, whiteboard, video conferencing, coffee service.",
 "À l'heure ou à la journée. Écran, tableau blanc, visioconférence, service café."),
("Book a room", "Réserver une salle"),
("Classroom and workshop layouts for academies, trainers and corporate programs.",
 "Configurations salle de classe et workshop pour académies, formateurs et programmes d'entreprise."),
("See formats", "Voir les formats"),
(">Virtual Office<", ">Bureau virtuel<"),
("Prestigious Belvédère business address, mail handling and optional phone line.",
 "Adresse d'affaires prestigieuse au Belvédère, gestion du courrier et ligne téléphonique en option."),
(">Get it <", ">En profiter <"),
(">Event Space<", ">Espace événementiel<"),
("Conferences, demos, hackathons, evening events — up to 80 guests, terrace included.",
 "Conférences, démos, hackathons, soirées — jusqu'à 80 invités, terrasse incluse."),
("Plan an event", "Organiser un événement"),
("A Tunis home for your international team: infrastructure, support, scalability.",
 "Une base tunisienne pour votre équipe internationale : infrastructure, support, évolutivité."),
("Learn more", "En savoir plus"),
# INTERNATIONAL
("Tunis · Tunisia · Belvédère", "Tunis · Tunisie · Belvédère"),
("Set Up Your Tunis Team With HIVE FIVE.", "Installez votre équipe à Tunis avec HIVE FIVE."),
("A ready-to-use business environment for companies building remote or hybrid teams in Tunisia — without opening an office.",
 "Un environnement business prêt à l'emploi pour entreprises créant des équipes distantes ou hybrides en Tunisie — sans ouvrir de bureau."),
("Why Tunisia", "Pourquoi la Tunisie"),
("Talented. Fluent. Sixty Minutes Ahead of Paris.", "Talentueuse. Francophone. À une heure de Paris."),
("Tunisia combines a highly skilled, French- and English-speaking workforce with European time zone alignment and highly competitive operating costs.",
 "La Tunisie combine une main-d'œuvre très qualifiée, francophone et anglophone, un fuseau horaire aligné sur l'Europe et des coûts très compétitifs."),
("CET time zone — same working hours as Europe", "Fuseau CET — mêmes horaires de travail que l'Europe"),
("Bilingual teams: French &amp; English", "Équipes bilingues : français &amp; anglais"),
("Strong pool of engineers, support &amp; business profiles", "Vivier d'ingénieurs, supports &amp; profils business"),
("Direct flights: Paris–Tunis in ~2h30", "Vols directs : Paris–Tunis en ~2h30"),
("Why Belvédère · Why Hive Five", "Pourquoi le Belvédère · Pourquoi Hive Five"),
("Central, Credible, Ready.", "Central, crédible, prêt."),
("Belvédère is one of Tunis's most accessible business districts — and HIVE FIVE removes the entire setup burden.",
 "Le Belvédère est l'un des quartiers d'affaires les plus accessibles de Tunis — et HIVE FIVE supprime tout le poids de l'installation."),
("1,300 m² over 2 floors + 300 m² terrace", "1 300 m² sur 2 étages + terrasse de 300 m²"),
("200+ workstations · 23 private offices", "200+ postes de travail · 23 bureaux privés"),
("Dedicated 300 Mbps fiber, professional network", "Fibre dédiée 300 Mbps, réseau professionnel"),
("Meeting &amp; training rooms, reception, cleaning, IT support", "Salles de réunion &amp; formation, accueil, ménage, support IT"),
("Flexible contracts — scale from 5 to 50+ without moving", "Contrats flexibles — passez de 5 à 50+ sans déménager"),
("Start Your Tunis Project", "Lancez votre projet à Tunis"),
("How it works", "Comment ça marche"),
("From First Call to First Working Day — in Days, Not Months.", "Du premier appel au premier jour de travail — en jours, pas en mois."),
("Tell us your needs", "Dites-nous vos besoins"),
("Team size, roles, start date. We answer within 2 business hours with a tailored proposal.",
 "Taille de l'équipe, rôles, date de début. Nous répondons sous 2 heures ouvrées avec une proposition sur mesure."),
("Visit — on site or on video", "Visitez — sur place ou en vidéo"),
("Live in Tunis? Come see the space. Abroad? We do live video tours on WhatsApp.",
 "À Tunis ? Venez voir les lieux. À l'étranger ? Visite en direct par visio WhatsApp."),
("Move in &amp; start working", "Emménagez &amp; travaillez"),
("Desks ready, badges assigned, network configured. Your team works from day one.",
 "Postes prêts, badges attribués, réseau configuré. Votre équipe travaille dès le premier jour."),
("Ready to Build Your Team in Tunis?", "Prêt à constituer votre équipe à Tunis ?"),
("Talk to our business team — in English, French or German.", "Parlez à notre équipe business — en français, anglais ou allemand."),
("alt=\"Professional team collaborating at HIVE FIVE Tunis\"", "alt=\"Équipe professionnelle en collaboration chez HIVE FIVE Tunis\""),
("alt=\"HIVE FIVE business center Belvédère Tunis\"", "alt=\"Business center HIVE FIVE Belvédère Tunis\""),
# ABOUT
("Our story", "Notre histoire"),
("Built for Businesses. Designed for People.", "Pensé pour les entreprises. Conçu pour les personnes."),
("HIVE FIVE is a professional environment designed so companies and professionals can work in the best conditions.",
 "HIVE FIVE est un environnement professionnel conçu pour que entreprises et professionnels travaillent dans les meilleures conditions."),
("What we believe", "Ce en quoi nous croyons"),
("Good Space Makes Good Work.", "Un bon espace fait le bon travail."),
("We built HIVE FIVE because businesses in Tunis — and teams joining from abroad — deserve better than a compromise between a noisy café and a rigid office lease.",
 "Nous avons créé HIVE FIVE parce que les entreprises à Tunis — et les équipes venues de l'étranger — méritent mieux qu'un compromis entre un café bruyant et un bail rigide."),
("So we created a business center with international standards: real infrastructure, real flexibility, and a team that takes care of everything except your business.",
 "Nous avons donc créé un business center aux standards internationaux : vraie infrastructure, vraie flexibilité, et une équipe qui s'occupe de tout sauf de votre business."),
("Professional first — designed for companies", "Le professionnalisme d'abord — pensé pour les entreprises"),
("Human always — you'll be greeted by name", "L'humain toujours — on vous accueille par votre prénom"),
("Flexibility as a principle, not a slogan", "La flexibilité comme principe, pas comme slogan"),
("alt=\"Inside HIVE FIVE, Belvédère\"", "alt=\"À l'intérieur de HIVE FIVE, Belvédère\""),
("Come see it", "Venez le découvrir"),
("The Best Way to Know Us? A Free Visit.", "La meilleure façon de nous connaître ? Une visite gratuite."),
("Walk the floors, test the Wi-Fi, taste the coffee — then decide.",
 "Parcourez les étages, testez le Wi-Fi, goûtez le café — puis décidez."),
(">workspace<", ">d'espaces<"),
# CONTACT PAGE
("Talk to Us. We're Fast.", "Écrivez-nous. Nous sommes rapides."),
("Visit, call, WhatsApp or write — a human answers within 2 business hours.",
 "Visite, appel, WhatsApp ou email — un humain répond sous 2 heures ouvrées."),
("Book a Visit / Get a Quote", "Réserver une visite / Demander un devis"),
("We reply quickly — really.", "Nous répondons vite — vraiment."),
(">Phone<", ">Téléphone<"),
(">WhatsApp<", ">WhatsApp<"),
("Members (offices &amp; desks)", "Membres (bureaux &amp; postes)"),
('aria-label="Get directions to HIVE FIVE"', 'aria-label="Itinéraire vers HIVE FIVE"'),
('alt="Map — HIVE FIVE, 63 Rue de Khartoum, Lafayette, Tunis"', 'alt="Carte — HIVE FIVE, 63 Rue de Khartoum, Lafayette, Tunis"'),
(">Google Maps<", ">Google Maps<"),
# BLOG
(">Blog<", ">Blog<"),
(">Insights<", ">Analyses<"),
("Ideas for Growing Businesses.", "Idées pour entreprises en croissance."),
("Flexible work, business in Tunisia, remote teams and more — a blog built for decision-makers.",
 "Travail flexible, business en Tunisie, équipes distantes et plus — un blog pensé pour les décideurs."),
("Business in Tunisia", "Business en Tunisie"),
("Why Companies Are Choosing Flexible Offices in Tunis", "Pourquoi les entreprises choisissent les bureaux flexibles à Tunis"),
("Long leases vs agility: why more companies pick flexible workspace to enter the Tunisian market.",
 "Bail long vs agilité : pourquoi de plus en plus d'entreprises choisissent l'espace flexible pour entrer sur le marché tunisien."),
("(Article coming soon)", "(Article à paraître)"),
("(Coming soon)", "(À paraître)"),
("Remote Work", "Travail à distance"),
("How to Set Up a Remote Team in Tunisia", "Comment monter une équipe distante en Tunisie"),
("Infrastructure, hiring, timezone and culture: the practical playbook for your first Tunisian team.",
 "Infrastructure, recrutement, fuseau horaire et culture : le guide pratique de votre première équipe tunisienne."),
("Coworking vs Traditional Office in Tunis", "Coworking vs bureau traditionnel à Tunis"),
("The honest cost and flexibility comparison, with real numbers from the Belvédère market.",
 "La comparaison honnête coût/flexibilité, avec les vrais chiffres du marché du Belvédère."),
("Why Belvédère Is a Strategic Business Location in Tunis", "Pourquoi le Belvédère est un emplacement stratégique à Tunis"),
("Central, accessible, credible: the district that makes sense for your office.",
 "Central, accessible, crédible : le quartier idéal pour votre bureau."),
("How to Start a Business Team in Tunisia Without Renting a Traditional Office", "Lancer une équipe en Tunisie sans louer de bureau traditionnel"),
("The plug-and-play route: from first employee to full team, without construction.",
 "La voie plug-and-play : du premier employé à l'équipe complète, sans travaux."),
("Hackathons &amp; AI Workshops at HIVE FIVE: What We Build Together", "Hackathons &amp; ateliers IA chez HIVE FIVE : ce que nous construisons ensemble"),
("Inside our monthly tech events — AI, robotics and code, open to the community.",
 "Dans nos événements tech mensuels — IA, robotique et code, ouverts à la communauté."),
(">Coming soon<", ">À paraître<"),
# SCHEMA JSON-LD
("Business Center & Coworking Space in Belvédère, Tunis. Private offices, team offices, coworking, meeting and training rooms.",
 "Business Center & Coworking au Belvédère, Tunis. Bureaux privés, bureaux d'équipe, coworking, salles de réunion et de formation."),
]

# FR link dans les pages FR doit mener vers la version EN (../page) avec label EN
def fix_paths(s, page_name):
    # chemins d'assets relatifs
    s = s.replace('src="images/', 'src="../images/')
    s = s.replace('href="images/', 'href="../images/')
    s = s.replace('content="images/', 'content="../images/')
    s = s.replace("url('images/", "url('../images/")
    # liens internes sans slash initial ; restent relatifs (pages fr entre elles) ✔
    return s

def translate(s, page_name):
    # tri par longueur décroissante pour éviter les collisions de sous-chaînes
    for old, new in sorted(T, key=lambda x: -len(x[0])):
        s = s.replace(old, new)

    # meta spécifiques par page
    if page_name in META:
        m = META[page_name]
        s = re.sub(r"<title>.*?</title>", f"<title>{m['title']}</title>", s, count=1)
        s = re.sub(r'(<meta name="description" content=")[^"]*(")', rf"\g<1>{m['desc']}\g<2>", s, count=1)
        s = re.sub(r'(<meta property="og:title" content=")[^"]*(")', rf"\g<1>{m['title']}\g<2>", s, count=1)
        s = re.sub(r'(<meta property="og:description" content=")[^"]*(")', rf"\g<1>{m['desc']}\g<2>", s, count=1)
        s = re.sub(r'(<meta name="twitter:title" content=")[^"]*(")', rf"\g<1>{m['title']}\g<2>", s, count=1)
        s = re.sub(r'(<meta name="twitter:description" content=")[^"]*(")', rf"\g<1>{m['desc']}\g<2>", s, count=1)

    # lang
    s = s.replace('<html lang="en">', '<html lang="fr">')
    # og:locale
    s = s.replace('content="en_US"', 'content="fr_FR"')

    # canonical : insérer fr/ après le domaine
    s = re.sub(r'<link rel="canonical" href="https://www\.hivefive\.tn/([^"]*)"',
               lambda m: '<link rel="canonical" href="https://www.hivefive.tn/fr/' + (m.group(1) or "index.html") + '">', s)
    # hreflang "en" et "fr" des pages EN pointent déjà correctement (en → page, fr → fr/page).
    # og:url → fr/page
    s = re.sub(r'(<meta property="og:url" content="https://www\.hivefive\.tn/)([^"]*)"',
               lambda mm: mm.group(1) + ("fr/" + mm.group(2) if mm.group(2) else "fr/index.html") + '"', s)

    # Sélecteur langue : dans la version FR, montrer "EN" pointant vers le parent
    s = s.replace(f'href="fr/{page_name}" title="English version"',
                  f'href="../{page_name}" title="English version"')
    s = s.replace('>FR</a>', '>EN</a>')

    # JS : la config detecte lang via <html lang> ✔ (rien à faire)

    return fix_paths(s, page_name)

os.makedirs("fr", exist_ok=True)
pages = ["index.html", "services.html", "international-companies.html", "about.html", "contact.html", "blog.html"]
for fn in pages:
    src = open(fn, encoding="utf-8").read()
    out = translate(src, fn)
    open(os.path.join("fr", fn), "w", encoding="utf-8").write(out)
    print("✓ fr/" + fn, f"({len(out)//1024} Ko)")
