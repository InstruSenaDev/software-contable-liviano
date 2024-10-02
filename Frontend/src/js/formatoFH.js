// formatoFH.js
export function updateClock() {
  const fechaElem = document.getElementById('fecha');
  const horaElem = document.getElementById('hora');

  function update() {
    const now = new Date();
    const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeString = now.toTimeString().split(' ')[0]; // HH:MM:SS

    fechaElem.textContent = dateString;
    horaElem.textContent = timeString;
  }

  // Actualiza el reloj inmediatamente al cargar la página
  update();

  // Actualiza cada segundo
  setInterval(update, 1000);
}
export const obtenerFechaHora = () => {
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString(); // Formato de fecha: día/mes/año
  const hora = ahora.toLocaleTimeString(); // Formato de hora: horas:minutos:segundos AM/PM

  return { fecha, hora };
};
