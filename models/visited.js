module.exports = function(sequelize, DataTypes) {
  const Visited = sequelize.define("Visited", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  });

  Visited.associate = function(models) {
    Visited.belongsTo(models.User);
    Visited.belongsTo(models.State);
  };

  return Visited;
};
