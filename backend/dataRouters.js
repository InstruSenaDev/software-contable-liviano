const express = require('express');
const router = express.Router();
const { saludo, usuarios, roles, registerUser, inicioUser, registerProviders, proveedores, cuentas } = require('./controller');

// Definir las rutas
router.get("/saludo", saludo);
router.get("/usuarios", usuarios);
router.get("/roles", roles);
router.get("/proveedores", proveedores);
router.post("/register", registerUser);
router.get("/cuentas", cuentas);
router.post("/login", inicioUser);
router.post("/registerProviders", registerProviders);

module.exports = router;
