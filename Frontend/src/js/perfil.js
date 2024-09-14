document.addEventListener("DOMContentLoaded", function () {
  // Configuración de edición de los campos
  configurarEdicion("nombres", "name-error");
  configurarEdicion("apellidos", "lastName-error");
  configurarEdicion("correo", "email-error");

  obtenerDatosUsuario();

  // Botón global de "Guardar cambios"
  document.getElementById("guardar-cambios").addEventListener("click", function () {
    guardarCambios("nombres", document.getElementById("input-nombres").value);
    guardarCambios("apellidos", document.getElementById("input-apellidos").value);
    guardarCambios("correo", document.getElementById("input-correo").value);
  });

  function configurarEdicion(campo, errorId) {
    const input = document.getElementById(`input-${campo}`);
    const editBtn = document.getElementById(`edit-${campo}`);
    const saveBtn = document.getElementById(`save-${campo}`);
    const cancelBtn = document.getElementById(`cancel-${campo}`);
    const errorSpan = document.getElementById(errorId);

    let valorOriginal;

    editBtn.addEventListener("click", function () {
      valorOriginal = input.value;
      input.disabled = false;
      input.value = "";
      editBtn.classList.add("hidden");
      saveBtn.classList.remove("hidden");
      cancelBtn.classList.remove("hidden");
    });

    cancelBtn.addEventListener("click", function () {
      input.disabled = true;
      input.value = valorOriginal;
      errorSpan.textContent = "";
      editBtn.classList.remove("hidden");
      saveBtn.classList.add("hidden");
      cancelBtn.classList.add("hidden");
    });

    saveBtn.addEventListener("click", function () {
      const valor = input.value.trim();
      const isValid = validarCampo(campo, valor, errorSpan);

      if (isValid) {
        input.disabled = true;
        editBtn.classList.remove("hidden");
        saveBtn.classList.add("hidden");
        cancelBtn.classList.add("hidden");
        errorSpan.textContent = "";
      }
    });
  }

  // Función para validar campos
  function validarCampo(campo, valor, errorSpan) {
    let regex;
    let mensajeError = "";

    if (valor === "") {
      mensajeError = `El campo ${campo} no puede estar vacío.`;
    } else {
      switch (campo) {
        case "nombres":
        case "apellidos":
          regex = /^[a-zA-Z\s]+$/;
          if (!regex.test(valor)) {
            mensajeError = `El campo ${campo} solo puede contener letras y espacios.`;
          }
          break;
        case "correo":
          regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!regex.test(valor)) {
            mensajeError = `El campo ${campo} debe ser un correo electrónico válido.`;
          }
          break;
      }
    }

    if (mensajeError) {
      errorSpan.textContent = mensajeError;
      return false;
    }

    return true;
  }

  // Obtener datos del usuario
  function obtenerDatosUsuario() {
    const email = localStorage.getItem("email");

    if (!email) {
      console.error("Correo no encontrado.");
      return;
    }

    fetch(`http://localhost:8080/api/usuario/${email}`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("input-nombres").value = data.nombres || "";
        document.getElementById("input-apellidos").value = data.apellidos || "";
        document.getElementById("input-correo").value = data.correo || "";
      })
      .catch((error) => {
        console.error("Error al obtener datos del usuario:", error);
        mostrarModalError();
      });
  }

  // Guardar cambios
  function guardarCambios(campo, valor) {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:8080/api/usuario/${email}`, {
      method: "PUT",
      body: JSON.stringify({ [campo]: valor }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        mostrarModalExito();

        // Guardar los nuevos datos en localStorage
        if (campo === "nombres") {
          localStorage.setItem("nombres", valor);
        } else if (campo === "apellidos") {
          localStorage.setItem("apellidos", valor);
        } else if (campo === "correo") {
          localStorage.setItem("email", valor);
        }
      })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error);
        mostrarModalError();
      });
  }

  // Mostrar modal de éxito
  function mostrarModalExito() {
    const modal = document.getElementById("modal-editexitoso");
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 3000); // Ocultar modal después de 3 segundos
  }

  // Mostrar modal de error
  function mostrarModalError() {
    const modal = document.getElementById("modal-erroredit");
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 3000); // Ocultar modal después de 3 segundos
  }
});
