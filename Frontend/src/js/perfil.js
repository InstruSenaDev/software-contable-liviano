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

    if (!input || !editBtn || !saveBtn || !cancelBtn || !errorSpan) {
      console.error(`No se encontró uno de los elementos para el campo ${campo}.`);
      return;
    }

    // Evento para botón "Edit"
    editBtn.addEventListener("click", function () {
      input.disabled = false; // Habilitar input
      editBtn.classList.add("hidden"); // Ocultar botón "edit"
      saveBtn.classList.remove("hidden"); // Mostrar botón "save"
      cancelBtn.classList.remove("hidden"); // Mostrar botón "cancel"
    });

    // Evento para botón "Cancel"
    cancelBtn.addEventListener("click", function () {
      input.disabled = true; // Deshabilitar input
      input.value = ""; // Limpiar input (opcional)
      errorSpan.textContent = ""; // Limpiar mensajes de error
      editBtn.classList.remove("hidden"); // Mostrar botón "edit"
      saveBtn.classList.add("hidden"); // Ocultar botón "save"
      cancelBtn.classList.add("hidden"); // Ocultar botón "cancel"
    });

    // Evento para botón "Save"
    saveBtn.addEventListener("click", function () {
      const valor = input.value.trim();
      console.log(`Validando ${campo}:`, valor); // Mensaje de depuración

      const isValid = validarCampo(campo, valor);
      if (isValid) {
        console.log(`Valor guardado para ${campo}:`, valor); // Aquí guardarías los datos
        input.disabled = true; // Deshabilitar input
        editBtn.classList.remove("hidden"); // Mostrar botón "edit"
        saveBtn.classList.add("hidden"); // Ocultar botón "save"
        cancelBtn.classList.add("hidden"); // Ocultar botón "cancel"
        errorSpan.textContent = ""; // Limpiar mensajes de error
      } else {
        console.log(`Campo ${campo} no válido:`, valor); // Mensaje de depuración
        errorSpan.textContent = `El campo ${campo} no es válido.`; // Mostrar mensaje de error
      }
    });
  }

  // Función para validar los campos
  function validarCampo(campo, valor) {
    let regex;
    switch (campo) {
      case "nombres":
      case "apellidos":
        regex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
        return regex.test(valor) && valor !== ""; // Validar que no esté vacío
      case "correo":
        regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación básica de correo
        return regex.test(valor);
      default:
        return false;
    }
  }

  // Función para obtener los datos del usuario
  function obtenerDatosUsuario() {
    const email = localStorage.getItem("email");

    if (!email) {
      console.error("Correo del usuario no encontrado en localStorage.");
      return;
    }

    fetch(`http://localhost:8080/usuariosLog?email=${encodeURIComponent(email)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const usuario = data[0];
          // Establecer los placeholders de los inputs
          document.getElementById("input-nombres").placeholder = usuario.nombre;
          document.getElementById("input-apellidos").placeholder = usuario.apellido;
          document.getElementById("input-correo").placeholder = usuario.correo;
        } else {
          console.log("Usuario no encontrado.");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  }
});
