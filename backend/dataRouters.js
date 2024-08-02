const express = require('express');
const router = express.Router();
const { saludo, usuarios, roles, registerUser, inicioUser, registerProviders } = require('./controller'); // Asegúrate de que la ruta del controlador sea correcta

router.get("/saludo", controller.saludo);
router.get("/usuarios", controller.usuarios);
router.get("/roles", controller.roles);
router.post("/register",controller.registerUser);
router.post("/login",controller.inicioUser);

module.exports = router;
