const express = require('express');
const clienteController = require('../controllers/clienteController');
const authController = require('../controllers/authController');

const router = express.Router();

console.log('clienteController:', clienteController);
console.log('authController:', authController);

// Rotas para CRUD de Cliente
router.post('/clientes', (req, res) => {
    console.log('Rota POST /clientes chamada');
    clienteController.createCliente(req, res);
});
router.get('/clientes', (req, res) => {
    console.log('Rota GET /clientes chamada');
    clienteController.getClientes(req, res);
});

// Outras rotas CRUD para Cliente (update, delete, etc.)

// Rota para lidar com o login de usuários
router.post('/login', (req, res) => {
    console.log('Rota POST /login chamada');
    authController.login(req, res);
});

module.exports = router;
