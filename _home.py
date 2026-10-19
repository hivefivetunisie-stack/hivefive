# -*- coding: utf-8 -*-
"""Page d'accueil HIVE FIVE — Business Center."""
from _core import *

schema_lb = """<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"HIVE FIVE","description":"Business Center & Coworking Space in Belvédère, Tunis. Private offices, team offices, coworking, meeting and training rooms.","slogan":"Your Business. Your Team. Your Space.","address":{"@type":"PostalAddress","streetAddress":"63 Rue de Khartoum, Lafayette – Belvédère","addressLocality":"Tunis","addressCountry":"TN"},"telephone":"+21657010915","email":"Hivefivetunisie@gmail.com","geo":{"@type":"GeoCoordinates","latitude":36.8140859,"longitude":10.1756748},"openingHours":["Mo-Fr 07:30-21:00","Sa 09:00-19:00"],"priceRange":"25 - 490 TND","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"12"}}
</script>"""

HOME = f"""
<!-- ================= HERO ================= -->
<section class="hero" id="top">
  <div class="hero-bg"><img src="images/open-space.jpg" alt="HIVE FIVE workspace — bright professional open space in Belvédère, Tunis" loading="eager" fetchpriority="high"></div>
  <div class="container hero-in">
    <span class="kicker">Business Center · Coworking · Remote Team Hub</span>
    <h1>Your Business Deserves the Right Space.</h1>
    <p class="sub">Flexible offices, team spaces, coworking and professional facilities in the heart of Tunis.</p>
    <p class="sub2">Move in quickly. Scale your team. Focus on your business.</p>
    <div class="btn-row">
      <a href="#contact" class="btn btn-brand">Book a Visit <svg class="icon"><use href="#i-arrow"/></svg></a>
      <a href="#calculator" class="btn btn-wline">Request a Quote</a>
    </div>
    <div class="hero-meta">
      <span><svg class="icon"><use href="#i-pin"/></svg> Belvédère, Tunis</span>
      <span><svg class="icon"><use href="#i-layers"/></svg> 1,300 m² · 2 floors</span>
      <span><svg class="icon"><use href="#i-users"/></svg> 200+ workstations</span>
      <span><svg class="icon"><use href="#i-wifi"/></svg> 300 Mbps dedicated fiber</span>
    </div>
  </div>
</section>

<!-- ================= CHIFFRES CLÉS ================= -->
<div class="stats">
  <div class="container stats-grid">
    <div class="stat"><b><span data-count="1300">0</span><em>m²</em></b><span>of workspace</span></div>
    <div class="stat"><b><span data-count="300">0</span><em>m²</em></b><span>rooftop terrace</span></div>
    <div class="stat"><b><span data-count="200">0</span><em>+</em></b><span>workstations</span></div>
    <div class="stat"><b><span data-count="23">0</span></b><span>private offices</span></div>
    <div class="stat"><b><span data-count="250">0</span><em>m²</em></b><span>open space</span></div>
    <div class="stat"><b><span data-count="300">0</span><em>Mbps</em></b><span>dedicated fiber</span></div>
  </div>
</div>

<!-- ================= WHY ================= -->
<section id="why">
  <div class="container">
    <div class="center reveal">
      <span class="kicker">Why Hive Five</span>
      <h2>More Than a Coworking Space.</h2>
      <p class="lead">A professional environment designed for companies, teams and professionals who mean business.</p>
    </div>
    <div class="why-grid">
      <div class="why reveal"><span class="num">01</span><h3>Move-in ready</h3><p>Fully equipped professional workspaces ready for immediate use. Bring your laptop, start working.</p></div>
      <div class="why reveal" style="--d:.06s"><span class="num">02</span><h3>Flexible</h3><p>Scale your workspace up or down according to your business needs. No rigid long-term commitment.</p></div>
      <div class="why reveal" style="--d:.12s"><span class="num">03</span><h3>Connected</h3><p>Dedicated 300 Mbps fiber and reliable professional network infrastructure across the whole building.</p></div>
      <div class="why reveal"><span class="num">04</span><h3>Professional</h3><p>Reception, meeting rooms, business address — a setting that makes the right impression on your clients.</p></div>
      <div class="why reveal" style="--d:.06s"><span class="num">05</span><h3>Central location</h3><p>In Belvédère, central Tunis — minutes from the city center, with parking and public transport nearby.</p></div>
      <div class="why reveal" style="--d:.12s"><span class="num">06</span><h3>Scalable</h3><p>From one workstation to an entire team of 50+. Grow without changing address.</p></div>
    </div>
  </div>
</section>

<!-- ================= SOLUTIONS ================= -->
<section id="solutions" class="soft">
  <div class="container">
    <div class="center reveal">
      <span class="kicker">Choose your space</span>
      <h2>Four Ways to Work at Hive Five.</h2>
      <p class="lead">Offices, team spaces, coworking and meeting facilities — one address, every option.</p>
    </div>
    <div class="sol-grid">
      <article class="sol reveal">
        <div class="sol-img"><span class="sol-tag">Private Offices</span><img src="images/bureau-equipe.jpg" alt="Private office at HIVE FIVE Belvédère" loading="lazy"></div>
        <div class="sol-body">
          <h3>Private Offices</h3>
          <p class="sol-for">For entrepreneurs, consultants, startups &amp; small teams</p>
          <p>Your own enclosed, furnished office — 23 private offices across 2 floors, ready for business.</p>
          <div class="sol-feats"><span>Furnished</span><span>Lockable</span><span>24/7 access</span><span>Meeting credits</span></div>
          <a href="services.html" class="btn btn-ink" data-plan="Private Office">Explore Private Offices <svg class="icon"><use href="#i-arrow"/></svg></a>
        </div>
      </article>
      <article class="sol reveal" style="--d:.08s">
        <div class="sol-img"><span class="sol-tag">Team Offices</span><img src="images/reunion.jpg" alt="Team office setup at HIVE FIVE" loading="lazy"></div>
        <div class="sol-body">
          <h3>Team Offices</h3>
          <p class="sol-for">For teams of 5 to 50+ people</p>
          <p>Your team. Your dedicated space. No setup hassle.</p>
          <div class="sol-feats"><span>Desks</span><span>Internet</span><span>Electricity</span><span>Cleaning</span><span>Meeting access</span><span>Flexible capacity</span></div>
          <a href="#contact" class="btn btn-brand" data-plan="Team Office">Build Your Team Space <svg class="icon"><use href="#i-arrow"/></svg></a>
        </div>
      </article>
      <article class="sol reveal">
        <div class="sol-img"><span class="sol-tag">Coworking</span><img src="images/poste-dedie.jpg" alt="Coworking desks at HIVE FIVE" loading="lazy"></div>
        <div class="sol-body">
          <h3>Coworking</h3>
          <p class="sol-for">For freelancers, remote workers &amp; consultants</p>
          <p>A professional desk in a 250 m² open space — flexible plans, dedicated desks, real community.</p>
          <div class="sol-feats"><span>Flex or dedicated</span><span>Fast internet</span><span>Lounge &amp; terrace</span></div>
          <a href="#coworking" class="btn btn-ink">Join Hive Five <svg class="icon"><use href="#i-arrow"/></svg></a>
        </div>
      </article>
      <article class="sol reveal" style="--d:.08s">
        <div class="sol-img"><span class="sol-tag">Meeting &amp; Training</span><img src="images/formation.jpg" alt="Training room at HIVE FIVE" loading="lazy"></div>
        <div class="sol-body">
          <h3>Training &amp; Meeting Rooms</h3>
          <p class="sol-for">For trainings, workshops, meetings &amp; corporate events</p>
          <p>Equipped rooms by the hour or by the day — with screen, whiteboard, video conferencing and coffee.</p>
          <div class="sol-feats"><span>Hourly / daily</span><span>Screen &amp; whiteboard</span><span>Video conf</span></div>
          <a href="#contact" class="btn btn-brand" data-plan="Training / Meeting Room">Book a Room <svg class="icon"><use href="#i-arrow"/></svg></a>
        </div>
      </article>
    </div>
  </div>
</section>

<!-- ================= ENTREPRISES ================= -->
<section class="dark" id="enterprise">
  <div class="container ent-grid">
    <div class="reveal">
      <span class="kicker">For companies</span>
      <h2 style="color:#fff">Build Your Team in Tunis. Without Building an Office.</h2>
      <p class="lead">Need to establish a team in Tunisia without investing in a traditional office? HIVE FIVE gives you the infrastructure, workspace and flexibility you need to get started quickly.</p>
      <div class="ent-feats">
        <div class="ent-feat"><span class="ent-num">01</span><div><strong>5 to 50+ workstations</strong><p>Flexible team capacity — start small, grow when you need.</p></div></div>
        <div class="ent-feat"><span class="ent-num">02</span><div><strong>Ready-to-use infrastructure</strong><p>No construction. No furniture. No complicated setup.</p></div></div>
        <div class="ent-feat"><span class="ent-num">03</span><div><strong>Professional connectivity</strong><p>Dedicated 300 Mbps fiber connection + business-grade network.</p></div></div>
        <div class="ent-feat"><span class="ent-num">04</span><div><strong>Flexible terms</strong><p>Adapt your workspace as your business grows.</p></div></div>
        <div class="ent-feat"><span class="ent-num">05</span><div><strong>Central location</strong><p>Belvédère, Tunis — easy for your team, credible for your clients.</p></div></div>
      </div>
      <div class="btn-row" style="margin-top:34px">
        <a href="#contact" class="btn btn-brand" data-plan="Team Office">Talk to Our Business Team <svg class="icon"><use href="#i-arrow"/></svg></a>
      </div>
    </div>
    <div class="ent-media reveal" style="--d:.15s">
      <img src="images/bande.jpg" alt="Team collaborating at HIVE FIVE" loading="lazy">
      <div class="ent-cards">
        <div class="ent-chip"><b>5–50+</b><span>workstations</span></div>
        <div class="ent-chip"><b>48h</b><span>to move in</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ================= REMOTE TEAM HUB ================= -->
<section id="remote">
  <div class="container split">
    <div class="split-media reveal"><img src="images/communaute.jpg" alt="Remote team working at HIVE FIVE" loading="lazy"></div>
    <div class="reveal" style="--d:.1s">
      <span class="kicker">Remote Team Hub</span>
      <h2>Your Tunis Team Starts Here.</h2>
      <p class="lead">A ready-to-use environment for companies building remote or hybrid teams in Tunisia.</p>
      <p style="color:var(--muted);font-size:15.5px;margin-top:14px">From 5 people to a complete team, HIVE FIVE provides a professional environment where your employees can start working immediately.</p>
      <ul class="checks">
        <li><svg class="icon"><use href="#i-check"/></svg> Dedicated team workspace &amp; workstations</li>
        <li><svg class="icon"><use href="#i-check"/></svg> High-speed internet &amp; IT support</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Meeting rooms, reception &amp; cleaning</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Flexible expansion as you hire</li>
      </ul>
      <div class="btn-row">
        <a href="#contact" class="btn btn-brand" data-plan="Team Office">Build Your Team in Tunis <svg class="icon"><use href="#i-arrow"/></svg></a>
        <a href="international-companies.html" class="link-more">For international companies <svg class="icon"><use href="#i-arrow"/></svg></a>
      </div>
    </div>
  </div>
</section>

<!-- ================= COWORKING ================= -->
<section id="coworking" class="soft">
  <div class="container split">
    <div class="reveal">
      <span class="kicker">Coworking</span>
      <h2>Work Around People Who Build Things.</h2>
      <p class="lead">A 250 m² open space with everything a professional needs to do their best work.</p>
      <ul class="checks">
        <li><svg class="icon"><use href="#i-check"/></svg> Flexible access — a day, a month, a year</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Comfortable desks, fast internet</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Meeting spaces when clients come</li>
        <li><svg class="icon"><use href="#i-check"/></svg> 300 m² terrace, lounge &amp; coffee area</li>
        <li><svg class="icon"><use href="#i-check"/></svg> A community of builders — and hackathons</li>
      </ul>
      <div class="btn-row">
        <a href="#pricing" class="btn btn-brand">View Coworking Options <svg class="icon"><use href="#i-arrow"/></svg></a>
      </div>
    </div>
    <div class="split-media reveal" style="--d:.1s"><img src="images/hero-arch.jpg" alt="Coworking area with plants and daylight at HIVE FIVE" loading="lazy"></div>
  </div>
</section>

<!-- ================= TRAINING & MEETING ================= -->
<section id="training">
  <div class="container">
    <div class="center reveal">
      <span class="kicker">Training &amp; Meeting</span>
      <h2>Train. Meet. Create.</h2>
      <p class="lead">Professional rooms designed for training sessions, workshops, meetings, interviews and corporate events.</p>
    </div>
    <div class="rooms">
      <div class="room reveal"><svg class="icon"><use href="#i-present"/></svg><h3>Training room</h3><p>Classroom layout, screen, whiteboard — for courses &amp; academies.</p></div>
      <div class="room reveal" style="--d:.06s"><svg class="icon"><use href="#i-users"/></svg><h3>Meeting room</h3><p>Client-ready rooms with video conferencing and presentation tools.</p></div>
      <div class="room reveal" style="--d:.12s"><svg class="icon"><use href="#i-briefcase"/></svg><h3>Workshop room</h3><p>Modular tables for creative sessions, design sprints, hackathons.</p></div>
      <div class="room reveal" style="--d:.18s"><svg class="icon"><use href="#i-layers"/></svg><h3>Conference space</h3><p>Roomy setups for talks, demos and corporate events.</p></div>
    </div>
    <div class="center" style="margin-top:40px">
      <a href="#contact" class="btn btn-brand reveal" data-plan="Training / Meeting Room">Book a Training Room <svg class="icon"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
</section>

<!-- ================= GALERIE ================= -->
<section id="gallery" class="soft">
  <div class="container">
    <div class="center reveal">
      <span class="kicker">Gallery</span>
      <h2>Browse the Space.</h2>
      <p class="lead">Offices, coworking, meeting rooms, lounge &amp; terrace — click any photo to view it full screen.</p>
    </div>
    <div class="gal-filters reveal">
      <button class="on" data-cat="all">All</button>
      <button data-cat="offices">Offices</button>
      <button data-cat="coworking">Coworking</button>
      <button data-cat="meeting">Meeting Rooms</button>
      <button data-cat="training">Training Rooms</button>
      <button data-cat="lounge">Lounge</button>
      <button data-cat="terrace">Terrace</button>
      <button data-cat="common">Common Areas</button>
    </div>
    <!-- 📸 Emplacements à remplacer par les vraies photos : conservez les noms de fichiers -->
    <div class="gal-grid reveal" style="--d:.1s">
      <figure class="gal-item" data-cat="coworking"><img src="images/open-space.jpg" alt="Open space" loading="lazy"><span class="cap">Coworking</span></figure>
      <figure class="gal-item" data-cat="offices"><img src="images/bureau-equipe.jpg" alt="Private office" loading="lazy"><span class="cap">Offices</span></figure>
      <figure class="gal-item" data-cat="meeting"><img src="images/reunion.jpg" alt="Meeting room" loading="lazy"><span class="cap">Meeting Rooms</span></figure>
      <figure class="gal-item" data-cat="training"><img src="images/formation.jpg" alt="Training room" loading="lazy"><span class="cap">Training Rooms</span></figure>
      <figure class="gal-item" data-cat="terrace"><img src="images/terrasse.jpg" alt="Rooftop terrace" loading="lazy"><span class="cap">Terrace</span></figure>
      <figure class="gal-item" data-cat="lounge"><img src="images/galerie/photo-1.jpg" alt="Coffee lounge" loading="lazy"><span class="cap">Lounge</span></figure>
      <figure class="gal-item" data-cat="coworking"><img src="images/poste-dedie.jpg" alt="Dedicated desk" loading="lazy"><span class="cap">Coworking</span></figure>
      <figure class="gal-item" data-cat="common"><img src="images/cafe.jpg" alt="Common area" loading="lazy"><span class="cap">Common Areas</span></figure>
      <figure class="gal-item" data-cat="training"><img src="images/formation-2.jpg" alt="Conference setup" loading="lazy"><span class="cap">Training Rooms</span></figure>
      <figure class="gal-item" data-cat="meeting"><img src="images/galerie/photo-3.jpg" alt="Workshop session" loading="lazy"><span class="cap">Meeting Rooms</span></figure>
      <figure class="gal-item" data-cat="offices"><img src="images/galerie/photo-5.jpg" alt="Private workspace" loading="lazy"><span class="cap">Offices</span></figure>
      <figure class="gal-item" data-cat="common"><img src="images/communaute.jpg" alt="Community area" loading="lazy"><span class="cap">Common Areas</span></figure>
    </div>
  </div>
  <!-- Lightbox -->
  <div class="lb" id="lb" role="dialog" aria-label="Photo viewer">
    <button class="lb-close" id="lbClose" aria-label="Close"><svg class="icon"><use href="#i-x"/></svg></button>
    <button class="lb-prev" id="lbPrev" aria-label="Previous photo"><svg class="icon" style="transform:rotate(180deg)"><use href="#i-arrow"/></svg></button>
    <img id="lbImg" src="" alt="">
    <button class="lb-next" id="lbNext" aria-label="Next photo"><svg class="icon"><use href="#i-arrow"/></svg></button>
    <span class="lb-cap" id="lbCap"></span>
  </div>
</section>

<!-- ================= TERRASSE ================= -->
<section id="terrace" style="padding-top:0">
  <div class="container">
    <div class="terrace reveal">
      <img src="images/terrasse.jpg" alt="HIVE FIVE 300 m² rooftop terrace above Tunis" loading="lazy">
      <div class="ter-in">
        <span class="badge">300 m² · Rooftop</span>
        <h3>Take a Break Above Tunis.</h3>
        <p>A 300 m² terrace designed for breaks, informal meetings and moments away from the desk — above Belvédère.</p>
      </div>
    </div>
  </div>
</section>

<!-- ================= PRICING ================= -->
<!-- 💰 PRIX MODIFIABLES : retirez les commentaires "PRICE:" et échangez les valeurs -->
<section id="pricing" class="soft">
  <div class="container">
    <div class="center reveal">
      <span class="kicker">Pricing</span>
      <h2>Simple. Flexible. Transparent.</h2>
      <p class="lead">Starting prices below — every plan comes with fiber, cleaning, meeting access and no hidden fees. Get a tailored quote for your team.</p>
    </div>
    <div class="plans">
      <div class="plan reveal">
        <h3>Coworking</h3>
        <p class="p-for">Flexible plans for independents</p>
        <div class="p-price"><small>From</small><b>25 DT</b><span>/ day · or 250 DT / month</span></div>
        <ul>
          <li><svg class="icon"><use href="#i-check"/></svg> Open space access</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Fiber, coffee, lounge &amp; terrace</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Meeting room credits</li>
          <li><svg class="icon"><use href="#i-check"/></svg> No commitment</li>
        </ul>
        <a href="#contact" class="btn btn-line btn-block" data-plan="Coworking">Get Started</a>
      </div>
      <div class="plan reveal" style="--d:.06s">
        <h3>Dedicated Desk</h3>
        <p class="p-for">Your own desk, 24/7</p>
        <div class="p-price"><small>From</small><b>390 DT</b><span>/ month · 24/7 badge included</span></div>
        <ul>
          <li><svg class="icon"><use href="#i-check"/></svg> Fixed desk with your name on it</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Locker + business address</li>
          <li><svg class="icon"><use href="#i-check"/></svg> 4h meeting room / month</li>
        </ul>
        <a href="#contact" class="btn btn-line btn-block" data-plan="Coworking">Get Started</a>
      </div>
      <div class="plan reveal" style="--d:.12s">
        <h3>Private / Team Office</h3>
        <p class="p-for">Dedicated workspace for teams of 1–50+</p>
        <div class="p-price"><small>From</small><b>290 DT</b><span>/ workstation / month</span></div>
        <ul>
          <li><svg class="icon"><use href="#i-check"/></svg> Furnished, lockable office</li>
          <li><svg class="icon"><use href="#i-check"/></svg> 24/7 access for the whole team</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Meeting room credits + IT support</li>
        </ul>
        <a href="#contact" class="btn btn-brand btn-block" data-plan="Team Office">Request a Quote</a>
      </div>
      <div class="plan reveal" style="--d:.18s">
        <h3>Training &amp; Meeting Rooms</h3>
        <p class="p-for">Hourly or daily rental</p>
        <div class="p-price"><small>From</small><b>150 DT</b><span>/ day · equipped room</span></div>
        <ul>
          <li><svg class="icon"><use href="#i-check"/></svg> Screen, whiteboard, video conf</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Coffee &amp; catering on request</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Reception for your guests</li>
        </ul>
        <a href="#contact" class="btn btn-line btn-block" data-plan="Training / Meeting Room">Book a Room</a>
      </div>
    </div>
    <p class="pricing-note reveal">🎓 <b>Students &amp; associations: −20%</b> all year. Teams of 10+: volume discounts. Every plan: satisfaction guaranteed or refunded within 14 days.</p>
  </div>
</section>

<!-- ================= CALCULATEUR ================= -->
<section id="calculator">
  <div class="container">
    <div class="calc reveal">
      <div>
        <span class="kicker" style="color:#FFB38A">Business calculator</span>
        <h3>How Much Space Does Your Team Need?</h3>
        <p class="lead">Select your team size, the type of space and a duration — get an instant ballpark estimate.</p>
        <label for="c-people">Number of people</label>
        <select id="c-people">
          <option value="1">1</option><option value="2">2</option><option value="5" selected>5</option>
          <option value="10">10</option><option value="15">15</option><option value="20">20</option>
          <option value="30">30</option><option value="50">50+</option>
        </select>
        <label for="c-type">Type of space</label>
        <select id="c-type">
          <option value="teamOffice" selected>Team office</option>
          <option value="privateOffice">Private office</option>
          <option value="coworking">Coworking — dedicated desk</option>
          <option value="flex">Coworking — flexible</option>
          <option value="training">Training / meeting room</option>
        </select>
        <label for="c-dur">Duration</label>
        <select id="c-dur">
          <option value="1 month">1 month</option><option value="3 months" selected>3 months</option><option value="6 months">6 months</option>
          <option value="12 months">12 months</option><option value="1 week">1 week</option><option value="1 day">1 day</option>
        </select>
      </div>
      <div class="calc-result">
        <span class="lbl">Your estimated workspace solution</span>
        <div class="calc-out" id="calcOut">—</div>
        <p class="calc-desc" id="calcDesc">Select your options.</p>
        <a href="#contact" class="btn btn-brand btn-block" id="calcQuote">Request Your Custom Quote <svg class="icon"><use href="#i-arrow"/></svg></a>
        <p class="calc-note">Indicative estimate — your tailored quote is always confirmed by our business team.</p>
      </div>
    </div>
  </div>
</section>

<!-- ================= TÉMOIGNAGES (vrais uniquement) ================= -->
<section class="soft" id="testimonials">
  <div class="container">
    <div class="center reveal">
      <span class="kicker">What people say</span>
      <h2>Businesses Talk. Google Agrees.</h2>
      <div class="gr-summary">
        <svg class="g-ico big" aria-hidden="true"><use href="#i-google"/></svg>
        <span class="gr-score">4.9<small style="font-size:.55em;color:var(--muted)">/5</small></span>
        <span class="gr-stars" style="margin:0"><svg class="icon"><use href="#i-star"/></svg><svg class="icon"><use href="#i-star"/></svg><svg class="icon"><use href="#i-star"/></svg><svg class="icon"><use href="#i-star"/></svg><svg class="icon"><use href="#i-star"/></svg></span>
        <span class="gr-note">based on our Google reviews</span>
        <a class="gr-link" href="{PLACE_URL}" target="_blank" rel="noopener">Read all reviews ↗</a>
      </div>
    </div>
    <div class="rev-wrap reveal" style="margin-top:44px">
      <div class="rev-card">
        <div class="gr-top">
          <img class="gr-av" src="images/avis/eya.jpg" alt="eya wafii" loading="lazy">
          <div><strong>eya wafii</strong><span class="gr-meta">Google review · 1 year ago</span></div>
          <svg class="g-ico" aria-hidden="true"><use href="#i-google"/></svg>
        </div>
        <div class="gr-stars"><svg class="icon"><use href="#i-star"/></svg><svg class="icon"><use href="#i-star"/></svg><svg class="icon"><use href="#i-star"/></svg><svg class="icon"><use href="#i-star"/></svg><svg class="icon"><use href="#i-star"/></svg></div>
        <blockquote>« Cet espace de travail allie harmonieusement confort, esthétisme et sérénité. J'adore, ça m'aide vraiment à rester concentrée et à être productive, tout en me sentant bien accueillie ✨✨ »</blockquote>
        <p style="font-size:13px;color:var(--muted);margin-top:14px;font-style:italic">— "This workspace harmoniously combines comfort, aesthetics and serenity. It truly helps me stay focused and productive, while feeling warmly welcomed."</p>
      </div>
    </div>
  </div>
</section>

<!-- ================= FAQ ================= -->
<section id="faq">
  <div class="container">
    <div class="center reveal">
      <span class="kicker">FAQ</span>
      <h2>Good Questions. Straight Answers.</h2>
    </div>
    <div class="faq-wrap reveal">
      <div class="faq-item"><button class="faq-q" aria-expanded="false">Where is HIVE FIVE located? <svg class="icon"><use href="#i-chev"/></svg></button><div class="faq-a"><div class="faq-a-in">In Belvédère, central Tunis (63 Rue de Khartoum, Lafayette) — minutes from downtown, with parking on site and metro access nearby.</div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false">How many people can you accommodate? <svg class="icon"><use href="#i-chev"/></svg></button><div class="faq-a"><div class="faq-a-in">Up to 200+ people across 2 floors: 23 private offices, a 250 m² open space and team areas for 5 to 50+ people.</div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false">Do you offer private offices? <svg class="icon"><use href="#i-chev"/></svg></button><div class="faq-a"><div class="faq-a-in">Yes — furnished, lockable private offices for 1 to 20 people, with 24/7 access and meeting room credits included.</div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false">Can I rent space for my entire team? <svg class="icon"><use href="#i-chev"/></svg></button><div class="faq-a"><div class="faq-a-in">Absolutely. Team offices host 5 to 50+ workstations with desks, internet, electricity, cleaning and meeting access included. We scale with you.</div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false">Can international companies use HIVE FIVE? <svg class="icon"><use href="#i-chev"/></svg></button><div class="faq-a"><div class="faq-a-in">Yes — it's one of our specialties. Companies from France and across Europe set up their Tunis teams with us: infrastructure ready, contracts flexible, onboarding in days. <a href="international-companies.html" style="color:var(--brand);font-weight:700">See our dedicated page →</a></div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false">Do you offer meeting rooms? <svg class="icon"><use href="#i-chev"/></svg></button><div class="faq-a"><div class="faq-a-in">Yes, by the hour or the day: meeting rooms, training rooms, workshop and conference spaces — all equipped.</div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false">Can I rent a training room by the day? <svg class="icon"><use href="#i-chev"/></svg></button><div class="faq-a"><div class="faq-a-in">Yes. From 150 DT/day you get screen, whiteboard, video conferencing, coffee and reception for your attendees.</div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false">Do you offer flexible contracts? <svg class="icon"><use href="#i-chev"/></svg></button><div class="faq-a"><div class="faq-a-in">Yes — monthly, no long-term lock-in. An email 15 days before month-end is all it takes to change or stop.</div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false">Is high-speed internet available? <svg class="icon"><use href="#i-chev"/></svg></button><div class="faq-a"><div class="faq-a-in">Dedicated 300 Mbps fiber with professional-grade Wi-Fi and a backup 4G/5G link. Uptime is our obsession.</div></div></div>
      <div class="faq-item"><button class="faq-q" aria-expanded="false">Can I visit the space before booking? <svg class="icon"><use href="#i-chev"/></svg></button><div class="faq-a"><div class="faq-a-in">Please do. Visits are free and without commitment — and your first day of coworking is on us. <a href="#contact" style="color:var(--brand);font-weight:700">Book a visit →</a></div></div></div>
    </div>
  </div>
</section>

<!-- ================= CTA FINAL ================= -->
<section style="padding-top:0">
  <div class="container">
    <div class="cta-final reveal">
      <div>
        <h2>Stop Looking for an Office. Start Building Your Business.</h2>
        <p>Visit HIVE FIVE and discover a workspace built around your business.</p>
        <div class="btn-row" style="justify-content:center">
          <a href="#contact" class="btn btn-ink">Book a Visit <svg class="icon"><use href="#i-arrow"/></svg></a>
          <a href="{WA_URL}" target="_blank" rel="noopener" class="btn btn-line">Talk to Our Team</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ================= CONTACT ================= -->
<section id="contact" class="soft">
  <div class="container">
    <div class="center reveal">
      <span class="kicker">Let's talk</span>
      <h2>Let's Build Your Workspace.</h2>
      <p class="lead">Tell us what you need. Our business team answers within 2 business hours.</p>
    </div>
    <div class="contact-grid">
      <div class="form-card reveal">
        <div id="leadWrap">
          <h3>Get My Quote</h3>
          <p>Visits, quotes, questions — one form, one quick answer.</p>
          <form id="leadForm" novalidate>
            <div class="f-row">
              <div class="f-group"><label for="f-name">Full Name <i>*</i></label><input id="f-name" name="name" type="text" placeholder="Jane Dupont" required></div>
              <div class="f-group"><label for="f-company">Company</label><input id="f-company" name="company" type="text" placeholder="Acme SAS"></div>
            </div>
            <div class="f-row">
              <div class="f-group"><label for="f-email">Email <i>*</i></label><input id="f-email" name="email" type="email" placeholder="jane@company.com" required></div>
              <div class="f-group"><label for="f-phone">Phone / WhatsApp <i>*</i></label><input id="f-phone" name="phone" type="tel" placeholder="+216 / +33 ..." required></div>
            </div>
            <div class="f-row">
              <div class="f-group">
                <label for="f-people">Number of people <i>*</i></label>
                <select id="f-people" name="people" required>
                  <option value="1">1–2</option><option value="5" selected>3–10</option>
                  <option value="15">11–20</option><option value="30">21–30</option><option value="50">50+</option>
                </select>
              </div>
              <div class="f-group">
                <label for="f-service">Service required <i>*</i></label>
                <select id="f-service" name="service" required>
                  <option>Private Office</option><option>Team Office</option><option>Coworking</option>
                  <option>Training / Meeting Room</option><option>Business Address / Virtual Office</option>
                  <option>Event Space</option><option>Visit — show me everything</option>
                </select>
              </div>
            </div>
            <div class="f-row">
              <div class="f-group"><label for="f-start">Expected start date</label><input id="f-start" name="start" type="date"></div>
              <div class="f-group"><label for="f-message">Message</label><input id="f-message" name="message" type="text" placeholder="Context, budget, questions…" style="padding:13px 15px"></div>
            </div>
            <button type="submit" class="btn btn-brand btn-block" id="leadBtn">Get My Quote <svg class="icon"><use href="#i-arrow"/></svg></button>
          </form>
        </div>
        <div class="form-success" id="leadSuccess" hidden>
          <div class="ok"><svg class="icon"><use href="#i-check"/></svg></div>
          <h3>Thank you. Our business team will contact you shortly.</h3>
          <p>Meanwhile — the fastest way to reach us:</p>
          <a class="btn btn-ink" href="{WA_URL}" target="_blank" rel="noopener"><svg class="icon"><use href="#i-wa"/></svg> WhatsApp us</a>
        </div>
      </div>
      <div class="info-stack reveal" style="--d:.1s">
        <div class="info-card">
          <div class="info-row"><div class="info-ic"><svg class="icon"><use href="#i-pin"/></svg></div><div><small>Address</small><p>HIVE FIVE<br>63 Rue de Khartoum, Lafayette – Belvédère, Tunis</p></div></div>
          <div class="info-row"><div class="info-ic"><svg class="icon"><use href="#i-phone"/></svg></div><div><small>Phone &amp; WhatsApp</small><a href="{TEL}">{PHONE}</a></div></div>
          <div class="info-row"><div class="info-ic"><svg class="icon"><use href="#i-mail"/></svg></div><div><small>Email</small><a href="mailto:{EMAIL}">{EMAIL}</a></div></div>
        </div>
        <div class="info-card">
          <div class="hours">
            <div><span>Monday – Friday</span><b>7:30 – 21:00</b></div>
            <div><span>Saturday</span><b>9:00 – 19:00</b></div>
            <div><span>Offices &amp; dedicated desks</span><b style="color:var(--brand)">24/7</b></div>
          </div>
        </div>
        <div>
          <a class="map-frame" href="{DIR_URL}" target="_blank" rel="noopener" aria-label="Get directions on Google Maps">
            <img src="images/carte.jpg" alt="Map of Lafayette, Tunis — HIVE FIVE at 63 Rue de Khartoum" loading="lazy">
            <span style="position:absolute;right:14px;bottom:14px;display:inline-flex;align-items:center;gap:8px;background:var(--brand);color:#fff;font-weight:700;font-size:13px;padding:10px 18px;border-radius:999px;box-shadow:0 10px 24px -10px rgba(0,0,0,.45)"><svg class="icon" style="width:15px;height:15px"><use href="#i-pin"/></svg> Directions</span>
          </a>
          <div class="map-links">
            <a class="map-link" href="{DIR_URL}" target="_blank" rel="noopener"><svg class="icon"><use href="#i-pin"/></svg> Get directions</a>
            <a class="map-link" href="{PLACE_URL}" target="_blank" rel="noopener"><svg class="icon"><use href="#i-globe"/></svg> View on Google Maps</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
"""

open("index.html", "w", encoding="utf-8").write(
    page(
        "HIVE FIVE | Business Center & Coworking Space in Tunis",
        "Flexible offices, coworking, team spaces, meeting and training rooms in Belvédère, Tunis. Build your team and start working immediately.",
        "",
        HOME,
        extra_head=schema_lb,
    )
)
print("✓ index.html généré")
