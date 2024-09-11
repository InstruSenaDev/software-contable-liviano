document.addEventListener("DOMContentLoaded", () => {
    const btnDelete = document.getElementById("btnDelete");
    const deleteModal = document.getElementById("deleteModal");
    const closeModal = document.getElementById("closeModal");
    const deleteProvider = document.getElementById("deleteProvider");
    const documentInput = document.getElementById("documentInput");
    const errorMsg = document.getElementById("errorMsg");
  
    const showModal = (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('hidden'); 
        setTimeout(() => {
          modal.classList.add('hidden'); 
        }, 3000);
      }
    };
  
    btnDelete.addEventListener("click", () => {
      deleteModal.classList.remove("hidden");
    });
  
    closeModal.addEventListener("click", () => {
      deleteModal.classList.add("hidden");
      documentInput.value = "";
      errorMsg.classList.add("hidden");
    });
});