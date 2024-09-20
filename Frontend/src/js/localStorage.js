export function localStorage (){
    fetch('https://provisoft-backend.vercel.app/usuarios')
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