let cuentasContables = [];
let cuentasSeleccionadas = [];

// Función para formatear números con separadores de miles
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Función para llenar el select de proveedores desde la base de datos
export function desplegable() {
  const selectElement = document.getElementById("proveedor");

  fetch("https://provisoft-backend.vercel.app/proveedores")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((proveedor) => {
        const option = document.createElement("option");
        option.value = proveedor.idproveedores;
        option.textContent = proveedor.nombre;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los proveedores:", error);
    });
}

// Función para llenar el select de cuentas contables desde la base de datos
export function desplegableCuentas() {
  const selectElement = document.getElementById("cuentaz");

  fetch("https://provisoft-backend.vercel.app/cuentas")
    .then((response) => response.json())
    .then((data) => {
      // Ordenar las cuentas por el primer dígito y luego numéricamente
      cuentasContables = data.sort((a, b) => {
        const primerDigitoA = a.codigo[0];
        const primerDigitoB = b.codigo[0];

        // Comparar por el primer dígito
        if (primerDigitoA === primerDigitoB) {
          return a.codigo - b.codigo; // Si son iguales, ordenar numéricamente
        } else {
          return primerDigitoA - primerDigitoB; // Ordenar por el primer dígito
        }
      });

      // Añadir las cuentas al select
      cuentasContables.forEach((cuenta) => {
        const option = document.createElement("option");
        option.value = cuenta.codigo;
        option.textContent = `${cuenta.codigo} - ${cuenta.nombre}`;
        option.dataset.encargado = cuenta.codigo;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error al obtener las cuentas:", error);
    });
}


document.addEventListener("DOMContentLoaded", () => {
  desplegable();
  desplegableCuentas();

  document
    .querySelectorAll("#monto, #impuesto, #descuento")
    .forEach((input) => {
      input.addEventListener("input", actualizarResumenCompras);
    });

  function actualizarResumenCompras() {
    const monto = parseFloat(document.getElementById("monto").value) || 0;
    const impuesto = parseFloat(document.getElementById("impuesto").value) || 0;
    const descuento = parseFloat(document.getElementById("descuento").value) || 0;

    const montoImpuesto = monto * (impuesto / 100);
    const montoDescuento = monto * (descuento / 100);
    const totalCalculado = (monto + montoImpuesto) - montoDescuento;

    const proveedorSelect = document.getElementById("proveedor");
    const proveedor = proveedorSelect.options[proveedorSelect.selectedIndex]?.text || "N/A";
    const tablaFacturas = document.getElementById("tablaFacturas");
    tablaFacturas.innerHTML = "";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2">${proveedor}</td>
      <td class="border p-2">$${formatNumber(monto.toFixed(2))}</td>
      <td class="border p-2">$${formatNumber(montoImpuesto.toFixed(2))}</td>
      <td class="border p-2">$${formatNumber(montoDescuento.toFixed(2))}</td>
      <td class="border p-2">$${formatNumber(totalCalculado.toFixed(2))}</td>
    `;
    tablaFacturas.appendChild(row);

    const totalCompras = document.getElementById("totalCompras");
    totalCompras.textContent = `$${formatNumber(totalCalculado.toFixed(2))}`;
  }

  document.getElementById("agregarCuentas").addEventListener("click", () => {
    const tipo = document.getElementById("tipo").value;
    const cuentaCodigo = document.getElementById("cuentaz").value;
    const valor = parseFloat(document.getElementById("valor").value) || 0;

    console.log("Tipo:", tipo, "Cuenta Código:", cuentaCodigo, "Valor:", valor); // Para depuración

    if (cuentaCodigo && valor) {
      const cuentaSeleccionada = cuentasContables.find(
        (c) => c.codigo === cuentaCodigo
      );

      if (cuentaSeleccionada) {
        cuentasSeleccionadas.push({ tipo, cuenta: cuentaSeleccionada, valor });
        actualizarCuentasSeleccionadas();
        document.getElementById("valor").value = ""; // Limpia el input de valor
      } else {
        console.error("Cuenta no encontrada:", cuentaCodigo);
      }
    } else {
      console.error("Faltan datos para agregar la cuenta.");
    }
  });


  let cuentaEnEdicion = null; // Variable para almacenar el índice de la cuenta que se está editando

  function actualizarCuentasSeleccionadas() {
    const cuentasSeleccionadasList = document.getElementById("cuentasSeleccionadas");
    cuentasSeleccionadasList.innerHTML = "";

    cuentasSeleccionadas.forEach((cuenta, index) => {
      const listItem = document.createElement("li");
      listItem.className = "flex justify-between items-center py-2 p-1 border-gray-300 border-2 rounded-md";

      // Crear el contenido de texto para la cuenta
      const cuentaTexto = document.createElement("span");
      cuentaTexto.textContent = `${cuenta.tipo} - ${cuenta.cuenta.codigo} - ${cuenta.cuenta.nombre}: $${formatNumber(cuenta.valor.toFixed(2))}`;

      // Crear un contenedor para los botones (edit y delete)
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "flex space-x-2"; // Contenedor con espacio entre los botones

      // Crear el botón de eliminar
      const deleteButton = document.createElement("button");
      deleteButton.className = "px-2 py-1 click";
      deleteButton.innerHTML = `
            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33333 0.888889H12.4444V2.66667H0V0.888889H3.11111L4 0H8.44444L9.33333 0.888889ZM2.66667 16C1.68889 16 0.888889 15.2 0.888889 14.2222V3.55556H11.5556V14.2222C11.5556 15.2 10.7556 16 9.77778 16H2.66667Z" fill="black"/>
            </svg>
        `;
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar recargar la página
        eliminarCuenta(index);
      });

      // Crear el botón de editar
      const editButton = document.createElement("button");
      editButton.className = "px-2 py-1 click";
      editButton.innerHTML = `
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 15L5.54342 13.9473L13.9162 6.07569L10.4925 2.85687L2.12 10.7285L1 15Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.9803 1.37146L15.4959 2.79636C15.6212 2.91414 15.7206 3.05397 15.7885 3.20787C15.8563 3.36177 15.8912 3.52673 15.8912 3.69331C15.8912 3.8599 15.8563 4.02486 15.7885 4.17876C15.7206 4.33266 15.6212 4.47249 15.4959 4.59027L13.9159 6.0757L10.4922 2.85688L12.0725 1.37146C12.3255 1.13362 12.6686 1 13.0264 1C13.3842 1 13.7273 1.13362 13.9803 1.37146Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.12012 10.7285L5.54354 13.9473" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.03613 15H15.9998" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
      editButton.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar recargar la página
        editarCuenta(index);
      });

      // Agregar los botones al contenedor de botones
      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(deleteButton);

      // Agregar el texto de la cuenta y el contenedor de botones al listItem
      listItem.appendChild(cuentaTexto);
      listItem.appendChild(buttonContainer);

      // Agregar el listItem a la lista
      cuentasSeleccionadasList.appendChild(listItem);
    });
  }

  // Función para manejar la edición de la cuenta
  function editarCuenta(index) {
    cuentaEnEdicion = index; // Guardamos el índice de la cuenta que se está editando

    // Obtener la cuenta seleccionada
    const cuenta = cuentasSeleccionadas[index];

    // Asignar los valores de la cuenta seleccionada a los inputs ya existentes
    document.getElementById("tipo").value = cuenta.tipo;
    document.getElementById("cuentaz").value = cuenta.cuenta.codigo;
    document.getElementById("valor").value = cuenta.valor;

    // Eliminar la cuenta seleccionada de la lista
    eliminarCuenta(index);
  }

  // Función para guardar los cambios después de la edición
  function guardarEdicion() {
    if (cuentaEnEdicion !== null) {
      // Obtener los nuevos valores editados por el usuario desde los inputs
      const tipoEditado = document.getElementById("tipo").value;
      const codigoEditado = document.getElementById("cuentaz").value;
      const valorEditado = parseFloat(document.getElementById("valor").value);

      // Crear una nueva cuenta con los valores editados y agregarla a la lista
      cuentasSeleccionadas.push({
        tipo: tipoEditado,
        cuenta: {
          codigo: codigoEditado,
          nombre: document.getElementById("nombreCuenta").value // Asumimos que hay un input para el nombre
        },
        valor: valorEditado
      });

      // Limpiar la variable de edición
      cuentaEnEdicion = null;

      // Volver a renderizar la lista de cuentas para reflejar los cambios
      actualizarCuentasSeleccionadas();
    }
  }

  // Función para eliminar una cuenta de la lista
  function eliminarCuenta(index) {
    cuentasSeleccionadas.splice(index, 1); // Eliminar la cuenta en el índice dado
    actualizarCuentasSeleccionadas(); // Volver a renderizar la lista
  }


  document.getElementById("contabilizar").addEventListener("click", () => {
    const proveedorSelect = document.getElementById("proveedor");
    const idProveedorSeleccionado = proveedorSelect.value;
    const monto = parseFloat(document.getElementById("monto").value) || 0;
    const impuesto = parseFloat(document.getElementById("impuesto").value) || 0;
    const descuento = parseFloat(document.getElementById("descuento").value) || 0;

    const montoImpuesto = monto * (impuesto / 100);
    const montoDescuento = monto * (descuento / 100);
    const totalCalculado = monto + montoImpuesto - montoDescuento;

    let totalDebitos = 0;
    let totalCreditos = 0;

    cuentasSeleccionadas.forEach((cuenta) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="border p-2">${cuenta.cuenta.codigo} - ${cuenta.cuenta.nombre}</td>
        <td class="border p-2">${cuenta.tipo === "Debito" ? `$${formatNumber(cuenta.valor.toFixed(2))}` : ""}</td>
        <td class="border p-2">${cuenta.tipo === "Credito" ? `$${formatNumber(cuenta.valor.toFixed(2))}` : ""}</td>
      `;
      tablaContabilidad.appendChild(row);

      if (cuenta.tipo === "Debito") {
        if (
          cuenta.cuenta.nombre === "Descuentos Comerciales en Compras                 " ||
          cuenta.cuenta.nombre === "Devoluciones en Compras                           "
        ) {
          totalDebitos -= cuenta.valor;
        } else {
          totalDebitos += cuenta.valor;
        }
      } else if (cuenta.tipo === "Credito") {
        totalCreditos += cuenta.valor;
      }
    });

    document.getElementById("totalDebitos").textContent = `$${formatNumber(totalDebitos.toFixed(2))}`;
    document.getElementById("totalCreditos").textContent = `$${formatNumber(totalCreditos.toFixed(2))}`;

    const validacionSaldos = document.getElementById("validacionSaldos");
    if (totalDebitos === totalCreditos) {
      validacionSaldos.textContent = "Los saldos están equilibrados.";
      validacionSaldos.className = "text-green-500";
    } else {
      validacionSaldos.textContent = "Los saldos NO están equilibrados.";
      validacionSaldos.className = "text-red-500";
    }
  });

  document.getElementById("registrar").addEventListener("click", () => {
    const proveedorSelect = document.getElementById("proveedor");
    const idProveedorSeleccionado = proveedorSelect.value;
    const monto = parseFloat(document.getElementById("monto").value) || 0;
    const impuesto = parseFloat(document.getElementById("impuesto").value) || 0;
    const descuento = parseFloat(document.getElementById("descuento").value) || 0;
    const fecha = document.getElementById('fecha').textContent;
    const hora = document.getElementById('hora').textContent;
    const montoImpuesto = monto * (impuesto / 100);
    const montoDescuento = monto * (descuento / 100);
    const totalCalculado = monto + montoImpuesto - montoDescuento;
    const userId = localStorage.getItem("userId");
    const codigoFactura = document.getElementById("registroCodigo");
    const codeFactura = Number(codigoFactura.value);

    fetch("https://provisoft-backend.vercel.app/insertComprasDet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        monto,
        montoImpuesto,
        montoDescuento,
        totalCalculado,
        idProveedorSeleccionado,
        cuentasSeleccionadas,
        fecha,
        hora,
        userId,
        codeFactura
      })
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          document.getElementById("successModal").classList.remove("hidden");
          setTimeout(() => {
            document.getElementById("successModal").classList.add("hidden");
            resetFormulario();
          }, 3000);
        } else {
          document.getElementById("errorModal").classList.remove("hidden");
          setTimeout(() => {
            0
            document.getElementById("errorModal").classList.add("hidden");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
        document.getElementById("errorModal").classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("errorModal").classList.add("hidden");
        }, 3000);
      });
  });

  function resetFormulario() {
    document.getElementById("monto").value = "";
    document.getElementById("impuesto").value = "";
    document.getElementById("descuento").value = "";
    cuentasSeleccionadas = [];
    actualizarCuentasSeleccionadas();
    actualizarResumenCompras();
  }

  document.getElementById("registrar").addEventListener("click", () => {
    document.getElementById("successModal").classList.add("hidden");
  });

  document.getElementById("registrar").addEventListener("click", () => {
    document.getElementById("errorModal").classList.add("hidden");
  });
});

document.getElementById("cancelar").addEventListener("click", () => {
  location.reload();
});

document.getElementById("resetearContable").addEventListener("click", () => {
  const tablaContabilidad = document.getElementById("tablaContabilidad");
  tablaContabilidad.innerHTML = '';
});