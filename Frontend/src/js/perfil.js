
document.addEventListener("DOMContentLoaded", function () {
  // Configuración de edición de los campos
  configurarEdicion("nombres", "name-error");
  configurarEdicion("apellidos", "lastName-error");
  configurarEdicion("correo", "email-error");

  obtenerDatosUsuario();

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

    if (!input || !editBtn || !saveBtn || !cancelBtn || !errorSpan) {
      console.error(`No se encontró uno de los elementos para el campo ${campo}.`);
      return;
    }

    // Evento para botón "Edit"
    editBtn.addEventListener("click", function () {
      valorOriginal = input.value;
      input.value = "";
      input.disabled = false;
      editBtn.classList.add("hidden");
      saveBtn.classList.remove("hidden");
      cancelBtn.classList.remove("hidden");
    });

    // Evento para botón "Cancel"
    cancelBtn.addEventListener("click", function () {
      input.disabled = true;
      input.value = valorOriginal;
      errorSpan.textContent = "";
      editBtn.classList.remove("hidden");
      saveBtn.classList.add("hidden");
      cancelBtn.classList.add("hidden");
    });

    // Evento para botón "Save"
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
        default:
          return false;
      }
    }

    if (mensajeError) {
      errorSpan.textContent = mensajeError;
      return false;
    }

    return true;
  }

  function obtenerDatosUsuario() {
    const email = localStorage.getItem("email");

    if (!email) {
      console.error("Correo del usuario no encontrado en localStorage.");
      return;
    }

    fetch(`https://provisoft-backend.vercel.app/usuariosLog?email=${encodeURIComponent(email)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const usuario = data[0];
          document.getElementById("input-nombres").value = usuario.nombre || '';
          document.getElementById("input-apellidos").value = usuario.apellido || '';
          document.getElementById("input-correo").value = usuario.correo || '';
        } else {
          console.log("Usuario no encontrado.");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error.message);
      });
  }

  function mostrarMensajeExitoso() {
    const modalExito = document.getElementById("modal-editexitoso");
    modalExito.classList.remove("hidden");
    setTimeout(() => {
      modalExito.classList.add("hidden");
    }, 3000);
  }

  function mostrarMensajeError() {
    const modalError = document.getElementById("modal-erroredit");
    modalError.classList.remove("hidden");
    setTimeout(() => {
      modalError.classList.add("hidden");
    }, 3000);
  }

  function guardarCambios(campo, valor) {
    const email = localStorage.getItem("email");

    if (!email) {
      console.error("Correo del usuario no encontrado en localStorage.");
      return;
    }

    const data = {
      [campo]: valor,
      email
    };

    fetch("https://provisoft-backend.vercel.app/actualizarPerfil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          mostrarMensajeError();
          throw new Error("Error al actualizar los datos.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos actualizados exitosamente:", data);
        localStorage.setItem(campo, valor);
        actualizarVistaSuperior();
        mostrarMensajeExitoso();
      })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error.message);
        mostrarMensajeError();
      });
  }

  function actualizarVistaSuperior() {
    // Actualizar vista superior con los nuevos datos
  }
});

