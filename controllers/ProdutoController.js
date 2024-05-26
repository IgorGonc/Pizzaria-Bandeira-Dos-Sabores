const Produto = require('../models/Produto');

// Controlador para adicionar um produto
exports.adicionarProduto = async (req, res) => {
    const { nome, descricao, imagem, valor } = req.body;
    try {
        const produto = await Produto.create({ nome, descricao, imagem, valor });
        res.status(201).json(produto);
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
};

// Controlador para visualizar produtos
exports.visualizarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao visualizar produtos:', error);
        res.status(500).json({ error: 'Erro ao visualizar produtos' });
    }
};
