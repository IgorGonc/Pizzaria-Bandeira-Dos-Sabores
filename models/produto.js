// models/Produto.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Produto = sequelize.define(
  'Produto',
  {
    IDProduto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: 'Produto',
    timestamps: false,
  }
)

module.exports = Produto
