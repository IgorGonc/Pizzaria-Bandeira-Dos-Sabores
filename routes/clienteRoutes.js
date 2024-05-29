const express = require('express')
const clienteController = require('../controllers/clienteController')

const router = express.Router()

// Rota para criar um novo cliente
router.post('/', clienteController.createCliente)

// Rota para obter informações do perfil do cliente
router.get('/:id', clienteController.getCliente)

// Rota para atualizar informações do perfil do cliente
router.put('/:id', clienteController.updateCliente)

// Rota para deletar um cliente
router.delete('/:id', clienteController.deleteCliente)

// Rota Login
router.post('/login', clienteController.loginCliente)

module.exports = router
