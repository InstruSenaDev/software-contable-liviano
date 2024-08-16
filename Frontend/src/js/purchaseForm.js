// validatePurchaseForm.js
export function valorTotal (){
    const iva = document.getElementById('iva-valor');
    const descuento = document.getElementById('descuento-valor');
    const precioBruto = document.getElementById('precio-bruto');
    const calculatorIva = (iva * precioBruto/100);
    const calculatorDescount = (descuento* precioBruto/100);
    console.log("resultados",calculatorDescount, calculatorIva);
}
export function validatePurchaseForm() {
    let isValid = true;

    // Obtener elementos del formulario
    const codigoCompra = document.getElementById('codigo-compra');
    const precioBruto = document.getElementById('precio-bruto');
    const proveedor = document.getElementById('proveedor');
    const valor = document.getElementById('valor');
    const ivaCheckbox = document.getElementById('iva');
    const ivaValor = document.getElementById('iva-valor');
    const reteicaCheckbox = document.getElementById('reteica');
    const reteicaValor = document.getElementById('reteica-valor');
    const descuentoCheckbox = document.getElementById('descuento');
    const descuentoValor = document.getElementById('descuento-valor');
    const retefuenteCheckbox = document.getElementById('retefuente');
    const retefuenteValor = document.getElementById('retefuente-valor');
    const codigoCuenta = document.getElementById('codigo-cuenta');

    // Mensajes de error
    const errorCodigoCompra = document.getElementById('error-codigo-compra');
    const errorPrecioBruto = document.getElementById('error-precio-bruto');
    const errorProveedor = document.getElementById('error-proveedor');
    const errorValor = document.getElementById('error-valor');
    const errorIvaValor = document.getElementById('error-iva-valor');
    const errorReteicaValor = document.getElementById('error-reteica-valor');
    const errorDescuentoValor = document.getElementById('error-descuento-valor');
    const errorRetefuenteValor = document.getElementById('error-retefuente-valor');
    const errorCodigoCuenta = document.getElementById('error-codigo-cuenta');

    // Limpiar mensajes de error
    const clearErrors = () => {
        [errorCodigoCompra, errorPrecioBruto, errorProveedor, errorValor, errorIvaValor, errorReteicaValor, errorDescuentoValor, errorRetefuenteValor, errorCodigoCuenta].forEach(el => el.classList.add('hidden'));
    };

    clearErrors();

    // Función para habilitar o deshabilitar campos
    const toggleInputState = (checkbox, input) => {
        if (checkbox.checked) {
            input.removeAttribute('disabled');
        } else {
            input.setAttribute('disabled', 'true');
            input.value = ''; // Limpiar el campo si el checkbox está desmarcado
        }
    };

    // Función para validar si el valor es numérico y no está vacío
    const validateNumericInput = (input, errorElement) => {
        const value = input.value.trim();
        if (!value) {
            errorElement.textContent = 'Este campo es obligatorio.';
            errorElement.classList.remove('hidden');
            return false;
        }
        if (!/^\d+(\.\d+)?$/.test(value)) {
            errorElement.textContent = 'Este campo solo puede contener números.';
            errorElement.classList.remove('hidden');
            return false;
        }
        return true;
    };

    // Validaciones
    if (!codigoCompra.value.trim()) {
        errorCodigoCompra.textContent = 'Este campo es obligatorio.';
        errorCodigoCompra.classList.remove('hidden');
        isValid = false;
    }

    if (!validateNumericInput(precioBruto, errorPrecioBruto)) {
        isValid = false;
    }

    if (proveedor.value === '') {
        errorProveedor.textContent = 'Debe seleccionar un proveedor.';
        errorProveedor.classList.remove('hidden');
        isValid = false;
    }

    if (!validateNumericInput(valor, errorValor)) {
        isValid = false;
    }

    // Validación específica para IVA
    toggleInputState(ivaCheckbox, ivaValor);
    if (ivaCheckbox.checked && !validateNumericInput(ivaValor, errorIvaValor)) {
        isValid = false;
    }

    // Validación específica para Reteica
    toggleInputState(reteicaCheckbox, reteicaValor);
    if (reteicaCheckbox.checked && !validateNumericInput(reteicaValor, errorReteicaValor)) {
        isValid = false;
    }

    // Validación específica para Descuento
    toggleInputState(descuentoCheckbox, descuentoValor);
    if (descuentoCheckbox.checked && !validateNumericInput(descuentoValor, errorDescuentoValor)) {
        isValid = false;
    }

    // Validación específica para Retefuente
    toggleInputState(retefuenteCheckbox, retefuenteValor);
    if (retefuenteCheckbox.checked && !validateNumericInput(retefuenteValor, errorRetefuenteValor)) {
        isValid = false;
    }

    if (!codigoCuenta.value.trim()) {
        errorCodigoCuenta.textContent = 'Este campo es obligatorio.';
        errorCodigoCuenta.classList.remove('hidden');
        isValid = false;
    }

    return isValid;
}

// Añadir listeners a los checkboxes para habilitar/deshabilitar campos en tiempo real
const setupCheckboxListeners = () => {
    const ivaCheckbox = document.getElementById('iva');
    const ivaValor = document.getElementById('iva-valor');
    const reteicaCheckbox = document.getElementById('reteica');
    const reteicaValor = document.getElementById('reteica-valor');
    const descuentoCheckbox = document.getElementById('descuento');
    const descuentoValor = document.getElementById('descuento-valor');
    const retefuenteCheckbox = document.getElementById('retefuente');
    const retefuenteValor = document.getElementById('retefuente-valor');

    ivaCheckbox.addEventListener('change', () => toggleInputState(ivaCheckbox, ivaValor));
    reteicaCheckbox.addEventListener('change', () => toggleInputState(reteicaCheckbox, reteicaValor));
    descuentoCheckbox.addEventListener('change', () => toggleInputState(descuentoCheckbox, descuentoValor));
    retefuenteCheckbox.addEventListener('change', () => toggleInputState(retefuenteCheckbox, retefuenteValor));
};

document.addEventListener('DOMContentLoaded', () => {
    setupCheckboxListeners();
});

// js/purchaseForm.js

export function desplegable() {
    const selectElement = document.getElementById('proveedor');

    fetch('http://localhost:8080/proveedores')
        .then(response => response.json())
        .then(data => {
            data.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.idproveedores;
                option.textContent = proveedor.nombre;
                option.dataset.encargado = proveedor.encargado;
                selectElement.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener los proveedores:', error);
        });

    selectElement.addEventListener('change', () => {
        const nameElement = document.getElementById('nombreP');
        const encargadoElement = document.getElementById('encargado_venta');

        const selectedOption = selectElement.options[selectElement.selectedIndex];
        nameElement.textContent = selectedOption.text;
        encargadoElement.textContent = selectedOption.dataset.encargado;
    });
}
// js/purchaseForm.js

export function addNewField() {
    const camposCuentas = document.getElementById('campos-cuentas');

    // Obtener valores de los inputs actuales
    const codigoCuentaInput = document.getElementById('codigo-cuenta');
    const valorCuentaInput = document.getElementById('valor-cuenta');
    const valorBrutoSpan = document.getElementById('valorbruto');
    const cuentaSpan = document.getElementById('cuenta');

    const codigoCuenta = codigoCuentaInput.value;
    const valorCuenta = valorCuentaInput.value;

    if (codigoCuenta && valorCuenta) {
        // Actualizar spans con los valores
        valorBrutoSpan.textContent = valorCuenta;
        cuentaSpan.textContent = codigoCuenta;

        // Limpiar y desactivar los inputs actuales
        codigoCuentaInput.value = '';
        valorCuentaInput.value = '';
        codigoCuentaInput.disabled = true;
        valorCuentaInput.disabled = true;

        // Deshabilitar el botón actual
        document.getElementById('addCampo').disabled = true;

        // Crear nuevos inputs y botón
        const newField = document.createElement('div');
        newField.classList.add('flex', 'flex-row', 'p-2');
        newField.innerHTML = `
    <div class="flex flex-row">
      <div class="flex flex-col p-2">
        <h3>Valor</h3>
        <input id="valor-cuenta" class="bg-grisinpu rounded-md border-none w-70" type="text" placeholder="$000000000"/>
        <span id="error-valor" class="text-red-500 text-sm hidden"></span>
      </div>

      <div id="campos-cuentas">
        <h3>Código de cuenta</h3>
        <div class="flex flex-col p-2">
          <span class="flex flex-row">
            <input id="codigo-cuenta" class="bg-grisinpu border-none rounded-md w-40" type="text"/>
            <button id="addCampo">
              <img class="p-2" src="../../../../public/img/white/iconMore.svg" alt=""/>
            </button>
          </span>
          <span id="error-codigo-cuenta" class="text-red-500 text-sm hidden"></span>
        </div>
      </div>
    </div>
      `;

        // Añadir evento al nuevo botón
        newField.querySelector('button').addEventListener('click', addNewField);

        // Agregar nuevos inputs al contenedor
        camposCuentas.appendChild(newField);
    }
}
