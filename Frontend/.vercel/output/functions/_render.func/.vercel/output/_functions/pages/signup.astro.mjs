/* empty css                                      */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import { $ as $$Sidebar, a as $$Header } from '../chunks/sidebar_D6pkKqYj.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Signup$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<body class="bg-gray-100 p-8"> <span class="flex flex-row "> <div class="mt-4 p-2"> <button type="button" id="volver" class="bg-blue-baby4  text-white p-2 rounded hover:bg-blue-baby3 " onclick="window.history.back()">Volver</button> </div> <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"> <h1 class="text-3xl font-display text-blue-baby4 text-center font-bold mb-6">
Registrar administrador
</h1> <form id="signupForm" class="mt-5"> <div class="grid grid-cols-2 gap-4 mb-4"> <div> <label for="first_name" class="block mb-2">Nombres:</label> <input id="first_name" name="first_name" class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-baby4" type="text" placeholder="Nombres..."> <span id="first_name_error" class="text-red-500 text-xs"></span> </div> <div> <label for="last_name" class="block mb-2">Apellidos:</label> <input id="last_name" name="last_name" class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-baby4" type="text" placeholder="Apellidos..."> <span id="last_name_error" class="text-red-500 text-xs"></span> </div> </div> <div class="mb-4"> <label for="email" class="block mb-2">Correo Electrónico:</label> <input id="email" name="email" class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-baby4" type="email" placeholder="Correo Electrónico..."> <span id="email_error" class="text-red-500 text-xs"></span> </div> <div class="mb-4 relative"> <label for="company" class="block mb-2">Contraseña:</label> <input id="company" name="company" class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-baby4" type="password" placeholder="Contraseña..."> <span id="company_error" class="text-red-500 text-xs"></span> <div id="hidden_password" class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" style="top: 32px;"> <img id="icon_password" src="../../../public/img/white/hidden.svg" alt="Toggle password visibility" class="w-5 h-5"> </div> </div> <div class="mb-6"> <div class="flex items-start"> <input id="remember-me" name="remember-me" type="checkbox" class="mt-1 mr-2"> <label for="remember-me" class="text-sm text-gray-600">
Crear una cuenta significa que estás de acuerdo con nuestros
<a href="/terms" class="text-blue-baby4 hover:underline">Términos y condiciones de servicio.</a> </label> </div> <span id="terms_error" class="text-red-500 text-xs"></span> </div> <div class="flex justify-center"> <button id="submits" name="submit_signup" type="submit" class="bg-blue-baby4 text-white rounded p-2 px-4 hover:bg-blue-baby3 focus:outline-none focus:ring focus:border-blue-500">
Crear cuenta
</button> </div> </form> </div> <div id="success-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden z-50"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Check.svg" alt=""> <p class="text-green-600 p-2">Registro exitoso</p> </div> </div> <div id="error-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden z-50"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Error.svg" alt=""> <p class="text-rojing p-2">Error en el registro</p> </div> </div> </span></body>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Forms/Signup.astro", void 0);

const $$Signup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Proveedores - ProviSoft</title><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="../input.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap">${renderHead()}</head> <body class="bg-white"> <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <div class="ml-64 w-full"> ${renderComponent($$result, "Header", $$Header, {})} <main class="p-6"> <div id="tablaProvi" style=""> ${renderComponent($$result, "Signup", $$Signup$1, {})} </div> </main> </div> </div> </body></html>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/signup.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
