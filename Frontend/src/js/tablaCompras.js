const comprasTableBody = document.querySelector("#tablacompras tbody")

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

const comprasdet = async () => {
  const compras = await compraFetch();
  console.log('Filtered compras:', compras);
  
  comprasTableBody.innerHTML = ''; // Asegúrate de que comprasTableBody es una referencia válida al tbody de tu tabla

  compras.forEach(compra => {
    const row = `
      <tr key="${compra.idcompra}" class=" justify-around text-justify" > 
        <td class="p-2">${compra.codigofactura}</td>
        <td class="p-2">${compra.montototal}</td>
        <td class="p-2">${compra.descuento}</td>
        <td class="p-2">${compra.totalpagar}</td>
        <td class="p-2">${compra.idproveedores}</td>
        <td class="p-2">${compra.idusuarios}</td>
        <td class="p-2">${compra.iva}</td>
        <td class="p-2">${compra.fecha}</td>
        <td class="p-2">${compra.hora}</td>
        <td class="p-2  text-white text-center "><button class="bg-blue-baby3 rounded-full w-5 h-5 text-center item-center">+</button></td>

      </tr>
    `;
    comprasTableBody.insertAdjacentHTML('beforeend', row);
  });
};

// Llama a la función para mostrar las compras cuando sea necesario (por ejemplo, cuando se carga la página)
comprasdet();

