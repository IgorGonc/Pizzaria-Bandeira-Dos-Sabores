module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define(
    'Pedido',
    {
      idPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      itens: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      infoEntrega: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metodoPagamento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'pedidos',
      timestamps: false,
    }
  )

  return Pedido
}
