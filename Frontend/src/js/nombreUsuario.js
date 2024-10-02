export const obtenerNombreUsuario = () => {
    const nombre = localStorage.getItem('nombreUsuario'); // Asegúrate de que 'nombreUsuario' esté almacenado
    return nombre ? nombre : 'Nombre no disponible'; // Si no hay nombre, se mostrará un mensaje por defecto
  };
  