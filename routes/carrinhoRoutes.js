const express = require('express')
const router = express.Router()
const carrinhoController = require('../controllers/carrinhoController')

// Rota para adicionar carrinho
router.post('/adicionar', carrinhoController.adicionarAoCarrinho)

// Rota para visualizar carrinho a partir do id do cliente
router.get('/visualizar/:IDCliente', carrinhoController.visualizarCarrinho)

// Rota para remover carrinho
router.post('/remover', carrinhoController.removerDoCarrinho)

router.post('/carrinho/aplicar-promocao', promocaoController.aplicarPromocao);

module.exports = router
