document.addEventListener("DOMContentLoaded", function () {
  // Configuración de edición de los campos
  configurarEdicion("nombres");
  configurarEdicion("apellidos");
  configurarEdicion("correo");

  // Llamar a la función para obtener los datos del usuario
  obtenerDatosUsuario();

  function configurarEdicion(campo) {
    const input = document.getElementById(`input-${campo}`);
    const editBtn = document.getElementById(`edit-${campo}`);
    const saveBtn = document.getElementById(`save-${campo}`);
    const cancelBtn = document.getElementById(`cancel-${campo}`);

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
      editBtn.classList.remove("hidden"); // Mostrar botón "edit"
      saveBtn.classList.add("hidden"); // Ocultar botón "save"
      cancelBtn.classList.add("hidden"); // Ocultar botón "cancel"
    });

    // Evento para botón "Save"
    saveBtn.addEventListener("click", function () {
      console.log(`Valor guardado para ${campo}:`, input.value); // Puedes añadir aquí la lógica para guardar

      input.disabled = true; // Deshabilitar input
      editBtn.classList.remove("hidden"); // Mostrar botón "edit"
      saveBtn.classList.add("hidden"); // Ocultar botón "save"
      cancelBtn.classList.add("hidden"); // Ocultar botón "cancel"
    });
  }

  // Función para obtener los datos del usuario
  function obtenerDatosUsuario() {
    // Obtener el correo desde localStorage
    const email = localStorage.getItem("email"); // Reemplaza con la clave que uses para almacenar el correo

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
