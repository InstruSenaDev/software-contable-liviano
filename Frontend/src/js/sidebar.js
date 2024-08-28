export function LogOut() {
    try {
      // Intentar eliminar el correo del localStorage
      localStorage.removeItem("email");
      console.log("Correo borrado del localStorage.");
  
      // Mostrar el modal de éxito
      mostrarModal("modal-success");
  
      // Redirigir después de mostrar el modal
      setTimeout(() => {
        window.location.href = "/"; 
      }, 3000);
    } catch (error) {
      mostrarModal("modal-error");
      console.error("Error al borrar el correo del localStorage:", error);
    }
    
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
      }, 100);
    }, 2000);
  }
