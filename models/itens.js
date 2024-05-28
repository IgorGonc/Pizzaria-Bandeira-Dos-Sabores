const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Carrinho_Compra = require('./carrinho_compra')
const Produto = require('./Produto')

const Itens = sequelize.define(
  'Itens',
  {
    IDCarrinho: {
      type: DataTypes.INTEGER,
      references: {
        model: Carrinho_Compra,
        key: 'IDCarrinho',
      },
      allowNull: false,
      primaryKey: true,
    },
    IDProduto: {
      type: DataTypes.INTEGER,
      references: {
        model: Produto,
        key: 'IDProduto',
      },
      allowNull: false,
      primaryKey: true,
    },
    Quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Itens',
    timestamps: false,
  }
)

Carrinho_Compra.hasMany(Itens, { foreignKey: 'IDCarrinho' })
Itens.belongsTo(Carrinho_Compra, { foreignKey: 'IDCarrinho' })

Produto.hasMany(Itens, { foreignKey: 'IDProduto' })
Itens.belongsTo(Produto, { foreignKey: 'IDProduto' })

module.exports = Itens
