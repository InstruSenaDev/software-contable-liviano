import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_B7x4mY_r.mjs';
import { manifest } from './manifest_CnpvtktO.mjs';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/comprasdos.astro.mjs');
const _page2 = () => import('./pages/iniciodedashboard.astro.mjs');
const _page3 = () => import('./pages/login.astro.mjs');
const _page4 = () => import('./pages/olvidocontraseña.astro.mjs');
const _page5 = () => import('./pages/perfilusuario.astro.mjs');
const _page6 = () => import('./pages/premenuadmin.astro.mjs');
const _page7 = () => import('./pages/premenucompras.astro.mjs');
const _page8 = () => import('./pages/premenuproviders.astro.mjs');
const _page9 = () => import('./pages/privacy.astro.mjs');
const _page10 = () => import('./pages/rproviders.astro.mjs');
const _page11 = () => import('./pages/signup.astro.mjs');
const _page12 = () => import('./pages/tcompras.astro.mjs');
const _page13 = () => import('./pages/terms.astro.mjs');
const _page14 = () => import('./pages/tinformes.astro.mjs');
const _page15 = () => import('./pages/tproviders.astro.mjs');
const _page16 = () => import('./pages/tusuarios.astro.mjs');
const _page17 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/comprasDos.astro", _page1],
    ["src/pages/inicioDedashboard.astro", _page2],
    ["src/pages/login.astro", _page3],
    ["src/pages/olvidocontraseña.astro", _page4],
    ["src/pages/perfilUsuario.astro", _page5],
    ["src/pages/preMenuAdmin.astro", _page6],
    ["src/pages/preMenuCompras.astro", _page7],
    ["src/pages/preMenuProviders.astro", _page8],
    ["src/pages/privacy.astro", _page9],
    ["src/pages/rProviders.astro", _page10],
    ["src/pages/signup.astro", _page11],
    ["src/pages/tCompras.astro", _page12],
    ["src/pages/terms.astro", _page13],
    ["src/pages/tInformes.astro", _page14],
    ["src/pages/tProviders.astro", _page15],
    ["src/pages/tUsuarios.astro", _page16],
    ["src/pages/index.astro", _page17]
]);
const serverIslandMap = new Map();

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "028993f8-51f2-4ecf-ba77-b82def80bc5b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
