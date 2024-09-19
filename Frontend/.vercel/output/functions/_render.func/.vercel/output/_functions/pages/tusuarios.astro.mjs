/* empty css                                      */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Sidebar, a as $$Header } from '../chunks/sidebar_D6pkKqYj.mjs';
export { renderers } from '../renderers.mjs';

const $$TablaAdmin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1 class="text-3xl flex justify-center mt-5 font-bold font-display text-blue-baby4">
Administradores
</h1> <div class="flex flex-row space-x-2 justify-between m-3"> <div class="hidden flex items-center item space-x-2 md:space-x-4"> <input id="searchInput" class="h-8 w-48 md:w-96 rounded-md text-sm" type="text" placeholder="Buscar..."> </div> </div> <div class="flex flex-row justify-end p-2"> <div class="flex flex-row p-1 bg-blue-baby4 text-white rounded-md font-display hover:bg-blue-baby3"> <img class="m-1 w-5" src="../../../public/img/white/Admins.svg" alt=""> <a href="/signup"> <button>Registrar administrador</button> </a> </div> <button class="m-2" id="btnDelete"> <img class="" src="../../../public/img/black/trash.svg" alt=""> </button> </div> <table id="adminTable" class="min-w-full bg-white border border-gray-200"> <thead> <tr class="border-b text-justify"> <th class="p-2">Nombre</th> <th class="p-2">Apellido</th> <th class="p-2">Correo</th> <th class="p-2">Rol</th> </tr> </thead> <tbody></tbody> </table> <div id="deleteModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-end z-50"> <div class="bg-white p-6 rounded-lg shadow-lg w-96"> <h2 class="text-xl font-bold mb-4 text-center font-display text-blue-baby4">
Eliminar administrador
</h2> <input id="documentInput" type="text" class="rounded-md border p-2 w-full mb-4" placeholder="Ingrese el correo"> <span id="errorMsg" class="text-red-500 text-sm hidden">Administrador no encontrado</span> <div class="flex justify-end space-x-2 flex item-center"> <button id="closeModal" class="bg-black text-white px-4 py-2 rounded">Cerrar</button> <button id="deleteUsuario" class="bg-blue-baby3 text-white px-4 py-2 rounded hover:bg-red-600">Eliminar administrador</button> </div> </div> </div> <div id="modal-successxxz" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Check.svg" alt=""> <p class="text-green-600 p-2">Administrador eliminado</p> </div> </div> <div id="modal-errorxxz" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Error.svg" alt=""> <p class="text-red-600 p-2">Error al eliminar el administrador</p> </div> </div> `;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Dashboard/Administradores/tablaAdmin.astro", void 0);

const $$TUsuarios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Administradores - ProviSoft</title><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="../input.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap">${renderHead()}</head> <body class="bg-white"> <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <div class="ml-64 w-full"> ${renderComponent($$result, "Header", $$Header, {})} <main class="p-6"> <div id="tablaAdmin"> ${renderComponent($$result, "TablaAdmin", $$TablaAdmin, {})} </div> </main> </div> </div> </body></html>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tUsuarios.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tUsuarios.astro";
const $$url = "/tUsuarios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TUsuarios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
