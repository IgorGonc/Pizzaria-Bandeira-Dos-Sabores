module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    'Produto',
    {
      idProduto: {
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
      tableName: 'produtos',
      timestamps: false,
    }
  )

  return Produto
}
