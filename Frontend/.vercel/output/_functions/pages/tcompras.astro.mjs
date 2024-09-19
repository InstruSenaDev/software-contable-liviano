import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Sidebar, a as $$Header } from '../chunks/sidebar_D6pkKqYj.mjs';
export { renderers } from '../renderers.mjs';

const $$TablaCompras = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1 class="font-bold font-display text-blue-baby4 text-3xl flex justify-center">
Compras
</h1> <div class="flex flex-row space-x-2 justify-between m-3"> <div class="hidden flex items-center space-x-2 md:space-x-4"> <input class="h-8 w-48 md:w-96 rounded-md text-sm" type="text" placeholder="Buscar..."> </div> </div> <div class="flex flex-row justify-end p-2"> <div class="flex flex-row p-1 bg-blue-baby4 text-white rounded-md font-display hover:bg-blue-baby3"> <img class="m-1" src="../../../public/img/white/register-shopping.svg" alt=""> <a href="/comprasDos"> <button>Registrar compra</button> </a> </div> <button id="btnDelete" class="m-2"> <img class="" src="../../../public/img/black/trash.svg" alt=""> </button> </div> <table id="tablacompras" class="min-w-full bg-white border border-gray-200"> <thead id="compras" class=""> <tr class="border-b justify-around text-justify"> <th class="p-2">No.Factura</th> <th class="p-2">Monto total</th> <th class="p-2">Descuento</th> <th class="p-2">Total pagar</th> <th class="p-2">Proveedor</th> <th class="p-2">Encargado</th> <th class="p-2">Iva</th> <th class="p-2">Fecha</th> <th class="p-2">Hora</th> <th></th> </tr> </thead> <tbody></tbody> </table> <div id="deleteModal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-end z-50"> <div class="bg-white p-6 rounded-lg shadow-lg w-96"> <h2 class="text-xl font-bold mb-4 text-center font-display text-blue-baby4">
Eliminar Compra
</h2> <input id="documentInput" type="text" class="rounded-md border p-2 w-full mb-4" placeholder="Ingrese el codigo de factura"> <span id="errorMsg" class="text-red-500 text-sm hidden">compra no encontrada</span> <div class="flex justify-end space-x-2 flex item-center"> <button id="closeModal" class="bg-black text-white px-4 py-2 rounded">Cerrar</button> <button id="deleteCompra" class="bg-blue-baby3 text-white px-4 py-2 rounded hover:bg-red-600">Eliminar compra</button> </div> </div> </div> `;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Dashboard/compras/tablaCompras.astro", void 0);

const $$TCompras = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Compras - ProviSoft</title><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="../input.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap">${renderHead()}</head> <body class="bg-white"> <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <div class="ml-64 w-full"> ${renderComponent($$result, "Header", $$Header, {})} <main class="p-6"> <div id="tablaCompras"> ${renderComponent($$result, "TablaCompras", $$TablaCompras, {})} </div> </main> </div> </div> </body></html>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tCompras.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tCompras.astro";
const $$url = "/tCompras";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TCompras,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
