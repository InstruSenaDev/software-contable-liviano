const express = require('express');
const router = express.Router();

const { saludo, usuarios, roles, registerUser, inicioUser, registerProviders } = require('./controller'); // Asegúrate de que la ruta del controlador sea correcta

router.get("/saludo", saludo);
router.get("/usuarios", usuarios);
router.get("/roles", roles);
router.post("/register", registerUser);
router.post("/login",inicioUser);
router.post("/registerProviders",registerProviders);


module.exports = router;
