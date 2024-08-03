export function validateForm() {
  let isValid = true;

  console.log('Iniciando validación del formulario');

  // Obtener elementos del formulario
  const nombre = document.getElementById('nombre');
  const tipoDocumento = document.getElementById('tipo-documento');
  const numeroDocumento = document.getElementById('numero-documento');
  const numeroTelefono = document.getElementById('numero-telefono');
  const correoElectronico = document.getElementById('correo-electronico');
  const direccion = document.getElementById('direccion');
  const encargado = document.getElementById('encargado');

  console.log('Elementos del formulario:', { nombre, tipoDocumento, numeroDocumento, numeroTelefono, correoElectronico, direccion, encargado });

  // Obtener elementos de error
  const errorNombre = document.getElementById('error-nombre');
  const errorTipoDocumento = document.getElementById('error-tipo-documento');
  const errorNumeroDocumento = document.getElementById('error-numero-documento');
  const errorNumeroTelefono = document.getElementById('error-numero-telefono');
  const errorCorreoElectronico = document.getElementById('error-correo-electronico');
  const errorDireccion = document.getElementById('error-direccion');
  const errorEncargado = document.getElementById('error-encargado');

  console.log('Elementos de error:', { errorNombre, errorTipoDocumento, errorNumeroDocumento, errorNumeroTelefono, errorCorreoElectronico, errorDireccion, errorEncargado });

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
    errorNumeroTelefono.textContent = 'El número de teléfono debe tener 10 dígitos numéricos.';
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

  console.log('Validación completada:', isValid);
  return isValid;
}

export function submitForm() {
  if (validateForm()) {
    const data = {
      nombre: document.getElementById('nombre').value,
      tipo_documento: document.getElementById('tipo-documento').value,
      numero_documento: document.getElementById('numero-documento').value,
      numero_telefono: document.getElementById('numero-telefono').value,
      correo_electronico: document.getElementById('correo-electronico').value,
      direccion: document.getElementById('direccion').value,
      encargado: document.getElementById('encargado').value
    };

    console.log('Datos a enviar:', data);

    fetch('http://localhost:8080/registerProviders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        console.log('Registro exitoso:', result.message);
        showModal('success');
        resetForm();
      } else {
        console.error('Error en el registro:', result.message);
        showModal('error');
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
      showModal('error');
    });
  }
}

function showModal(type) {
  const modalSuccess = document.getElementById('modal-success');
  const modalError = document.getElementById('modal-error');

  if (type === 'success') {
    modalSuccess.classList.remove('hidden');
    setTimeout(() => {
      modalSuccess.classList.add('hidden');
    }, 2000);
  } else if (type === 'error') {
    modalError.classList.remove('hidden');
    setTimeout(() => {
      modalError.classList.add('hidden');
    }, 2000);
  }
}

function resetForm() {
  document.getElementById('formProviders').reset();
}

// Agregar el evento de envío del formulario
document.getElementById('formProviders').addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm();
});
