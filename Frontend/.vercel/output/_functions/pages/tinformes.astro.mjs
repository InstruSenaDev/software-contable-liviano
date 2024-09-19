import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import { $ as $$Sidebar, a as $$Header } from '../chunks/sidebar_D6pkKqYj.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Informe = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="text-3xl font-bold">Informes</div> <div class="bg-grisesito h-auto p-2 w-full rounded-md"> <div class="flex flex-row justify-around"> <span class="flex flex-col"> <div class="text-grisfont font-bold">Encargado del registro:</div> <span class="text-grisfont" id="user_namexz"></span> </span> <span class="flex flex-col text-grisfont"> <div class="font-bold">Fecha:</div> <span id="fecha"></span> </span> <span class="flex flex-col text-grisfont"> <div class="text-grisfont font-bold">Hora:</div> <span id="hora"></span> </span> </div> </div> <div class="border-black border-2 rounded-md p-2 w-full h-full"> <div class="flex flex-col"> <span>Filtrar informe</span> <select class="bg-grisinpu border-none rounded-md w-40" name="Tipo" id=""> <option value="">Filtro</option> <option value="fecha">Fecha</option> <option value="proveedor">Proveedor</option> <option value="admin">Administrador</option> <option value="codigo">Codigo compra</option> </select> </div> </div> `;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Dashboard/Informes/informe.astro", void 0);

const $$TInformes = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Informes - ProviSoft</title><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="../input.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap">${renderHead()}</head> <body class="bg-white"> <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <div class="ml-64 w-full"> ${renderComponent($$result, "Header", $$Header, {})} <main class="p-6"> <div id="informes"> ${renderComponent($$result, "Informe", $$Informe, {})} </div> </main> </div> </div> </body></html>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tInformes.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tInformes.astro";
const $$url = "/tInformes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TInformes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
