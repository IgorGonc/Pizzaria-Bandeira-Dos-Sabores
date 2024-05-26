const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    IdProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Imagem: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Valor: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});

module.exports = Produto;
