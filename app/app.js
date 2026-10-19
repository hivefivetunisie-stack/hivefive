(() => {
  'use strict';

  const STORAGE_KEY = 'hive-five-proposal-v1';
  // À remplacer par l’URL /exec du déploiement Google Apps Script.
  const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbylYpQU9AJdQhnZzHqPfwlQXnzork1fCSstWgm4hCa1K-cvCbd_rlzpe6a9_DjmlO2H/exec';
  const BRAND = {
    orange: '#ff5738',
    orange2: '#ff8738',
    pale: '#fff0e9',
    ink: '#1c1d22',
    muted: '#727078',
    sand: '#f4f1ed',
    green: '#1f8b62'
  };

  const IMAGES = {
    logo: 'assets/logo-hive-five.png',
    logoWhite: 'assets/logo-lockup-white.png',
    logoOrange: 'assets/logo-lockup-orange.png',
    arabesque: 'assets/arabesque-hive-five.png',
    arabesqueWhite: 'assets/arabesque-hive-five-white.png',
    plan: 'assets/plan-3d.png',
    corridor: 'assets/couloir-lumineux.jpg',
    glass: 'assets/couloir-vitree.jpg',
    terrace: 'assets/terrasse-tunis.jpg',
    palms: 'assets/terrasse-palmiers.jpg',
    teamOffice: 'assets/bureau-equipe.jpg',
    openSpace: 'assets/bureau-open-space.jpg',
    meeting: 'assets/salle-reunion.jpg',
    community: 'assets/communaute-equipe.jpg',
    workshop: 'assets/atelier-participants.jpg',
    event: 'assets/evenement-audience.jpg',
    rooftopTeam: 'assets/communaute-terrasse.jpg',
    cover: 'assets/terrasse-coucher-soleil.jpg'
  };

  const SERVICE_CATALOG = [
    {
      id: 'coworking-flex', code: 'CF', name: 'Coworking flexible',
      tagline: 'Une place flexible, à la journée ou au mois',
      description: 'Accès open space, fibre, café, lounge et terrasse. Sans engagement.',
      priceHint: 'Dès 25 DT par jour', price: 250, quantity: 1, cycle: 'month', selected: false,
      color: '#ff5738', bg: '#fff0e9'
    },
    {
      id: 'dedicated-desk', code: 'PD', name: 'Poste dédié',
      tagline: 'Votre bureau attitré avec accès 24/7',
      description: 'Poste fixe, casier, adresse professionnelle et crédits de salle de réunion.',
      priceHint: 'Dès 390 DT par mois', price: 390, quantity: 1, cycle: 'month', selected: false,
      color: '#456fce', bg: '#eef3ff'
    },
    {
      id: 'private-office', code: 'BP', name: 'Bureau privé',
      tagline: 'Un bureau fermé, meublé et sécurisé',
      description: 'Pour 1 à 20 personnes, mobilier, accès 24/7 et services professionnels inclus.',
      priceHint: 'Dès 290 DT par poste', price: 290, quantity: 2, cycle: 'month', selected: false,
      color: '#9a58b3', bg: '#f7effa'
    },
    {
      id: 'team-office', code: 'BE', name: 'Espace équipe',
      tagline: 'Une solution prête pour 5 à 50+ personnes',
      description: 'Postes, internet, électricité, entretien et accès aux réunions inclus.',
      priceHint: 'Dès 290 DT par poste', price: 290, quantity: 5, cycle: 'month', selected: true,
      color: '#1f8b62', bg: '#eaf7f1'
    },
    {
      id: 'meeting-room', code: 'SR', name: 'Salle de réunion',
      tagline: 'Une salle professionnelle à l’heure ou la journée',
      description: 'Écran, tableau blanc, visioconférence et accueil de vos invités.',
      priceHint: 'Tarif modulable', price: 150, quantity: 1, cycle: 'day', selected: false,
      color: '#d08a20', bg: '#fff7e7'
    },
    {
      id: 'training-room', code: 'SF', name: 'Salle de formation',
      tagline: 'Formations, ateliers et académies',
      description: 'Configuration modulable, écran, tableau blanc et café sur demande.',
      priceHint: 'Dès 150 DT par jour', price: 150, quantity: 1, cycle: 'day', selected: false,
      color: '#d84c72', bg: '#fff0f4'
    },
    {
      id: 'virtual-office', code: 'AD', name: 'Adresse professionnelle',
      tagline: 'Domiciliation et présence professionnelle',
      description: 'Adresse d’affaires, réception du courrier et options de permanence.',
      priceHint: 'Sur devis', price: 0, quantity: 1, cycle: 'month', selected: false,
      color: '#526071', bg: '#eef1f4'
    },
    {
      id: 'event-space', code: 'EV', name: 'Espace événement',
      tagline: 'Conférences, talks, démos et rencontres',
      description: 'Configuration adaptée, réception, matériel et catering sur demande.',
      priceHint: 'Sur devis', price: 0, quantity: 1, cycle: 'day', selected: false,
      color: '#7b5d3d', bg: '#f5efe9'
    }
  ];

  const CYCLE_LABELS = {
    month: 'mois',
    day: 'jour',
    hour: 'heure',
    package: 'forfait'
  };

  function localISODate(date = new Date()) {
    const shifted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return shifted.toISOString().slice(0, 10);
  }

  function proposalNumber() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `HF-${y}${m}${day}-01`;
  }

  function invoiceNumber() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `FACT-${y}${m}${day}-01`;
  }

  function cashReceiptNumber() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `DEC-${y}${m}${day}-01`;
  }

  function createRecordId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `hf-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function defaultState() {
    return {
      client: {
        type: 'company', company: '', name: '', role: '', email: '', phone: '', address: ''
      },
      meta: {
        recordId: createRecordId(),
        number: proposalNumber(), date: localISODate(), validityDays: 15,
        startDate: '', durationMonths: 3, discountRate: 0, taxRate: 19,
        showPricing: true
      },
      content: {
        introMessage: 'Nous avons imaginé une solution de travail flexible, professionnelle et immédiatement opérationnelle, adaptée à votre équipe et à vos objectifs.',
        commercialTerms: 'Tarifs exprimés en dinars tunisiens.\nLa proposition reste soumise à la disponibilité des espaces.\nUn dépôt de garantie peut être demandé selon la formule retenue.\nLa configuration finale est confirmée après visite ou échange avec notre équipe.',
        clientNote: '',
        includePresentation: true,
        includeCatalog: true,
        includeBenefits: true
      },
      services: SERVICE_CATALOG.map(item => ({ ...item })),
      invoice: {
        imported: false,
        issuer: {
          name: 'OTELCO', tradeName: 'HIVE FIVE', legalForm: '',
          taxId: '1528525 S/A/M/000', rne: '',
          address: '63 Rue Khartoum, Belvédère 1002, Tunis',
          phone: '+216 57 010 915', email: 'hivefivetunisie@gmail.com', bank: '',
          rib: '25185000000147221579'
        },
        number: invoiceNumber(), date: localISODate(), dueDate: addDays(localISODate(), 15),
        paymentMethod: 'Virement bancaire', subject: '',
        client: { name: '', taxId: '', email: '', address: '' },
        items: [{ id: createRecordId(), description: 'Prestation Hive Five', quantity: 1, unitPrice: 0 }],
        discountRate: 0, taxRate: 19,
        notes: 'Paiement à l’échéance indiquée. Merci de rappeler le numéro de facture lors du règlement.'
      },
      cash: {
        imported: false,
        number: cashReceiptNumber(), date: localISODate(), place: 'Tunis',
        payerName: '', payerId: '', invoiceReference: '', amount: 0, currency: 'TND',
        amountWords: '', reason: '', receivedBy: '', recipientRole: '', notes: ''
      }
    };
  }

  function mergeState(saved) {
    const base = defaultState();
    if (!saved || typeof saved !== 'object') return base;
    const merged = {
      ...base,
      ...saved,
      client: { ...base.client, ...(saved.client || {}) },
      meta: { ...base.meta, ...(saved.meta || {}) },
      content: { ...base.content, ...(saved.content || {}) },
      services: base.services.map(service => {
        const previous = Array.isArray(saved.services)
          ? saved.services.find(item => item.id === service.id)
          : null;
        return { ...service, ...(previous || {}) };
      }),
      invoice: {
        ...base.invoice,
        ...(saved.invoice || {}),
        issuer: { ...base.invoice.issuer, ...(saved.invoice?.issuer || {}) },
        client: { ...base.invoice.client, ...(saved.invoice?.client || {}) },
        items: Array.isArray(saved.invoice?.items) && saved.invoice.items.length
          ? saved.invoice.items.map(item => ({ id: item.id || createRecordId(), description: '', quantity: 1, unitPrice: 0, ...item }))
          : base.invoice.items
      },
      cash: { ...base.cash, ...(saved.cash || {}) }
    };

    // Migration des brouillons créés avant la communication des mentions légales.
    const previousIssuer = saved.invoice?.issuer || {};
    const legacyIssuer = !previousIssuer.tradeName
      && !String(previousIssuer.taxId || '').trim()
      && (!String(previousIssuer.name || '').trim() || /^hive\s*five$/i.test(previousIssuer.name));
    if (legacyIssuer) merged.invoice.issuer = { ...base.invoice.issuer };
    if (!String(merged.invoice.issuer.tradeName || '').trim()) merged.invoice.issuer.tradeName = 'HIVE FIVE';
    return merged;
  }

  function loadState() {
    try {
      return mergeState(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } catch (_) {
      return defaultState();
    }
  }

  let state = loadState();
  let currentMode = 'proposal';
  let saveTimer = null;
  let toastTimer = null;

  const FIELD_BINDINGS = {
    clientCompany: ['client', 'company'],
    clientName: ['client', 'name'],
    clientRole: ['client', 'role'],
    clientEmail: ['client', 'email'],
    clientPhone: ['client', 'phone'],
    clientAddress: ['client', 'address'],
    proposalNumber: ['meta', 'number'],
    proposalDate: ['meta', 'date'],
    validityDays: ['meta', 'validityDays'],
    startDate: ['meta', 'startDate'],
    durationMonths: ['meta', 'durationMonths'],
    discountRate: ['meta', 'discountRate'],
    taxRate: ['meta', 'taxRate'],
    showPricing: ['meta', 'showPricing'],
    introMessage: ['content', 'introMessage'],
    commercialTerms: ['content', 'commercialTerms'],
    clientNote: ['content', 'clientNote'],
    includePresentation: ['content', 'includePresentation'],
    includeCatalog: ['content', 'includeCatalog'],
    includeBenefits: ['content', 'includeBenefits']
  };

  const NUMERIC_FIELDS = new Set(['validityDays', 'durationMonths', 'discountRate', 'taxRate']);
  const CHECKBOX_FIELDS = new Set(['showPricing', 'includePresentation', 'includeCatalog', 'includeBenefits']);

  const DOCUMENT_FIELD_BINDINGS = {
    invoiceIssuerName: ['invoice', 'issuer', 'name'],
    invoiceIssuerTradeName: ['invoice', 'issuer', 'tradeName'],
    invoiceIssuerLegalForm: ['invoice', 'issuer', 'legalForm'],
    invoiceIssuerTaxId: ['invoice', 'issuer', 'taxId'],
    invoiceIssuerRne: ['invoice', 'issuer', 'rne'],
    invoiceIssuerPhone: ['invoice', 'issuer', 'phone'],
    invoiceIssuerAddress: ['invoice', 'issuer', 'address'],
    invoiceIssuerEmail: ['invoice', 'issuer', 'email'],
    invoiceIssuerBank: ['invoice', 'issuer', 'bank'],
    invoiceIssuerRib: ['invoice', 'issuer', 'rib'],
    invoiceNumber: ['invoice', 'number'],
    invoiceDate: ['invoice', 'date'],
    invoiceDueDate: ['invoice', 'dueDate'],
    invoicePaymentMethod: ['invoice', 'paymentMethod'],
    invoiceClientName: ['invoice', 'client', 'name'],
    invoiceClientTaxId: ['invoice', 'client', 'taxId'],
    invoiceClientEmail: ['invoice', 'client', 'email'],
    invoiceClientAddress: ['invoice', 'client', 'address'],
    invoiceDiscountRate: ['invoice', 'discountRate'],
    invoiceTaxRate: ['invoice', 'taxRate'],
    invoiceSubject: ['invoice', 'subject'],
    invoiceNotes: ['invoice', 'notes'],
    cashNumber: ['cash', 'number'],
    cashDate: ['cash', 'date'],
    cashPlace: ['cash', 'place'],
    cashPayerName: ['cash', 'payerName'],
    cashPayerId: ['cash', 'payerId'],
    cashInvoiceReference: ['cash', 'invoiceReference'],
    cashAmount: ['cash', 'amount'],
    cashCurrency: ['cash', 'currency'],
    cashAmountWords: ['cash', 'amountWords'],
    cashReason: ['cash', 'reason'],
    cashReceivedBy: ['cash', 'receivedBy'],
    cashRecipientRole: ['cash', 'recipientRole'],
    cashNotes: ['cash', 'notes']
  };

  const DOCUMENT_NUMERIC_FIELDS = new Set(['invoiceDiscountRate', 'invoiceTaxRate', 'cashAmount']);

  function escapeHTML(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function trimText(value, max = 160) {
    const text = String(value || '').trim();
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  }

  function formatDate(value) {
    if (!value) return 'À confirmer';
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return value;
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
      .format(new Date(year, month - 1, day));
  }

  function addDays(value, days) {
    if (!value) return '';
    const [year, month, day] = value.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    d.setDate(d.getDate() + Number(days || 0));
    return localISODate(d);
  }

  function formatMoney(value) {
    const number = Number(value || 0);
    return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(number)} DT`;
  }

  function formatCurrency(value, currency = 'TND') {
    const number = Number(value || 0);
    const suffix = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : 'DT';
    return `${new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(number)} ${suffix}`;
  }

  function integerToFrench(number) {
    const n = Math.max(0, Math.floor(Number(number || 0)));
    if (n === 0) return 'zéro';
    const units = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
    const underHundred = value => {
      if (value <= 16) return units[value];
      if (value < 20) return `dix-${units[value - 10]}`;
      if (value < 70) {
        const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];
        const ten = Math.floor(value / 10);
        const unit = value % 10;
        return tens[ten] + (unit === 1 ? ' et un' : unit ? `-${units[unit]}` : '');
      }
      if (value < 80) return value === 71 ? 'soixante et onze' : `soixante-${underHundred(value - 60)}`;
      if (value === 80) return 'quatre-vingts';
      return `quatre-vingt-${underHundred(value - 80)}`;
    };
    const underThousand = value => {
      if (value < 100) return underHundred(value);
      const hundreds = Math.floor(value / 100);
      const rest = value % 100;
      const prefix = hundreds === 1 ? 'cent' : `${units[hundreds]} cent${rest === 0 ? 's' : ''}`;
      return rest ? `${prefix} ${underHundred(rest)}` : prefix;
    };
    const chunks = [];
    const billion = Math.floor(n / 1000000000);
    const million = Math.floor((n % 1000000000) / 1000000);
    const thousand = Math.floor((n % 1000000) / 1000);
    const rest = n % 1000;
    if (billion) chunks.push(billion === 1 ? 'un milliard' : `${underThousand(billion)} milliards`);
    if (million) chunks.push(million === 1 ? 'un million' : `${underThousand(million)} millions`);
    if (thousand) chunks.push(thousand === 1 ? 'mille' : `${underThousand(thousand)} mille`);
    if (rest) chunks.push(underThousand(rest));
    return chunks.join(' ');
  }

  function amountInWords(value, currency = 'TND') {
    const amount = Math.max(0, Number(value || 0));
    const totalMilliunits = Math.round(amount * 1000);
    const whole = Math.floor(totalMilliunits / 1000);
    const fraction = totalMilliunits % 1000;
    const currencyNames = currency === 'EUR'
      ? ['euro', 'euros', 'millième', 'millièmes']
      : currency === 'USD'
        ? ['dollar', 'dollars', 'millième', 'millièmes']
        : ['dinar tunisien', 'dinars tunisiens', 'millime', 'millimes'];
    const wholeLabel = whole === 1 ? currencyNames[0] : currencyNames[1];
    const fractionText = fraction
      ? ` et ${integerToFrench(fraction)} ${fraction === 1 ? currencyNames[2] : currencyNames[3]}`
      : '';
    const phrase = `${integerToFrench(whole)} ${wholeLabel}${fractionText}`;
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
  }

  function getNestedValue(path) {
    return path.reduce((value, key) => value?.[key], state);
  }

  function setNestedValue(path, value) {
    const key = path[path.length - 1];
    const target = path.slice(0, -1).reduce((object, item) => object[item], state);
    target[key] = value;
  }

  function invoiceTotals() {
    const subtotal = state.invoice.items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0), 0);
    const discount = subtotal * (Number(state.invoice.discountRate || 0) / 100);
    const net = subtotal - discount;
    const tax = net * (Number(state.invoice.taxRate || 0) / 100);
    return { subtotal, discount, net, tax, total: net + tax };
  }

  function selectedServices() {
    return state.services.filter(service => service.selected);
  }

  function clientMainName() {
    return state.client.company || (state.client.type === 'individual' ? 'Votre nom' : 'Votre entreprise');
  }

  function clientSecondaryLine() {
    if (state.client.type === 'individual') return state.client.role || 'Personne physique';
    return state.client.name || 'Proposition personnalisée';
  }

  function lineTotal(service) {
    const durationFactor = service.cycle === 'month' ? Math.max(1, Number(state.meta.durationMonths || 1)) : 1;
    return Number(service.quantity || 0) * Number(service.price || 0) * durationFactor;
  }

  function totals() {
    const subtotal = selectedServices().reduce((sum, service) => sum + lineTotal(service), 0);
    const discount = subtotal * (Number(state.meta.discountRate || 0) / 100);
    const net = subtotal - discount;
    const tax = net * (Number(state.meta.taxRate || 0) / 100);
    return { subtotal, discount, net, tax, total: net + tax };
  }

  function saveState(showMessage = false) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const status = document.getElementById('saveStatus');
      if (status) status.textContent = 'Enregistré localement';
      if (showMessage) showToast('Brouillon enregistré sur cet appareil.');
    } catch (_) {
      showToast('Impossible d’enregistrer le brouillon.', true);
    }
  }

  function buildLeadPayload() {
    const calculatedTotals = totals();
    const services = state.services.map(service => ({
      id: service.id,
      code: service.code,
      name: service.name,
      tagline: service.tagline,
      description: service.description,
      selected: Boolean(service.selected),
      quantity: Number(service.quantity || 0),
      unitPrice: Number(service.price || 0),
      billingCycle: service.cycle,
      billingLabel: CYCLE_LABELS[service.cycle] || service.cycle,
      lineTotal: service.selected ? lineTotal(service) : 0
    }));
    return {
      schemaVersion: '1.0',
      source: 'Application propositions Hive Five',
      submittedAt: new Date().toISOString(),
      recordId: state.meta.recordId,
      client: { ...state.client },
      proposal: { ...state.meta },
      content: { ...state.content },
      services: services.filter(service => service.selected),
      allServices: services,
      totals: { ...calculatedTotals }
    };
  }

  async function saveToGoogleSheets() {
    saveState(false);
    const primaryName = String(state.client.company || '').trim();
    if (!primaryName) {
      activateTab('client');
      document.getElementById('clientCompany')?.focus();
      showToast(state.client.type === 'individual'
        ? 'Renseignez le nom et prénom du client.'
        : 'Renseignez le nom de l’entreprise.', true);
      return;
    }
    if (!GOOGLE_SHEETS_WEB_APP_URL) {
      showToast('Google Sheets n’est pas encore configuré : ajoutez l’URL Apps Script.', true);
      return;
    }

    const button = document.getElementById('saveButton');
    const originalHTML = button?.innerHTML || '';
    if (button) {
      button.disabled = true;
      button.textContent = 'Envoi vers Sheets…';
    }
    const status = document.getElementById('saveStatus');
    if (status) status.textContent = 'Envoi vers Google Sheets…';

    try {
      await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-store',
        credentials: 'omit',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(buildLeadPayload())
      });
      if (status) status.textContent = 'Synchronisé avec Google Sheets';
      showToast('Les données du client ont été envoyées à Google Sheets.');
    } catch (error) {
      console.error(error);
      if (status) status.textContent = 'Enregistré localement · erreur Sheets';
      showToast('Enregistré localement, mais l’envoi vers Google Sheets a échoué.', true);
    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = originalHTML;
      }
    }
  }

  function queueSave() {
    const status = document.getElementById('saveStatus');
    if (status) status.textContent = 'Modifications en cours…';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveState(false), 450);
  }

  function showToast(message, error = false) {
    const toast = document.getElementById('toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.toggle('error', error);
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function bindStateToFields() {
    Object.entries(FIELD_BINDINGS).forEach(([id, path]) => {
      const element = document.getElementById(id);
      if (!element) return;
      const value = state[path[0]][path[1]];
      if (CHECKBOX_FIELDS.has(id)) element.checked = Boolean(value);
      else element.value = value ?? '';
    });
    bindDocumentFields();
    updateClientTypeUI();
  }

  function bindDocumentFields() {
    Object.entries(DOCUMENT_FIELD_BINDINGS).forEach(([id, path]) => {
      const element = document.getElementById(id);
      if (!element) return;
      element.value = getNestedValue(path) ?? '';
    });
    renderInvoiceItemsEditor();
    updateInvoiceLiveTotal();
  }

  function updateClientTypeUI() {
    const individual = state.client.type === 'individual';
    document.querySelectorAll('[data-client-type]').forEach(button => {
      button.classList.toggle('active', button.dataset.clientType === state.client.type);
    });
    const primaryLabel = document.getElementById('clientPrimaryLabel');
    const primaryInput = document.getElementById('clientCompany');
    const nameField = document.getElementById('clientNameField');
    const roleField = document.getElementById('clientRoleField');
    const roleLabel = document.getElementById('clientRoleLabel');
    if (primaryLabel) primaryLabel.textContent = individual ? 'Nom et prénom *' : 'Entreprise *';
    if (primaryInput) {
      primaryInput.placeholder = individual ? 'Ex. Amine Ben Salah' : 'Ex. Studio Atlas';
      primaryInput.autocomplete = individual ? 'name' : 'organization';
    }
    if (nameField) nameField.classList.toggle('is-hidden', individual);
    if (roleField) roleField.classList.toggle('full', individual);
    if (roleLabel) roleLabel.textContent = individual ? 'Profession / activité' : 'Fonction';
    const roleInput = document.getElementById('clientRole');
    if (roleInput) roleInput.placeholder = individual ? 'Ex. Consultant indépendant' : 'Ex. Directrice RH';
  }

  function setClientType(type) {
    state.client.type = type === 'individual' ? 'individual' : 'company';
    updateClientTypeUI();
    renderPreview();
    queueSave();
  }

  function renderServices() {
    const list = document.getElementById('servicesList');
    list.innerHTML = state.services.map(service => `
      <article class="service-editor ${service.selected ? 'active' : ''}" data-service-card="${service.id}" style="--service-color:${service.color};--service-bg:${service.bg}">
        <div class="service-main">
          <label class="service-check" aria-label="Inclure ${escapeHTML(service.name)}">
            <input type="checkbox" data-service-action="selected" data-service-id="${service.id}" ${service.selected ? 'checked' : ''} />
            <i></i>
          </label>
          <span class="service-icon">${escapeHTML(service.code)}</span>
          <span class="service-copy"><b>${escapeHTML(service.name)}</b><small>${escapeHTML(service.tagline)}</small></span>
          <span class="service-price-hint">${escapeHTML(service.priceHint)}</span>
        </div>
        <div class="service-fields">
          <label class="field"><span>Quantité</span><input type="number" min="0" step="1" data-service-action="quantity" data-service-id="${service.id}" value="${Number(service.quantity || 0)}" /></label>
          <label class="field"><span>Prix unitaire (DT)</span><input type="number" min="0" step="1" data-service-action="price" data-service-id="${service.id}" value="${Number(service.price || 0)}" /></label>
          <label class="field"><span>Facturation</span><select data-service-action="cycle" data-service-id="${service.id}">
            ${Object.entries(CYCLE_LABELS).map(([value, label]) => `<option value="${value}" ${service.cycle === value ? 'selected' : ''}>Par ${label}</option>`).join('')}
          </select></label>
        </div>
      </article>
    `).join('');
  }

  function activateTab(name) {
    document.querySelectorAll('.step-tab').forEach(button => button.classList.toggle('active', button.dataset.tab === name));
    document.querySelectorAll('.tab-content').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === name));
    if (window.innerWidth < 861) document.querySelector('.editor-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateSummary() {
    const count = selectedServices().length;
    const countNode = document.getElementById('selectedCount');
    if (countNode) countNode.textContent = `${count} sélectionné${count > 1 ? 's' : ''}`;
    const totalNode = document.querySelector('#liveTotal strong');
    if (totalNode) totalNode.textContent = state.meta.showPricing ? formatMoney(totals().total) : 'Sur devis';
  }

  function previewFooter(page, total, dark = false) {
    return `<span class="preview-footer">Hive Five · Business Center & Coworking</span>`;
  }

  function renderCoverPage(page, total) {
    const company = clientMainName();
    const contact = clientSecondaryLine();
    return `
      <article class="pdf-page cover-page" data-page="${page}/${total}">
        <div class="cover-orange">
          <div class="cover-top">
            <span class="cover-logo-halo"><img class="cover-wordmark" src="${IMAGES.logoWhite}" alt="Hive Five Coworking" /></span>
          </div>
          <div class="cover-type">Proposition commerciale</div>
          <h1>Votre espace.<br />Votre équipe.<br />Votre élan.</h1>
          <p class="cover-subtitle">Une solution de travail flexible au cœur de Tunis, prête à accueillir vos ambitions.</p>
          <div class="cover-client">
            <span>Préparée pour</span>
            <strong>${escapeHTML(company)}</strong>
            <small>${escapeHTML(contact)}</small>
          </div>
          <div class="cover-ref">${escapeHTML(state.meta.number)} · ${escapeHTML(formatDate(state.meta.date))}</div>
        </div>
        <div class="cover-photo">
          <img src="${IMAGES.cover}" alt="Terrasse Hive Five au coucher du soleil" />
          <div class="cover-photo-label">Belvédère · Tunis<br />1 300 m² pour travailler autrement</div>
        </div>
      </article>`;
  }

  function renderPresentationPage(page, total) {
    return `
      <article class="pdf-page" data-page="${page}/${total}">
        <div class="page-inner">
          <div class="page-topline"><span class="page-label">Bienvenue</span><img class="page-brand-logo" src="${IMAGES.logoOrange}" alt="" /></div>
          <h2 class="page-title">Plus qu’un coworking.<br />Un cadre pour avancer.</h2>
          <p class="page-lead">Hive Five est un environnement professionnel pensé pour les entreprises, les équipes et les talents qui veulent se concentrer sur l’essentiel.</p>
          <div class="intro-stats">
            <div class="intro-stat"><b>1 300</b><span>m² d’espaces professionnels</span></div>
            <div class="intro-stat"><b>200+</b><span>postes de travail</span></div>
            <div class="intro-stat"><b>23</b><span>bureaux privés</span></div>
            <div class="intro-stat"><b>300</b><span>Mbps de fibre dédiée</span></div>
          </div>
          <div class="intro-collage">
            <img class="intro-main-photo" src="${IMAGES.corridor}" alt="Espaces lumineux" />
            <div class="intro-note">2 étages, un open space de 250 m² et une terrasse rooftop de 300 m².</div>
            <img class="intro-side-photo" src="${IMAGES.palms}" alt="Terrasse rooftop" />
            <i class="intro-dot"></i>
          </div>
        </div>
        ${previewFooter(page, total)}
      </article>`;
  }

  function renderCatalogPage(page, total) {
    return `
      <article class="pdf-page" data-page="${page}/${total}">
        <div class="page-inner">
          <div class="page-topline"><span class="page-label">Nos solutions</span><img class="page-brand-logo" src="${IMAGES.logoOrange}" alt="" /></div>
          <h2 class="page-title">Une formule pour chaque<br />façon de travailler.</h2>
          <div class="catalog-hero">
            <img src="${IMAGES.community}" alt="Communauté Hive Five" />
            <div class="catalog-hero-copy"><b>Du poste nomade à l’espace d’équipe complet.</b><span>Des formats flexibles, équipés et immédiatement opérationnels.</span></div>
          </div>
          <div class="catalog-grid">
            ${state.services.map(service => `
              <div class="catalog-card ${service.selected ? 'selected' : ''}">
                <span class="catalog-icon">${escapeHTML(service.code)}</span>
                <div><b>${escapeHTML(service.name)}</b><p>${escapeHTML(service.description)}</p></div>
              </div>
            `).join('')}
          </div>
        </div>
        ${previewFooter(page, total)}
      </article>`;
  }

  function renderOfferPage(page, total) {
    const services = selectedServices();
    const amount = totals();
    const intro = trimText(state.content.introMessage, 290) || 'Une configuration sur mesure, à préciser avec notre équipe commerciale.';
    return `
      <article class="pdf-page offer-page" data-page="${page}/${total}">
        <div class="page-inner">
          <div class="page-topline"><span class="page-label">Votre proposition</span><img class="page-brand-logo" src="${IMAGES.logoOrange}" alt="" /></div>
          <h2 class="page-title">La solution pensée pour<br />${escapeHTML(clientMainName())}.</h2>
          <div class="offer-greeting">${escapeHTML(intro)}</div>
          <div class="offer-chips">
            <span class="offer-chip">Début : ${escapeHTML(formatDate(state.meta.startDate))}</span>
            <span class="offer-chip">Durée : ${Number(state.meta.durationMonths || 1)} mois</span>
            <span class="offer-chip">Validité : ${Number(state.meta.validityDays || 15)} jours</span>
          </div>
          ${services.length ? `
            <table class="quote-table">
              <thead><tr><th>Solution</th><th>Qté</th><th>Unité</th><th>Total HT</th></tr></thead>
              <tbody>${services.map(service => `
                <tr><td><b>${escapeHTML(service.name)}</b><small>${escapeHTML(service.tagline)}</small></td><td>${Number(service.quantity || 0)}</td><td>${escapeHTML(CYCLE_LABELS[service.cycle] || service.cycle)}</td><td>${state.meta.showPricing ? (Number(service.price || 0) ? escapeHTML(formatMoney(lineTotal(service))) : 'Sur devis') : 'Sur devis'}</td></tr>
              `).join('')}</tbody>
            </table>` : `<div class="no-services">Les services seront définis lors de votre échange avec l’équipe Hive Five.</div>`}
          <div class="offer-bottom">
            <div class="offer-terms"><b>Conditions principales</b><p>${escapeHTML(trimText(state.content.commercialTerms, 520))}${state.content.clientNote ? `\n\nPrécision : ${escapeHTML(trimText(state.content.clientNote, 180))}` : ''}</p></div>
            <div class="total-card">
              <span>${state.meta.showPricing ? 'Total estimatif TTC' : 'Configuration tarifaire'}</span>
              <strong>${state.meta.showPricing ? escapeHTML(formatMoney(amount.total)) : 'Sur devis'}</strong>
              <small>${state.meta.showPricing ? `HT ${escapeHTML(formatMoney(amount.net))} · TVA ${Number(state.meta.taxRate || 0)}%` : 'Une offre chiffrée sera confirmée après validation des besoins.'}</small>
            </div>
          </div>
        </div>
        ${previewFooter(page, total)}
      </article>`;
  }

  const BENEFITS = [
    ['Prêt à l’emploi', 'Mobilier et infrastructure disponibles immédiatement.'],
    ['Flexible', 'Une capacité qui évolue avec votre équipe.'],
    ['Ultra-connecté', 'Fibre dédiée 300 Mbps et lien de secours 4G/5G.'],
    ['Professionnel', 'Réception, salles et cadre valorisant pour vos clients.'],
    ['Central', 'Belvédère, à quelques minutes du centre de Tunis.'],
    ['Sans friction', 'Entretien, électricité et support déjà organisés.']
  ];

  function renderBenefitsPage(page, total) {
    return `
      <article class="pdf-page" data-page="${page}/${total}">
        <div class="page-inner">
          <div class="page-topline"><span class="page-label">Pourquoi Hive Five</span><img class="page-brand-logo" src="${IMAGES.logoOrange}" alt="" /></div>
          <h2 class="page-title">Vous vous concentrez sur<br />votre activité. Nous gérons le reste.</h2>
          <div class="benefits-layout">
            <div class="benefits-photo-wrap"><img class="benefits-photo" src="${IMAGES.openSpace}" alt="Open space Hive Five" /><span class="benefit-seal">24/7<br />selon<br />formule</span></div>
            <div class="benefits-list">
              ${BENEFITS.map((item, index) => `<div class="benefit-row"><span class="benefit-number">0${index + 1}</span><div><b>${item[0]}</b><span>${item[1]}</span></div></div>`).join('')}
            </div>
          </div>
          <div class="included-bar"><b>Toujours à portée :</b><span>terrasse rooftop · lounge · café · espaces de réunion · communauté</span></div>
        </div>
        ${previewFooter(page, total)}
      </article>`;
  }

  function renderContactPage(page, total) {
    const validityDate = addDays(state.meta.date, state.meta.validityDays);
    return `
      <article class="pdf-page contact-page" data-page="${page}/${total}">
        <div class="contact-photo"><img src="${IMAGES.palms}" alt="Terrasse végétalisée Hive Five" /><span class="contact-logo-halo"><img class="contact-wordmark" src="${IMAGES.logoWhite}" alt="Hive Five Coworking" /></span></div>
        <div class="contact-body">
          <span class="contact-kicker">La prochaine étape</span>
          <h2>Venez découvrir<br />votre futur espace.</h2>
          <p>Une visite suffit pour vous projeter. Notre équipe vous répond rapidement et adapte la configuration à vos besoins.</p>
          <div class="contact-grid">
            <div class="contact-item"><span>Nous appeler</span><b>+216 57 010 915</b></div>
            <div class="contact-item"><span>Nous écrire</span><b>Hivefivetunisie<br />@gmail.com</b></div>
            <div class="contact-item"><span>Nous trouver</span><b>63 Rue de Khartoum<br />Belvédère, Tunis</b></div>
          </div>
          <div class="contact-validity">hivefivecoworking.com · Proposition ${escapeHTML(state.meta.number)}${validityDate ? ` valable jusqu’au ${escapeHTML(formatDate(validityDate))}` : ''}</div>
        </div>
        ${previewFooter(page, total, true)}
      </article>`;
  }

  function pageDefinitions() {
    const pages = [renderCoverPage];
    if (state.content.includePresentation) pages.push(renderPresentationPage);
    if (state.content.includeCatalog) pages.push(renderCatalogPage);
    pages.push(renderOfferPage);
    if (state.content.includeBenefits) pages.push(renderBenefitsPage);
    pages.push(renderContactPage);
    return pages;
  }

  function renderPreview() {
    if (currentMode === 'invoice') {
      renderInvoicePreview();
      return;
    }
    if (currentMode === 'cash') {
      renderCashPreview();
      return;
    }
    const definitions = pageDefinitions();
    const total = definitions.length;
    document.getElementById('documentPreview').innerHTML = definitions.map((render, index) => render(index + 1, total)).join('');
    document.getElementById('pageCount').textContent = `${total} page${total > 1 ? 's' : ''}`;
    updateSummary();
  }

  function handleFieldInput(event) {
    const target = event.target;
    const path = FIELD_BINDINGS[target.id];
    if (!path) return;
    let value;
    if (CHECKBOX_FIELDS.has(target.id)) value = target.checked;
    else if (NUMERIC_FIELDS.has(target.id)) value = Number(target.value || 0);
    else value = target.value;
    state[path[0]][path[1]] = value;
    renderPreview();
    queueSave();
  }

  function handleServiceInput(event) {
    const target = event.target.closest('[data-service-action]');
    if (!target) return;
    const service = state.services.find(item => item.id === target.dataset.serviceId);
    if (!service) return;
    const action = target.dataset.serviceAction;
    if (action === 'selected') {
      service.selected = target.checked;
      target.closest('.service-editor')?.classList.toggle('active', service.selected);
    } else if (action === 'cycle') {
      service.cycle = target.value;
    } else {
      service[action] = Number(target.value || 0);
    }
    renderPreview();
    queueSave();
  }

  // ---- Facture et décharge : état, formulaires et aperçus -----------------
  function documentValue(value, fallback = 'À compléter') {
    const text = String(value ?? '').trim();
    return text || fallback;
  }

  function renderInvoiceItemsEditor() {
    const list = document.getElementById('invoiceItemsList');
    if (!list) return;
    list.innerHTML = state.invoice.items.map((item, index) => `
      <div class="invoice-item-editor" data-invoice-item="${escapeHTML(item.id)}">
        <label class="field"><span>Désignation ${index + 1}</span><input value="${escapeHTML(item.description)}" data-invoice-item-action="description" /></label>
        <label class="field"><span>Quantité</span><input type="number" min="0" step="0.01" value="${Number(item.quantity || 0)}" data-invoice-item-action="quantity" /></label>
        <label class="field"><span>Prix HT (DT)</span><input type="number" min="0" step="0.001" value="${Number(item.unitPrice || 0)}" data-invoice-item-action="unitPrice" /></label>
        <button type="button" class="remove-invoice-item" data-remove-invoice-item aria-label="Supprimer cette ligne">×</button>
      </div>
    `).join('');
  }

  function updateInvoiceLiveTotal() {
    const node = document.querySelector('#invoiceLiveTotal strong');
    if (node) node.textContent = formatCurrency(invoiceTotals().total);
  }

  function handleDocumentFieldInput(event) {
    const path = DOCUMENT_FIELD_BINDINGS[event.target.id];
    if (!path) return;
    const value = DOCUMENT_NUMERIC_FIELDS.has(event.target.id)
      ? Number(event.target.value || 0)
      : event.target.value;
    setNestedValue(path, value);
    if (event.target.id === 'cashAmount' || event.target.id === 'cashCurrency') {
      state.cash.amountWords = amountInWords(state.cash.amount, state.cash.currency);
      const wordsField = document.getElementById('cashAmountWords');
      if (wordsField) wordsField.value = state.cash.amountWords;
    }
    updateInvoiceLiveTotal();
    renderPreview();
    queueSave();
  }

  function handleInvoiceItemInput(event) {
    const actionNode = event.target.closest('[data-invoice-item-action]');
    if (!actionNode) return;
    const row = actionNode.closest('[data-invoice-item]');
    const item = state.invoice.items.find(entry => entry.id === row?.dataset.invoiceItem);
    if (!item) return;
    const action = actionNode.dataset.invoiceItemAction;
    item[action] = action === 'description' ? actionNode.value : Number(actionNode.value || 0);
    updateInvoiceLiveTotal();
    renderPreview();
    queueSave();
  }

  function handleInvoiceItemClick(event) {
    const removeButton = event.target.closest('[data-remove-invoice-item]');
    if (!removeButton) return;
    const id = removeButton.closest('[data-invoice-item]')?.dataset.invoiceItem;
    if (state.invoice.items.length === 1) {
      state.invoice.items[0] = { id: state.invoice.items[0].id, description: '', quantity: 1, unitPrice: 0 };
    } else {
      state.invoice.items = state.invoice.items.filter(item => item.id !== id);
    }
    renderInvoiceItemsEditor();
    updateInvoiceLiveTotal();
    renderPreview();
    queueSave();
  }

  function addInvoiceItem() {
    if (state.invoice.items.length >= 8) {
      showToast('La facture est limitée à 8 lignes pour tenir sur une page.', true);
      return;
    }
    state.invoice.items.push({ id: createRecordId(), description: '', quantity: 1, unitPrice: 0 });
    renderInvoiceItemsEditor();
    renderPreview();
    queueSave();
  }

  function importInvoiceFromProposal(showMessage = true) {
    const services = selectedServices();
    state.invoice.imported = true;
    state.invoice.date = state.meta.date || localISODate();
    state.invoice.dueDate = addDays(state.invoice.date, Number(state.meta.validityDays || 15));
    state.invoice.client.name = state.client.company || state.client.name || '';
    state.invoice.client.email = state.client.email || '';
    state.invoice.client.address = state.client.address || '';
    state.invoice.subject = `Prestations Hive Five${state.meta.startDate ? ` à compter du ${formatDate(state.meta.startDate)}` : ''}`;
    state.invoice.discountRate = Number(state.meta.discountRate || 0);
    state.invoice.taxRate = Number(state.meta.taxRate || 0);
    state.invoice.items = services.length
      ? services.slice(0, 8).map(service => {
          const duration = service.cycle === 'month' ? Math.max(1, Number(state.meta.durationMonths || 1)) : 1;
          return {
            id: createRecordId(),
            description: `${service.name}${service.cycle === 'month' && duration > 1 ? ` — ${duration} mois` : ''}`,
            quantity: Number(service.quantity || 0) * duration,
            unitPrice: Number(service.price || 0)
          };
        })
      : [{ id: createRecordId(), description: 'Prestation Hive Five', quantity: 1, unitPrice: 0 }];
    bindDocumentFields();
    renderPreview();
    queueSave();
    if (showMessage) showToast('La facture a été préremplie depuis la proposition.');
  }

  function importCashData(showMessage = true) {
    const calculated = invoiceTotals();
    const invoiceAvailable = state.invoice.imported || state.invoice.client.name || calculated.total > 0;
    state.cash.imported = true;
    state.cash.payerName = invoiceAvailable
      ? (state.invoice.client.name || state.client.company || '')
      : (state.client.company || state.client.name || '');
    state.cash.invoiceReference = invoiceAvailable ? state.invoice.number : state.meta.number;
    state.cash.amount = invoiceAvailable ? calculated.total : totals().total;
    state.cash.currency = 'TND';
    state.cash.amountWords = amountInWords(state.cash.amount, state.cash.currency);
    state.cash.reason = invoiceAvailable
      ? `Règlement en espèces de la facture ${state.invoice.number}`
      : `Règlement en espèces relatif à la proposition ${state.meta.number}`;
    bindDocumentFields();
    renderPreview();
    queueSave();
    if (showMessage) showToast('La décharge a été préremplie avec les données actuelles.');
  }

  function setDocumentMode(mode) {
    const allowed = new Set(['proposal', 'invoice', 'cash']);
    currentMode = allowed.has(mode) ? mode : 'proposal';
    document.querySelectorAll('[data-document-mode]').forEach(button => {
      button.classList.toggle('active', button.dataset.documentMode === currentMode);
    });
    document.querySelectorAll('[data-mode-panel]').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.modePanel === currentMode);
    });
    const saveButton = document.getElementById('saveButton');
    if (saveButton) saveButton.style.display = currentMode === 'proposal' ? '' : 'none';
    const title = document.getElementById('previewTitle');
    const mainPdfButton = document.getElementById('pdfButton');
    const status = document.getElementById('saveStatus');
    if (currentMode === 'invoice') {
      if (!state.invoice.imported) importInvoiceFromProposal(false);
      if (title) title.textContent = 'Aperçu de la facture';
      if (mainPdfButton) mainPdfButton.lastChild.textContent = ' Générer la facture';
      if (status) status.textContent = 'Facture conservée localement';
    } else if (currentMode === 'cash') {
      if (!state.cash.imported) importCashData(false);
      if (title) title.textContent = 'Aperçu de la décharge';
      if (mainPdfButton) mainPdfButton.lastChild.textContent = ' Générer la décharge';
      if (status) status.textContent = 'Décharge conservée localement';
    } else {
      if (title) title.textContent = 'Votre proposition';
      if (mainPdfButton) mainPdfButton.lastChild.textContent = ' Générer le PDF';
      if (status) status.textContent = 'Enregistré localement';
    }
    bindDocumentFields();
    renderPreview();
    if (window.innerWidth < 861) document.querySelector('.editor-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function issuerLegalLine() {
    return [
      state.invoice.issuer.legalForm,
      state.invoice.issuer.taxId ? `MF : ${state.invoice.issuer.taxId}` : '',
      state.invoice.issuer.rne ? `RNE : ${state.invoice.issuer.rne}` : ''
    ].filter(Boolean).join(' · ');
  }

  function issuerCommercialLine() {
    return state.invoice.issuer.tradeName ? `Nom commercial : ${state.invoice.issuer.tradeName}` : '';
  }

  function issuerFullIdentity() {
    const issuer = state.invoice.issuer;
    return `${documentValue(issuer.name, 'OTELCO')}${issuer.tradeName ? ` (nom commercial : ${issuer.tradeName})` : ''}`;
  }

  function renderInvoicePreview() {
    const amount = invoiceTotals();
    const issuer = state.invoice.issuer;
    const client = state.invoice.client;
    const issuerDetails = [issuerCommercialLine(), issuer.address, issuer.phone, issuer.email, issuerLegalLine()].filter(Boolean).join('\n');
    const clientDetails = [client.address, client.email, client.taxId ? `MF / Identifiant : ${client.taxId}` : ''].filter(Boolean).join('\n');
    const bankText = [issuer.bank, issuer.rib ? `RIB / IBAN : ${issuer.rib}` : '', state.invoice.notes].filter(Boolean).join('\n');
    const rows = state.invoice.items.slice(0, 8).map(item => {
      const total = Number(item.quantity || 0) * Number(item.unitPrice || 0);
      return `<tr><td>${escapeHTML(documentValue(item.description, 'Prestation'))}</td><td>${escapeHTML(Number(item.quantity || 0))}</td><td>${escapeHTML(formatCurrency(item.unitPrice))}</td><td>${escapeHTML(formatCurrency(total))}</td></tr>`;
    }).join('');
    document.getElementById('documentPreview').innerHTML = `
      <article class="pdf-page invoice-page" data-page="1/1">
        <div class="invoice-sheet">
          <header class="accounting-header">
            <img class="accounting-logo" src="${IMAGES.logoOrange}" alt="Hive Five" />
            <div class="document-title-block"><span>Document comptable</span><h1>Facture</h1><b>N° ${escapeHTML(documentValue(state.invoice.number))}</b></div>
          </header>
          <div class="invoice-accent-line"></div>
          <div class="invoice-parties">
            <section class="invoice-party"><span>Émetteur</span><strong>${escapeHTML(documentValue(issuer.name, 'OTELCO'))}</strong><p>${escapeHTML(documentValue(issuerDetails))}</p></section>
            <section class="invoice-party client"><span>Facturé à</span><strong>${escapeHTML(documentValue(client.name))}</strong><p>${escapeHTML(documentValue(clientDetails))}</p></section>
          </div>
          <div class="invoice-reference-grid">
            <div class="invoice-reference"><span>Date</span><b>${escapeHTML(formatDate(state.invoice.date))}</b></div>
            <div class="invoice-reference"><span>Échéance</span><b>${escapeHTML(formatDate(state.invoice.dueDate))}</b></div>
            <div class="invoice-reference"><span>Règlement</span><b>${escapeHTML(documentValue(state.invoice.paymentMethod))}</b></div>
            <div class="invoice-reference"><span>Devise</span><b>TND</b></div>
          </div>
          <div class="invoice-subject"><b>Objet :</b> ${escapeHTML(documentValue(state.invoice.subject, 'Prestations Hive Five'))}</div>
          <table class="invoice-document-table"><thead><tr><th>Désignation</th><th>Qté</th><th>Prix unitaire HT</th><th>Total HT</th></tr></thead><tbody>${rows}</tbody></table>
          <div class="invoice-bottom">
            <div class="invoice-payment-note"><b>Modalités de règlement</b><p>${escapeHTML(documentValue(bankText, 'À compléter'))}</p></div>
            <div class="invoice-totals">
              <div class="invoice-total-row"><span>Sous-total HT</span><strong>${escapeHTML(formatCurrency(amount.subtotal))}</strong></div>
              ${amount.discount > 0 ? `<div class="invoice-total-row"><span>Remise (${Number(state.invoice.discountRate || 0)}%)</span><strong>− ${escapeHTML(formatCurrency(amount.discount))}</strong></div>` : ''}
              <div class="invoice-total-row"><span>Net HT</span><strong>${escapeHTML(formatCurrency(amount.net))}</strong></div>
              <div class="invoice-total-row"><span>TVA (${Number(state.invoice.taxRate || 0)}%)</span><strong>${escapeHTML(formatCurrency(amount.tax))}</strong></div>
              <div class="invoice-total-row final"><span>Total TTC</span><strong>${escapeHTML(formatCurrency(amount.total))}</strong></div>
            </div>
          </div>
          <div class="invoice-legal-footer">${escapeHTML(issuerFullIdentity())} · ${escapeHTML(documentValue(issuer.address))}${issuerLegalLine() ? ` · ${escapeHTML(issuerLegalLine())}` : ' · Mentions légales à compléter'}</div>
        </div>
      </article>`;
    document.getElementById('pageCount').textContent = '1 page A4';
    updateInvoiceLiveTotal();
  }

  function renderCashPreview() {
    const cash = state.cash;
    const issuer = state.invoice.issuer;
    const receiver = documentValue(cash.receivedBy, documentValue(issuer.name, 'OTELCO'));
    const reason = documentValue(cash.reason, 'Règlement en espèces');
    const words = documentValue(cash.amountWords, amountInWords(cash.amount, cash.currency));
    document.getElementById('documentPreview').innerHTML = `
      <article class="pdf-page cash-page" data-page="1/1">
        <div class="cash-sheet">
          <header class="accounting-header"><img class="accounting-logo" src="${IMAGES.logoOrange}" alt="Hive Five" /><div class="document-title-block"><span>Justificatif de paiement</span><b>N° ${escapeHTML(documentValue(cash.number))}</b></div></header>
          <div class="cash-header-title"><span>Paiement en espèces</span><h1>Décharge et reçu de paiement</h1></div>
          <div class="cash-accent-line"></div>
          <div class="cash-meta-strip">
            <div class="cash-meta-item"><span>Date</span><b>${escapeHTML(formatDate(cash.date))}</b></div>
            <div class="cash-meta-item"><span>Lieu</span><b>${escapeHTML(documentValue(cash.place))}</b></div>
            <div class="cash-meta-item"><span>Facture</span><b>${escapeHTML(documentValue(cash.invoiceReference, 'Sans référence'))}</b></div>
          </div>
          <div class="cash-amount-card"><span>Montant reçu en espèces</span><strong>${escapeHTML(formatCurrency(cash.amount, cash.currency))}</strong><p>${escapeHTML(words)}</p></div>
          <div class="cash-declaration">Je soussigné(e), <strong>${escapeHTML(receiver)}</strong>${cash.recipientRole ? `, agissant en qualité de ${escapeHTML(cash.recipientRole)}` : ''}, reconnais avoir reçu de <strong>${escapeHTML(documentValue(cash.payerName))}</strong> la somme indiquée ci-dessus, versée intégralement en espèces au titre du motif précisé dans le présent document.</div>
          <div class="cash-details">
            <div class="cash-detail-card"><span>Payeur</span><b>${escapeHTML(documentValue(cash.payerName))}</b><p>${escapeHTML(cash.payerId ? `Identifiant : ${cash.payerId}` : 'Identifiant à compléter')}</p></div>
            <div class="cash-detail-card"><span>Motif du paiement</span><b>${escapeHTML(reason)}</b><p>${escapeHTML(cash.notes || 'Le présent document vaut reçu du montant mentionné.')}</p></div>
          </div>
          <div class="signature-grid">
            <div class="signature-box"><span>Signature du payeur</span><b>${escapeHTML(documentValue(cash.payerName, 'Nom du payeur'))}</b><small>Précédée de la mention « Bon pour paiement »</small></div>
            <div class="signature-box"><span>Signature du bénéficiaire</span><b>${escapeHTML(receiver)}</b><small>Cachet et signature</small></div>
          </div>
          <div class="cash-legal-note">${escapeHTML(issuerFullIdentity())} · ${escapeHTML(documentValue(issuer.address))}${issuerLegalLine() ? ` · ${escapeHTML(issuerLegalLine())}` : ''}</div>
        </div>
      </article>`;
    document.getElementById('pageCount').textContent = '1 page A4';
  }

  // ---- PDF rendering ------------------------------------------------------
  const imageCache = new Map();
  const cropCache = new Map();

  function loadImage(src) {
    if (imageCache.has(src)) return imageCache.get(src);
    const promise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Image introuvable : ${src}`));
      image.src = src;
    });
    imageCache.set(src, promise);
    return promise;
  }

  function roundedPath(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  async function croppedData(src, pxWidth, pxHeight, radius = 0, focusY = .5) {
    const key = `${src}|${pxWidth}|${pxHeight}|${radius}|${focusY}`;
    if (cropCache.has(key)) return cropCache.get(key);
    const promise = (async () => {
      const image = await loadImage(src);
      const width = Math.max(80, Math.min(1500, Math.round(pxWidth)));
      const height = Math.max(80, Math.min(1800, Math.round(pxHeight)));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (radius > 0) {
        roundedPath(ctx, 0, 0, width, height, radius);
        ctx.clip();
      }
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const dx = (width - drawWidth) / 2;
      const availableY = height - drawHeight;
      const dy = availableY * focusY;
      ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
      return canvas.toDataURL(radius > 0 ? 'image/png' : 'image/jpeg', radius > 0 ? undefined : .86);
    })();
    cropCache.set(key, promise);
    return promise;
  }

  async function addCropped(doc, src, x, y, w, h, options = {}) {
    const scale = options.scale || 5;
    const data = await croppedData(src, w * scale, h * scale, (options.radius || 0) * scale, options.focusY ?? .5);
    const format = options.radius ? 'PNG' : 'JPEG';
    doc.addImage(data, format, x, y, w, h, undefined, 'FAST');
  }

  function hexRgb(hex) {
    const clean = hex.replace('#', '');
    return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
  }

  function mixColor(a, b, amount) {
    const ca = hexRgb(a), cb = hexRgb(b);
    return ca.map((value, index) => Math.round(value + (cb[index] - value) * amount));
  }

  function gradient(doc, x, y, w, h, from, to, vertical = true, steps = 36) {
    for (let i = 0; i < steps; i += 1) {
      const color = mixColor(from, to, i / Math.max(1, steps - 1));
      doc.setFillColor(...color);
      if (vertical) doc.rect(x, y + (h / steps) * i, w, h / steps + .25, 'F');
      else doc.rect(x + (w / steps) * i, y, w / steps + .25, h, 'F');
    }
  }

  function safePdfText(value) {
    return String(value ?? '')
      .replace(/[–—]/g, '-')
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/œ/g, 'oe')
      .replace(/Œ/g, 'OE')
      .replace(/…/g, '...')
      .replace(/[\u00a0\u202f]/g, ' ')
      .replace(/·/g, '|');
  }

  function setText(doc, color = BRAND.ink, size = 10, style = 'normal') {
    doc.setTextColor(...hexRgb(color));
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
  }

  function wrapped(doc, text, x, y, width, options = {}) {
    setText(doc, options.color || BRAND.ink, options.size || 10, options.style || 'normal');
    const lines = doc.splitTextToSize(safePdfText(text), width);
    doc.text(lines, x, y, { lineHeightFactor: options.lineHeight || 1.35, align: options.align || 'left' });
    return y + lines.length * (options.size || 10) * .3528 * (options.lineHeight || 1.35);
  }

  function rightFittedText(doc, text, rightX, y, maxWidth, options = {}) {
    const clean = safePdfText(text);
    let size = Number(options.size || 7);
    const preferredMinimum = Number(options.minSize || 4.8);
    const hardMinimum = Number(options.hardMinSize || 2.8);
    const color = options.color || BRAND.ink;
    const style = options.style || 'normal';
    setText(doc, color, size, style);
    while (size > preferredMinimum && doc.getTextWidth(clean) > maxWidth) {
      size = Math.max(preferredMinimum, size - .25);
      setText(doc, color, size, style);
    }
    if (doc.getTextWidth(clean) > maxWidth) {
      size = Math.max(hardMinimum, size * (maxWidth / doc.getTextWidth(clean)) * .97);
      setText(doc, color, size, style);
    }
    doc.text(clean, rightX, y, { align: 'right' });
  }

  function pdfFooter(doc, page, total, dark = false) {
    setText(doc, dark ? '#7f8187' : '#96928e', 7, 'bold');
    doc.text('HIVE FIVE | BUSINESS CENTER & COWORKING', 15, 289);
    doc.text(`${page}/${total}`, 195, 289, { align: 'right' });
  }

  async function pdfLogo(doc, x, y, size) {
    const logo = await croppedData(IMAGES.logo, 340, 340, 36, .5);
    doc.addImage(logo, 'PNG', x, y, size, size, undefined, 'FAST');
  }

  async function addTransparentImage(doc, src, x, y, w, h, rotation = 0) {
    const image = await loadImage(src);
    doc.addImage(image, 'PNG', x, y, w, h, undefined, 'FAST', rotation);
  }

  async function pdfBrandLockup(doc, color, x, y, w) {
    const src = color === 'white' ? IMAGES.logoWhite : IMAGES.logoOrange;
    await addTransparentImage(doc, src, x, y, w, w / 1.215);
  }

  async function pdfPageOrnament(doc) {
    await addTransparentImage(doc, IMAGES.arabesque, 135, -6, 82, 82);
    await addTransparentImage(doc, IMAGES.arabesque, -4, 246, 56, 56, 180);
    doc.setFillColor(...hexRgb('#ffb48f'));
    doc.circle(188, 53, 1.4, 'F');
  }

  async function pdfCover(doc, page, total) {
    doc.setFillColor(...hexRgb(BRAND.ink));
    doc.rect(0, 0, 210, 297, 'F');
    await addCropped(doc, IMAGES.cover, 91, 0, 119, 297, { focusY: .5, scale: 4 });
    gradient(doc, 0, 0, 112, 297, '#ff3f32', '#ff863c', true);
    await addTransparentImage(doc, IMAGES.arabesqueWhite, -8, -2, 118, 118);
    doc.setFillColor(...hexRgb('#ff6838'));
    doc.circle(107, 112, 22, 'F');
    if (doc.GState) {
      doc.setFillColor(255, 255, 255);
      doc.setGState(new doc.GState({ opacity: .12 }));
      doc.roundedRect(15, 13, 55, 43, 5, 5, 'F');
      doc.setGState(new doc.GState({ opacity: 1 }));
    }
    await pdfBrandLockup(doc, 'white', 21, 18, 43);

    setText(doc, '#ffd8cb', 8, 'bold');
    doc.text('PROPOSITION COMMERCIALE', 15, 72);
    setText(doc, '#ffffff', 31, 'bold');
    doc.text(['Votre espace.', 'Votre équipe.', 'Votre élan.'], 15, 91, { lineHeightFactor: 1.08 });
    wrapped(doc, 'Une solution de travail flexible au coeur de Tunis, prête à accueillir vos ambitions.', 15, 143, 76, { color: '#ffe6dc', size: 10, lineHeight: 1.5 });

    doc.setFillColor(255, 255, 255);
    if (doc.GState) {
      doc.setGState(new doc.GState({ opacity: .13 }));
      doc.roundedRect(15, 222, 87, 39, 4, 4, 'F');
      doc.setGState(new doc.GState({ opacity: 1 }));
    } else {
      doc.setFillColor(...hexRgb('#ff7148'));
      doc.roundedRect(15, 222, 87, 39, 4, 4, 'F');
    }
    setText(doc, '#ffd9cc', 7, 'bold');
    doc.text('PRÉPARÉE POUR', 20, 232);
    setText(doc, '#ffffff', 15, 'bold');
    const company = safePdfText(clientMainName());
    doc.text(doc.splitTextToSize(company, 73).slice(0, 2), 20, 242, { lineHeightFactor: 1.05 });
    setText(doc, '#ffe1d7', 8, 'normal');
    doc.text(safePdfText(clientSecondaryLine()), 20, 255);
    setText(doc, '#ffd7ca', 7, 'normal');
    doc.text(`${safePdfText(state.meta.number)} | ${safePdfText(formatDate(state.meta.date))}`, 15, 278);

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(136, 269, 62, 15, 3, 3, 'F');
    setText(doc, BRAND.ink, 7.6, 'bold');
    doc.text(['BELVÉDÈRE | TUNIS', '1 300 m² POUR AVANCER'], 167, 275, { align: 'center', lineHeightFactor: 1.3 });
  }

  async function pdfHeader(doc, label, title, lead = '') {
    setText(doc, BRAND.orange, 8, 'bold');
    doc.text(safePdfText(label.toUpperCase()), 15, 19);
    await pdfBrandLockup(doc, 'orange', 166, 9, 29);
    setText(doc, BRAND.ink, 24, 'bold');
    const titleLines = doc.splitTextToSize(safePdfText(title), 165);
    doc.text(titleLines, 15, 36, { lineHeightFactor: 1.05 });
    const titleEnd = 36 + titleLines.length * 8;
    if (lead) wrapped(doc, lead, 15, titleEnd + 4, 153, { color: BRAND.muted, size: 9, lineHeight: 1.45 });
    return titleEnd + (lead ? 20 : 8);
  }

  async function pdfPresentation(doc, page, total) {
    await pdfPageOrnament(doc);
    const y = await pdfHeader(doc, 'Bienvenue', 'Plus qu’un coworking.\nUn cadre pour avancer.', 'Hive Five est un environnement professionnel pensé pour les entreprises, les équipes et les talents qui veulent se concentrer sur l’essentiel.');
    const stats = [
      ['1 300', 'm² d’espaces'], ['200+', 'postes'], ['23', 'bureaux privés'], ['300', 'Mbps fibre']
    ];
    stats.forEach((item, index) => {
      const x = 15 + index * 46;
      doc.setFillColor(...hexRgb(BRAND.sand));
      doc.roundedRect(x, y + 4, 42, 27, 3, 3, 'F');
      setText(doc, BRAND.orange, 16, 'bold');
      doc.text(item[0], x + 4, y + 15);
      setText(doc, BRAND.muted, 7, 'normal');
      doc.text(safePdfText(item[1]), x + 4, y + 23);
    });
    const imageY = y + 39;
    await addCropped(doc, IMAGES.corridor, 15, imageY, 116, 147, { radius: 8, focusY: .52, scale: 5 });
    gradient(doc, 137, imageY, 58, 42, BRAND.orange, BRAND.orange2, false);
    wrapped(doc, '2 étages, un open space de 250 m² et une terrasse rooftop de 300 m².', 143, imageY + 13, 45, { color: '#ffffff', size: 9, style: 'bold', lineHeight: 1.35 });
    await addCropped(doc, IMAGES.palms, 137, imageY + 48, 58, 99, { radius: 8, focusY: .62, scale: 5 });
    doc.setFillColor(...hexRgb(BRAND.orange));
    doc.circle(130, imageY + 78, 9, 'F');
    pdfFooter(doc, page, total);
  }

  async function pdfCatalog(doc, page, total) {
    await pdfPageOrnament(doc);
    await pdfHeader(doc, 'Nos solutions', 'Une formule pour chaque façon de travailler.');
    await addCropped(doc, IMAGES.community, 15, 60, 180, 52, { radius: 5, focusY: .42, scale: 5 });
    if (doc.GState) {
      doc.setFillColor(...hexRgb(BRAND.ink));
      doc.setGState(new doc.GState({ opacity: .58 }));
      doc.roundedRect(15, 60, 180, 52, 5, 5, 'F');
      doc.setGState(new doc.GState({ opacity: 1 }));
    }
    wrapped(doc, 'Du poste nomade à l’espace d’équipe complet.', 24, 79, 80, { color: '#ffffff', size: 14, style: 'bold', lineHeight: 1.15 });
    wrapped(doc, 'Des formats flexibles, équipés et immédiatement opérationnels.', 24, 99, 78, { color: '#f2f2f2', size: 7.6, lineHeight: 1.35 });

    const startY = 119;
    state.services.forEach((service, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = 15 + col * 92;
      const y = startY + row * 38;
      doc.setFillColor(...hexRgb(service.selected ? '#fff8f4' : '#ffffff'));
      doc.setDrawColor(...hexRgb(service.selected ? '#ff9b7f' : '#e7e3df'));
      doc.roundedRect(x, y, 88, 34, 3, 3, 'FD');
      doc.setFillColor(...hexRgb(service.bg));
      doc.roundedRect(x + 4, y + 4, 12, 12, 3, 3, 'F');
      setText(doc, service.color, 7, 'bold');
      doc.text(safePdfText(service.code), x + 10, y + 11.5, { align: 'center' });
      setText(doc, BRAND.ink, 9, 'bold');
      doc.text(safePdfText(service.name), x + 20, y + 9);
      wrapped(doc, service.description, x + 20, y + 15, 62, { color: BRAND.muted, size: 6.5, lineHeight: 1.25 });
      if (service.selected) {
        setText(doc, BRAND.orange, 5.5, 'bold');
        doc.text('INCLUS DANS L’OFFRE', x + 83, y + 30, { align: 'right' });
      }
    });
    pdfFooter(doc, page, total);
  }

  function quoteColumns() {
    return { x: 15, service: 15, qty: 103, unit: 125, total: 195 };
  }

  async function pdfOffer(doc, page, total) {
    doc.setFillColor(...hexRgb('#fffaf7'));
    doc.rect(0, 226, 210, 71, 'F');
    await pdfPageOrnament(doc);
    await pdfHeader(doc, 'Votre proposition', `La solution pensée pour\n${clientMainName()}.`);
    doc.setFillColor(...hexRgb('#faf7f3'));
    doc.roundedRect(15, 66, 180, 25, 3, 3, 'F');
    doc.setFillColor(...hexRgb(BRAND.orange));
    doc.roundedRect(15, 66, 3, 25, 1.5, 1.5, 'F');
    wrapped(doc, trimText(state.content.introMessage, 300) || 'Une configuration sur mesure, à préciser ensemble.', 23, 76, 163, { color: BRAND.muted, size: 8.1, lineHeight: 1.4 });

    const chipTexts = [
      `Début : ${formatDate(state.meta.startDate)}`,
      `Durée : ${Number(state.meta.durationMonths || 1)} mois`,
      `Validité : ${Number(state.meta.validityDays || 15)} jours`
    ];
    let chipX = 15;
    chipTexts.forEach(text => {
      const width = Math.min(70, doc.getTextWidth(safePdfText(text)) + 10);
      doc.setFillColor(...hexRgb(BRAND.pale));
      doc.roundedRect(chipX, 96, width, 9, 4.5, 4.5, 'F');
      setText(doc, '#b73c27', 6.8, 'bold');
      doc.text(safePdfText(text), chipX + 5, 102);
      chipX += width + 3;
    });

    const services = selectedServices();
    let tableY = 111;
    if (services.length) {
      doc.setFillColor(...hexRgb(BRAND.ink));
      doc.rect(15, tableY, 180, 10, 'F');
      setText(doc, '#ffffff', 6.8, 'bold');
      doc.text('SOLUTION', 19, tableY + 6.5);
      doc.text('QTÉ', 111, tableY + 6.5, { align: 'right' });
      doc.text('UNITÉ', 139, tableY + 6.5, { align: 'right' });
      doc.text('TOTAL HT', 191, tableY + 6.5, { align: 'right' });
      tableY += 10;
      services.forEach(service => {
        const rowH = 12.5;
        doc.setDrawColor(...hexRgb('#e8e4e0'));
        doc.line(15, tableY + rowH, 195, tableY + rowH);
        setText(doc, BRAND.ink, 8, 'bold');
        doc.text(safePdfText(service.name), 19, tableY + 5);
        setText(doc, BRAND.muted, 5.8, 'normal');
        doc.text(safePdfText(trimText(service.tagline, 58)), 19, tableY + 9.3);
        setText(doc, BRAND.ink, 7.2, 'normal');
        doc.text(String(Number(service.quantity || 0)), 111, tableY + 7, { align: 'right' });
        doc.text(safePdfText(CYCLE_LABELS[service.cycle] || service.cycle), 139, tableY + 7, { align: 'right' });
        const price = state.meta.showPricing
          ? (Number(service.price || 0) ? formatMoney(lineTotal(service)) : 'Sur devis')
          : 'Sur devis';
        doc.text(safePdfText(price), 191, tableY + 7, { align: 'right' });
        tableY += rowH;
      });
    } else {
      doc.setDrawColor(...hexRgb('#d5d0ca'));
      doc.setLineDashPattern([2, 2], 0);
      doc.roundedRect(15, tableY, 180, 27, 3, 3, 'S');
      doc.setLineDashPattern([], 0);
      setText(doc, BRAND.muted, 8, 'normal');
      doc.text('Les services seront définis lors de votre échange avec notre équipe.', 105, tableY + 15, { align: 'center' });
      tableY += 31;
    }

    const bottomY = Math.max(205, tableY + 8);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...hexRgb('#e6e1dc'));
    doc.roundedRect(15, bottomY, 112, 55, 4, 4, 'FD');
    setText(doc, BRAND.ink, 8, 'bold');
    doc.text('CONDITIONS PRINCIPALES', 21, bottomY + 10);
    let terms = trimText(state.content.commercialTerms, 520);
    if (state.content.clientNote) terms += `\nPrécision : ${trimText(state.content.clientNote, 180)}`;
    wrapped(doc, terms, 21, bottomY + 18, 100, { color: BRAND.muted, size: 6.5, lineHeight: 1.35 });

    gradient(doc, 134, bottomY, 61, 55, BRAND.orange, BRAND.orange2, false);
    setText(doc, '#ffe3d9', 7, 'bold');
    doc.text(state.meta.showPricing ? 'TOTAL ESTIMATIF TTC' : 'CONFIGURATION TARIFAIRE', 140, bottomY + 11);
    setText(doc, '#ffffff', state.meta.showPricing ? 16 : 13, 'bold');
    doc.text(safePdfText(state.meta.showPricing ? formatMoney(totals().total) : 'Sur devis'), 140, bottomY + 25);
    wrapped(doc, state.meta.showPricing
      ? `HT ${formatMoney(totals().net)} | TVA ${Number(state.meta.taxRate || 0)}%`
      : 'Le chiffrage final sera confirmé après validation des besoins.', 140, bottomY + 36, 47, { color: '#ffe4d9', size: 6.5, lineHeight: 1.3 });
    pdfFooter(doc, page, total);
  }

  async function pdfBenefits(doc, page, total) {
    await pdfPageOrnament(doc);
    await pdfHeader(doc, 'Pourquoi Hive Five', 'Vous vous concentrez sur votre activité.\nNous gérons le reste.');
    await addCropped(doc, IMAGES.openSpace, 15, 76, 80, 151, { radius: 11, focusY: .5, scale: 5 });
    doc.setFillColor(...hexRgb(BRAND.orange));
    doc.circle(93, 208, 13, 'F');
    setText(doc, '#ffffff', 7, 'bold');
    doc.text(['ACCÈS', '24/7*'], 93, 206, { align: 'center', lineHeightFactor: 1.15 });

    BENEFITS.forEach((item, index) => {
      const y = 76 + index * 26;
      doc.setFillColor(...hexRgb(BRAND.pale));
      doc.roundedRect(105, y, 15, 15, 4, 4, 'F');
      setText(doc, BRAND.orange, 7, 'bold');
      doc.text(`0${index + 1}`, 112.5, y + 9.5, { align: 'center' });
      setText(doc, BRAND.ink, 9, 'bold');
      doc.text(safePdfText(item[0]), 125, y + 5.5);
      wrapped(doc, item[1], 125, y + 11.5, 66, { color: BRAND.muted, size: 6.4, lineHeight: 1.3 });
      if (index < BENEFITS.length - 1) {
        doc.setDrawColor(...hexRgb('#ece8e4'));
        doc.line(105, y + 22, 195, y + 22);
      }
    });

    doc.setFillColor(...hexRgb(BRAND.ink));
    doc.roundedRect(15, 237, 180, 26, 4, 4, 'F');
    setText(doc, '#ffffff', 8, 'bold');
    doc.text('TOUJOURS À PORTÉE', 22, 248);
    wrapped(doc, 'Terrasse rooftop | lounge | café | espaces de réunion | communauté', 22, 255, 160, { color: '#b8b9bd', size: 7, lineHeight: 1.3 });
    setText(doc, BRAND.muted, 5.8, 'normal');
    doc.text('* Selon la formule retenue.', 15, 271);
    pdfFooter(doc, page, total);
  }

  async function pdfContact(doc, page, total) {
    doc.setFillColor(...hexRgb(BRAND.ink));
    doc.rect(0, 0, 210, 297, 'F');
    await addCropped(doc, IMAGES.palms, 0, 0, 210, 142, { focusY: .53, scale: 5 });
    gradient(doc, 0, 112, 210, 42, '#42434a', BRAND.ink, true, 24);
    await addTransparentImage(doc, IMAGES.arabesqueWhite, 118, 147, 104, 104);
    if (doc.GState) {
      doc.setFillColor(...hexRgb(BRAND.ink));
      doc.setGState(new doc.GState({ opacity: .28 }));
      doc.roundedRect(15, 13, 55, 43, 5, 5, 'F');
      doc.setGState(new doc.GState({ opacity: 1 }));
    }
    await pdfBrandLockup(doc, 'white', 21, 18, 43);
    doc.setFillColor(...hexRgb(BRAND.orange));
    doc.circle(204, 145, 31, 'F');

    setText(doc, '#ff9a78', 8, 'bold');
    doc.text('LA PROCHAINE ÉTAPE', 15, 158);
    setText(doc, '#ffffff', 28, 'bold');
    doc.text(['Venez découvrir', 'votre futur espace.'], 15, 178, { lineHeightFactor: 1.06 });
    wrapped(doc, 'Une visite suffit pour vous projeter. Notre équipe vous répond rapidement et adapte la configuration à vos besoins.', 15, 207, 135, { color: '#b8b9bd', size: 9, lineHeight: 1.45 });

    const cards = [
      ['NOUS APPELER', '+216 57 010 915'],
      ['NOUS ÉCRIRE', 'Hivefivetunisie@gmail.com'],
      ['NOUS TROUVER', '63 Rue de Khartoum\nBelvédère, Tunis']
    ];
    cards.forEach((item, index) => {
      const x = 15 + index * 61;
      doc.setFillColor(...hexRgb('#282a30'));
      doc.setDrawColor(...hexRgb('#3a3c43'));
      doc.roundedRect(x, 230, 57, 33, 3, 3, 'FD');
      setText(doc, '#ff9b79', 5.8, 'bold');
      doc.text(item[0], x + 5, 240);
      wrapped(doc, item[1], x + 5, 249, 47, { color: '#ffffff', size: 6.8, style: 'bold', lineHeight: 1.25 });
    });
    const validity = addDays(state.meta.date, state.meta.validityDays);
    setText(doc, '#7f8187', 6.2, 'normal');
    doc.text(`hivefivecoworking.com | ${safePdfText(state.meta.number)}${validity ? ` | valable jusqu'au ${safePdfText(formatDate(validity))}` : ''}`, 15, 276);
    pdfFooter(doc, page, total, true);
  }

  async function pdfInvoiceDocument(doc) {
    const invoice = state.invoice;
    const issuer = invoice.issuer;
    const client = invoice.client;
    const amount = invoiceTotals();
    await pdfPageOrnament(doc);
    await pdfBrandLockup(doc, 'orange', 15, 11, 35);
    setText(doc, BRAND.orange, 7.5, 'bold');
    doc.text('DOCUMENT COMPTABLE', 195, 15, { align: 'right' });
    setText(doc, BRAND.ink, 29, 'bold');
    doc.text('FACTURE', 195, 27, { align: 'right' });
    setText(doc, BRAND.muted, 8.5, 'bold');
    doc.text(`N° ${safePdfText(documentValue(invoice.number))}`, 195, 35, { align: 'right' });
    gradient(doc, 15, 42, 180, 2.2, BRAND.orange, BRAND.orange2, false, 24);

    const drawParty = (x, title, name, details, clientCard = false) => {
      doc.setFillColor(...hexRgb(clientCard ? '#fff8f4' : '#ffffff'));
      doc.setDrawColor(...hexRgb(clientCard ? '#ffb39d' : '#e5e0db'));
      doc.roundedRect(x, 50, 87, 36, 3, 3, 'FD');
      setText(doc, BRAND.orange, 6.2, 'bold');
      doc.text(title, x + 5, 58);
      setText(doc, BRAND.ink, 10, 'bold');
      doc.text(safePdfText(trimText(documentValue(name), 42)), x + 5, 66);
      wrapped(doc, trimText(details, 180), x + 5, 72, 77, { color: BRAND.muted, size: 6.3, lineHeight: 1.25 });
    };
    const issuerDetails = [issuerCommercialLine(), issuer.address, issuer.phone, issuer.email, issuerLegalLine()].filter(Boolean).join('\n');
    const clientDetails = [client.address, client.email, client.taxId ? `MF / Identifiant : ${client.taxId}` : ''].filter(Boolean).join('\n');
    drawParty(15, 'ÉMETTEUR', issuer.name, documentValue(issuerDetails));
    drawParty(108, 'FACTURÉ À', client.name, documentValue(clientDetails), true);

    const refs = [
      ['DATE', formatDate(invoice.date)],
      ['ÉCHÉANCE', formatDate(invoice.dueDate)],
      ['RÈGLEMENT', documentValue(invoice.paymentMethod)],
      ['DEVISE', 'TND']
    ];
    refs.forEach((item, index) => {
      const x = 15 + index * 46;
      doc.setFillColor(...hexRgb(BRAND.sand));
      doc.roundedRect(x, 91, 42, 16, 2.2, 2.2, 'F');
      setText(doc, '#85817d', 5.3, 'bold');
      doc.text(safePdfText(item[0]), x + 4, 97);
      setText(doc, BRAND.ink, 6.7, 'bold');
      doc.text(safePdfText(trimText(item[1], 24)), x + 4, 103);
    });
    setText(doc, BRAND.ink, 7.2, 'bold');
    doc.text(`OBJET : ${safePdfText(trimText(documentValue(invoice.subject, 'Prestations Hive Five'), 100))}`, 15, 114);

    const tableY = 120;
    doc.setFillColor(...hexRgb(BRAND.ink));
    doc.rect(15, tableY, 180, 9, 'F');
    setText(doc, '#ffffff', 6, 'bold');
    doc.text('DÉSIGNATION', 19, tableY + 6);
    doc.text('QTÉ', 121, tableY + 6, { align: 'right' });
    doc.text('PRIX UNITAIRE HT', 157, tableY + 6, { align: 'right' });
    doc.text('TOTAL HT', 191, tableY + 6, { align: 'right' });
    invoice.items.slice(0, 8).forEach((item, index) => {
      const y = tableY + 9 + index * 8.5;
      doc.setDrawColor(...hexRgb('#e9e5e1'));
      doc.line(15, y + 8.5, 195, y + 8.5);
      setText(doc, BRAND.ink, 6.8, 'bold');
      doc.text(safePdfText(trimText(documentValue(item.description, 'Prestation'), 50)), 19, y + 5.5);
      rightFittedText(doc, String(Number(item.quantity || 0)), 121, y + 5.5, 12, { size: 6.4 });
      rightFittedText(doc, formatCurrency(item.unitPrice), 157, y + 5.5, 31, { size: 6.2, minSize: 4.8 });
      rightFittedText(doc, formatCurrency(Number(item.quantity || 0) * Number(item.unitPrice || 0)), 191, y + 5.5, 29, { size: 6.2, minSize: 4.8, style: 'bold' });
    });

    const bottomY = 202;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...hexRgb('#e5e0db'));
    doc.roundedRect(15, bottomY, 108, 58, 3, 3, 'FD');
    setText(doc, BRAND.ink, 7, 'bold');
    doc.text('MODALITÉS DE RÈGLEMENT', 21, bottomY + 9);
    const bankText = [issuer.bank, issuer.rib ? `RIB / IBAN : ${issuer.rib}` : '', invoice.notes].filter(Boolean).join('\n');
    wrapped(doc, trimText(documentValue(bankText), 420), 21, bottomY + 17, 96, { color: BRAND.muted, size: 6.2, lineHeight: 1.35 });

    doc.setFillColor(...hexRgb(BRAND.sand));
    doc.roundedRect(130, bottomY, 65, 58, 3, 3, 'F');
    const totalRows = [
      ['Sous-total HT', amount.subtotal],
      ...(amount.discount > 0 ? [[`Remise (${Number(invoice.discountRate || 0)}%)`, -amount.discount]] : []),
      ['Net HT', amount.net],
      [`TVA (${Number(invoice.taxRate || 0)}%)`, amount.tax]
    ];
    totalRows.forEach((item, index) => {
      const y = bottomY + 9 + index * 8;
      setText(doc, BRAND.muted, 6.4, 'normal');
      doc.text(safePdfText(item[0]), 136, y);
      rightFittedText(doc, `${Number(item[1]) < 0 ? '- ' : ''}${formatCurrency(Math.abs(Number(item[1])))}`, 189, y, 29, { size: 6.4, minSize: 4.8, style: 'bold' });
    });
    gradient(doc, 130, bottomY + 43, 65, 15, BRAND.orange, BRAND.orange2, false, 20);
    setText(doc, '#ffffff', 7.2, 'bold');
    doc.text('TOTAL TTC', 136, bottomY + 52);
    rightFittedText(doc, formatCurrency(amount.total), 189, bottomY + 52, 31, { color: '#ffffff', size: 10.5, minSize: 6.5, style: 'bold' });

    doc.setDrawColor(...hexRgb('#e4dfda'));
    doc.line(15, 276, 195, 276);
    setText(doc, '#86827e', 5.7, 'normal');
    const legal = `${issuerFullIdentity()} | ${documentValue(issuer.address)}${issuerLegalLine() ? ` | ${issuerLegalLine()}` : ' | Mentions légales à compléter'}`;
    doc.text(safePdfText(trimText(legal, 190)), 105, 282, { align: 'center' });
    pdfFooter(doc, 1, 1);
  }

  async function pdfCashDocument(doc) {
    const cash = state.cash;
    const issuer = state.invoice.issuer;
    const receiver = documentValue(cash.receivedBy, documentValue(issuer.name, 'OTELCO'));
    const words = documentValue(cash.amountWords, amountInWords(cash.amount, cash.currency));
    await pdfPageOrnament(doc);
    await pdfBrandLockup(doc, 'orange', 15, 11, 35);
    setText(doc, BRAND.orange, 7.5, 'bold');
    doc.text('JUSTIFICATIF DE PAIEMENT', 195, 16, { align: 'right' });
    setText(doc, BRAND.muted, 8, 'bold');
    doc.text(`N° ${safePdfText(documentValue(cash.number))}`, 195, 26, { align: 'right' });
    setText(doc, BRAND.orange, 8, 'bold');
    doc.text('PAIEMENT EN ESPÈCES', 15, 53);
    setText(doc, BRAND.ink, 27, 'bold');
    doc.text(['Décharge et reçu', 'de paiement'], 15, 67, { lineHeightFactor: 1.02 });
    gradient(doc, 15, 91, 180, 2.2, BRAND.orange, BRAND.orange2, false, 24);

    const meta = [
      ['DATE', formatDate(cash.date)],
      ['LIEU', documentValue(cash.place)],
      ['RÉFÉRENCE FACTURE', documentValue(cash.invoiceReference, 'Sans référence')]
    ];
    meta.forEach((item, index) => {
      const x = 15 + index * 61;
      doc.setFillColor(...hexRgb(BRAND.sand));
      doc.roundedRect(x, 99, 57, 19, 2.5, 2.5, 'F');
      setText(doc, '#85817d', 5.4, 'bold');
      doc.text(safePdfText(item[0]), x + 5, 106);
      setText(doc, BRAND.ink, 7, 'bold');
      doc.text(safePdfText(trimText(item[1], 28)), x + 5, 113);
    });

    gradient(doc, 15, 125, 180, 38, BRAND.orange, BRAND.orange2, false, 32);
    setText(doc, '#ffdcd0', 6.5, 'bold');
    doc.text('MONTANT REÇU EN ESPÈCES', 23, 136);
    setText(doc, '#ffffff', 22, 'bold');
    doc.text(safePdfText(formatCurrency(cash.amount, cash.currency)), 23, 150);
    wrapped(doc, words, 105, 140, 80, { color: '#fff4ef', size: 7.2, style: 'bold', lineHeight: 1.35 });

    doc.setFillColor(...hexRgb('#fff8f4'));
    doc.roundedRect(15, 171, 180, 42, 3, 3, 'F');
    doc.setFillColor(...hexRgb(BRAND.orange));
    doc.roundedRect(15, 171, 3, 42, 1.5, 1.5, 'F');
    const declaration = `Je soussigné(e), ${receiver}${cash.recipientRole ? `, agissant en qualité de ${cash.recipientRole}` : ''}, reconnais avoir reçu de ${documentValue(cash.payerName)} la somme indiquée ci-dessus, versée intégralement en espèces au titre du motif précisé dans le présent document.`;
    wrapped(doc, declaration, 24, 183, 162, { color: BRAND.ink, size: 8.2, lineHeight: 1.5 });

    const cards = [
      ['PAYEUR', documentValue(cash.payerName), cash.payerId ? `Identifiant : ${cash.payerId}` : 'Identifiant à compléter'],
      ['MOTIF DU PAIEMENT', documentValue(cash.reason, 'Règlement en espèces'), cash.notes || 'Le présent document vaut reçu du montant mentionné.']
    ];
    cards.forEach((item, index) => {
      const x = 15 + index * 92;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...hexRgb('#e4dfda'));
      doc.roundedRect(x, 220, 88, 29, 3, 3, 'FD');
      setText(doc, BRAND.orange, 5.7, 'bold');
      doc.text(item[0], x + 5, 228);
      setText(doc, BRAND.ink, 7.2, 'bold');
      doc.text(safePdfText(trimText(item[1], 42)), x + 5, 236);
      wrapped(doc, trimText(item[2], 90), x + 5, 242, 77, { color: BRAND.muted, size: 5.8, lineHeight: 1.2 });
    });

    const signatures = [
      ['SIGNATURE DU PAYEUR', documentValue(cash.payerName, 'Nom du payeur'), '« Bon pour paiement »'],
      ['SIGNATURE DU BÉNÉFICIAIRE', receiver, 'Cachet et signature']
    ];
    signatures.forEach((item, index) => {
      const x = 15 + index * 98;
      doc.setDrawColor(...hexRgb('#9c9791'));
      doc.line(x, 265, x + 82, 265);
      setText(doc, BRAND.muted, 5.8, 'bold');
      doc.text(item[0], x + 41, 272, { align: 'center' });
      setText(doc, BRAND.ink, 6.3, 'bold');
      doc.text(safePdfText(trimText(item[1], 38)), x + 41, 278, { align: 'center' });
      setText(doc, '#98938e', 5.2, 'normal');
      doc.text(safePdfText(item[2]), x + 41, 283, { align: 'center' });
    });
    setText(doc, '#88847f', 5.3, 'normal');
    const legal = `${issuerFullIdentity()} | ${documentValue(issuer.address)}${issuerLegalLine() ? ` | ${issuerLegalLine()}` : ''}`;
    doc.text(safePdfText(trimText(legal, 185)), 105, 290, { align: 'center' });
  }

  function pdfDefinitions() {
    const pages = [pdfCover];
    if (state.content.includePresentation) pages.push(pdfPresentation);
    if (state.content.includeCatalog) pages.push(pdfCatalog);
    pages.push(pdfOffer);
    if (state.content.includeBenefits) pages.push(pdfBenefits);
    pages.push(pdfContact);
    return pages;
  }

  async function generatePDF() {
    if (!window.jspdf?.jsPDF) {
      showToast('Le moteur PDF n’est pas disponible.', true);
      return;
    }
    const buttons = [document.getElementById('pdfButton'), document.getElementById('bottomPdfButton')];
    buttons.forEach(button => { if (button) { button.disabled = true; button.dataset.label = button.textContent; button.textContent = 'Création du PDF…'; } });
    try {
      saveState(false);
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true, putOnlyUsedFonts: true });
      doc.setProperties({
        title: `Proposition Hive Five - ${state.client.company || 'Client'}`,
        subject: 'Proposition commerciale personnalisée',
        author: 'Hive Five Coworking',
        creator: 'Hive Five - Créateur de propositions'
      });
      const pages = pdfDefinitions();
      for (let index = 0; index < pages.length; index += 1) {
        if (index > 0) doc.addPage('a4', 'portrait');
        await pages[index](doc, index + 1, pages.length);
      }
      const filenameCompany = (state.client.company || 'client')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
      doc.save(`proposition-hive-five-${filenameCompany || 'client'}.pdf`);
      showToast('Votre proposition PDF est prête.');
    } catch (error) {
      console.error(error);
      showToast('Une erreur est survenue pendant la création du PDF.', true);
    } finally {
      buttons.forEach(button => {
        if (!button) return;
        button.disabled = false;
        button.innerHTML = button.id === 'pdfButton'
          ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"/></svg> Générer le PDF'
          : 'Générer la proposition PDF <span>↓</span>';
      });
    }
  }

  function safeFilename(value, fallback) {
    const normalized = String(value || fallback)
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
    return normalized || fallback;
  }

  async function generateAccountingPDF(kind) {
    if (!window.jspdf?.jsPDF) {
      showToast('Le moteur PDF n’est pas disponible.', true);
      return;
    }
    const dedicatedId = kind === 'invoice' ? 'invoicePdfButton' : 'cashPdfButton';
    const buttons = [document.getElementById(dedicatedId), currentMode === kind ? document.getElementById('pdfButton') : null].filter(Boolean);
    buttons.forEach(button => {
      button.disabled = true;
      button.dataset.previousHtml = button.innerHTML;
      button.textContent = 'Création du PDF…';
    });
    try {
      saveState(false);
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true, putOnlyUsedFonts: true });
      const isInvoice = kind === 'invoice';
      doc.setProperties({
        title: isInvoice ? `Facture Hive Five - ${state.invoice.number}` : `Décharge espèces Hive Five - ${state.cash.number}`,
        subject: isInvoice ? 'Facture comptable' : 'Décharge de paiement en espèces',
        author: state.invoice.issuer.name || 'Hive Five',
        creator: 'Hive Five - Application locale'
      });
      if (isInvoice) await pdfInvoiceDocument(doc);
      else await pdfCashDocument(doc);
      const client = isInvoice ? state.invoice.client.name : state.cash.payerName;
      doc.save(`${isInvoice ? 'facture' : 'decharge-especes'}-hive-five-${safeFilename(client, 'client')}.pdf`);
      showToast(isInvoice ? 'La facture PDF d’une page est prête.' : 'La décharge PDF d’une page est prête.');
    } catch (error) {
      console.error(error);
      showToast('Une erreur est survenue pendant la création du PDF.', true);
    } finally {
      buttons.forEach(button => {
        button.disabled = false;
        if (button.id === 'pdfButton') {
          button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"/></svg> ${kind === 'invoice' ? 'Générer la facture' : 'Générer la décharge'}`;
        } else {
          button.innerHTML = kind === 'invoice'
            ? 'Générer la facture PDF · 1 page <span>↓</span>'
            : 'Générer la décharge PDF · 1 page <span>↓</span>';
        }
      });
    }
  }

  function generateCurrentPDF() {
    if (currentMode === 'invoice') return generateAccountingPDF('invoice');
    if (currentMode === 'cash') return generateAccountingPDF('cash');
    return generatePDF();
  }

  function resetApplication() {
    if (!window.confirm('Réinitialiser tous les champs, y compris la facture et la décharge, et revenir au modèle de départ ?')) return;
    state = defaultState();
    localStorage.removeItem(STORAGE_KEY);
    bindStateToFields();
    renderServices();
    setDocumentMode('proposal');
    activateTab('client');
    showToast('Le modèle a été réinitialisé.');
  }

  function init() {
    bindStateToFields();
    renderServices();
    setDocumentMode('proposal');

    document.querySelectorAll('[data-document-mode]').forEach(button => button.addEventListener('click', () => setDocumentMode(button.dataset.documentMode)));
    document.querySelectorAll('.step-tab').forEach(button => button.addEventListener('click', () => activateTab(button.dataset.tab)));
    document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => activateTab(button.dataset.next)));
    document.querySelectorAll('[data-client-type]').forEach(button => button.addEventListener('click', () => setClientType(button.dataset.clientType)));
    Object.keys(FIELD_BINDINGS).forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;
      element.addEventListener(element.type === 'checkbox' ? 'change' : 'input', handleFieldInput);
    });
    Object.keys(DOCUMENT_FIELD_BINDINGS).forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;
      element.addEventListener(element.tagName === 'SELECT' ? 'change' : 'input', handleDocumentFieldInput);
    });
    document.getElementById('servicesList').addEventListener('input', handleServiceInput);
    document.getElementById('servicesList').addEventListener('change', handleServiceInput);
    document.getElementById('invoiceItemsList').addEventListener('input', handleInvoiceItemInput);
    document.getElementById('invoiceItemsList').addEventListener('click', handleInvoiceItemClick);
    document.getElementById('addInvoiceItem').addEventListener('click', addInvoiceItem);
    document.getElementById('invoiceImportButton').addEventListener('click', () => importInvoiceFromProposal(true));
    document.getElementById('cashImportButton').addEventListener('click', () => importCashData(true));
    document.getElementById('saveButton').addEventListener('click', saveToGoogleSheets);
    document.getElementById('resetButton').addEventListener('click', resetApplication);
    document.getElementById('pdfButton').addEventListener('click', generateCurrentPDF);
    document.getElementById('bottomPdfButton').addEventListener('click', generatePDF);
    document.getElementById('invoicePdfButton').addEventListener('click', () => generateAccountingPDF('invoice'));
    document.getElementById('cashPdfButton').addEventListener('click', () => generateAccountingPDF('cash'));
    saveState(false);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
