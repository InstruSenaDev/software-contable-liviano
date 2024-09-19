import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as renderComponent, a as renderHead, e as renderSlot } from './astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="author" content="Michael Andreuzza"><meta name="your keywords" content="wallpaper,black wallpaper, gradient wallpaper,aesthetic wallpaper,iphone wallpaper,wallpaper iphone,white wallpaper,pink wallpaper"><!-- Favicon guidelines generated with https://realfavicongenerator.net/ --><link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png"><!-- <link rel="manifest" href="/images/favicons/site.webmanifest" /> --><link rel="mask-icon" href="/images/favicons/safari-pinned-tab.svg" color="#ffffff"><meta name="msapplication-TileColor" content="#ffffff"><meta name="theme-color" content="#ffffff"><!--Ionicons --><script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"><\/script><!--\nhttps://rsms.me/inter/\n--><link rel="preconnect" href="https://rsms.me/"><link rel="stylesheet" href="https://rsms.me/inter/inter.css"><link rel="stylesheet" href="../input.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet"><!---- Alpine  --><script defer src="https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js"><\/script>'])));
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/BaseHead.astro", void 0);

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-blue-baby4 border-b border-black/5"> <div class="w-full mx-auto md:px-12 px-8 max-w-7xl lg:px-16"> <div x-data="{ open: false }" class="relative flex flex-col w-full py-5 mx-auto bg-blue-baby4 md:items-center md:justify-between md:flex-row md:px-6"> <div class="flex flex-row items-center justify-between lg:justify-start"> <a href="/" class="text-white inline-flex items-center gap-3"> <img class="w-8 h-auto" src="../../../public/img/logoPS.svg" alt=""> <span class="font-bold font-display">ProviSoft</span> </a> <button @click="open = !open" class="inline-flex items-center justify-center p-2 text-gray-400 hover:text-black focus:outline-none focus:text-black md:hidden"> <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"> <path :class="{ 'hidden': open, 'inline-flex': !open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> <path :class="{ 'hidden': !open, 'inline-flex': open }" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <nav :class="{ 'flex': open, 'hidden': !open }" class="flex-col items-center flex-grow hidden md:pb-0 md:flex md:justify-end md:flex-row space-y-2 md:space-y-0 md:space-x-8"> <a class="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-white hover:text-blue-baby" href="/#features">Home</a> <a class="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-white hover:text-blue-baby" href="/#pricing">Servicios</a> <a href="/login" class="inline-flex items-center h-8 justify-center px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-50 active:bg-gray-200 active:text-accent-400 focus-visible:outline-black">
Inicia Sesión
</a> </nav> </div> </div> </section>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/global/Navigation.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24"> <div class="grid grid-cols-2 lg:grid-cols-4 items-start gap-x-8 gap-y-24 "> <a href="/" class="xl:col-span-1 text-black inline-flex items-center gap-3"> <img class="w-8 h-auto" src="../../../public/img/logoPS2.svg" alt=""> <span class="font-bold font-display">ProviSoft</span> </a> <div class="md:grid md:grid-cols-2 xl:grid-cols-4 md:gap-8 text-sm text-gray-400 lg:col-span-3"> <div> <h3 class="text-lg text-black font-medium tracking-tight">
Todas las paginas
</h3> <ul role="list" class="mt-4 space-y-1"> <li> <a href="/" class=" hover:text-black">
Home
</a> </li> </ul> </div> <div class="mt-12 md:mt-0"> <h3 class="text-lg text-black font-medium tracking-tight">Sociales</h3> <ul role="list" class="mt-4 space-y-1"> <li> <a href="https://x.com/lexingtonthemes" class=" hover:text-black">
provisoft@gmail.com
</a> </li> </ul> </div> </div> </div> </div> </footer> <footer class="bg-white"> <div class="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-6 "> <div class="border-t pt-6"> <p class="text-sm text-neutral-600 lg:col-span-2 ">
© 2024 Provisoft
</p> </div> </div> </footer>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/global/Footer.astro", void 0);

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" class="scroll-smooth selection:bg-accent-500 selection:text-white no-touchevents hydrated"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, {})}${renderHead()}</head> <body class="bg-white flex flex-col min-h-svh"> ${renderComponent($$result, "Navigation", $$Navigation, {})} <main class="grow">${renderSlot($$result, $$slots["default"])}</main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
