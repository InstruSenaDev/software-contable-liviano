let movimientos = []; 

// Función para agregar un nuevo movimiento
export function agregarMovimiento() {
    const tipo = document.getElementById('tipo');
    const codigoCuenta = document.getElementById('cuentas');
    const valorCuenta = document.getElementById('valor-cuenta');

    if (tipo && valorCuenta && codigoCuenta) { 
        if (tipo.value && valorCuenta.value && codigoCuenta.value) {
            const nuevoMovimiento = {
                tipo: tipo.value,
                valorCuenta: valorCuenta.value,
                codigoCuenta: codigoCuenta.value
            };
            
            movimientos.push(nuevoMovimiento);
            console.log('movimiento recibido', nuevoMovimiento);
            mostrarMovimientos();
            tipo.value = '';
            valorCuenta.value = '';
            codigoCuenta.value = '';
        } else {
            console.log("Por favor, llene todos los campos.");
        }
    } else {
        console.error("No se encontraron los campos de entrada.");
    }
}


export function mostrarMovimientos() {
    const listaMovimientos = document.getElementById('lista-movimientos');

    if (listaMovimientos) {
        listaMovimientos.innerHTML = ''; // Limpiar la lista antes de actualizar

        movimientos.forEach((movimiento, index) => {
            const movimientoElemento = document.createElement('div');
            movimientoElemento.classList.add('flex', 'flex-col', 'border-b-black', 'border-b-2', 'p-2')
            movimientoElemento.innerHTML = `
                <span>Tipo: ${movimiento.tipo}</span> 
                <span>Valor: ${movimiento.valorCuenta}</span> 
                <span>Codigo: ${movimiento.codigoCuenta}</span> 
              
            `;
            listaMovimientos.appendChild(movimientoElemento);
        });
    } else {
        console.error("El elemento 'lista-movimientos' no fue encontrado.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const addCampoBtn = document.getElementById('addCampo');
    if (addCampoBtn) {
        addCampoBtn.addEventListener('click', agregarMovimiento);
    } else {
        console.error("El botón 'addCampo' no fue encontrado.");
    }
    
    // Listener para el botón de submit
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            const inputElement = document.getElementById('inputId'); // Asegúrate de que 'inputId' es el id correcto
            if (inputElement) {
                const value = inputElement.value;
                console.log('Valor del input:', value);
            } else {
                console.error('El elemento de entrada no fue encontrado');
            }
        });
    }
});

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
        [errorCodigoCompra, 
            errorPrecioBruto, 
            errorProveedor, errorValor, 
            errorIvaValor, errorReteicaValor, 
            errorDescuentoValor,
             errorRetefuenteValor,
              errorCodigoCuenta
            ].forEach(el => el.classList.add('hidden'));
    };

    clearErrors();

    // Función para habilitar o deshabilitar campos
    const toggleInputState = (checkbox, input) => {
        if (checkbox.checked) {
            input.removeAttribute('disabled');
        } else {
            input.setAttribute('disabled', 'true');
            input.value = '0'; // Limpiar el campo si el checkbox está desmarcado
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
        if (isNaN(value)) {
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


export function desplegableCuentas() {
    const selectElement = document.getElementById('cuentas');

    fetch('http://localhost:8080/cuentas')
        .then(response => response.json())
        .then(data => {
            data.forEach(cuenta => {
                const option = document.createElement('option');
                option.value = cuenta.codigo;
                option.textContent = cuenta.nombre; // Nota: Este solo muestra el nombre
                option.dataset.encargado = cuenta.codigo;
                selectElement.appendChild(option);

                // Imprimir datos por consola
                console.log(cuenta.nombre, cuenta.codigo);
            });
        })
        .catch(error => {
            console.error('Error al obtener los proveedores:', error);
        });
}


// js/purchaseForm.js

export function addNewField() {
    // Obtener valores de los elementos seleccionados
    const cuentaSelect = document.getElementById('cuentas');
    const tipoSelect = document.getElementById('tipo');
    const valorCuentaInput = document.getElementById('valor-cuenta');
    
    // Obtener elementos donde se mostrarán los valores
    const tipoSpan = document.getElementById('tipoM');
    const cuentaSpan = document.getElementById('cuenta');
    const valorSpan = document.getElementById('valorbruto');
    
    // Obtener valores
    const tipo = tipoSelect.value;
    const cuenta = cuentaSelect.options[cuentaSelect.selectedIndex].text;
    const valorCuenta = valorCuentaInput.value;
    
    
    // Actualizar los spans con los valores
    tipoSpan.textContent = tipo;
    cuentaSpan.textContent = cuenta;
    valorSpan.textContent = valorCuenta;
    
    // Limpiar el campo de valor
    valorCuentaInput.value = '';
    
    // Deshabilitar el botón después de usarlo
}
const tipoSpan = document.getElementById('tipoM');
const cuentaSpan = document.getElementById('cuenta');
const valorSpan = document.getElementById('valorbruto');

if (tipoSpan && cuentaSpan && valorSpan) {
    tipoSpan.textContent = tipo;
    cuentaSpan.textContent = cuenta;
    valorSpan.textContent = valorCuenta;
} else {
    console.error("Uno o más elementos no fueron encontrados en el DOM.");
}


document.addEventListener("DOMContentLoaded", function() {
    const email = localStorage.getItem("email");
  
    if (email) {
      document.getElementById("encargadoUser").textContent = email;
    } else {
      document.getElementById("encargadoUser").textContent = "Usuario desconocido";
    }
  });