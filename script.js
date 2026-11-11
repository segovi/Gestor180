const SHEET_NAME = 'Consultas';

function doPost(e) {
  try {
    var SHEET_ID = 'https://script.google.com/macros/s/AKfycbxUPhHwhGTeX-2-YM71egp4Cg2qNrkUD_Sp_5gXdMpfdSrTLtP33SE4DWO9tkCz2ZonLA/exec';
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Hoja 1"); // Cambia por el nombre real de tu pestaña si es necesario
    
    var data = {};
    
    // Soporta tanto JSON como parámetros de formulario enviados por fetch
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      data = JSON.parse(e.postData.contents);
    }

    sheet.appendRow([
      new Date(),
      data.nombre || '',
      data.telefono || '',
      data.email || '',
      data.mensaje || '',
      data.origen || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
           .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
           .setMimeType(ContentService.MimeType.JSON);
  }
}
