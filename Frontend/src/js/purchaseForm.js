// funcion para calcular los descuentos y totales
export function valorTotal() {
    const ivaInput = document.getElementById('iva-valor');
    const descuentoInput = document.getElementById('descuento-valor');
    const precioBrutoInput = document.getElementById('precio-bruto');
    
    const iva = parseFloat(ivaInput.value) || 0;
    const descuento = parseFloat(descuentoInput.value) || 0;
    const precioBruto = parseFloat(precioBrutoInput.value) || 0;
    
    const calculatorIva = (iva / 100) * precioBruto;
    const calculatorDescuento = (descuento / 100) * precioBruto;
    const totalValor = precioBruto + calculatorIva - calculatorDescuento;

    document.getElementById('valorIva').textContent = calculatorIva.toFixed(2);
    document.getElementById('valorDiscount').textContent = calculatorDescuento.toFixed(2);
    document.getElementById('totalValor').textContent = totalValor.toFixed(2);
}

export function setupInputListeners() {
    const ivaInput = document.getElementById('iva-valor');
    const descuentoInput = document.getElementById('descuento-valor');
    const precioBrutoInput = document.getElementById('precio-bruto');

    ivaInput.addEventListener('input', valorTotal);
    descuentoInput.addEventListener('input', valorTotal);
    precioBrutoInput.addEventListener('input', valorTotal);
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
// js/purchaseForm.js

export function setupCheckboxListeners() {
    const ivaCheckbox = document.getElementById('iva');
    const ivaValor = document.getElementById('iva-valor');
    const reteicaCheckbox = document.getElementById('reteica');
    const reteicaValor = document.getElementById('reteica-valor');
    const descuentoCheckbox = document.getElementById('descuento');
    const descuentoValor = document.getElementById('descuento-valor');
    const retefuenteCheckbox = document.getElementById('retefuente');
    const retefuenteValor = document.getElementById('retefuente-valor');

    // Verificar si los elementos existen antes de añadir event listeners
    if (ivaCheckbox && ivaValor) {
        ivaCheckbox.addEventListener('change', () => toggleInputState(ivaCheckbox, ivaValor));
    }
    if (reteicaCheckbox && reteicaValor) {
        reteicaCheckbox.addEventListener('change', () => toggleInputState(reteicaCheckbox, reteicaValor));
    }
    if (descuentoCheckbox && descuentoValor) {
        descuentoCheckbox.addEventListener('change', () => toggleInputState(descuentoCheckbox, descuentoValor));
    }
    if (retefuenteCheckbox && retefuenteValor) {
        retefuenteCheckbox.addEventListener('change', () => toggleInputState(retefuenteCheckbox, retefuenteValor));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupCheckboxListeners();
});


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
     
      `;

        // Añadir evento al nuevo botón
        newField.querySelector('button').addEventListener('click', addNewField);

        // Agregar nuevos inputs al contenedor
        camposCuentas.appendChild(newField);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const email = localStorage.getItem("email");
  
    if (email) {
      document.getElementById("encargadoUser").textContent = email;
    } else {
      document.getElementById("encargadoUser").textContent = "Usuario desconocido";
    }
  });