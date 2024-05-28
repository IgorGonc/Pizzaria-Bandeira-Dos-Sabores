const Carrinho_Compra = require('../models/carrinho_compra')
const Itens = require('../models/Itens')
const Produto = require('../models/Produto')

exports.adicionarAoCarrinho = async (req, res) => {
  const { IDCarrinho, itens } = req.body

  try {
    const carrinho = await Carrinho_Compra.findByPk(IDCarrinho)
    if (!carrinho) {
      return res.status(404).json({ error: 'Carrinho não encontrado' })
    }

    for (const item of itens) {
      const produto = await Produto.findByPk(item.IDProduto)
      if (!produto) {
        return res
          .status(404)
          .json({ error: `Produto com ID ${item.IDProduto} não encontrado` })
      }

      await Itens.create({
        IDCarrinho: carrinho.IDCarrinho,
        IDProduto: item.IDProduto,
        Quantidade: item.Quantidade,
      })
    }

    res
      .status(201)
      .json({ message: 'Itens adicionados ao carrinho com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

exports.visualizarCarrinho = async (req, res) => {
  const { IDCliente } = req.params

  try {
    const carrinho = await Carrinho_Compra.findOne({
      where: { IDCliente },
      include: {
        model: Itens,
        include: [Produto],
      },
    })

    if (!carrinho) {
      return res.status(404).json({ error: 'Carrinho não encontrado' })
    }

    res.status(200).json(carrinho)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

exports.removerDoCarrinho = async (req, res) => {
  const { IDCarrinho, IDProduto } = req.body

  try {
    const item = await Itens.findOne({ where: { IDCarrinho, IDProduto } })
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado no carrinho' })
    }

    await item.destroy()
    res.status(200).json({ message: 'Item removido do carrinho com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
