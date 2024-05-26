const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carrinho_Compra = sequelize.define('Carrinho_Compra', {
    IDCarrinho: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Itens: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Carrinho_Compra;
