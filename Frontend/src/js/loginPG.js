export function validacioneLogin() {
  document
    .getElementById("log-in")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Evita el envío del formulario por defecto
      let isValid = true;

      // Limpiar mensajes de error anteriores
      document.getElementById("email_error").textContent = "";
      document.getElementById("password_error").textContent = "";

      // Validación del correo electrónico
      const email = document.getElementById("email").value;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.trim() === "") {
        document.getElementById("email_error").textContent =
          "El correo es obligatorio";
        isValid = false;
      } else if (!emailPattern.test(email)) {
        document.getElementById("email_error").textContent =
          "El correo debe ser válido (usuario@dominio.com).";
        isValid = false;
      }

      // Validación de la contraseña
      const password = document.getElementById("password").value;
      if (password.trim() === "") {
        document.getElementById("password_error").textContent =
          "La contraseña es obligatoria";
        isValid = false;
      } else if (password.length < 8) {
        document.getElementById("password_error").textContent =
          "La contraseña debe tener al menos 8 caracteres.";
        isValid = false;
      }

      // Si no es válido, detener el proceso
      if (!isValid) {
        return;
      }

      // Guardar el correo en localStorage
      localStorage.setItem("email", email);

      // Aquí procedes con el envío de datos al servidor, etc.
      const loginData = {
        email: email,
        password: password,
      };

      try {
        const response = await fetch("https://provisoft-backend.vercel.app/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const result = await response.json();
        if (response.ok) {
          mostrarModal("modal-success");
          console.log(result, "Inicio de sesión exitoso");
          setTimeout(() => {
            window.location.href = "/inicioDedashboard";
          }, 1000); // Redirigir a otra página
        } else {
          mostrarModal("modal-error", result.textContent);
          document.getElementById("password_error").textContent =
            "Credenciales inválidas";
          console.error("Error al iniciar sesión:", result.message);
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        mostrarModal("modal-error", "Error al enviar la solicitud");
        alert("Error al iniciar sesión, por favor intente nuevamente.");
      }
    });
}

export function eyeHidden() {
  const passwordInput = document.getElementById("password");
  const iconPassword = document.getElementById("icon_password");

  // Toggle password visibility
  const isPassword = passwordInput.getAttribute("type") === "password";
  passwordInput.setAttribute("type", isPassword ? "text" : "password");

  // Change the icon based on the input type
  iconPassword.innerHTML = isPassword
    ? `<svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_873_527)">
        <path d="M17 3.17617e-05C13.3324 -0.00681295 9.74794 1.09278 6.71507 3.15513C3.68219 5.21748 1.34191 8.14669 0 11.56C1.33571 14.9691 3.66806 17.8963 6.69265 19.9597C9.71725 22.0231 13.2936 23.1268 16.955 23.1268C20.6164 23.1268 24.1928 22.0231 27.2173 19.9597C30.2419 17.8963 32.5743 14.9691 33.91 11.56C32.5749 8.16017 30.2487 5.24009 27.2333 3.17872C24.2179 1.11736 20.6526 0.00989043 17 3.17617e-05ZM17 20C14.1632 20.0172 11.3797 19.2297 8.97248 17.7287C6.56526 16.2277 4.63303 14.0749 3.4 11.52C4.6464 8.97692 6.58111 6.8344 8.98433 5.3359C11.3875 3.83741 14.1629 3.04303 16.995 3.04303C19.8271 3.04303 22.6025 3.83741 25.0057 5.3359C27.4089 6.8344 29.3436 8.97692 30.59 11.52C29.3577 14.0733 27.427 16.2251 25.0217 17.726C22.6165 19.2269 19.8351 20.0153 17 20Z" fill="#565656"/>
        <path d="M16.96 18.5001C20.7929 18.5001 23.9 15.393 23.9 11.5601C23.9 7.72726 20.7929 4.62012 16.96 4.62012C13.1272 4.62012 10.02 7.72726 10.02 11.5601C10.02 15.393 13.1272 18.5001 16.96 18.5001Z" fill="#565656"/>
        </g>
        <defs>
        <clipPath id="clip0_873_527">
        <rect width="33.91" height="23.12" fill="white"/>
        </clipPath>
        </defs>
      </svg>`
    : `<svg width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_873_537)">
        <path d="M16.93 5.46004C19.7606 5.44761 22.537 6.23637 24.9382 7.73519C27.3395 9.234 29.2677 11.3817 30.5 13.93C29.6085 15.7694 28.3452 17.4038 26.79 18.73L29 20.9C31.1682 18.9909 32.8483 16.5908 33.9 13.9C32.1936 9.59104 28.911 6.09315 24.719 4.11691C20.5269 2.14067 15.7397 1.83431 11.33 3.26004L13.87 5.80004C14.8761 5.58544 15.9012 5.47154 16.93 5.46004Z" fill="black"/>
        <path d="M15.28 7.22L18.47 10.4L20.47 12.4L23.65 15.59C23.9205 14.5686 23.9506 13.4985 23.7381 12.4635C23.5256 11.4285 23.0762 10.4541 22.4222 9.61774C21.7681 8.78139 20.9257 8.10444 19.9597 7.63756C18.9937 7.17067 17.9296 6.92611 16.86 6.92004C16.378 6.92215 15.8983 6.97685 15.43 7.08L15.28 7.22ZM4 0.800049L7.89 4.69005L8.21 5.00005C6.30518 6.19997 4.62195 7.78374 3.27 9.64005C2.405 10.8409 1.69045 12.153 1.15 13.5401C2.85763 17.849 6.1404 21.347 10.3325 23.3232C14.5245 25.2995 19.3117 25.6059 23.72 24.1801L26.08 26.5301L28.63 29.1001L30 27.6601L5.45 3.11005L4 0.800049ZM17.12 18.1801C16.3718 18.1758 15.6352 18.0155 14.96 17.7101C14.2849 17.4047 13.6886 16.9627 13.21 16.4101C12.7826 15.916 12.4594 15.3485 12.26 14.7401C12.0606 14.1317 11.9899 13.4947 12.0536 12.8641C12.1173 12.2335 12.3131 11.6246 12.63 11.0801L14.49 12.9401C14.3659 13.2231 14.3037 13.5336 14.3095 13.847C14.3153 14.1605 14.3888 14.468 14.5238 14.7447C14.6588 15.0214 14.8517 15.2599 15.09 15.4401C15.3283 15.6202 15.6056 15.7367 15.9 15.7801C16.2163 15.8294 16.5371 15.8009 16.84 15.7001L17.6 16.4701L18.54 17.4101C18.2271 17.5894 17.8842 17.7278 17.53 17.8201C17.3921 17.8564 17.254 17.8841 17.12 17.9001V18.1801Z" fill="black"/>
        </g>
        <defs>
        <clipPath id="clip0_873_537">
        <rect width="34" height="30" fill="white"/>
        </clipPath>
        </defs>
      </svg>`;
}

export function mostrarModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.error(`No se encontró un elemento con el ID: ${modalId}`);
    return;
  }
  modal.classList.remove("hidden");
  modal.classList.add("opacity-100");

  setTimeout(() => {
    modal.classList.add("opacity-0");
    modal.classList.remove("opacity-100");

    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }, 3000); 
}
