document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("email");

  if (email) {
    enviarEmailAlServidor(email);
  } else {
    actualizarUIComoDesconocido();
  }
});

function enviarEmailAlServidor(email) {
  fetch(`https://provisoft-backend.vercel.app/usuariosLog?email=${email}`, {
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
  fetch(`https://provisoft-backend.vercel.app/usuariosLog?email=${email}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al recibir la información del servidor");
      }
      return response.json();
    })
    .then((data) => {
      if (data.length > 0) {
        const usuario = data[0];
        const nombreCompleto = `${usuario.nombre}`;
        const userId = usuario.idusuario;
        const userNamesx = nombreCompleto.textContent;
        localStorage.setItem("usernamee", userNamesx);
        console.log(userNamesx, "olaaas  ");
        
        // Guarda el userId en localStorage
        localStorage.setItem("userId", userId);
        localStorage.setItem("nombreUsuario", nombreCompleto);
        console.log(nombreCompleto, "holaaaaaaa");


        // Actualizar UI con nombre del usuario
        actualizarUIConNombre(nombreCompleto);
      } else {
        actualizarUIComoDesconocido();
      }
    })
    .catch((error) => {
      console.error("Hubo un problema con la solicitud:", error);
    });
}


function actualizarUIConNombre(nombre) {
  const userNameElement = document.getElementById("user_name");
  if (userNameElement) {
    userNameElement.textContent = nombre;
  }

  const userNamesElement = document.getElementById("user_names");
  if (userNamesElement) {
    userNamesElement.textContent = nombre;
  }

  const userNamexzElement = document.getElementById("user_namexz");
  if (userNamexzElement) {
    userNamexzElement.textContent = nombre;
  }

  const userNamexElement = document.getElementById("user_namex");
  if (userNamexElement) {
    userNamexElement.textContent = nombre;
  }

  const modalUserNameElement = document.getElementById("modal_user_name");
  if (modalUserNameElement) {
    modalUserNameElement.textContent = nombre;
  }
}

function actualizarUIComoDesconocido() {
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
