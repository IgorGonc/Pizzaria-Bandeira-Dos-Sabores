const sequelize = require('../config/database')
const Produto = require('./Produto')
const Carrinho_Compra = require('./carrinho_compra')
const Itens = require('./Itens')
const Cliente = require('./Cliente')
const Promocao = require('./Promocao')
const Pedido = require('./Pedido')

// Definir relacionamentos
Carrinho_Compra.belongsTo(Cliente, { foreignKey: 'IDCliente' })
Cliente.hasMany(Carrinho_Compra, { foreignKey: 'IDCliente' })

Carrinho_Compra.belongsToMany(Produto, {
  through: Itens,
  foreignKey: 'IDCarrinho',
})
Produto.belongsToMany(Carrinho_Compra, {
  through: Itens,
  foreignKey: 'IDProduto',
})

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

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }) // Use 'force: true' apenas para desenvolvimento, pois irá recriar todas as tabelas
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('An error occurred while synchronizing the models:', error)
  }
}

syncDatabase()

module.exports = {
  sequelize,
  Produto,
  Carrinho_Compra,
  Itens,
  Promocao,
  Pedido,
  Cliente,
}
