const express = require('express')
const router = express.Router()
const carrinhoController = require('../controllers/carrinhoController')

router.post('/adicionar', carrinhoController.adicionarAoCarrinho)
router.get('/visualizar/:IDCliente', carrinhoController.visualizarCarrinho)
router.post('/remover', carrinhoController.removerDoCarrinho)

module.exports = router
