export function validacioneSignup() {
  const form = document.getElementById("signupForm");

  if (!form) {
    console.error("Formulario no encontrado");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    // Limpiar errores previos
    document.getElementById('first_name_error').textContent = '';
    document.getElementById('last_name_error').textContent = '';
    document.getElementById('email_error').textContent = '';
    document.getElementById('company_error').textContent = '';
    document.getElementById('terms_error').textContent = '';

    // Validar nombre
    const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const firstName = document.getElementById('first_name').value;
    if (firstName.trim() === '') {
      document.getElementById('first_name_error').textContent = 'Nombres es requerido.';
      isValid = false;
    } else if (!namePattern.test(firstName)) {
      document.getElementById('first_name_error').textContent = 'El nombre no debe contener caracteres especiales.';
      isValid = false;
    }

    // Validar apellido
    const lastName = document.getElementById('last_name').value;
    if (lastName.trim() === '') {
      document.getElementById('last_name_error').textContent = 'Apellidos es requerido.';
      isValid = false;
    } else if (!namePattern.test(lastName)) {
      document.getElementById('last_name_error').textContent = 'El apellido no debe contener caracteres especiales.';
      isValid = false;
    }

    // Validar correo
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      document.getElementById('email_error').textContent = 'El correo es obligatorio.';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById('email_error').textContent = 'El correo debe ser válido (usuario@dominio.com).';
      isValid = false;
    }
   
    // Validar contraseña
    const password = document.getElementById('company').value;
    if (password.trim() === '') {
      document.getElementById('company_error').textContent = 'La contraseña es obligatoria.';
      isValid = false;
    } else if (password.length < 8) {
      document.getElementById('company_error').textContent = 'La contraseña debe tener al menos 8 caracteres.';
      isValid = false;
    }

    // Validar términos y condiciones
    const termsAccepted = document.getElementById('remember-me').checked;
    if (!termsAccepted) {
      document.getElementById('terms_error').textContent = 'Debes aceptar los términos y condiciones.';
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Recolectar datos del formulario
    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    };
    
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        mostrarModal('success-modal');
        console.log(formData, "Usuario registrado exitosamente");
        window.location.href = '/login';

      } else {
        mostrarModal('error-modal', result.message);
        console.error('Error al registrar usuario:', result.message);
      }
    } catch (error) {
      mostrarModal('error-modal', 'Error al enviar la solicitud');
      console.error('Error al enviar la solicitud:', error);
    }
  });
}

// Función para mostrar el modal
function mostrarModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden');
  modal.classList.add('opacity-100');
  
  setTimeout(() => {
    modal.classList.add('opacity-0');
    modal.classList.remove('opacity-100');
    
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300); // Duración de la transición de ocultación
  }, 2000); // Tiempo que el modal permanece visible
}


   document.getElementById('hidden_password').addEventListener('click', function () {
    const passwordInput = document.getElementById('company');
    const icon_password = document.getElementById('icon_password');

    // Toggle the type attribute using getAttribute() method
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

    // Toggle the icon based on the input type
    
    icon_password.src = isPassword ? '../../../public/img/white/show eye.svg' : '../../../public/img/white/hidden.svg';
  }); 
