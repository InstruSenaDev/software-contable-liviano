export function validaciones (){

    document.getElementById('log-in').addEventListener('submit', function (event) {
        let isValid = true;
        document.getElementById('email_error').textContent = '';
        document.getElementById('password_error').textContent = '';
      
        const email = (document.getElementById('email')).value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        if (email.trim() === '') {
          document.getElementById('email_error').textContent = 'El correo es obligatorio';
          isValid = false;
        } else if (!emailPattern.test(email)) {
          document.getElementById('email_error').textContent = 'El correo debe contener un arroba (@)';
          isValid = false; 
        }
        const password = (document.getElementById('password')).value;
        if (password.trim() === '') {
          document.getElementById('password_error').textContent = 'La contraseña es obligatoria';
          isValid = false;
        } else if (password.length < 8) {
          document.getElementById('password_error').textContent = 'La contraseña debe tener al menos 8 caracteres.';
          isValid = false;
        }
      
        if (!isValid) {
          event.preventDefault();
        }
      });
}