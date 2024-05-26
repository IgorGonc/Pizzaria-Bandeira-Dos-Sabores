const sequelize = require('../config/database');
const Produto = require('./Produto');
const Carrinho_Compra = require('./Carrinho_Compra');
const Promocao = require('./Promocao');
const Pedido = require('./Pedido');
const Cliente = require('./Cliente');

// Definir relacionamentos
Carrinho_Compra.belongsTo(Cliente, { foreignKey: 'IDCliente' });
Cliente.hasMany(Carrinho_Compra, { foreignKey: 'IDCliente' });

Carrinho_Compra.belongsToMany(Produto, { through: 'Itens', foreignKey: 'IDCarrinho' });
Produto.belongsToMany(Carrinho_Compra, { through: 'Itens', foreignKey: 'IDProduto' });

Pedido.belongsTo(Cliente, { foreignKey: 'IDCliente' });
Cliente.hasMany(Pedido, { foreignKey: 'IDCliente' });

Pedido.belongsToMany(Promocao, { through: 'PedidoPromocao', foreignKey: 'IDPedido' });
Promocao.belongsToMany(Pedido, { through: 'PedidoPromocao', foreignKey: 'IDPromocao' });

Pedido.belongsTo(Carrinho_Compra, { foreignKey: 'IDCarrinho' });
Carrinho_Compra.hasMany(Pedido, { foreignKey: 'IDCarrinho' });

module.exports = {
    sequelize,
    Produto,
    Carrinho_Compra,
    Promocao,
    Pedido,
    Cliente
};
