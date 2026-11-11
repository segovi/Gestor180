const CONFIG = {
  // Pega aquí tu URL desplegada de Google Apps Script
  SHEETS_ENDPOINT: "https://script.google.com/macros/s/AKfycbxg9q4CHmpgAuLzS6bWt_kfQEanFvjC47_WMlJKB6uiyMZYgaaXOvnbtwz3RDEeV5h3_g/exec"
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

  // Buscamos el botón dentro del formulario
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (CONFIG.SHEETS_ENDPOINT.includes('PEGÁ_')) {
      status.textContent = 'Formulario listo. Configura la URL de Google Sheets en script.js.';
      return;
    }

    // 1. Deshabilitar botón y mostrar estado de carga
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando consulta...';
    }
    status.textContent = 'Enviando...';
    status.className = 'status sending';

    try {
      await fetch(CONFIG.SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: new URLSearchParams({...data, origen:'sitio-web'})
      });

      form.reset();
      status.textContent = '¡Gracias! Tu consulta fue enviada con éxito.';
      status.className = 'status success';
    } catch (error) {
      status.textContent = 'No se pudo enviar. Revisa la configuración de Google Sheets.';
      status.className = 'status error';
    } finally {
      // 2. Restaurar el botón al terminar (exitoso o fallido)
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar consulta';
      }
    }
  });
});
