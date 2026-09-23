ÁNGELDS — SITIO WEB 3 PÁGINAS

Incluye:
- index.html (Inicio)
- servicios.html (Servicios)
- contacto.html (Contacto)
- styles.css (diseño responsive)
- script.js (menú móvil + envío del formulario)
- apps_script.gs (Google Apps Script para guardar consultas en Google Sheets)
- assets/ (recursos visuales de ÁngelDS)

CONEXIÓN CON GOOGLE SHEETS
1. Crea una Google Sheet.
2. Abre Extensiones > Apps Script.
3. Pega el contenido de apps_script.gs y guarda.
4. En Apps Script: Implementar/Deploy > Nueva implementación/New deployment > aplicación web/Web app.
5. Configura la ejecución con la cuenta propietaria y el acceso según el público que deba usar el formulario.
6. Copia la URL /exec que te dé Google.
7. En script.js reemplaza:
   SHEETS_ENDPOINT: "PEGÁ_AQUÍ_TU_URL_DE_APPS_SCRIPT"
   por tu URL /exec.
8. Publica los archivos del sitio en el hosting que prefieras.

La hoja "Consultas" se crea automáticamente si no existe y recibe:
Fecha, Nombre, Teléfono, Email, Mensaje, Origen.
