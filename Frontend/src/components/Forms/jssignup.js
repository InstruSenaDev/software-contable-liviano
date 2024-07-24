
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      document.getElementById('first_name_error').textContent = '';
      document.getElementById('last_name_error').textContent = '';
      document.getElementById('email_error').textContent = '';
      document.getElementById('company_error').textContent = '';
      document.getElementById('terms_error').textContent = '';

      // Validate first name
      const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Añadí caracteres en español
      const firstName = (document.getElementById('first_name')).value;
      if (firstName.trim() === '') {
        document.getElementById('first_name_error').textContent = 'Nombres es requerido.';
        isValid = false;
      } else if (!namePattern.test(firstName)) {
        document.getElementById('first_name_error').textContent = 'El nombre no debe contener caracteres especiales.';
        isValid = false;
      }

      // Validate last name
      const lastName = (document.getElementById('last_name')).value;
      if (lastName.trim() === '') {
        document.getElementById('last_name_error').textContent = 'Apellidos es requerido.';
        isValid = false;
      } else if (!namePattern.test(lastName)) {
        document.getElementById('last_name_error').textContent = 'El apellido no debe contener caracteres especiales.';
        isValid = false;
      }

      // Validate email
      const email = (document.getElementById('email')).value;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.trim() === '') {
        document.getElementById('email_error').textContent = 'El correo es obligatorio.';
        isValid = false;
      } else if (!emailPattern.test(email)) {
        document.getElementById('email_error').textContent = 'El correo debe ser válido (usuario@dominio.com).';
        isValid = false;
      }

      // Validate password
      const password = (document.getElementById('company')).value;
      if (password.trim() === '') {
        document.getElementById('company_error').textContent = 'La contraseña es obligatoria.';
        isValid = false;
      } else if (password.length < 8) {
        document.getElementById('company_error').textContent = 'La contraseña debe tener al menos 8 caracteres.';
        isValid = false;
      }

      // Validate terms acceptance
      const termsAccepted = (document.getElementById('remember-me')).checked;
      if (!termsAccepted) {
        document.getElementById('terms_error').textContent = 'Debes aceptar los términos y condiciones.';
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Collect form data
      const formData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      };

      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (response.ok) {
          alert('Usuario registrado exitosamente');
          console.log(formData, "Usuario registrado exitosamente");
        } else {
          alert('Error al registrar usuario:1 ' + result.message);
          console.error('Error al registrar usuario:2', result.message);
          console.log(formData);

        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Error al registrar usuario 3');
        console.log(formData);
      }
    });
  });

