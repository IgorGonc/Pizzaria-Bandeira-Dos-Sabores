const sequelize = require('../config/database')
const Produto = require('./Produto')
const Carrinho_Compra = require('./carrinho_compra')
const Promocao = require('./Promocao')
const Pedido = require('./pedido')
const Cliente = require('./cliente')
const Itens = require('./itens')

// Definir relacionamentos
Carrinho_Compra.belongsTo(Cliente, { foreignKey: 'IDCliente' })
Cliente.hasMany(Carrinho_Compra, { foreignKey: 'IDCliente' })

Carrinho_Compra.hasMany(Itens, { foreignKey: 'IDCarrinho' })
Itens.belongsTo(Carrinho_Compra, { foreignKey: 'IDCarrinho' })

Produto.hasMany(Itens, { foreignKey: 'IDProduto' })
Itens.belongsTo(Produto, { foreignKey: 'IDProduto' })

Pedido.belongsTo(Cliente, { foreignKey: 'IDCliente' })
Cliente.hasMany(Pedido, { foreignKey: 'IDCliente' })

Pedido.belongsToMany(Promocao, {
  through: 'PedidoPromocao',
  foreignKey: 'IDPedido',
})
Promocao.belongsToMany(Pedido, {
  through: 'PedidoPromocao',
  foreignKey: 'IDPromocao',
})

Pedido.belongsTo(Carrinho_Compra, { foreignKey: 'IDCarrinho' })
Carrinho_Compra.hasMany(Pedido, { foreignKey: 'IDCarrinho' })

module.exports = {
  sequelize,
  Produto,
  Carrinho_Compra,
  Promocao,
  Pedido,
  Cliente,
  Itens,
}
