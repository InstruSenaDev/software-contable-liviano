document.addEventListener("DOMContentLoaded", function () {
    // Configuración para el campo de "Nombres"
    configurarEdicion("nombres");
    // Configuración para el campo de "Apellidos"
    configurarEdicion("apellidos");
    // Configuración para el campo de "Correo"
    configurarEdicion("correo");
  
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
  });
  