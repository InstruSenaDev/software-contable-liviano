import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Ls3tkeZS.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Recuperarcontrasea = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section> <div class="flex relative justify-center lg:px-0 items-center lg:h-screen md:px-12 overflow-hidden"> <div class="bg-white px-4 relative flex flex-1 flex-col lg:py-24 md:flex-none md:px-28 py-10 sm:justify-center xl:py-36 z-10"> <!-- Título --> <div class="w-full lg:h-full max-w-md md:max-w-sm md:px-0 md:w-96 mx-auto sm:px-4"> <div class="flex flex-col"> <div> <h2 class="font-medium leading-tight text-black text-xl font-display flex relative justify-center">
Recupera tu contraseña en
</h2> <!-- Título Provisoft --> <div class="py-3"> <div class="flex relative justify-center"> <span class=" bg-white px-2 text-xl font-display"> <span class="text-blue-baby4">Provi</span><span class="text-blue-baby">Soft</span> </span> </div> </div> </div> </div> </div> <!-- Formulario --> <form id="log-in"> <div class="space-y-6"> <div> <input id="email" name="email" class="w-full focus:outline-none border py-3 appearance-none h-12 bg-gray-50 block border-gray-200 focus:border-accent-500 focus:ring-accent-500 placeholder-gray-400 px-3 rounded-xl sm:text-sm text-accent-500" placeholder="Correo Electrónico..."> </div> <div id="email_error" class="text-red-500 text-xxs ml-2"></div> <div class="flex items-center justify-between"> <div class="flex items-center"> <label class="font-medium text-sm block leading-tight ml-2 text-black mb-6" for="remember-me">
Asegurate de usar el correo con el que te registraste.
</label> </div> </div> <div class="col-span-full"> <button class="items-center h-12 justify-center rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black px-6 py-3 text-center text-white w-full" type="submit">Continuar
</button> </div> </div> </form> </div> </div> </section>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Forms/Recuperarcontrase\xF1a.astro", void 0);

const $$Olvidocontrasea = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Recueperarpass", $$Recuperarcontrasea, {})} ` })}`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/olvidocontrase\xF1a.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/olvidocontraseña.astro";
const $$url = "/olvidocontraseña";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Olvidocontrasea,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
