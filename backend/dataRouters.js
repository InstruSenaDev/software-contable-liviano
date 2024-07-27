const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/saludo", controller.saludo);
router.get("/usuarios", controller.usuarios);
router.get("/roles", controller.roles);
router.post("/register",controller.registerUser);
router.post("/registerProviders",controller.registerProviders);
router.get("/login",controller.inicioUser);



module.exports = router;