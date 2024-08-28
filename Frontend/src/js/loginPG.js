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
          "El correo debe contener un arroba (@)";
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
        const response = await fetch("http://localhost:8080/login", {
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
            window.location.href = "/tProviders";
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
  const icon_password = document.getElementById("icon_password");

  // Toggle the type attribute using getAttribute() method
  const isPassword = passwordInput.getAttribute("type") === "password";
  passwordInput.setAttribute("type", isPassword ? "text" : "password");

  // Toggle the icon based on the input type
  icon_password.src = isPassword
    ? "../../../public/img/white/show eye.svg"
    : "../../../public/img/white/hidden.svg";
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
    }, 300); // Duración de la transición de ocultación
  }, 3000); // Tiempo que el modal permanece visible
}
