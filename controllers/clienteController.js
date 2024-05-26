// controllers/clienteController.js
const bcrypt = require('bcrypt');
const { Cliente } = require('../models');

exports.createCliente = async (req, res) => {
    try {
        const { nome, email, senha, endereco, tel } = req.body;

        // Verificar se os dados estão corretos
        console.log("Dados recebidos:", req.body);

        if (!senha) {
            throw new Error("Senha é obrigatória");
        }

        // Hash da senha
        const hashedSenha = await bcrypt.hash(senha, 10);
        console.log("Senha hash:", hashedSenha);

        const cliente = await Cliente.create({
            Nome: nome,
            Email: email,
            Senha: hashedSenha,
            Endereco: endereco,
            Tel: tel
        });

        res.status(201).json(cliente);
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        res.status(400).json({ error: error.message });
    }
};