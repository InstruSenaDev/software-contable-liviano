export function Storage(){
    document.addEventListener("DOMContentLoaded", function() {
        const email = localStorage.getItem("email");
      
        if (email) {
          document.getElementById("encargadoUser").textContent = email;
        } else {
          document.getElementById("encargadoUser").textContent = "Usuario desconocido";
        }
      });
}
