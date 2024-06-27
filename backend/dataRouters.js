const express = require("express")
const router = express.Router()
const app = express()
const controller = require("./controller")

router.get("/", controller.saludo)
router.get("/usuarios", controller.usuarios)

module.exports = router