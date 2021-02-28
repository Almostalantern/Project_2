module.exports = function(sequelize, DataTypes) {
  const State = sequelize.define("State", {
    // The email cannot be null, and must be a proper email before creation
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    visted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    visit_priority: {
      type: DataTypes.INTEGER
    }
  })
    
  State.belongsToMany("User", {
    through: 'visitedStates',
    sourceKey: 'id'
  })

  State.belongsToMany("User", {
    through: 'planToVisit',
    sourceKey: 'id'
  })

  return User;
};