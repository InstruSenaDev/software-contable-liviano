document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('log-in').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el envío del formulario
    let isValid = true;

    // Limpiar mensajes de error anteriores
    document.getElementById('email_error').textContent = '';
    document.getElementById('password_error').textContent = '';

    // Validación del correo electrónico
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      document.getElementById('email_error').textContent = 'El correo es obligatorio';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById('email_error').textContent = 'El correo debe contener un arroba (@)';
      isValid = false;
    }

    // Validación de la contraseña
    const password = document.getElementById('password').value;
    if (password.trim() === '') {
      document.getElementById('password_error').textContent = 'La contraseña es obligatoria';
      isValid = false;
    } else if (password.length < 8) {
      document.getElementById('password_error').textContent = 'La contraseña debe tener al menos 8 caracteres.';
      isValid = false;
    }

    // Si no es válido, detener el proceso
    if (!isValid) {
      return;
    }

    // Si las validaciones son correctas, proceder con el inicio de sesión
    const loginData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();
      if (response.ok) {
        mostrarModal('success-modal');
        // Redirigir a la página de inicio u otra página
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        mostrarModal('error-modal');
        document.getElementById('password_error').textContent = 'Credenciales inválidas';
        console.error('Error al iniciar sesión:', result.message);
      }
    } catch (error) {
      mostrarModal('error-modal');
      console.error('Error al enviar la solicitud:', error);
    } 
  });
  
  // Función para mostrar los modales
  function mostrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 2000);
    }
  }
});
