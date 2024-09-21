document.addEventListener("DOMContentLoaded", () => {
    const btnDelete = document.getElementById("btnDelete");
    const deleteModal = document.getElementById("deleteModal");
    const closeModal = document.getElementById("closeModal");
    const deleteUsuario = document.getElementById("deleteUsuario");
    const documentInput = document.getElementById("documentInput");
    const errorMsg = document.getElementById("errorMsg");
    const searchInput = document.getElementById("searchInput");
    const adminTableBody = document.querySelector("#adminTable tbody");
  
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
  
    // Función para obtener usuarios activos
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://provisoft-backend.vercel.app/usuarios');
        if (!response.ok) throw new Error('Network response was not ok');
        const users = await response.json();
        console.log('Users fetched:', users); 
        return users.filter(user => user.estado === "activo");
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];
      }
    };
  
    const displayUsers = async () => {
      const users = await fetchUsers();
      console.log('Filtered users:', users); 
      adminTableBody.innerHTML = ''; 
      users.forEach(user => {
        const roleDescription = user.idrol === 1 ? "superadmin" : "administrador";
        const row = `
          <tr key="${user.idusuario}" class="border-b">
            <td class="p-2">${user.nombre}</td>
            <td class="p-2">${user.apellido}</td>
            <td class="p-2">${user.correo}</td>
            <td class="p-2">${roleDescription}</td>
          </tr>
        `;
        adminTableBody.insertAdjacentHTML('beforeend', row);
      });
    };
  
    const filterUsers = () => {
      const query = searchInput.value.toLowerCase();
      Array.from(adminTableBody.rows).forEach(row => {
        const cells = Array.from(row.cells);
        const match = cells.some(cell => cell.textContent.toLowerCase().includes(query));
        row.style.display = match ? '' : 'none';
      });
    };
  
    btnDelete.addEventListener("click", () => {
      deleteModal.classList.remove("hidden");
    });
  
    closeModal.addEventListener("click", () => {
      deleteModal.classList.add("hidden");
      documentInput.value = "";
      errorMsg.classList.add("hidden");
    });
  
    deleteUsuario.addEventListener("click", async () => {
      const correo = documentInput.value.trim();
  
      if (!correo) {
        errorMsg.textContent = "Por favor, ingrese un correo electrónico.";
        errorMsg.classList.remove("hidden");
        return;
      }
  
      try {
        const response = await fetch('https://provisoft-backend.vercel.app/eliminarUsuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo: correo }),
        });
  
        if (response.ok) {
          showModal('modal-successxxz'); 
          deleteModal.classList.add("hidden");
          documentInput.value = "";
          errorMsg.classList.add("hidden");
          await displayUsers();
        } else {
          const result = await response.json();
          errorMsg.textContent = result.error || "Administrador no encontrado.";
          errorMsg.classList.remove("hidden");
          showModal('modal-errorxxz'); 
        }
      } catch (error) {
        console.error("Error al eliminar proveedor:", error);
        errorMsg.textContent = "Error al procesar la solicitud.";
        errorMsg.classList.remove("hidden");
        showModal('modal-errorxxz'); 
      }
    });
  
    searchInput.addEventListener("input", filterUsers);
  
    displayUsers();
  });
