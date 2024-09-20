document.addEventListener("DOMContentLoaded", () => {
  const btnDelete = document.getElementById("btnDelete");
  const deleteModal = document.getElementById("deleteModal");
  const closeModal = document.getElementById("closeModal");
  const deleteProvider = document.getElementById("deleteProvider");
  const documentInput = document.getElementById("documentInput");
  const errorMsg = document.getElementById("errorMsg");

  // Función para mostrar un modal y ocultarlo después de 3 segundos
  const showModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden'); // Mostrar el modal
      setTimeout(() => {
        modal.classList.add('hidden'); // Ocultar el modal después de 3 segundos
      }, 3000);
    }
  };

  // Abrir el modal cuando se haga clic en el botón de eliminar
  btnDelete.addEventListener("click", () => {
    deleteModal.classList.remove("hidden");
  });

  // Cerrar el modal cuando se haga clic en el botón de cerrar
  closeModal.addEventListener("click", () => {
    deleteModal.classList.add("hidden");
    documentInput.value = "";
    errorMsg.classList.add("hidden");
  });

  // Lógica para eliminar proveedor
  deleteProvider.addEventListener("click", async () => {
    const documentNumber = documentInput.value.trim();

    if (!documentNumber) {
      errorMsg.textContent = "Por favor, ingrese un número de documento.";
      errorMsg.classList.remove("hidden");
      return;
    }

    try {
      const response = await fetch('https://provisoft-backend.vercel.app/eliminarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numerodocumento: documentNumber }),
      });

      if (response.ok) {
        showModal('modal-successxx'); 
        deleteModal.classList.add("hidden");
        documentInput.value = "";
        errorMsg.classList.add("hidden");
      } else {
        const result = await response.json();
        errorMsg.textContent = result.error || "Usuario no encontrado.";
        errorMsg.classList.remove("hidden");
        showModal('modal-error-xx'); 
      }
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      errorMsg.textContent = "Error al procesar la solicitud.";
      errorMsg.classList.remove("hidden");
      showModal('modal-error-xx');
    }
  });
});
