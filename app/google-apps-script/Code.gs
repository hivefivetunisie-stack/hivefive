const CONFIG = {
  SHEET_NAME: 'Leads',
  TIME_ZONE: 'Africa/Tunis'
};

const HEADERS = [
  'Créé le',
  'Dernière synchronisation',
  'ID enregistrement',
  'N° proposition',
  'Date proposition',
  'Validité (jours)',
  'Début souhaité',
  'Type client',
  'Entreprise / Nom',
  'Nom du contact',
  'Fonction / Activité',
  'E-mail',
  'Téléphone',
  'Adresse',
  'Durée (mois)',
  'Remise (%)',
  'TVA (%)',
  'Afficher les tarifs',
  'Services sélectionnés',
  'Détail des services (JSON)',
  'Sous-total HT (DT)',
  'Remise (DT)',
  'Net HT (DT)',
  'TVA (DT)',
  'Total TTC (DT)',
  "Message d'introduction",
  'Conditions commerciales',
  'Note client',
  'Inclure présentation',
  'Inclure catalogue',
  'Inclure avantages',
  "Date d'envoi navigateur",
  'Source',
  'Version du schéma',
  'Toutes les données (JSON)'
];

/**
 * À exécuter une seule fois depuis le classeur « Lead Client Hive Five ».
 * Cette fonction mémorise le classeur et prépare l'onglet « Leads ».
 */
function initialiserBase() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Ouvrez ce script depuis Extensions > Apps Script du classeur Google Sheet.');
  }
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());
  spreadsheet.setSpreadsheetTimeZone(CONFIG.TIME_ZONE);
  const sheet = ensureSheet_(spreadsheet);
  SpreadsheetApp.flush();
  return `Base initialisée : ${spreadsheet.getName()} / ${sheet.getName()}`;
}

/** Réponse de contrôle lorsque l'URL /exec est ouverte dans un navigateur. */
function doGet() {
  try {
    const spreadsheet = getSpreadsheet_();
    const sheet = ensureSheet_(spreadsheet);
    return jsonResponse_({
      ok: true,
      message: 'API Hive Five opérationnelle',
      spreadsheet: spreadsheet.getName(),
      sheet: sheet.getName(),
      rows: Math.max(0, sheet.getLastRow() - 1)
    });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  }
}

/** Reçoit les données de l'application et ajoute ou met à jour un lead. */
function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    const payload = parsePayload_(event);
    validatePayload_(payload);

    const spreadsheet = getSpreadsheet_();
    const sheet = ensureSheet_(spreadsheet);
    const recordId = safeText_(payload.recordId) || Utilities.getUuid();
    const existingRow = findRecordRow_(sheet, recordId);
    const now = new Date();
    const createdAt = existingRow ? sheet.getRange(existingRow, 1).getValue() : now;
    const row = buildRow_(payload, recordId, createdAt, now);

    if (existingRow) {
      sheet.getRange(existingRow, 1, 1, HEADERS.length).setValues([row]);
    } else {
      sheet.getRange(sheet.getLastRow() + 1, 1, 1, HEADERS.length).setValues([row]);
    }
    SpreadsheetApp.flush();

    return jsonResponse_({
      ok: true,
      action: existingRow ? 'updated' : 'created',
      recordId: recordId,
      row: existingRow || sheet.getLastRow()
    });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function parsePayload_(event) {
  if (!event) throw new Error('Requête vide.');
  let raw = '';
  if (event.postData && event.postData.contents) raw = event.postData.contents;
  if (!raw && event.parameter && event.parameter.payload) raw = event.parameter.payload;
  if (!raw) throw new Error('Aucune donnée reçue.');
  try {
    return JSON.parse(raw);
  } catch (_) {
    throw new Error('Le contenu reçu n’est pas un JSON valide.');
  }
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Données invalides.');
  if (!payload.client || !safeText_(payload.client.company)) {
    throw new Error('Le nom du client ou de l’entreprise est obligatoire.');
  }
}

/**
 * Réapplique la mise en forme et corrige les anciens résumés de services.
 * À exécuter une fois depuis Apps Script après avoir remplacé Code.gs.
 */
function corrigerTableauLeads() {
  const spreadsheet = getSpreadsheet_();
  const sheet = ensureSheet_(spreadsheet);
  const lastRow = sheet.getLastRow();
  let correctedRows = 0;

  if (lastRow > 1) {
    const range = sheet.getRange(2, 19, lastRow - 1, 1);
    const values = range.getValues();
    values.forEach(function (row) {
      const original = safeText_(row[0]);
      const corrected = original.replace(/\s+DT\s*\/\s*/g, ' DT par ');
      if (corrected !== original) correctedRows += 1;
      row[0] = corrected;
    });
    range.setValues(values).setWrap(true);
  }

  const existingFilter = sheet.getFilter();
  if (existingFilter) existingFilter.remove();
  sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).createFilter();
  SpreadsheetApp.flush();
  return {
    ok: true,
    spreadsheet: spreadsheet.getName(),
    sheet: sheet.getName(),
    correctedRows: correctedRows
  };
}

function getSpreadsheet_() {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheetId = properties.getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) {
      spreadsheetId = active.getId();
      properties.setProperty('SPREADSHEET_ID', spreadsheetId);
    }
  }
  if (!spreadsheetId) {
    throw new Error('Base non initialisée. Exécutez d’abord la fonction initialiserBase.');
  }
  return SpreadsheetApp.openById(spreadsheetId);
}

function ensureSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);

  const currentFirstCell = safeText_(sheet.getRange(1, 1).getValue());
  if (sheet.getLastRow() > 0 && currentFirstCell && currentFirstCell !== HEADERS[0]) {
    sheet.insertRowsBefore(1, 1);
  }
  if (sheet.getMaxColumns() < HEADERS.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), HEADERS.length - sheet.getMaxColumns());
  }
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setBackground('#ff5738')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setVerticalAlignment('middle');
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);
  sheet.getRange('A:B').setNumberFormat('dd/mm/yyyy hh:mm:ss');
  sheet.getRange('P:Q').setNumberFormat('0.00');
  sheet.getRange('U:Y').setNumberFormat('#,##0.000');
  sheet.getRange(2, 15, Math.max(1, sheet.getMaxRows() - 1), 3).setHorizontalAlignment('right');
  sheet.getRange(2, 21, Math.max(1, sheet.getMaxRows() - 1), 5).setHorizontalAlignment('right');
  sheet.getRange(1, 19, sheet.getMaxRows(), 2).setWrap(true);
  sheet.getRange(1, 26, sheet.getMaxRows(), 10).setWrap(true);
  sheet.getRange(2, 1, Math.max(1, sheet.getMaxRows() - 1), HEADERS.length).setVerticalAlignment('top');
  sheet.setColumnWidths(1, 2, 155);
  sheet.setColumnWidth(3, 245);
  sheet.setColumnWidths(4, 5, 125);
  sheet.setColumnWidth(9, 190);
  sheet.setColumnWidth(10, 170);
  sheet.setColumnWidth(12, 190);
  sheet.setColumnWidth(14, 230);
  sheet.setColumnWidths(15, 4, 105);
  sheet.setColumnWidth(19, 300);
  sheet.setColumnWidth(20, 320);
  sheet.setColumnWidths(21, 5, 125);
  sheet.setColumnWidth(26, 280);
  sheet.setColumnWidth(27, 320);
  sheet.setColumnWidth(28, 240);
  sheet.setColumnWidth(35, 320);
  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).createFilter();
  }
  return sheet;
}

function findRecordRow_(sheet, recordId) {
  const lastRow = sheet.getLastRow();
  if (!recordId || lastRow < 2) return 0;
  const match = sheet.getRange(2, 3, lastRow - 1, 1)
    .createTextFinder(recordId)
    .matchEntireCell(true)
    .findNext();
  return match ? match.getRow() : 0;
}

function buildRow_(payload, recordId, createdAt, now) {
  const client = payload.client || {};
  const proposal = payload.proposal || {};
  const content = payload.content || {};
  const totals = payload.totals || {};
  const services = Array.isArray(payload.services) ? payload.services : [];
  const clientType = client.type === 'individual' ? 'Personne physique' : 'Entreprise';
  const serviceSummary = services.map(function (service) {
    const cycle = safeText_(service.billingLabel || service.billingCycle);
    return `${safeText_(service.name)} × ${number_(service.quantity)} — ${number_(service.unitPrice)} DT par ${cycle}`;
  }).join('\n');

  return [
    createdAt,
    now,
    safeCell_(recordId),
    safeCell_(proposal.number),
    safeCell_(proposal.date),
    number_(proposal.validityDays),
    safeCell_(proposal.startDate),
    clientType,
    safeCell_(client.company),
    safeCell_(client.name),
    safeCell_(client.role),
    safeCell_(client.email),
    safeCell_(client.phone),
    safeCell_(client.address),
    number_(proposal.durationMonths),
    number_(proposal.discountRate),
    number_(proposal.taxRate),
    booleanLabel_(proposal.showPricing),
    safeCell_(serviceSummary),
    safeCell_(JSON.stringify(services)),
    number_(totals.subtotal),
    number_(totals.discount),
    number_(totals.net),
    number_(totals.tax),
    number_(totals.total),
    safeCell_(content.introMessage),
    safeCell_(content.commercialTerms),
    safeCell_(content.clientNote),
    booleanLabel_(content.includePresentation),
    booleanLabel_(content.includeCatalog),
    booleanLabel_(content.includeBenefits),
    safeCell_(payload.submittedAt),
    safeCell_(payload.source),
    safeCell_(payload.schemaVersion),
    safeCell_(JSON.stringify(payload))
  ];
}

function number_(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function booleanLabel_(value) {
  return value ? 'Oui' : 'Non';
}

function safeText_(value) {
  return value === null || value === undefined ? '' : String(value).trim();
}

/** Empêche une valeur utilisateur d’être interprétée comme une formule Sheets. */
function safeCell_(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number' || typeof value === 'boolean' || value instanceof Date) return value;
  const text = String(value);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
