// controllers/carrinhoController.js
const Carrinho_Compra = require('../models/carrinho_compra')
const Itens = require('../models/Itens')
const Produto = require('../models/Produto')
const Cliente = require('../models/Cliente')

exports.adicionarAoCarrinho = async (req, res) => {
  const { IDCliente, itens } = req.body

  try {
    // Verificar se o cliente existe
    const cliente = await Cliente.findByPk(IDCliente)
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }

    // Encontrar ou criar o carrinho de compra para o cliente
    let carrinho = await Carrinho_Compra.findOne({ where: { IDCliente } })
    if (!carrinho) {
      carrinho = await Carrinho_Compra.create({ IDCliente })
    }

    // Iterar sobre os itens e adicionar ao carrinho
    for (const item of itens) {
      const { IDProduto, Quantidade } = item

      // Verificar se o produto existe
      const produto = await Produto.findByPk(IDProduto)
      if (!produto) {
        return res
          .status(404)
          .json({ error: `Produto com ID ${IDProduto} não encontrado` })
      }

      // Adicionar o item ao carrinho
      await Itens.create({
        IDCarrinho: carrinho.IDCarrinho,
        IDProduto,
        Quantidade,
      })

      // Atualizar o total do carrinho
      carrinho.Total += produto.valor * Quantidade
    }

    // Salvar o carrinho atualizado
    await carrinho.save()

    res.status(201).json(carrinho)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.visualizarCarrinho = async (req, res) => {
  const { IDCliente } = req.params

  try {
    const carrinho = await Carrinho_Compra.findOne({
      where: { IDCliente },
      include: [
        {
          model: Itens,
          include: [Produto],
        },
      ],
    })

    if (!carrinho) {
      return res.status(404).json({ error: 'Carrinho não encontrado' })
    }

    res.status(200).json(carrinho)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.removerDoCarrinho = async (req, res) => {
  const { IDCarrinho, IDProduto } = req.body

  try {
    const item = await Itens.findOne({
      where: { IDCarrinho, IDProduto },
    })

    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado no carrinho' })
    }

    // Remover o item do carrinho
    await item.destroy()

    // Atualizar o total do carrinho
    const carrinho = await Carrinho_Compra.findByPk(IDCarrinho)
    const produto = await Produto.findByPk(IDProduto)
    carrinho.Total -= produto.valor * item.Quantidade
    await carrinho.save()

    res.status(200).json(carrinho)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
