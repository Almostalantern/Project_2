module.exports = function(dequelize, DataTypes) {
  const States = sequelize.define("states", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING(50),
    visited: DataTypes.BOOLEAN(false),
    priority: DataTypes.INTEGER(50)
  });
  return States;
};
