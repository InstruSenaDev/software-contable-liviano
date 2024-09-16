let cuentasContables = [];
let cuentasSeleccionadas = [];

// Función para llenar el select de proveedores desde la base de datos
export function desplegable() {
  const selectElement = document.getElementById("proveedor");

  fetch("http://localhost:8080/proveedores")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((proveedor) => {
        const option = document.createElement("option");
        option.value = proveedor.idproveedores; // Utilizamos idproveedores como valor
        option.textContent = proveedor.nombre;
        option.dataset.encargado = proveedor.encargado;
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

  fetch("http://localhost:8080/cuentas")
    .then((response) => response.json())
    .then((data) => {
      cuentasContables = data; // Actualiza la variable global aquí
      data.forEach((cuenta) => {
        const option = document.createElement("option");
        option.value = cuenta.codigo;
        option.textContent = `${cuenta.codigo} - ${cuenta.nombre}`; // Corrección aquí
        option.dataset.encargado = cuenta.codigo;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error al obtener las cuentas:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  desplegable(); // Llenar el select de proveedores
  desplegableCuentas(); // Llenar el select de cuentas contables

  document
    .querySelectorAll("#monto, #impuesto, #descuento")
    .forEach((input) => {
      input.addEventListener("input", actualizarResumenCompras);
    });

  function actualizarResumenCompras() {
    const monto = parseFloat(document.getElementById("monto").value) || 0;
    const impuesto = parseFloat(document.getElementById("impuesto").value) || 0;
    const descuento =
      parseFloat(document.getElementById("descuento").value) || 0;

    const montoImpuesto = monto * (impuesto / 100);
    const montoDescuento = monto * (descuento / 100);
    const totalCalculado = monto + montoImpuesto - montoDescuento;

    const proveedorSelect = document.getElementById("proveedor");
    const proveedor =
      proveedorSelect.options[proveedorSelect.selectedIndex]?.text || "N/A";
    const tablaFacturas = document.getElementById("tablaFacturas");
    tablaFacturas.innerHTML = "";

    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="border p-2">${proveedor}</td>
            <td class="border p-2">$${monto.toFixed(2)}</td>
            <td class="border p-2">$${montoImpuesto.toFixed(2)}</td>
            <td class="border p-2">$${montoDescuento.toFixed(2)}</td>
            <td class="border p-2">$${totalCalculado.toFixed(2)}</td>
        `;
    tablaFacturas.appendChild(row);

    const totalCompras = document.getElementById("totalCompras");
    totalCompras.textContent = `$${totalCalculado.toFixed(2)}`; // Corrección aquí
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
    const cuentasSeleccionadasList = document.getElementById(
      "cuentasSeleccionadas"
    );
    cuentasSeleccionadasList.innerHTML = "";

    cuentasSeleccionadas.forEach((cuenta, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${cuenta.tipo} - ${cuenta.cuenta.codigo} - ${
        cuenta.cuenta.nombre
      }: $${cuenta.valor.toFixed(2)}`; // Corrección aquí

      const deleteButton = document.createElement("img");
      deleteButton.src = "../../public/img/black/trash.svg";
      deleteButton.className = "px-2 py-1 ml-2 click";
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
    const idProveedorSeleccionado = proveedorSelect.value; // Obtenemos el id del proveedor seleccionado
    const monto = parseFloat(document.getElementById("monto").value) || 0;
    const impuesto = parseFloat(document.getElementById("impuesto").value) || 0;
    const descuento =
      parseFloat(document.getElementById("descuento").value) || 0;

    const montoImpuesto = monto * (impuesto / 100);
    const montoDescuento = monto * (descuento / 100);
    const totalCalculado = monto + montoImpuesto - montoDescuento;

    let totalDebitos = 0;
    let totalCreditos = 0;

    cuentasSeleccionadas.forEach((cuenta) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                  <td class="border p-2">${cuenta.cuenta.codigo} - ${
        cuenta.cuenta.nombre
      }</td>
                  <td class="border p-2">${
                    cuenta.tipo === "debito"
                      ? `$${cuenta.valor.toFixed(2)}`
                      : ""
                  }</td>
                  <td class="border p-2">${
                    cuenta.tipo === "credito"
                      ? `$${cuenta.valor.toFixed(2)}`
                      : ""
                  }</td>
              `;
      tablaContabilidad.appendChild(row);

      if (cuenta.tipo === "debito") {
        totalDebitos += cuenta.valor;
      } else if (cuenta.tipo === "credito") {
        totalCreditos += cuenta.valor;
      }
    });
    console.log(cuentasSeleccionadas);
    document.getElementById(
      "totalDebitos"
    ).textContent = `$${totalDebitos.toFixed(2)}`;
    document.getElementById(
      "totalCreditos"
    ).textContent = `$${totalCreditos.toFixed(2)}`;

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
    const descuento =
      parseFloat(document.getElementById("descuento").value) || 0;

    const montoImpuesto = monto * (impuesto / 100);
    const montoDescuento = monto * (descuento / 100);
    const totalCalculado = monto + montoImpuesto - montoDescuento;

    fetch("http://localhost:8080/insertComprasDet", {
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
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          document.getElementById("successsModal").classList.remove("hidden");
          setTimeout(() => {
            document.getElementById("successsModal").classList.add("hidden");
            resetFormulario(); // Reiniciar formulario después de ocultar el modal
          }, 5000); // Cerrar modal después de 5 segundos
        } else {
          document.getElementById("errorrModal").classList.remove("hidden");
          setTimeout(() => {
            document.getElementById("errorrModal").classList.add("hidden");
          }, 5000); // Cerrar modal después de 5 segundos
        }
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
        document.getElementById("errorrModal").classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("errorrModal").classList.add("hidden");
        }, 5000); // Cerrar modal después de 5 segundos
      });
  });

  document.getElementById("cancelar").addEventListener("click", () => {
    resetFormulario();
  });

  document.getElementById("closeSuccessModal").addEventListener("click", () => {
    document.getElementById("successsModal").classList.add("hidden");
  });

  document.getElementById("closeErrorModal").addEventListener("click", () => {
    document.getElementById("errorrModal").classList.add("hidden");
  });

  function resetFormulario() {
    document.getElementById("facturaForm").reset();
    document.getElementById("tablaFacturas").innerHTML = "";
    document.getElementById("tablaContabilidad").innerHTML = "";
    document.getElementById("totalCompras").textContent = "$0.00";
    document.getElementById("totalDebitos").textContent = "$0.00";
    document.getElementById("totalCreditos").textContent = "$0.00";
    document.getElementById("validacionSaldos").textContent = "";
    cuentasSeleccionadas = [];
    actualizarCuentasSeleccionadas();
  }
});