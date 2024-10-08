/* empty css                                      */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BsaVE2LS.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Login$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section> <div class="flex relative justify-center lg:px-0 items-center lg:h-screen md:px-12 overflow-hidden"> <div class="bg-white px-4 relative flex flex-1 flex-col lg:py-24 md:flex-none md:px-28 py-10 sm:justify-center xl:py-36 z-10"> <!-- titulo --> <div class="w-full lg:h-full max-w-md md:max-w-sm md:px-0 md:w-96 mx-auto sm:px-4"> <div class="flex flex-col"> <div> <h2 class="font-medium leading-tight text-black text-xl font-display flex relative justify-center">
Inicio Sesión en
</h2> <!-- titulo provisoft --> <div class="py-3"> <div class="flex relative justify-center"> <span class="bg-white px-2 text-xl font-display"> <span class="text-blue-baby4">Provi</span><span class="text-blue-baby">Soft</span> </span> </div> </div> </div> </div> </div> <!-- titulo --> <form id="log-in"> <div class="space-y-6"> <div> <input id="email" name="email" class="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500" placeholder="Correo Electrónico..."> </div> <div id="email_error" class="text-red-500 text-xxs ml-2"></div> <div class="relative"> <input id="password" name="password" class="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:bg-white focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 pr-12 rounded-xl sm:text-sm text-accent-500 mb-4" placeholder="Contraseña..." type="password"> <div id="password_error" class="text-red-500 text-xxs ml-2"></div> <div id="hidden_password" class="absolute w-8 inset-y-0 right-0 pr-3 flex items-center cursor-pointer"> <img id="icon_password" src="../../../public/img/white/hidden.svg" alt=""> </div> </div> <div class="flex items-center justify-between"> <div class="flex items-center"> <input class="text-accent-500 focus:ring-accent-500 border-accent-500 h-4 rounded w-4" type="checkbox" id="remember-me" name="remember-me"> <label class="font-medium text-sm block leading-tight ml-2 text-black" for="remember-me">Guardar Contraseña</label> </div> <div class="text-sm"> <a class="font-medium hover:text-accent-500 text-accent-500" href="/olvidocontraseña">¿Olvido su contraseña?</a> </div> </div> <div class="col-span-full"> <button id="login" class="items-center h-12 justify-center rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black px-6 py-3 text-center text-white w-full" type="submit">Iniciar Sesión</button> </div> </div> </form> </div> </div> </section> <div id="modal-success" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden z-50"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Check.svg" alt=""> <p class="text-green-600 p-2">Iniciando sesión</p> </div> </div> <div id="modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden z-50"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Error.svg" alt=""> <p class="text-rojing p-2">Error al iniciar sesión</p> </div> </div> `;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Forms/Login.astro", void 0);

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Login", $$Login$1, {})} ` })}`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/login.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
