const db = require("../models");

const findUser = userEmail => {
  return db.User.findOne({ where: { email: userEmail } });
};

const findState = (field, value) => {
  return db.State.findOne({ where: { [field]: value } });
};

const findVisitedStates = userId => {
  return db.Visited.findAll({ where: { UserId: userId } });
};

const findPlannedStates = userId => {
  return db.Planned.findAll({ where: { UserId: userId } });
};

module.exports = {
  findUser,
  findState,
  findVisitedStates,
  findPlannedStates
};
