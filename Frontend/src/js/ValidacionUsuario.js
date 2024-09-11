document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("email");

  if (email) {
    enviarEmailAlServidor(email);
  } else {
    // Verificar que los elementos existen antes de modificar sus propiedades
    const userNameElement = document.getElementById("user_name");
    if (userNameElement) {
      userNameElement.textContent = "Usuario desconocido";
    }

    const userNamesElement = document.getElementById("user_names");
    if (userNamesElement) {
      userNamesElement.textContent = "Usuario desconocido";
    }

    const userNamexzElement = document.getElementById("user_namexz");
    if (userNamexzElement) {
      userNamexzElement.textContent = "Usuario desconocido";
    }

    const userNamexElement = document.getElementById("user_namex");
    if (userNamexElement) {
      userNamexElement.textContent = "Usuario desconocido";
    }

    const modalUserNameElement = document.getElementById("modal_user_name");
    if (modalUserNameElement) {
      modalUserNameElement.textContent = "Usuario desconocido";
    }
  }
});

function enviarEmailAlServidor(email) {
  fetch(`http://localhost:8080/usuariosLog?email=${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al guardar el email en el servidor");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Email enviado y guardado:", data);
      obtenerInformacionUsuario(email);
    })
    .catch((error) => {
      console.error("Hubo un problema al guardar el email:", error);
    });
}

function obtenerInformacionUsuario(email) {
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

        // Verificar que los elementos existen antes de modificar sus propiedades
        const userNameElement = document.getElementById("user_name");
        if (userNameElement) {
          userNameElement.textContent = nombreCompleto;
        }

        const userNamesElement = document.getElementById("user_names");
        if (userNamesElement) {
          userNamesElement.textContent = nombreCompleto;
        }

        const userNamexElement = document.getElementById("user_namex");
        if (userNamexElement) {
          userNamexElement.textContent = nombreCompleto;
        }

        const userNamexzElement = document.getElementById("user_namexz");
        if (userNamexzElement) {
          userNamexzElement.textContent = nombreCompleto;
        }

        const modalUserNameElement = document.getElementById("modal_user_name");
        if (modalUserNameElement) {
          modalUserNameElement.textContent = nombreCompleto;
        }
      } else {
        const userNameElement = document.getElementById("user_name");
        if (userNameElement) {
          userNameElement.textContent = "Usuario no encontrado";
        }

        const userNamesElement = document.getElementById("user_names");
        if (userNamesElement) {
          userNamesElement.textContent = "Usuario no encontrado";
        }

        const userNamexElement = document.getElementById("user_namex");
        if (userNamexElement) {
          userNamexElement.textContent = "Usuario no encontrado";
        }

        const modalUserNameElement = document.getElementById("modal_user_name");
        if (modalUserNameElement) {
          modalUserNameElement.textContent = "Usuario no encontrado";
        }
      }
    })
    .catch((error) => {
      console.error("Hubo un problema con la solicitud:", error);
    });
}
