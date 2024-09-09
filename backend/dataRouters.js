const express = require('express');
const router = express.Router();
const { saludo, usuarios, roles, registerUser, inicioUser, registerProviders, proveedores, cuentas, usuariosLog, obtenerUsuarioPorCorreo } = require('./controller');

// Definir las rutas
router.get("/saludo", saludo);
router.get("/usuarios", usuarios);
router.get("/roles", roles);
router.get("/cuentas", cuentas);
router.get("/proveedores", proveedores);
router.get("/usuariosLog", obtenerUsuarioPorCorreo);
router.post("/usuariosLog", usuariosLog);
router.post("/register", registerUser);
router.post("/login", inicioUser);
router.post("/registerProviders", registerProviders);

module.exports = router;
