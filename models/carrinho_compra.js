// models/carrinho_compra.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Cliente = require('./Cliente')

const Carrinho_Compra = sequelize.define(
  'Carrinho_Compra',
  {
    IDCarrinho: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    IDCliente: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente,
        key: 'IDCliente',
      },
      allowNull: false,
    },
    Total: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
  },
  {
    tableName: 'Carrinho_Compra',
    timestamps: false,
  }
)

Carrinho_Compra.belongsTo(Cliente, { foreignKey: 'IDCliente' })

module.exports = Carrinho_Compra
