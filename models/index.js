const { Sequelize, DataTypes } = require('sequelize')
const config = require('../config/config.json').development

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Cliente = require('./cliente')(sequelize, DataTypes)
db.Produto = require('./produto')(sequelize, DataTypes)
db.CarrinhoCompra = require('./carrinho_compra')(sequelize, DataTypes)
db.Promocao = require('./promocao')(sequelize, DataTypes)
db.Pedido = require('./pedido')(sequelize, DataTypes)
db.Suporte = require('./suporte')(sequelize, DataTypes)

// Relacionamentos
db.Cliente.hasOne(db.CarrinhoCompra, { foreignKey: 'clienteId' })
db.CarrinhoCompra.belongsTo(db.Cliente, { foreignKey: 'clienteId' })

db.Cliente.hasMany(db.Suporte, { foreignKey: 'clienteId' })
db.Suporte.belongsTo(db.Cliente, { foreignKey: 'clienteId' })

db.Pedido.belongsTo(db.Cliente, { foreignKey: 'clienteId' })
db.Pedido.belongsTo(db.Promocao, { foreignKey: 'promocaoId' })

db.Pedido.belongsToMany(db.Produto, { through: 'PedidoProdutos' })
db.Produto.belongsToMany(db.Pedido, { through: 'PedidoProdutos' })

db.CarrinhoCompra.belongsToMany(db.Produto, { through: 'CarrinhoProdutos' })
db.Produto.belongsToMany(db.CarrinhoCompra, { through: 'CarrinhoProdutos' })

module.exports = db
