module.exports = function(sequelize, DataTypes) {
  const State = sequelize.define("state", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  State.associate = function(models) {
    State.belongsToMany(models.User, {
      through: models.Visited
    });
    State.hasMany(models.Visited);
    State.belongsToMany(models.User, {
      through: models.Planned
    });
    State.hasMany(models.Planned);
  };

  return State;
};
