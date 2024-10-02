const comprasTableBody = document.querySelector("#tablacompras tbody");

const compraFetch = async () => {
  try {
    const response = await fetch('https://provisoft-backend.vercel.app/compras');
    if (!response.ok) throw new Error('Network response was not ok');
    const compras = await response.json();
    console.log(compras, "hola"); 
    return compras;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
};
const formatNumber = (num) => {
  return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(num);
};

const comprasdet = async () => {
  const compras = await compraFetch();
  console.log('Filtered compras:', compras);
  
  comprasTableBody.innerHTML = ''; // Asegúrate de que comprasTableBody es una referencia válida al tbody de tu tabla

  compras.forEach(compra => {
    const row = `
      <tr key="${compra.idcompra}" class="justify-around text-justify"> 
        <td class="p-2">${compra.codigofactura}</td>
        <td class="p-2">${formatNumber(compra.montototal)}</td>
        <td class="p-2">${formatNumber(compra.descuento)}</td>
        <td class="p-2">${formatNumber(compra.totalpagar)}</td>
        <td class="p-2">${compra.nombre_proveedor}</td> <!-- Cambiado -->
        <td class="p-2">${compra.nombre_usuario}</td>   <!-- Cambiado -->
        <td class="p-2">${formatNumber(compra.iva || 0)}</td> <!-- Asegúrate de que iva se maneje correctamente -->
        <td class="p-2">${compra.fecha}</td>
        <td class="p-2">${compra.hora}</td>
      </tr>
    `;
    comprasTableBody.insertAdjacentHTML('beforeend', row);
  });
  
};

// Definición de showModal
const showModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
    
    // Cerrar el modal después de 3 segundos
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 3000); // 3000 milisegundos = 3 segundos
  }
};

const btnDelete = document.getElementById("btnDelete");
const deleteModal = document.getElementById("deleteModal");
const closeModal = document.getElementById("closeModal");
const documentInput = document.getElementById("documentInput");
const errorMsg = document.getElementById("errorMsg");
const deleteUsuario = document.getElementById("deleteCompra"); // Definido correctamente

btnDelete.addEventListener("click", () => {
  deleteModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  documentInput.value = "";
  errorMsg.classList.add("hidden");
});

deleteUsuario.addEventListener("click", async () => {
  const codigofacturas = documentInput.value.trim();

  if (!codigofacturas) {
    errorMsg.textContent = "Por favor, ingrese un código de factura.";
    errorMsg.classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch('https://provisoft-backend.vercel.app/eliminarCompras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codigofacturas: codigofacturas }),
    });

    if (response.ok) {
      showModal('sucesssmodall'); 
      deleteModal.classList.add("hidden");
      documentInput.value = "";
      errorMsg.classList.add("hidden");
      await comprasdet(); // Actualiza la tabla después de eliminar
    } else {
      const result = await response.json();
      errorMsg.textContent = result.error || "Compra no encontrada.";
      errorMsg.classList.remove("hidden");
      showModal('errorrrmodall'); 
    }
  } catch (error) {
    console.error("Error al eliminar compra:", error);
    errorMsg.textContent = "Error al procesar la solicitud.";
    errorMsg.classList.remove("hidden");
    showModal('errorrrmodall'); 
  }
});

// Llama a la función para mostrar las compras cuando sea necesario (por ejemplo, cuando se carga la página)
comprasdet();
