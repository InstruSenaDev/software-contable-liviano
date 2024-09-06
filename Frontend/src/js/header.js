document.addEventListener("DOMContentLoaded", function () {
    const email = localStorage.getItem("email");

    if (email) {

        enviarEmailAlServidor(email);
    } else {
        document.getElementById("header_user_email").textContent = "Usuario desconocido";
        document.getElementById("modal_user_email").textContent = "Usuario desconocido";
    }

});
export function LogOut() {
    try {
        // Intentar eliminar el correo del localStorage
        localStorage.removeItem("email");

        // Mostrar el modal de éxito
        mostrarModal("modal-success");

        // Redirigir después de mostrar el modal
        setTimeout(() => {
            window.location.href = "/";
        }, 3000);
    } catch (error) {
        mostrarModal("modal-error");
    }
}

export function mostrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`No se encontró un elemento con el ID: ${modalId}`);
        return;
    }
    modal.classList.remove("hidden");
    modal.classList.add("opacity-100");

    setTimeout(() => {
        modal.classList.add("opacity-0");
        modal.classList.remove("opacity-100");

        setTimeout(() => {
            modal.classList.add("hidden");
        }, 100);
    }, 2000);
}

function enviarEmailAlServidor(email) {
    fetch(`http://localhost:8080/usuariosLog?email=${email}`, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta del servidor:", data);


            if (data.length > 0) {
                const usuario = data[0];
                const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;
                document.getElementById("header_user_email").textContent = nombreCompleto;
                document.getElementById("modal_user_email").textContent = nombreCompleto;
            } else {
                document.getElementById("header_user_email").textContent = "Usuario no encontrado";
                document.getElementById("modal_user_email").textContent = "Usuario no encontrado";
            }
        })
        .catch(error => {
            console.error("Hubo un problema con la solicitud:", error);
        });
}


const showModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
};

const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
};


document.getElementById('openModalButton').addEventListener('click', showModal);
document.getElementById('closeModalButton').addEventListener('click', closeModal);
