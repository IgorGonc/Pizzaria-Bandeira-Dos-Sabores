// models/Itens.js
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
        model: Carrinho_Compra, // Referenciando o modelo Carrinho_Compra corretamente
        key: 'IDCarrinho',
      },
      allowNull: false,
    },
    IDProduto: {
      type: DataTypes.INTEGER,
      references: {
        model: Produto, // Referenciando o modelo Produto corretamente
        key: 'IDProduto',
      },
      allowNull: false,
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

module.exports = Itens
