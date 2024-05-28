// routes/pedidoRoutes.js
const express = require('express')
const router = express.Router()
const pedidoController = require('../controllers/pedidoController')

// Rota para finalizar pedidos
router.post('/finalizar', pedidoController.finalizarCompra)

// Rota para visualizar pedidos a partir do ID do cliente
router.get('/visualizar/:IDCliente', pedidoController.visualizarPedidos)

//  Rota para atualizar status dos pedidos
router.post('/atualizar-status', pedidoController.atualizarStatusPedido)

module.exports = router
