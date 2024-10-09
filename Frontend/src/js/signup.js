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
    const userId = localStorage.getItem("userId"); 


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
      password: password,
      userId: userId
    };
    
    try {
      const response = await fetch('https://provisoft-backend.vercel.app/register', {
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
        window.location.href = '/tUsuarios';

      } else {
        mostrarModal('error-modal', result.message);
        console.error('Error al registrar usuario:', result.message,);
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
  }, 3000); // Tiempo que el modal permanece visible
}



   document.getElementById('hidden_password').addEventListener('click', function () {
    const passwordInput = document.getElementById('company');
    const icon_password = document.getElementById('icon_password');

    // Toggle the type attribute using getAttribute() method
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

    // Toggle the icon based on the input type
    
    icon_password.src = isPassword ? `<svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_873_527)">
<path d="M17 3.17617e-05C13.3324 -0.00681295 9.74794 1.09278 6.71507 3.15513C3.68219 5.21748 1.34191 8.14669 0 11.56C1.33571 14.9691 3.66806 17.8963 6.69265 19.9597C9.71725 22.0231 13.2936 23.1268 16.955 23.1268C20.6164 23.1268 24.1928 22.0231 27.2173 19.9597C30.2419 17.8963 32.5743 14.9691 33.91 11.56C32.5749 8.16017 30.2487 5.24009 27.2333 3.17872C24.2179 1.11736 20.6526 0.00989043 17 3.17617e-05ZM17 20C14.1632 20.0172 11.3797 19.2297 8.97248 17.7287C6.56526 16.2277 4.63303 14.0749 3.4 11.52C4.6464 8.97692 6.58112 6.8344 8.98433 5.3359C11.3875 3.83741 14.1629 3.04303 16.995 3.04303C19.8271 3.04303 22.6025 3.83741 25.0057 5.3359C27.4089 6.8344 29.3436 8.97692 30.59 11.52C29.3577 14.0733 27.427 16.2251 25.0217 17.726C22.6165 19.2269 19.8351 20.0153 17 20Z" fill="black"/>
<path d="M16.96 18.5001C20.7929 18.5001 23.9 15.393 23.9 11.5601C23.9 7.72726 20.7929 4.62012 16.96 4.62012C13.1272 4.62012 10.02 7.72726 10.02 11.5601C10.02 15.393 13.1272 18.5001 16.96 18.5001Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_873_527">
<rect width="33.91" height="23.12" fill="white"/>
</clipPath>
</defs>
</svg>
` : `<svg width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_873_537)">
<path d="M16.93 5.46004C19.7606 5.44761 22.537 6.23637 24.9382 7.73519C27.3395 9.234 29.2677 11.3817 30.5 13.93C29.6085 15.7694 28.3452 17.4038 26.79 18.73L29 20.9C31.1682 18.9909 32.8483 16.5908 33.9 13.9C32.1936 9.59104 28.911 6.09315 24.719 4.11691C20.5269 2.14067 15.7397 1.83431 11.33 3.26004L13.87 5.80004C14.8761 5.58544 15.9012 5.47154 16.93 5.46004Z" fill="black"/>
<path d="M15.28 7.22L18.47 10.4L20.47 12.4L23.65 15.59C23.9205 14.5686 23.9506 13.4985 23.7381 12.4635C23.5256 11.4285 23.0762 10.4568 22.4252 9.62462C21.7742 8.79243 20.9392 8.12238 19.9858 7.66701C19.0324 7.21164 17.9864 6.98334 16.93 7C16.3728 7.00231 15.8183 7.07625 15.28 7.22ZM1.55 2.19L5.68 6.31C3.13819 8.29526 1.17647 10.927 0 13.93C1.76386 18.42 5.23902 22.0254 9.66107 23.9533C14.0831 25.8811 19.0899 25.9735 23.58 24.21L28.84 29.47L31 27.3L3.72 0L1.55 2.19ZM7.86 8.5L10.56 11.19C10.1859 12.0407 9.99508 12.9607 10 13.89C9.99707 15.0282 10.2766 16.1493 10.8134 17.1529C11.3503 18.1565 12.1277 19.0112 13.0761 19.6405C14.0245 20.2698 15.1142 20.6539 16.2475 20.7586C17.3808 20.8632 18.5224 20.685 19.57 20.24L19.63 20.3L21.14 21.81C19.7622 22.1914 18.3396 22.3865 16.91 22.39C14.0836 22.3944 11.3131 21.6033 8.91514 20.1072C6.5172 18.6112 4.58864 16.4705 3.35 13.93C4.40767 11.792 5.95244 9.93211 7.86 8.5Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_873_537">
<rect width="33.86" height="29.47" fill="white"/>
</clipPath>
</defs>
</svg>

`;
  }); 
