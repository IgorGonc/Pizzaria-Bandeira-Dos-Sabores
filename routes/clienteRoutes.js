const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')

// Rota para cadastrar um novo usuário
router.post('/cadastrar', clienteController.cadastrarUsuario)

// Rota para fazer login
router.post('/login', clienteController.logarNoSistema)

// Rota para gerenciar a conta do cliente
router.put('/gerenciar/:idCliente', clienteController.gerenciarConta)

module.exports = router
