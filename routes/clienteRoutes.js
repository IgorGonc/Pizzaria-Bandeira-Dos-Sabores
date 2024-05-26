const express = require('express');
const clienteController = require('../controllers/clienteController');
const authController = require('../controllers/authController');

const router = express.Router();

// Rotas para CRUD de Cliente
router.post('/clientes', clienteController.createCliente);
router.get('/clientes', clienteController.getClientes);

// Outras rotas CRUD para Cliente (update, delete, etc.)

// Rota para lidar com o login de usuários
router.post('/login', authController.login);

module.exports = router;
