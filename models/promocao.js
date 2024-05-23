module.exports = (sequelize, DataTypes) => {
  const Promocao = sequelize.define(
    'Promocao',
    {
      idPromocao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desconto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      tableName: 'promocoes',
      timestamps: false,
    }
  )

  return Promocao
}
