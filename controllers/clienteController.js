const bcrypt = require('bcrypt');
const { Cliente } = require('../models');

exports.createCliente = async (req, res) => {
    try {
        const { nome, email, senha, endereco, tel } = req.body;

        // Hash da senha
        const hashedSenha = await bcrypt.hash(senha, 10); // Usando 10 como o custo do hash

        const cliente = await Cliente.create({
            nome,
            email,
            senha: hashedSenha, // Salva a senha hashada no banco de dados
            endereco,
            tel
        });

        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Outros métodos CRUD para Cliente (update, delete, etc.)
