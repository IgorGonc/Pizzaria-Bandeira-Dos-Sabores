const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    IdPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Itens: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    InfoEntrega: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MetodoPagamento: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Pedido;
