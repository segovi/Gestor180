const CONFIG = {
  // Paste your deployed Google Apps Script Web App URL here.
  SHEETS_ENDPOINT: "PEGÁ_AQUÍ_TU_URL_DE_APPS_SCRIPT"
};

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
  const form = document.querySelector('#contactForm');
  const status = document.querySelector('#formStatus');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (CONFIG.SHEETS_ENDPOINT.includes('PEGÁ_')) {
      status.textContent = 'Formulario listo. Configura la URL de Google Sheets en script.js.';
      return;
    }
    status.textContent = 'Enviando...';
    try {
      await fetch(CONFIG.SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: new URLSearchParams({...data, origen:'sitio-web'})
      });
      form.reset();
      status.textContent = '¡Gracias! Tu consulta fue enviada.';
    } catch (error) {
      status.textContent = 'No se pudo enviar. Revisa la configuración de Google Sheets.';
    }
  });
});
