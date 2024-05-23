module.exports = (sequelize, DataTypes) => {
  const CarrinhoCompra = sequelize.define(
    'CarrinhoCompra',
    {
      idCarrinho: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      itens: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      tableName: 'carrinhos_compra',
      timestamps: false,
    }
  )

  return CarrinhoCompra
}
