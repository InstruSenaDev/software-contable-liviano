/* empty css                                      */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import { $ as $$Sidebar, a as $$Header } from '../chunks/sidebar_D6pkKqYj.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Perfil = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<body class="bg-gray-100 p-8"> <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md"> <h1 class="text-3xl font-display text-blue-baby4 text-center font-bold mb-6 p-5">
Editar Perfil
</h1> <!-- <form id="editProfileForm" class="mt-5"> --> <div class="grid grid-cols-1 gap-4"> <div> <label for="input-nombres" class="block mb-2 text-blue-baby4 font-bold">Nombres:</label> <div class="flex items-center"> <input id="input-nombres" class="flex-grow p-2 border rounded" type="text" placeholder="Nombres" disabled> <button id="edit-nombres" class="ml-2"> <img class="w-5 h-5" src="../../public/img/black/edit2.svg" alt="Editar"> </button> <button id="save-nombres" class="ml-2 hidden"> <img class="w-5 h-5" src="../../public/img/black/edit.svg" alt="Guardar"> </button> <button id="cancel-nombres" class="ml-2 hidden"> <img class="w-5 h-5" src="../../public/img/black/trash.svg" alt="Cancelar"> </button> </div> <span id="name-error" class="text-red-500 text-sm"></span> </div> <div> <label for="input-apellidos" class="block mb-2 text-blue-baby4 font-bold">Apellidos:</label> <div class="flex items-center"> <input id="input-apellidos" class="flex-grow p-2 border rounded" type="text" placeholder="Apellidos" disabled> <button id="edit-apellidos" class="ml-2"> <img class="w-5 h-5" src="../../public/img/black/edit2.svg" alt="Editar"> </button> <button id="save-apellidos" class="ml-2 hidden"> <img class="w-5 h-5" src="../../public/img/black/edit.svg" alt="Guardar"> </button> <button id="cancel-apellidos" class="ml-2 hidden"> <img class="w-5 h-5" src="../../public/img/black/trash.svg" alt="Cancelar"> </button> </div> <span id="lastName-error" class="text-red-500 text-sm"></span> </div> <div> <label for="input-correo" class="block mb-2 text-blue-baby4 font-bold">Correo:</label> <div class="flex items-center"> <input id="input-correo" class="flex-grow p-2 border rounded" type="text" placeholder="Correo" disabled> <button id="edit-correo" class="ml-2"> <img class="w-5 h-5" src="../../public/img/black/edit2.svg" alt="Editar"> </button> <button id="save-correo" class="ml-2 hidden"> <img class="w-5 h-5" src="../../public/img/black/edit.svg" alt="Guardar"> </button> <button id="cancel-correo" class="ml-2 hidden"> <img class="w-5 h-5" src="../../public/img/black/trash.svg" alt="Cancelar"> </button> </div> <span id="email-error" class="text-red-500 text-sm"></span> </div> </div> <!-- </form> --> <div class="flex justify-center mt-8"> <button id="guardar-cambios" class="bg-blue-baby4 text-white rounded p-2 px-4 hover:bg-blue-baby3">
Guardar cambios
</button> </div> </div> <div id="modal-editexitoso" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden z-50"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Check.svg" alt=""> <p class="text-green-600 p-2">Perfil Editado correctamente</p> </div> </div> <div id="modal-erroredit" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden z-50"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Error.svg" alt=""> <p class="text-rojing p-2">Error Al editar perfil</p> </div> </div> </body>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/perfil.astro", void 0);

const $$PerfilUsuario = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Proveedores - ProviSoft</title><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="../input.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap">${renderHead()}</head> <body class="bg-white"> <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <div class="ml-64 w-full"> ${renderComponent($$result, "Header", $$Header, {})} <main class="p-6"> <div id="registro"> ${renderComponent($$result, "Perfil", $$Perfil, {})} </div> </main> </div> </div> </body></html>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/perfilUsuario.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/perfilUsuario.astro";
const $$url = "/perfilUsuario";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PerfilUsuario,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
