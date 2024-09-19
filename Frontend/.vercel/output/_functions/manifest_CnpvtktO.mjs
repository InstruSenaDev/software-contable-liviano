import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_0srW5mIi.mjs';
import { f as decodeKey } from './chunks/astro/server_BvfbZJ6n.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/frontend/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/comprasdos","isIndex":false,"type":"page","pattern":"^\\/comprasDos\\/?$","segments":[[{"content":"comprasDos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/comprasDos.astro","pathname":"/comprasDos","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/iniciodedashboard","isIndex":false,"type":"page","pattern":"^\\/inicioDedashboard\\/?$","segments":[[{"content":"inicioDedashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/inicioDedashboard.astro","pathname":"/inicioDedashboard","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/olvidocontraseña","isIndex":false,"type":"page","pattern":"^\\/olvidocontraseña\\/?$","segments":[[{"content":"olvidocontraseña","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/olvidocontraseña.astro","pathname":"/olvidocontraseña","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/perfilusuario","isIndex":false,"type":"page","pattern":"^\\/perfilUsuario\\/?$","segments":[[{"content":"perfilUsuario","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/perfilUsuario.astro","pathname":"/perfilUsuario","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/premenuadmin","isIndex":false,"type":"page","pattern":"^\\/preMenuAdmin\\/?$","segments":[[{"content":"preMenuAdmin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/preMenuAdmin.astro","pathname":"/preMenuAdmin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/premenucompras","isIndex":false,"type":"page","pattern":"^\\/preMenuCompras\\/?$","segments":[[{"content":"preMenuCompras","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/preMenuCompras.astro","pathname":"/preMenuCompras","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/premenuproviders","isIndex":false,"type":"page","pattern":"^\\/preMenuProviders\\/?$","segments":[[{"content":"preMenuProviders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/preMenuProviders.astro","pathname":"/preMenuProviders","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rproviders","isIndex":false,"type":"page","pattern":"^\\/rProviders\\/?$","segments":[[{"content":"rProviders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rProviders.astro","pathname":"/rProviders","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tcompras","isIndex":false,"type":"page","pattern":"^\\/tCompras\\/?$","segments":[[{"content":"tCompras","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tCompras.astro","pathname":"/tCompras","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms\\/?$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.astro","pathname":"/terms","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tinformes","isIndex":false,"type":"page","pattern":"^\\/tInformes\\/?$","segments":[[{"content":"tInformes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tInformes.astro","pathname":"/tInformes","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tproviders","isIndex":false,"type":"page","pattern":"^\\/tProviders\\/?$","segments":[[{"content":"tProviders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tProviders.astro","pathname":"/tProviders","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tusuarios","isIndex":false,"type":"page","pattern":"^\\/tUsuarios\\/?$","segments":[[{"content":"tUsuarios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tUsuarios.astro","pathname":"/tUsuarios","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://lexingtonthemes.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/perfilUsuario.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/preMenuAdmin.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/preMenuCompras.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/preMenuProviders.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/rProviders.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/signup.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tCompras.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tInformes.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tUsuarios.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/inicioDedashboard.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/tProviders.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/comprasDos.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/olvidocontraseña.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/privacy.astro",{"propagation":"none","containsHead":true}],["C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/src/pages/terms.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/comprasDos@_@astro":"pages/comprasdos.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/olvidocontraseña@_@astro":"pages/olvidocontraseña.astro.mjs","\u0000@astro-page:src/pages/perfilUsuario@_@astro":"pages/perfilusuario.astro.mjs","\u0000@astro-page:src/pages/preMenuAdmin@_@astro":"pages/premenuadmin.astro.mjs","\u0000@astro-page:src/pages/preMenuCompras@_@astro":"pages/premenucompras.astro.mjs","\u0000@astro-page:src/pages/preMenuProviders@_@astro":"pages/premenuproviders.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/rProviders@_@astro":"pages/rproviders.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/tCompras@_@astro":"pages/tcompras.astro.mjs","\u0000@astro-page:src/pages/terms@_@astro":"pages/terms.astro.mjs","\u0000@astro-page:src/pages/tInformes@_@astro":"pages/tinformes.astro.mjs","\u0000@astro-page:src/pages/tUsuarios@_@astro":"pages/tusuarios.astro.mjs","\u0000@astro-page:src/pages/inicioDedashboard@_@astro":"pages/iniciodedashboard.astro.mjs","\u0000@astro-page:src/pages/tProviders@_@astro":"pages/tproviders.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/PC/Documents/GitHub/software-contable-liviano/software-contable-liviano/Frontend/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_CnpvtktO.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.BLqT8cbb.css","/Canva.svg","/dashboard.png","/dashboard2.png","/Figma.svg","/Gitlab.svg","/Gumroad.svg","/lexington.png","/Linear.svg","/Stripe.svg","/img/Check.svg","/img/compras.png","/img/Error.svg","/img/informes.png","/img/inicio.png","/img/logoPS.svg","/img/logoPS2.svg","/img/proveedores.png","/img/userPhoto.png","/manualUsuario/Manual de usuario Provisoft (1).pdf","/img/black/AdminsN.svg","/img/black/dashboard.svg","/img/black/descarga.webp","/img/black/edit.svg","/img/black/edit2.svg","/img/black/hidden.svg","/img/black/lista.svg","/img/black/logoPS.svg","/img/black/Logout.svg","/img/black/menu.svg","/img/black/notification.svg","/img/black/person.svg","/img/black/ReportN.svg","/img/black/search.svg","/img/black/shoping.svg","/img/black/show eye.svg","/img/black/trash.svg","/img/white/Admins.svg","/img/white/bx-list-ol 1.svg","/img/white/Group 49.svg","/img/white/hidden.svg","/img/white/iconMore.svg","/img/white/online shoping.svg","/img/white/person.svg","/img/white/register-shopping.svg","/img/white/Report-1.svg","/img/white/show eye.svg"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"Wg4hPH438xEJjOvl5mlrM//tcuPiXipZndaRmUP+uEU=","experimentalEnvGetSecretEnabled":false});

export { manifest };
