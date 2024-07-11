const express = require("express");
const router = express.Router();
const app = express()
const controller = require("./controller");

router.get("/saludo", controller.saludo);
router.get("/usuarios", controller.usuarios);
router.get("/roles", controller.roles);
router.get("/register",controller.registerUser);



module.exports = router;