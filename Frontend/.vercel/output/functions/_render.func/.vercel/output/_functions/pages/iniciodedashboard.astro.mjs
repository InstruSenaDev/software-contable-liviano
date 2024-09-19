/* empty css                                      */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as createAstro, a as renderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$HeaderInicio = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-blue-baby4 border-b border-black/5"> <div class="w-full mx-auto md:px-12 px-8 max-w-7xl lg:px-16"> <div x-data="{ open: false }" class="relative flex flex-col w-full py-5 mx-auto bg-blue-baby4 md:items-center md:justify-between md:flex-row md:px-6"> <div class="flex flex-row items-center justify-between lg:justify-start"> <a href="/" class="text-white inline-flex items-center gap-3"> <svg class="h-4" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" class="ccustom" fill="#283CFF"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" class="ccompli1" fill="#5263FF"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" class="ccompli2" fill="#808CFF"></path> </svg> <span class="font-bold font-display">ProviSoft</span> </a> <button @click="open = !open" class="inline-flex items-center justify-center p-2 text-gray-400 hover:text-black focus:outline-none focus:text-black md:hidden"> <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"> <path :class="{ 'hidden': open, 'inline-flex': !open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> <path :class="{ 'hidden': !open, 'inline-flex': open }" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </div> </div> </section>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Dashboard/inicio/headerInicio.astro", void 0);

const $$InicioDashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section> <div class="flex justify-center"> <div class="bg-slate-100 m-10 h-50 w-9/9 p-10 rounded-md"> <div class="w-full h-20"> <p class="text-3xl font-display">
¡Bienvenido a <span class="text-blue-baby3">Dash</span>board!
</p> <p class="font-display">
Aquí podras realizar todo tu proceso de registro de compras
</p> </div> </div> </div> <div class="flex justify-around"> <a href="/preMenuProviders"> <span> <div class="border-2 border-black h-40 w-48 text-center rounded-md flex justify-items-center"> <img src="../../../../public/img/proveedores.png" alt=""> </div> <p class="text-center">Proveedores</p> </span></a> <a href="/preMenuCompras"> <span> <div class="border-2 border-black h-40 w-48 text-center rounded-md flex justify-items-center"> <img src="../../../../public/img/compras.png" alt=""> </div> <p class="text-center">Compras</p> </span></a> <a href="/tInformes"> <span class=""> <div class="border-2 border-black h-40 w-48 text-center rounded-md flex justify-items-center"> <img src="../../../../public/img/informes.png" alt=""> </div> <p class="text-center">Crea tu informe</p> </span></a> </div> </section>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Dashboard/inicio/inicioDashboard.astro", void 0);

const $$Astro = createAstro("https://lexingtonthemes.com");
const $$InicioDedashboard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$InicioDedashboard;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Dashboard</title><link rel="stylesheet" href="/src/styles/tailwind.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap">${renderHead()}</head> <body class="bg-white"> <div class=""> <header> <!-- Este es un componente Astro --> ${renderComponent($$result, "HeaderInicio", $$HeaderInicio, {})} </header> </div> <main> <!-- Componente Astro --> ${renderComponent($$result, "InicioDashboard", $$InicioDashboard, {})} </main> </body></html>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/inicioDedashboard.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/inicioDedashboard.astro";
const $$url = "/inicioDedashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$InicioDedashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
