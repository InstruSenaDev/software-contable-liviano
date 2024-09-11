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
  } else if (tipoDocumento.value === '2' && !/^\d{9,12}-\d$/.test(numeroDocumento.value)) {
    // Validación para NIT: formato ejemplo 10122012334-5
    errorNumeroDocumento.textContent = 'El NIT debe tener el formato válido: 00000000000-0.';
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


// providersForm.js
export async function submitForm() {
  const nombre = document.getElementById('nombre').value;
  const numero_documento = document.getElementById('numero-documento').value;
  const tipo_documento = document.getElementById('tipo-documento').value;
  const numero_telefono = document.getElementById('numero-telefono').value;
  const correo_electronico = document.getElementById('correo-electronico').value;
  const direccion = document.getElementById('direccion').value;
  const encargado = document.getElementById('encargado').value;
  const fecha = document.getElementById('fecha').textContent;
  const hora = document.getElementById('hora').textContent;

  console.log('Datos a enviar:', {
    nombre,
    numero_documento,
    tipo_documento,
    numero_telefono,
    correo_electronico,
    direccion,
    encargado,
    fecha,
    hora
  });

  try {
    const response = await fetch('http://localhost:8080/registerProviders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        numero_documento,
        tipo_documento,
        numero_telefono,
        correo_electronico,
        direccion,
        encargado,
        fecha,
        hora
      }),
    });

    const result = await response.json();
    console.log('Respuesta del servidor:', result);

    if (result.success) {
      // Muestra modal de éxito
      document.getElementById('modal-successx').classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('modal-successx').classList.add('hidden');
      }, 2000);

      // Limpia los campos del formulario
      document.getElementById('formProviders').reset();
    } else {
      // Muestra modal de error
      document.getElementById('modal-errorx').classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('modal-errorx').classList.add('hidden');
      }, 2000);
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    document.getElementById('modal-errorx').classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('modal-errorx ').classList.add('hidden');
    }, 2000);
  }
}

// Agregar el evento de envío del formulario
document.getElementById('formProviders').addEventListener('submit', function(event) {
  event.preventDefault();
  if (validateForm()) {
    submitForm();
  }
});


function resetForm() {
  document.getElementById('formProviders').reset();
}

// Agregar el evento de envío del formulario
document.getElementById('formProviders').addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm();
});

