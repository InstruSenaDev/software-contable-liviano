export function localStorage (){
    fetch('http://localhost:8080/usuarios')
    .then(response => response.json())
    .then(data => {
        data.forEach(user_email => {
            const option = document.set();
            option.textContent = user_email.nombre;
            selectElement.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al obtener los proveedores:', error);
    });

}