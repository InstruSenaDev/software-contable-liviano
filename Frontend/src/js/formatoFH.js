// formatoFH.js
export function updateClock() {
    const fechaSpan = document.getElementById('fecha');
    const horaSpan = document.getElementById('hora');
  
    function actualizarFechaHora() {
      const now = new Date();
      fechaSpan.textContent = now.toLocaleDateString();
      horaSpan.textContent = now.toLocaleTimeString();
    }
  
    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000);
  }
  