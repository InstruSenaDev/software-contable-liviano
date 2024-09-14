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
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", monto);

    const resumen = {
      idproveedores: idProveedorSeleccionado, // Enviar el ID del proveedor seleccionado
      monto: monto,
      impuesto: montoImpuesto,
      descuento: montoDescuento,
      total: totalCalculado,
    };

    console.log("olaaaa", resumen);
    let totalDebitos = 0;
    let totalCreditos = 0;

    // const tablaContabilidad = document.getElementById("tablaContabilidad");
    // tablaContabilidad.innerHTML = ""; // Limpiar la tabla antes de llenarla

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
    // Enviar datos al backend
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", montoDescuento);
    fetch("http://localhost:8080/insertComprasDet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumen,
        idProveedorSeleccionado, // Enviar el ID del proveedor seleccionado
        monto,
        montoImpuesto,
        montoDescuento,
        totalCalculado,
        // Asegúrate de que resumen contiene idproveedores
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // Verifica si la respuesta no es correcta
          throw new Error("Error en la respuesta del servidor"); // Lanza un error si la respuesta no es correcta
        }
        return response.json(); // Parsea la respuesta a JSON
      })
      .then((result) => {
        console.log("Respuesta del servidor:", result); // Imprime la respuesta del servidor en caso de éxito
        if (result.success) {
          alert("Datos contabilizados exitosamente.");
          console.log(
            "Datos enviados y contabilizados exitosamente.",
            resumen,
            idProveedorSeleccionado, // Enviar el ID del proveedor seleccionado
            monto,
            montoImpuesto,
            montoDescuento,
            totalCalculado
          ); // Mensaje adicional de éxito
          // Puedes agregar aquí la lógica para limpiar el formulario o redirigir al usuario si lo deseas.
        } else {
          alert("Error al contabilizar los datos.");
          console.log("Error en la contabilización de los datos."); // Mensaje adicional de error en la contabilización
        }
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error); // Imprime el error de la petición en la consola
        console.log(
          "Hubo un problema al intentar enviar los datos al servidor."
        ); // Mensaje adicional en caso de error
      });
  });
});
