// models/Itens.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Itens = sequelize.define('Itens', {
    IDCarrinho: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Carrinho_Compras',  // Nome da tabela Carrinho_Compra
            key: 'IDCarrinho'
        }
    },
    IDProduto: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Produto',  // Nome da tabela Produto
            key: 'IDProduto'
        }
    },
    Quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Itens',
    timestamps: false
});

module.exports = Itens;
