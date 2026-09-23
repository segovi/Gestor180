/**
 * Google Apps Script para recibir el formulario del sitio y guardarlo en Google Sheets.
 * Crea una hoja llamada "Consultas" o cambia SHEET_NAME.
 */
const SHEET_NAME = 'Consultas';

function doPost(e) {
  const data = e && e.parameter ? e.parameter : {};
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Fecha', 'Nombre', 'Teléfono', 'Email', 'Mensaje', 'Origen']);
  }

  sheet.appendRow([
    new Date(),
    sanitize_(data.nombre),
    sanitize_(data.telefono),
    sanitize_(data.email),
    sanitize_(data.mensaje),
    sanitize_(data.origen)
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function sanitize_(value) {
  const text = String(value || '').trim();
  // Evita interpretar entradas como fórmulas en Sheets.
  return /^[=+\\-@]/.test(text) ? "'" + text : text;
}
