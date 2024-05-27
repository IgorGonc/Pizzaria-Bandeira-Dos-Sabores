// controllers/carrinhoController.js
const { Carrinho_Compra, Produto, Itens } = require('../models');

const adicionarAoCarrinho = async (req, res) => {
    const { IDCliente, IDProduto, Quantidade } = req.body;

    try {
        let carrinho = await Carrinho_Compra.findOne({ where: { IDCliente } });

        if (!carrinho) {
            carrinho = await Carrinho_Compra.create({ IDCliente, Total: 0 });
        }

        const produto = await Produto.findByPk(IDProduto);

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        await Itens.create({ IDCarrinho: carrinho.IDCarrinho, IDProduto, Quantidade });

        const total = await Itens.sum('Quantidade', { where: { IDCarrinho: carrinho.IDCarrinho } });
        carrinho.Total = total;
        await carrinho.save();

        res.status(200).json(carrinho);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar ao carrinho' });
    }
};

const visualizarCarrinho = async (req, res) => {
    const { IDCliente } = req.params;

    try {
        const carrinho = await Carrinho_Compra.findOne({
            where: { IDCliente },
            include: [{ model: Produto, through: Itens }]
        });

        if (!carrinho) {
            return res.status(404).json({ error: 'Carrinho não encontrado' });
        }

        res.status(200).json(carrinho);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao visualizar o carrinho' });
    }
};

const removerDoCarrinho = async (req, res) => {
    const { IDCarrinho, IDProduto } = req.body;

    try {
        await Itens.destroy({ where: { IDCarrinho, IDProduto } });

        const total = await Itens.sum('Quantidade', { where: { IDCarrinho } });
        const carrinho = await Carrinho_Compra.findByPk(IDCarrinho);
        carrinho.Total = total;
        await carrinho.save();

        res.status(200).json(carrinho);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover do carrinho' });
    }
};

module.exports = { adicionarAoCarrinho, visualizarCarrinho, removerDoCarrinho };
