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
      const cuentasContables = data.sort((a, b) => {
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

    if (cuentaCodigo && valor) {
      const cuentaSeleccionada = cuentasContables.find(
        (c) => c.codigo === cuentaCodigo
      );
      if (cuentaSeleccionada) {
        cuentasSeleccionadas.push({ tipo, cuenta: cuentaSeleccionada, valor });
        actualizarCuentasSeleccionadas();
        document.getElementById("valor").value = "";
      } else {
        console.error("Cuenta no encontrada:", cuentaCodigo);
      }
    }
  });

  function actualizarCuentasSeleccionadas() {
    const cuentasSeleccionadasList = document.getElementById("cuentasSeleccionadas");
    cuentasSeleccionadasList.innerHTML = "";
  
    cuentasSeleccionadas.forEach((cuenta, index) => {
      const listItem = document.createElement("li");
      listItem.className = "flex justify-between items-center py-2 p-1 border-gray-300 border-2 rounded-md ";
      listItem.textContent = `${cuenta.tipo} - ${cuenta.cuenta.codigo} - ${cuenta.cuenta.nombre}: $${formatNumber(cuenta.valor.toFixed(2))}`;
  
      const deleteButton = document.createElement("button");
      deleteButton.className = "px-2 py-1 ml-2 click";
      deleteButton.innerHTML = `
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33333 0.888889H12.4444V2.66667H0V0.888889H3.11111L4 0H8.44444L9.33333 0.888889ZM2.66667 16C1.68889 16 0.888889 15.2 0.888889 14.2222V3.55556H11.5556V14.2222C11.5556 15.2 10.7556 16 9.77778 16H2.66667Z" fill="black"/>
        </svg>
      `;
  
      deleteButton.addEventListener("click", () => eliminarCuenta(index));
  
      listItem.appendChild(deleteButton);
      cuentasSeleccionadasList.appendChild(listItem);
    });
  }
  
  function eliminarCuenta(index) {
    cuentasSeleccionadas.splice(index, 1);
    actualizarCuentasSeleccionadas();
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
          }, 5000);
        } else {
          document.getElementById("errorModal").classList.remove("hidden");
          setTimeout(() => {
            document.getElementById("errorModal").classList.add("hidden");
          }, 5000);
        }
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
        document.getElementById("errorModal").classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("errorModal").classList.add("hidden");
        }, 5000);
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