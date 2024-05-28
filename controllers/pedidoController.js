const Pedido = require('../models/Pedido')
const Carrinho_Compra = require('../models/carrinho_compra')
const Cliente = require('../models/Cliente')
const Itens = require('../models/Itens')
const Produto = require('../models/Produto')

exports.finalizarCompra = async (req, res) => {
  const { IDCliente, IDCarrinho, MetodoPagamento, EnderecoEntrega } = req.body

  try {
    // Verificar se o cliente existe
    const cliente = await Cliente.findByPk(IDCliente)
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }

    // Verificar se o carrinho existe e pertence ao cliente
    const carrinho = await Carrinho_Compra.findOne({
      where: { IDCarrinho, IDCliente },
      include: {
        model: Itens,
        include: [Produto],
      },
    })

    if (!carrinho) {
      return res.status(404).json({ error: 'Carrinho não encontrado' })
    }

    console.log(`Carrinho encontrado: ${JSON.stringify(carrinho)}`)

    if (!carrinho.Itens || carrinho.Itens.length === 0) {
      return res.status(400).json({ error: 'Carrinho de compras vazio' })
    }

    // Calcular o valor total da compra
    let valorTotal = 0
    carrinho.Itens.forEach((item) => {
      valorTotal += item.Quantidade * item.Produto.valor
    })
    const taxaEntrega = 10 // Exemplo de taxa de entrega
    valorTotal += taxaEntrega

    // Criar um novo pedido
    const novoPedido = await Pedido.create({
      IDCliente,
      IDCarrinho,
      MetodoPagamento,
      EnderecoEntrega,
      ValorTotal: valorTotal,
    })

    // Retornar a confirmação do pedido
    res.status(201).json(novoPedido)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
