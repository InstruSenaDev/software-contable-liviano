// showComponents.js
export function showComponent(component) {
    const registroP = document.getElementById('registroP');
    const registro = document.getElementById('registro');
    const registroAdmin = document.getElementById('registroAdmin');
    const tablaCompras = document.getElementById('tablaCompras');
    const tablaAdmin = document.getElementById('tablaAdmin');
    const tablaProvi = document.getElementById('tablaProvi');
    const perfil = document.getElementById('perfil');
    const signup = document.getElementById('signup');

    if (registroP) registroP.style.display = 'none';
    if (registro) registro.style.display = 'none';
    if (registroAdmin) registroAdmin.style.display = 'none';
    if (tablaCompras) tablaCompras.style.display = 'none';
    if (tablaAdmin) tablaAdmin.style.display = 'none';
    if (tablaProvi) tablaProvi.style.display = 'none';
    if (perfil) perfil.style.display = 'none';
    if (signup) signup.style.display = 'none';


    if (component === 'registroP' && registroP) {
        registroP.style.display = 'block';
    } else if (component === 'registro' && registro) {
        registro.style.display = 'block';
    } else if (component === 'tablaAdmin' && tablaAdmin) {
        tablaAdmin.style.display = 'block';
    } else if (component === 'tablaCompras' && tablaCompras) {
        tablaCompras.style.display = 'block';
    } else if (component === 'registroAdmin' && registroAdmin) {
        registroAdmin.style.display = 'block';
    } else if (component === 'perfil' && perfil) {
        perfil.style.display = 'block';
    } else if (component === 'signup' && signup) {
        signup.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    showComponent('registro');
});
