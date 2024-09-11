// Función para obtener el rol del usuario logueado
async function obtenerRolUsuarioLogueado() {
  try {
    // Asume que el correo del usuario logueado está almacenado en el localStorage
    const email = localStorage.getItem("email");

    if (!email) {
      console.error("No hay ningún correo almacenado en localStorage.");
      return;
    }

    // Realizar el fetch para obtener los detalles del usuario
    const response = await fetch(`http://localhost:8080/usuariosLog?email=${encodeURIComponent(email)}`);
    const data = await response.json();

    if (response.ok) {
      const usuario = data[0]; // Suponiendo que hay un usuario en la respuesta
      if (usuario) {
        // Imprimir el rol del usuario en la consola
        console.log("Rol del usuario:", usuario.idrol);

        if (usuario.idrol === 1) {
          // Mostrar el botón de Administradores si el rol es 1
          document.getElementById("btnAdmins").parentElement.classList.remove("hidden");
        } else {
          // Ocultar el botón de Administradores si el rol no es 1
          document.getElementById("btnAdmins").parentElement.classList.add("hidden");
        }
      } else {
        console.error("No se encontró el usuario en la respuesta.");
      }
    } else {
      console.error("Error al obtener el rol del usuario:", data.error || data.message);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud de rol de usuario:", error);
  }
}

// Llamar a la función cuando la página se cargue
document.addEventListener("DOMContentLoaded", obtenerRolUsuarioLogueado);
