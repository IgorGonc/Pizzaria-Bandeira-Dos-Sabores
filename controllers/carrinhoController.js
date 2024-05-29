const Carrinho_Compra = require('../models/carrinho_compra')
const Itens = require('../models/itens')
const Produto = require('../models/Produto')

exports.adicionarAoCarrinho = async (req, res) => {
  const { IDCarrinho, itens, IDCliente } = req.body

  try {
    let carrinho = null

    if (IDCarrinho) {
      carrinho = await Carrinho_Compra.findByPk(IDCarrinho)
    }

    // Se o carrinho não existir, crie um novo carrinho
    if (!carrinho) {
      carrinho = await Carrinho_Compra.create({
        IDCliente: IDCliente || null, // Utilize o IDCliente se fornecido, senão use null
        Total: 0,
      })
    }

    for (const item of itens) {
      // Verifica se o item já está presente no carrinho
      const itemExistente = await Itens.findOne({
        where: { IDCarrinho: carrinho.IDCarrinho, IDProduto: item.IDProduto },
      })

      if (itemExistente) {
        // Se o item já existe, atualize a quantidade
        await itemExistente.update({
          Quantidade: itemExistente.Quantidade + item.Quantidade,
        })
      } else {
        // Caso contrário, adicione um novo item ao carrinho
        await Itens.create({
          IDCarrinho: carrinho.IDCarrinho,
          IDProduto: item.IDProduto,
          Quantidade: item.Quantidade,
        })
      }
    }

    res
      .status(201)
      .json({
        message: 'Itens adicionados ao carrinho com sucesso',
        IDCarrinho: carrinho.IDCarrinho,
      })
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
