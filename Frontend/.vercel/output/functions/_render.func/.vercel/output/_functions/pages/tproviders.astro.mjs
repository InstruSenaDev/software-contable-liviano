/* empty css                                      */
import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, b as renderComponent, a as renderHead } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import { $ as $$Sidebar, a as $$Header } from '../chunks/sidebar_D6pkKqYj.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://lexingtonthemes.com");
const $$DataProvi = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DataProvi;
  const { name, encargado, nit, tipeDocument, email, telefono, address } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<tr class="border-b "> <td class="p-2">${name}</td> <td class="p-2">${encargado}</td> <td class="p-2">${nit}</td> <td class="p-2">${tipeDocument}</td> <td class="p-2">${telefono}</td> <td class="p-2">${email}</td> <td class="p-2">${address}</td> </tr>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Dashboard/proveedores/dataProvi.astro", void 0);

const $$TablaProvi = createComponent(async ($$result, $$props, $$slots) => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/proveedores");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  };
  const getDocumentType = (type) => {
    switch (type) {
      case 1:
        return "C\xE9dula";
      case 2:
        return "NIT";
      default:
        return "Desconocido";
    }
  };
  const providers = await fetchData();
  return renderTemplate`${maybeRenderHead()}<h1 class="font-bold font-display text-blue-baby4 text-3xl flex justify-center">Proveedores</h1> <div class="flex flex-row space-x-2 justify-between m-3"> <div class="hidden flex items-center space-x-2 md:space-x-4"> <input class="h-8 w-48 md:w-96 rounded-md text-sm" type="text" placeholder="Buscar..."> <select class="h-8  rounded-md text-sm" name="filtrar" id=""> <option value="">Nombre </option> <option value=""> Encargado </option> <option value="">Documento</option> <option value="">Correo</option> </select> </div> </div> <div class="flex flex-row justify-end p-2"> <div class="flex flex-row p-1 bg-blue-baby4 text-white rounded-md font-display hover:bg-blue-baby3"> <img class="m-1" src="../../../public/img/white/person.svg" alt=""> <a href="/rProviders"> <button>Registrar proveedores</button> </a> </div> <button id="btnDelete" class="m-2"> <img class="" src="../../../public/img/black/trash.svg" alt=""> </button> </div> <table class="min-w-full bg-white border border-gray-200"> <thead> <tr class="border-b text-justify"> <th class="p-2">Nombre</th> <th class="p-2">Encargado</th> <th class="p-2">Numero.Doc</th> <th class="p-2">Tipo documento</th> <th class="p-2">Telefono</th> <th class="p-2">Correo</th> <th class="p-2">Dirección</th> </tr> </thead> <tbody> ${providers.map((provider) => renderTemplate`${renderComponent($$result, "ProviderRow", $$DataProvi, { "name": provider.nombre, "encargado": provider.encargado, "nit": provider.numerodocumento, "tipeDocument": getDocumentType(provider.iddocumento), "email": provider.correoelectronico, "telefono": provider.numerotelefono, "address": provider.direccion })}`)} </tbody> </table> <div id="deleteModal" class=" hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-end z-50"> <div class="bg-white p-6 rounded-lg shadow-lg w-96"> <h2 class="text-xl font-bold mb-4 text-center font-display text-blue-baby4">Eliminar Proveedor</h2> <input id="documentInput" type="text" class="rounded-md border p-2 w-full mb-4" placeholder="Ingrese número de documento"> <span id="errorMsg" class="text-red-500 text-sm hidden">Usuario no encontrado</span> <div class="flex justify-end space-x-2 flex item-center"> <button id="closeModal" class="bg-black text-white px-4 py-2 rounded ">Cerrar</button> <button id="deleteProvider" class="bg-blue-baby3 text-white px-4 py-2 rounded hover:bg-red-600">Eliminar Proveedor</button> </div> </div> </div> <div id="modal-successxx" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Check.svg" alt=""> <p class="text-green-600 p-2">Proveedor eliminado</p> </div> </div> <div id="modal-errorxx" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Error.svg" alt=""> <p class="text-rojing p-2">Error al eliminar proveedor</p> </div> </div> `;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Dashboard/proveedores/tablaProvi.astro", void 0);

const $$TProviders = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Proveedores - ProviSoft</title><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="../input.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap">${renderHead()}</head> <body class="bg-white"> <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <div class="ml-64 w-full"> ${renderComponent($$result, "Header", $$Header, {})} <main class="p-6"> <div id="tablaProvi" style=""> ${renderComponent($$result, "TablaProvi", $$TablaProvi, {})} </div> </main> </div> </div> </body></html>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tProviders.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tProviders.astro";
const $$url = "/tProviders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TProviders,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
