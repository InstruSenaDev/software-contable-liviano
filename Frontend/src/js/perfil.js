document.addEventListener("DOMContentLoaded", function () {
  // Configuración de edición de los campos
  configurarEdicion("nombres", "name-error");
  configurarEdicion("apellidos", "lastName-error");
  configurarEdicion("correo", "email-error");

  // Llamar a la función para obtener los datos del usuario
  obtenerDatosUsuario();

  function configurarEdicion(campo, errorId) {
    const input = document.getElementById(`input-${campo}`);
    const editBtn = document.getElementById(`edit-${campo}`);
    const saveBtn = document.getElementById(`save-${campo}`);
    const cancelBtn = document.getElementById(`cancel-${campo}`);
    const errorSpan = document.getElementById(errorId);

    let valorOriginal;

    if (!input || !editBtn || !saveBtn || !cancelBtn || !errorSpan) {
      console.error(
        `No se encontró uno de los elementos para el campo ${campo}.`
      );
      return;
    }

    // Evento para botón "Edit"
    editBtn.addEventListener("click", function () {
      valorOriginal = input.value; // Guardar el valor original
      input.value = ""; // Limpiar el input para ingresar un nuevo dato
      input.disabled = false;
      editBtn.classList.add("hidden");
      saveBtn.classList.remove("hidden");
      cancelBtn.classList.remove("hidden");
    });

    // Evento para botón "Cancel"
    cancelBtn.addEventListener("click", function () {
      input.disabled = true;
      input.value = valorOriginal; // Restaurar el valor original
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
        console.log(`Guardando cambios para ${campo}: ${valor}`);
        guardarCambios(campo, valor); // Guardar los cambios en la base de datos
        input.disabled = true;
        editBtn.classList.remove("hidden");
        saveBtn.classList.add("hidden");
        cancelBtn.classList.add("hidden");
        errorSpan.textContent = "";
      }
    });
  }

  // Función para validar los campos
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

  // Función para obtener los datos del usuario
  function obtenerDatosUsuario() {
    const email = localStorage.getItem("email");

    if (!email) {
      console.error("Correo del usuario no encontrado en localStorage.");
      return;
    }

    fetch(
      `http://localhost:8080/usuariosLog?email=${encodeURIComponent(email)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const usuario = data[0];
          // Establecer los valores de los inputs
          document.getElementById("input-nombres").value = usuario.nombre || "";
          document.getElementById("input-apellidos").value =
            usuario.apellido || "";
          document.getElementById("input-correo").value = usuario.correo || "";
        } else {
          console.log("Usuario no encontrado.");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error.message);
      });
  }

  // Función para guardar los cambios
  function guardarCambios(campo, valor) {
    const email = localStorage.getItem("email");

    if (!email) {
      console.error("Correo del usuario no encontrado en localStorage.");
      return;
    }

    const data = {
      [campo]: valor, // Usamos la clave del campo como la propiedad del objeto
      email,
    };

    fetch("http://localhost:8080/actualizarPerfil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar los datos.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos actualizados exitosamente:", data);
      })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error.message);
      });
  }
});
