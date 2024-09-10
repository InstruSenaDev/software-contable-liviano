document.addEventListener("DOMContentLoaded", function () {
    const email = localStorage.getItem("email");
  
    if (email) {
      enviarEmailAlServidor(email);
    } else {
      document.getElementById("user_name").textContent =
        "Usuario desconocido";
      document.getElementById("modal_user_email").textContent =
        "Usuario desconocido";
    }
  });

function enviarEmailAlServidor(email) {
    // Primer fetch: Enviar email al servidor
    fetch(`http://localhost:8080/usuariosLog?email=${email}`, {
      // Cambiar la URL a una nueva ruta si es necesario
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // Envía el email en el cuerpo de la solicitud POST
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el email en el servidor");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Email enviado y guardado:", data);
        // Aquí puedes decidir si necesitas hacer algo después de enviar el email
        // Llamada al segundo fetch para obtener la información resultante
        obtenerInformacionUsuario(email);
      })
      .catch((error) => {
        console.error("Hubo un problema al guardar el email:", error);
      });
  }
  
   function obtenerInformacionUsuario(email) {
    // Segundo fetch: Recibir la información resultante de la base de datos
    fetch(`http://localhost:8080/usuariosLog?email=${email}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al recibir la información del servidor");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        if (data.length > 0) {
          const usuario = data[0];
          const nombreCompleto = `${usuario.nombre}`;
          document.getElementById("user_name").textContent =
            nombreCompleto;
          document.getElementById("modal_user_email").textContent =
            nombreCompleto;
        } else {
          document.getElementById("user_name").textContent =
            "Usuario no encontrado";
          document.getElementById("modal_user_email").textContent =
            "Usuario no encontrado";
        }
      })
      .catch((error) => {
        console.error("Hubo un problema con la solicitud:", error);
      });
  }