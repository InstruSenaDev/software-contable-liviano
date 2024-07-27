// validateForm.js

export function validateForm() {
    let isValid = true;


  
    // Obtener elementos del formulario
    const nombre = document.getElementById('nombre');
    const tipoDocumento = document.getElementById('tipo-documento');
    const numeroDocumento = document.getElementById('numero-documento');
    const numeroTelefono = document.getElementById('numero-telefono');
    const correoElectronico = document.getElementById('correo-electronico');
    const direccion = document.getElementById('direccion');
    const encargado = document.getElementById('encargado');
  
    // Obtener elementos de error
    const errorNombre = document.getElementById('error-nombre');
    const errorTipoDocumento = document.getElementById('error-tipo-documento');
    const errorNumeroDocumento = document.getElementById('error-numero-documento');
    const errorNumeroTelefono = document.getElementById('error-numero-telefono');
    const errorCorreoElectronico = document.getElementById('error-correo-electronico');
    const errorDireccion = document.getElementById('error-direccion');
    const errorEncargado = document.getElementById('error-encargado');
  
    // Limpiar mensajes de error
    errorNombre.classList.add('hidden');
    errorTipoDocumento.classList.add('hidden');
    errorNumeroDocumento.classList.add('hidden');
    errorNumeroTelefono.classList.add('hidden');
    errorCorreoElectronico.classList.add('hidden');
    errorDireccion.classList.add('hidden');
    errorEncargado.classList.add('hidden');
  
    // Validar campos
    if (nombre.value.trim() === '') {
      errorNombre.textContent = 'El nombre es obligatorio.';
      errorNombre.classList.remove('hidden');
      isValid = false;
    }
  
    if (tipoDocumento.value === '') {
      errorTipoDocumento.textContent = 'Seleccione un tipo de documento.';
      errorTipoDocumento.classList.remove('hidden');
      isValid = false;
    }
  
    if (numeroDocumento.value.trim() === '') {
      errorNumeroDocumento.textContent = 'El número de documento es obligatorio.';
      errorNumeroDocumento.classList.remove('hidden');
      isValid = false;
    }
  
    if (numeroTelefono.value.trim() === '' || !/^\d{10}$/.test(numeroTelefono.value)) {
      errorNumeroTelefono.textContent = 'El número de teléfono debe tener 10 dígitos.';
      errorNumeroTelefono.classList.remove('hidden');
      isValid = false;
    }
  
    if (correoElectronico.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico.value)) {
      errorCorreoElectronico.textContent = 'Ingrese un correo electrónico válido.';
      errorCorreoElectronico.classList.remove('hidden');
      isValid = false;
    }
  
    if (direccion.value.trim() === '') {
      errorDireccion.textContent = 'La dirección es obligatoria.';
      errorDireccion.classList.remove('hidden');
      isValid = false;
    }
  
    if (encargado.value.trim() === '') {
      errorEncargado.textContent = 'El encargado es obligatorio.';
      errorEncargado.classList.remove('hidden');
      isValid = false;
    }
  
    return isValid;

    
  }
  