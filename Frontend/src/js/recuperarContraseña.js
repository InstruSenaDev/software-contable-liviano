document.getElementById('log-in').addEventListener('submit', function (event) {
  let isValid = true;
  document.getElementById('email_error').textContent = '';
  
  const email = document.getElementById('email').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email.trim() === '') {
    document.getElementById('email_error').textContent = 'El correo es obligatorio';
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById('email_error').textContent = 'El correo debe ser válido y contener un arroba (@)';
    isValid = false; 
  }
  
  if (!isValid) {
    event.preventDefault();
  } else {
    // Aquí podrías agregar la lógica para enviar el correo de recuperación
    alert("Se ha enviado un correo de recuperación si el correo existe en nuestra base de datos.");
  }
});
