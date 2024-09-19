import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as renderComponent } from '../chunks/astro/server_BvfbZJ6n.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Sidebar, a as $$Header } from '../chunks/sidebar_D6pkKqYj.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<body class="bg-gray-100 p-8"> <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md"> <h1 class="text-3xl font-display text-blue-baby4 text-center font-bold mb-6 p-5">
Registro de compras
</h1> <div class="bg-gray-200 rounded-sm flex flex-row justify-around p-5  "> <span class="flex flex-row "> <p class="m-1">Registrador:</p> <p class="m-1" id="user_namexz"></p> </span> <span class="flex flex-row "> <p class="m-1">Hora:</p> <p class="m-1" id="hora"></p> </span> <span class="flex flex-row "> <p class="m-1">Fecha:</p> <p class="m-1" id="fecha"></p> </span> </div> <!-- Formulario de datos principales de la compra --> <form id="facturaForm" class="mb-8 mt-5"> <div class="flex flex-col"> <p>Codigo de factura:</p> <input id="registroCodigo" type="number" placeholder="Codigo"> </div> <div class="grid grid-cols-2 gap-4"> <div> <label for="proveedor" class="block mb-2">Proveedor:</label> <select class="w-full p-2 border rounded" name="" id="proveedor"></select> </div> <div> <label for="monto" class="block mb-2">Monto Total:</label> <input type="number" id="monto" required class="w-full p-2 border rounded"> </div> <div> <label for="impuesto" class="block mb-2">Impuesto (%):</label> <input type="number" id="impuesto" required class="w-full p-2 border rounded"> </div> <div> <label for="descuento" class="block mb-2">Descuento (%):</label> <input type="number" id="descuento" required class="w-full p-2 border rounded"> </div> </div> <!-- Sección para seleccionar cuentas contables --> <div class="mt-4"> <label for="cuentas" class="block mb-2">Seleccione las cuentas contables:</label> <div class="flex flex-row justify-between space-x-2"> <select id="tipo" class="p-2 border rounded"> <option value="">Tipo</option> <option value="debito">Débito</option> <option value="credito">Crédito</option> </select> <select id="cuentaz" class="flex-grow p-2 border rounded"></select> <input id="valor" type="number" placeholder="Valor" class="p-2 border rounded"> <button type="button" id="agregarCuentas" class="bg-blue-baby3 text-white p-2 rounded">Agregar Cuenta</button> </div> <div class="mt-4"> <strong>Cuentas Seleccionadas:</strong> <ul id="cuentasSeleccionadas" class="list-disc list-inside mt-2"></ul> </div> </div> <div class="mt-4"> <button type="button" id="contabilizar" class="bg-blue-baby4 text-white p-2 rounded">Contabilizar</button> </div> </form> <!-- Resumen de compras --> <div id="resumen" class="mt-8"> <h2 class="text-xl font-semibold mb-4">Resumen de Compras</h2> <table class="w-full border-collapse border"> <thead> <tr class="bg-gray-200"> <th class="border p-2">Proveedor</th> <th class="border p-2">Monto</th> <th class="border p-2">Impuesto</th> <th class="border p-2">Descuento</th> <th class="border p-2">Total</th> </tr> </thead> <tbody id="tablaFacturas"></tbody> </table> <div class="mt-4"> <strong>Total de Compras: </strong><span id="totalCompras">$0.00</span> </div> </div> <!-- Registro contable --> <div id="registroContable" class="mt-8"> <h2 class="text-xl font-semibold mb-4">Registro Contable</h2> <table class="w-full border-collapse border"> <thead> <tr class="bg-gray-200"> <th class="border p-2">Cuenta Contable</th> <th class="border p-2">Débito</th> <th class="border p-2">Crédito</th> </tr> </thead> <tbody id="tablaContabilidad"></tbody> </table> <div class="mt-4"> <strong>Totales - Débitos: </strong><span id="totalDebitos">$0.00</span> <strong> | Créditos: </strong><span id="totalCreditos">$0.00</span> </div> <div id="validacionSaldos" class="mt-2 font-semibold"></div> <span class="flex flex-row justify-end"> <div class="mt-4 p-2"> <button type="button" id="cancelar" class="bg-black text-white p-2 rounded">Cancelar</button> </div> <div class="mt-4 p-2"> <button type="button" id="registrar" class="bg-blue-baby4 text-white p-2 rounded">Registrar compra</button> </div> </span> </div> </div> <div id="successModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 hidden"> <div class="bg-white p-6 rounded-lg shadow-lg text-center"> <h2 class="text-xl font-bold mb-4">¡Registro Exitoso!</h2> <p>Los datos se han contabilizado correctamente.</p> <button id="closeSuccessModal" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Cerrar</button> </div> </div> <!-- Modal de error --> <div id="errorModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 hidden"> <div class="bg-white p-6 rounded-lg shadow-lg text-center"> <h2 class="text-xl font-bold mb-4">¡Error!</h2> <p>No se pudieron contabilizar los datos.</p> <button id="closeErrorModal" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Cerrar</button> </div> </div> <div id="successsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Check.svg" alt=""> <p class="text-green-600 p-2">Registro exitoso</p> </div> </div> <div id="errorrModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end p-5 justify-end hidden"> <div class="bg-white rounded-md shadow-lg flex flex-row w-96 p-2"> <img class="w-9 h-auto p-2" src="../../../../public/img/Error.svg" alt=""> <p class="text-rojing p-2">Error en el registro</p> </div> </div>   </body><!-- Modal de éxito -->`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/components/Dashboard/compras/index.astro", void 0);

const $$ComprasDos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<body class="bg-white"> <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <div class="ml-64 w-full"> ${renderComponent($$result, "Header", $$Header, {})} <main class="p-6"> <div id="registro"> ${renderComponent($$result, "Compras", $$Index, {})} </div> </main> </div> </div> </body>`;
}, "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/comprasDos.astro", void 0);

const $$file = "C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/comprasDos.astro";
const $$url = "/comprasDos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ComprasDos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
