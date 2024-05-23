module.exports = (sequelize, DataTypes) => {
  const Suporte = sequelize.define(
    'Suporte',
    {
      idSuporte: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mensagem: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'suportes',
      timestamps: false,
    }
  )

  return Suporte
}
