document.addEventListener("DOMContentLoaded", function () {
  // Configurar los campos de edición
  const campos = [
    { campo: "nombres", errorId: "name-error" },
    { campo: "apellidos", errorId: "lastName-error" },
    { campo: "correo", errorId: "email-error" }
  ];

  campos.forEach(({ campo, errorId }) => {
    configurarEdicion(campo, errorId);
  });

  // Obtener datos de usuario y actualizar la vista superior
  obtenerDatosUsuario();
  actualizarVistaSuperior();

  // Función para configurar la edición de campos
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

    // Botón "Editar"
    editBtn.addEventListener("click", () => {
      valorOriginal = input.value;
      input.value = "";
      toggleEdicion(true);
    });

    // Botón "Cancelar"
    cancelBtn.addEventListener("click", () => {
      input.value = valorOriginal;
      toggleEdicion(false);
    });

    // Botón "Guardar"
    saveBtn.addEventListener("click", () => {
      const valor = input.value.trim();
      if (validarCampo(campo, valor, errorSpan)) {
        guardarCambios(campo, valor);
        toggleEdicion(false);
      }
    });

    // Función auxiliar para alternar entre edición y vista normal
    function toggleEdicion(enEdicion) {
      input.disabled = !enEdicion;
      editBtn.classList.toggle("hidden", enEdicion);
      saveBtn.classList.toggle("hidden", !enEdicion);
      cancelBtn.classList.toggle("hidden", !enEdicion);
      errorSpan.textContent = "";
    }
  }

  // Validación de campos
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
          if (!regex.test(valor)) mensajeError = `El campo ${campo} solo puede contener letras y espacios.`;
          break;
        case "correo":
          regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!regex.test(valor)) mensajeError = `El campo ${campo} debe ser un correo electrónico válido.`;
          break;
        default:
          return false;
      }
    }

    errorSpan.textContent = mensajeError;
    return mensajeError === "";
  }

  // Obtener datos del usuario
  function obtenerDatosUsuario() {
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("Correo del usuario no encontrado en localStorage.");
      return;
    }

    fetch(`http://localhost:8080/usuariosLog?email=${encodeURIComponent(email)}`)
    
      .then(response => response.ok ? response.json() : Promise.reject("Error al obtener los datos del usuario."))
      .then(data => {
        if (data.length > 0) {
          const usuario = data[0];
          document.getElementById("input-nombres").value = usuario.nombre || '';
          document.getElementById("input-apellidos").value = usuario.apellido || '';
          document.getElementById("input-correo").value = usuario.correo || '';
        } else {
          console.log("Usuario no encontrado.");
        }
      })
      .catch(error => console.error("Error al realizar la solicitud:", error));
  }

  // Guardar cambios del perfil
  function guardarCambios(campo, valor) {
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("Correo del usuario no encontrado en localStorage.");
      return;
    }

    const data = { [campo]: valor, email };

    fetch("http://localhost:8080/actualizarPerfil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.ok ? response.json() : Promise.reject("Error al actualizar los datos."))
    .then(() => {
      localStorage.setItem(campo, valor);
      actualizarVistaSuperior();
    })
    .catch(error => console.error("Error al actualizar los datos:", error));
  }

  // Actualizar la vista superior con los datos de localStorage
  function actualizarVistaSuperior() {
    const nombreUsuario = localStorage.getItem("nombres");
    const correoUsuario = localStorage.getItem("email");

    document.getElementById("nombre-usuario").textContent = nombreUsuario || "Usuario";
    document.getElementById("correo-usuario").textContent = correoUsuario || "Correo no disponible";
  }
});
