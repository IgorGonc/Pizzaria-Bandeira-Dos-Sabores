const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/ProdutoController');

// Rota para visualizar produtos
router.get('/visualizar', produtoController.visualizarProdutos);


// Adicionar produto
router.post('/adicionar', produtoController.adicionarProduto);

module.exports = router;
