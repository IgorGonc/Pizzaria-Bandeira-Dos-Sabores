// routes/pedidoRoutes.js
const express = require('express')
const router = express.Router()
const pedidoController = require('../controllers/pedidoController')

router.post('/finalizar', pedidoController.finalizarCompra)

module.exports = router
