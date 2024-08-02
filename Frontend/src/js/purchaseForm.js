// validatePurchaseForm.js

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
