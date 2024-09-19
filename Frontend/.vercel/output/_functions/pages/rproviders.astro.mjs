import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import { $ as $$Sidebar, a as $$Header } from '../chunks/sidebar_D6pkKqYj.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$RegistroP = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<body class="bg-gray-100 p-8"> <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md"> <h1 class="text-3xl font-display text-blue-baby4 text-center font-bold mb-6 p-5">
Registro de Proveedores
</h1> <div class="bg-gray-200 rounded-sm flex flex-row justify-around p-5"> <span class="flex flex-row"> <p class="m-1">Encargado del registro:</p> <p class="m-1" id="user_names"></p> </span> <span class="flex flex-row"> <p class="m-1">Hora:</p> <p class="m-1" id="hora"></p> </span> <span class="flex flex-row"> <p class="m-1">Fecha:</p> <p class="m-1" id="fecha"></p> </span> </div> <form id="formProviders" class="mt-5"> <div class="grid grid-cols-2 gap-4"> <div> <label for="nombre" class="block mb-2">Nombres y apellidos:</label> <input id="nombre" class="w-full p-2 border rounded" type="text" placeholder="Nombres y apellidos"> <span id="error-nombre" class="text-red-500 text-sm hidden"></span> </div> <div> <label for="tipo-documento" class="block mb-2">Tipo de documento:</label> <select id="tipo-documento" class="w-full p-2 border rounded"> <option value="">Tipo documento</option> <option value="1">Cédula</option> <option value="2">NIT</option> </select> <span id="error-tipo-documento" class="text-red-500 text-sm hidden"></span> </div> <div> <label for="numero-documento" class="block mb-2">Número de documento:</label> <input id="numero-documento" class="w-full p-2 border rounded" type="text" placeholder="000000000"> <span id="error-numero-documento" class="text-red-500 text-sm hidden"></span> </div> <div> <label for="numero-telefono" class="block mb-2">Número de teléfono:</label> <input id="numero-telefono" class="w-full p-2 border rounded" type="text" placeholder="0000000000"> <span id="error-numero-telefono" class="text-red-500 text-sm hidden"></span> </div> <div> <label for="correo-electronico" class="block mb-2">Correo electrónico:</label> <input id="correo-electronico" class="w-full p-2 border rounded" type="text" placeholder="correo@correo.com"> <span id="error-correo-electronico" class="text-red-500 text-sm hidden"></span> </div> <div> <label for="direccion" class="block mb-2">Dirección:</label> <input id="direccion" class="w-full p-2 border rounded" type="text" placeholder="Cra #"> <span id="error-direccion" class="text-red-500 text-sm hidden"></span> </div> <div> <label for="encargado" class="block mb-2">Encargado:</label> <input id="encargado" class="w-full p-2 border rounded" type="text" placeholder="Nombre"> <span id="error-encargado" class="text-red-500 text-sm hidden"></span> </div> </div> </form> <div class="flex justify-end space-x-5 mt-6"> <button type="button" id="cancelar" class="bg-black text-white rounded p-2 px-4">Cancelar</button> <button type="button" id="submit" class="bg-blue-baby4 text-white rounded p-2 px-4">Registrar</button> </div> </div> <div id="modal-successx" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Check.svg" alt=""> <p class="text-green-600 p-2">Registro exitoso</p> </div> </div> <div id="modal-errorx" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Error.svg" alt=""> <p class="text-rojing p-2">Error en el registro</p> </div> </div>  </body>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Dashboard/proveedores/registroP.astro", void 0);

const $$RProviders = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Proveedores - ProviSoft</title><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="../input.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap">${renderHead()}</head> <body class="bg-white"> <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <div class="ml-64 w-full"> ${renderComponent($$result, "Header", $$Header, {})} <main class="p-6"> <div id="registroP"> ${renderComponent($$result, "RegistroP", $$RegistroP, {})} </div> </main> </div> </div> </body></html>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/rProviders.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/rProviders.astro";
const $$url = "/rProviders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$RProviders,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
