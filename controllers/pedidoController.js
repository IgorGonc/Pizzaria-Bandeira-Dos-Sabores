// controllers/pedidoController.js
const Pedido = require('../models/pedido')
const Carrinho_Compra = require('../models/carrinho_compra')
const Cliente = require('../models/cliente')
const Itens = require('../models/itens')
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
      Status: 'Pendente', // Adiciona o status inicial do pedido
    })

    // Retornar a confirmação do pedido
    res.status(201).json(novoPedido)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

// Função para visualizar os pedidos do cliente
exports.visualizarPedidos = async (req, res) => {
  const { IDCliente } = req.params

  try {
    const pedidos = await Pedido.findAll({
      where: { IDCliente },
      include: [
        {
          model: Carrinho_Compra,
          include: {
            model: Itens,
            include: {
              model: Produto,
            },
          },
        },
      ],
    })

    if (!pedidos.length) {
      return res
        .status(404)
        .json({ error: 'Nenhum pedido encontrado para este cliente' })
    }

    res.status(200).json(pedidos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

// Função para atualizar o status do pedido
exports.atualizarStatusPedido = async (req, res) => {
  const { IDPedido, Status } = req.body

  try {
    const pedido = await Pedido.findByPk(IDPedido)
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' })
    }

    pedido.Status = Status
    await pedido.save()

    res.status(200).json({ message: 'Status do pedido atualizado com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
