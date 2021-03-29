module.exports = function(sequelize, DataTypes) {
  const Planned = sequelize.define("planned", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  });

  Planned.associate = function(models) {
    Planned.belongsTo(models.User);
    Planned.belongsTo(models.State);
  };

  return Planned;
};
