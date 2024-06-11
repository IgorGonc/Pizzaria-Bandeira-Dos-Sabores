// models/Pedido.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Cliente = require('./cliente')
const Carrinho_Compra = require('./carrinho_compra')

const Pedido = sequelize.define(
  'Pedido',
  {
    IDPedido: {
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
    IDCarrinho: {
      type: DataTypes.INTEGER,
      references: {
        model: Carrinho_Compra,
        key: 'IDCarrinho',
      },
      allowNull: false,
    },
    MetodoPagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EnderecoEntrega: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ValorTotal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pendente',
    },
  },
  {
    tableName: 'Pedido',
    timestamps: false,
  }
)

Pedido.belongsTo(Cliente, { foreignKey: 'IDCliente' })
Pedido.belongsTo(Carrinho_Compra, { foreignKey: 'IDCarrinho' })

module.exports = Pedido
