import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import { $ as $$Sidebar, a as $$Header } from '../chunks/sidebar_D6pkKqYj.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$PreMenu = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div> <p class="font-display text-3xl font-bold text-blue-baby4 text-center p-5 ">Bienvenido al menú de compras</p> <span class="flex flex-row justify-around mt-14"> <a href="/tCompras"> <button class="bg-blue-baby w-72 h-72"> Ver tus compras</button> </a> <a href="/comprasDos"> <button class="bg-blue-baby w-72 h-72">Registrar compras</button> </a> </span> </div>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Dashboard/compras/preMenu.astro", void 0);

const $$PreMenuCompras = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Proveedores - ProviSoft</title><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="../input.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap">${renderHead()}</head> <body class="bg-white"> <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <div class="ml-64 w-full"> ${renderComponent($$result, "Header", $$Header, {})} <main class="p-6"> <div id="registro"> ${renderComponent($$result, "PreMenu", $$PreMenu, {})} </div> </main> </div> </div> </body></html>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/preMenuCompras.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/preMenuCompras.astro";
const $$url = "/preMenuCompras";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$PreMenuCompras,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
