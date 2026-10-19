# -*- coding: utf-8 -*-
"""Pages internes : Services, International companies, About, Contact, Blog."""
from _core import *

# ══════════════════ SERVICES ══════════════════
SERVICES = f"""
{page_hero("Business Services", "Business services", "Everything Your Business Needs. Under One Roof.", "Private offices, coworking, team spaces, meeting and training rooms, virtual office — with one flexible contract.")}
<section>
  <div class="container">
    <div class="svc-grid">
      <div class="svc reveal"><svg class="icon"><use href="#i-briefcase"/></svg><h3>Private Offices</h3><p>Furnished, lockable offices for 1–20 people. 24/7 access, meeting credits included.</p><a class="link-more" href="index.html#pricing">See pricing <svg class="icon"><use href="#i-arrow"/></svg></a></div>
      <div class="svc reveal" style="--d:.05s"><svg class="icon"><use href="#i-users"/></svg><h3>Coworking</h3><p>Flexible and dedicated desks in a 250 m² open space. From 25 DT/day — no commitment.</p><a class="link-more" href="index.html#coworking">Explore <svg class="icon"><use href="#i-arrow"/></svg></a></div>
      <div class="svc reveal" style="--d:.1s"><svg class="icon"><use href="#i-layers"/></svg><h3>Team Offices</h3><p>From 5 to 50+ workstations. Infrastructure ready, expandable anytime.</p><a class="link-more" href="index.html#enterprise">For teams <svg class="icon"><use href="#i-arrow"/></svg></a></div>
      <div class="svc reveal" style="--d:.15s"><svg class="icon"><use href="#i-present"/></svg><h3>Meeting Rooms</h3><p>By the hour or day. Screen, whiteboard, video conferencing, coffee service.</p><a class="link-more" href="index.html#training">Book a room <svg class="icon"><use href="#i-arrow"/></svg></a></div>
      <div class="svc reveal"><svg class="icon"><use href="#i-calendar"/></svg><h3>Training Rooms</h3><p>Classroom and workshop layouts for academies, trainers and corporate programs.</p><a class="link-more" href="index.html#training">See formats <svg class="icon"><use href="#i-arrow"/></svg></a></div>
      <div class="svc reveal" style="--d:.05s"><svg class="icon"><use href="#i-pin"/></svg><h3>Virtual Office</h3><p>Prestigious Belvédère business address, mail handling and optional phone line.</p><a class="link-more" href="contact.html">Get it <svg class="icon"><use href="#i-arrow"/></svg></a></div>
      <div class="svc reveal" style="--d:.1s"><svg class="icon"><use href="#i-zap"/></svg><h3>Event Space</h3><p>Conferences, demos, hackathons, evening events — up to 80 guests, terrace included.</p><a class="link-more" href="contact.html">Plan an event <svg class="icon"><use href="#i-arrow"/></svg></a></div>
      <div class="svc reveal" style="--d:.15s"><svg class="icon"><use href="#i-globe"/></svg><h3>Remote Team Hub</h3><p>A Tunis home for your international team: infrastructure, support, scalability.</p><a class="link-more" href="international-companies.html">Learn more <svg class="icon"><use href="#i-arrow"/></svg></a></div>
    </div>
    <div class="center" style="margin-top:56px">
      <a href="index.html#contact" class="btn btn-brand reveal">Request a Quote <svg class="icon"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
</section>
"""

# ══════════════════ INTERNATIONAL COMPANIES ══════════════════
INTL = f"""
{page_hero("For International Companies", "Tunis · Tunisia · Belvédère", "Set Up Your Tunis Team With HIVE FIVE.", "A ready-to-use business environment for companies building remote or hybrid teams in Tunisia — without opening an office.")}
<section>
  <div class="container split">
    <div class="reveal">
      <span class="kicker">Why Tunisia</span>
      <h2>Talented. Fluent. Sixty Minutes Ahead of Paris.</h2>
      <p class="lead">Tunisia combines a highly skilled, French- and English-speaking workforce with European time zone alignment and highly competitive operating costs.</p>
      <ul class="checks">
        <li><svg class="icon"><use href="#i-check"/></svg> CET time zone — same working hours as Europe</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Bilingual teams: French &amp; English</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Strong pool of engineers, support &amp; business profiles</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Direct flights: Paris–Tunis in ~2h30</li>
      </ul>
    </div>
    <div class="split-media reveal" style="--d:.1s"><img src="images/bande.jpg" alt="Professional team collaborating at HIVE FIVE Tunis" loading="lazy"></div>
  </div>
</section>
<section class="soft">
  <div class="container split">
    <div class="split-media reveal"><img src="images/communaute.jpg" alt="HIVE FIVE business center Belvédère Tunis" loading="lazy"></div>
    <div class="reveal" style="--d:.1s">
      <span class="kicker">Why Belvédère · Why Hive Five</span>
      <h2>Central, Credible, Ready.</h2>
      <p class="lead">Belvédère is one of Tunis's most accessible business districts — and HIVE FIVE removes the entire setup burden.</p>
      <ul class="checks">
        <li><svg class="icon"><use href="#i-check"/></svg> 1,300 m² over 2 floors + 300 m² terrace</li>
        <li><svg class="icon"><use href="#i-check"/></svg> 200+ workstations · 23 private offices</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Dedicated 300 Mbps fiber, professional network</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Meeting &amp; training rooms, reception, cleaning, IT support</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Flexible contracts — scale from 5 to 50+ without moving</li>
      </ul>
      <div class="btn-row" style="margin-top:10px">
        <a href="index.html#contact" class="btn btn-brand">Start Your Tunis Project <svg class="icon"><use href="#i-arrow"/></svg></a>
        <a href="{WA_URL}" target="_blank" rel="noopener" class="btn btn-line">WhatsApp us</a>
      </div>
    </div>
  </div>
</section>
<section>
  <div class="container">
    <div class="center reveal">
      <span class="kicker">How it works</span>
      <h2>From First Call to First Working Day — in Days, Not Months.</h2>
    </div>
    <div class="why-grid" style="margin-top:52px">
      <div class="why reveal"><span class="num">01</span><h3>Tell us your needs</h3><p>Team size, roles, start date. We answer within 2 business hours with a tailored proposal.</p></div>
      <div class="why reveal" style="--d:.07s"><span class="num">02</span><h3>Visit — on site or on video</h3><p>Live in Tunis? Come see the space. Abroad? We do live video tours on WhatsApp.</p></div>
      <div class="why reveal" style="--d:.14s"><span class="num">03</span><h3>Move in &amp; start working</h3><p>Desks ready, badges assigned, network configured. Your team works from day one.</p></div>
    </div>
  </div>
</section>
<section style="padding-top:0">
  <div class="container">
    <div class="cta-final reveal">
      <div>
        <h2>Ready to Build Your Team in Tunis?</h2>
        <p>Talk to our business team — in English, French or German.</p>
        <div class="btn-row" style="justify-content:center">
          <a href="index.html#contact" class="btn btn-ink">Start Your Tunis Project <svg class="icon"><use href="#i-arrow"/></svg></a>
        </div>
      </div>
    </div>
  </div>
</section>
"""

# ══════════════════ ABOUT ══════════════════
ABOUT = f"""
{page_hero("About", "Our story", "Built for Businesses. Designed for People.", "HIVE FIVE is a professional environment designed so companies and professionals can work in the best conditions.")}
<section>
  <div class="container split">
    <div class="reveal">
      <span class="kicker">What we believe</span>
      <h2>Good Space Makes Good Work.</h2>
      <p class="lead">We built HIVE FIVE because businesses in Tunis — and teams joining from abroad — deserve better than a compromise between a noisy café and a rigid office lease.</p>
      <p style="color:var(--muted);font-size:15.5px;margin-top:16px">So we created a business center with international standards: real infrastructure, real flexibility, and a team that takes care of everything except your business.</p>
      <ul class="checks">
        <li><svg class="icon"><use href="#i-check"/></svg> Professional first — designed for companies</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Human always — you'll be greeted by name</li>
        <li><svg class="icon"><use href="#i-check"/></svg> Flexibility as a principle, not a slogan</li>
      </ul>
    </div>
    <div class="split-media reveal" style="--d:.1s"><img src="images/hero-arch.jpg" alt="Inside HIVE FIVE, Belvédère" loading="lazy"></div>
  </div>
</section>
<section class="dark">
  <div class="container stats-grid" style="grid-template-columns:repeat(4,1fr)">
    <div class="stat"><b><span data-count="1300">0</span><em>m²</em></b><span>workspace</span></div>
    <div class="stat"><b><span data-count="200">0</span><em>+</em></b><span>workstations</span></div>
    <div class="stat"><b><span data-count="23">0</span></b><span>private offices</span></div>
    <div class="stat"><b><span data-count="300">0</span><em>Mbps</em></b><span>dedicated fiber</span></div>
  </div>
</section>
<section>
  <div class="container">
    <div class="center reveal">
      <span class="kicker">Come see it</span>
      <h2>The Best Way to Know Us? A Free Visit.</h2>
      <p class="lead">Walk the floors, test the Wi-Fi, taste the coffee — then decide.</p>
    </div>
    <div class="center" style="margin-top:36px">
      <a href="index.html#contact" class="btn btn-brand reveal">Book a Visit <svg class="icon"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
</section>
"""

# ══════════════════ CONTACT PAGE ══════════════════
CONTACT = f"""
{page_hero("Contact", "Contact", "Talk to Us. We're Fast.", "Visit, call, WhatsApp or write — a human answers within 2 business hours.")}
<section class="soft" style="padding-top:70px">
  <div class="container contact-grid" style="margin-top:0">
    <div class="form-card reveal">
      <div id="leadWrap">
        <h3>Book a Visit / Get a Quote</h3>
        <p>We reply quickly — really.</p>
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
              <label for="f-people">Number of people</label>
              <select id="f-people" name="people">
                <option value="1">1–2</option><option value="5" selected>3–10</option>
                <option value="15">11–20</option><option value="30">21–30</option><option value="50">50+</option>
              </select>
            </div>
            <div class="f-group">
              <label for="f-service">Service required</label>
              <select id="f-service" name="service">
                <option>Private Office</option><option>Team Office</option><option>Coworking</option>
                <option>Training / Meeting Room</option><option>Business Address / Virtual Office</option>
                <option>Event Space</option><option>Visit — show me everything</option>
              </select>
            </div>
          </div>
          <div class="f-row">
            <div class="f-group"><label for="f-start">Expected start date</label><input id="f-start" name="start" type="date"></div>
            <div class="f-group"><label for="f-message">Message</label><input id="f-message" name="message" type="text" placeholder="Context, budget, questions…"></div>
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
        <div class="info-row"><div class="info-ic"><svg class="icon"><use href="#i-pin"/></svg></div><div><small>Address</small><p>HIVE FIVE<br>63 Rue de Khartoum, Lafayette – Belvédère, Tunis, Tunisia</p></div></div>
        <div class="info-row"><div class="info-ic"><svg class="icon"><use href="#i-phone"/></svg></div><div><small>Phone</small><a href="{TEL}">{PHONE}</a></div></div>
        <div class="info-row"><div class="info-ic"><svg class="icon"><use href="#i-wa"/></svg></div><div><small>WhatsApp</small><a href="{WA_URL}" target="_blank" rel="noopener">{PHONE}</a></div></div>
        <div class="info-row"><div class="info-ic"><svg class="icon"><use href="#i-mail"/></svg></div><div><small>Email</small><a href="mailto:{EMAIL}">{EMAIL}</a></div></div>
      </div>
      <div class="info-card">
        <div class="hours">
          <div><span>Monday – Friday</span><b>7:30 – 21:00</b></div>
          <div><span>Saturday</span><b>9:00 – 19:00</b></div>
          <div><span>Members (offices &amp; desks)</span><b style="color:var(--brand)">24/7</b></div>
        </div>
      </div>
      <div>
        <a class="map-frame" href="{DIR_URL}" target="_blank" rel="noopener" aria-label="Get directions to HIVE FIVE">
          <img src="images/carte.jpg" alt="Map — HIVE FIVE, 63 Rue de Khartoum, Lafayette, Tunis" loading="lazy">
        </a>
        <div class="map-links">
          <a class="map-link" href="{DIR_URL}" target="_blank" rel="noopener"><svg class="icon"><use href="#i-pin"/></svg> Get directions</a>
          <a class="map-link" href="{PLACE_URL}" target="_blank" rel="noopener"><svg class="icon"><use href="#i-globe"/></svg> Google Maps</a>
        </div>
      </div>
    </div>
  </div>
</section>
"""

# ══════════════════ BLOG ══════════════════
BLOG = f"""
{page_hero("Blog", "Insights", "Ideas for Growing Businesses.", "Flexible work, business in Tunisia, remote teams and more — a blog built for decision-makers.")}
<section>
  <div class="container">
    <div class="blog-grid">
      <div class="post reveal"><span class="cat">Business in Tunisia</span><h3>Why Companies Are Choosing Flexible Offices in Tunis</h3><p>Long leases vs agility: why more companies pick flexible workspace to enter the Tunisian market. <em>(Article coming soon)</em></p><span class="soon">Coming soon</span></div>
      <div class="post reveal" style="--d:.06s"><span class="cat">Remote Work</span><h3>How to Set Up a Remote Team in Tunisia</h3><p>Infrastructure, hiring, timezone and culture: the practical playbook for your first Tunisian team. <em>(Coming soon)</em></p><span class="soon">Coming soon</span></div>
      <div class="post reveal" style="--d:.12s"><span class="cat">Coworking</span><h3>Coworking vs Traditional Office in Tunis</h3><p>The honest cost and flexibility comparison, with real numbers from the Belvédère market. <em>(Coming soon)</em></p><span class="soon">Coming soon</span></div>
      <div class="post reveal"><span class="cat">Business in Tunisia</span><h3>Why Belvédère Is a Strategic Business Location in Tunis</h3><p>Central, accessible, credible: the district that makes sense for your office. <em>(Coming soon)</em></p><span class="soon">Coming soon</span></div>
      <div class="post reveal" style="--d:.06s"><span class="cat">Business Expansion</span><h3>How to Start a Business Team in Tunisia Without Renting a Traditional Office</h3><p>The plug-and-play route: from first employee to full team, without construction. <em>(Coming soon)</em></p><span class="soon">Coming soon</span></div>
      <div class="post reveal" style="--d:.12s"><span class="cat">AI &amp; Automation</span><h3>Hackathons &amp; AI Workshops at HIVE FIVE: What We Build Together</h3><p>Inside our monthly tech events — AI, robotics and code, open to the community. <em>(Coming soon)</em></p><span class="soon">Coming soon</span></div>
    </div>
  </div>
</section>
"""

open("services.html", "w", encoding="utf-8").write(page(
    "Business Services | HIVE FIVE — Business Center Tunis",
    "Private offices, coworking, team offices, meeting rooms, training rooms, virtual office and event space in Belvédère, Tunis.",
    "services.html", SERVICES, active="services"))

open("international-companies.html", "w", encoding="utf-8").write(page(
    "Office in Tunis for International Companies | HIVE FIVE",
    "Office rental & flexible workspace in Tunis for international companies. Remote team hub in Tunisia: ready-to-use offices, 300 Mbps fiber, meeting rooms, flexible terms.",
    "international-companies.html", INTL, active="intl"))

open("about.html", "w", encoding="utf-8").write(page(
    "About | HIVE FIVE — Business Center & Coworking Tunis",
    "HIVE FIVE: a professional work environment in Belvédère, Tunis, built for businesses and designed for people.",
    "about.html", ABOUT, active="about"))

open("contact.html", "w", encoding="utf-8").write(page(
    "Contact | HIVE FIVE — Business Center, Belvédère Tunis",
    "Contact HIVE FIVE: 63 Rue de Khartoum, Belvédère, Tunis. Phone, WhatsApp, email, directions and visit booking.",
    "contact.html", CONTACT, active="contact"))

open("blog.html", "w", encoding="utf-8").write(page(
    "Blog | HIVE FIVE — Business & Flexible Work in Tunis",
    "Insights on flexible offices, remote teams, coworking and doing business in Tunisia — by HIVE FIVE, Belvédère Tunis.",
    "blog.html", BLOG))

print("✓ 5 pages internes générées")
