const db = require("../models");
const myFunction = require("../modules/myfunction");

const markVisited = (userEmail, stateCode) => {
  myFunction.findUser(userEmail).then(user => {
    const userId = user.id;
    myFunction.findState("code", stateCode).then(state => {
      const stateId = state.id;
      db.Visited.create({
        StateId: stateId,
        UserId: userId
      }).then(() => {
        db.Planned.destroy({
          where: {
            StateId: stateId,
            UserId: userId
          }
        });
      });
    });
  });
};

const markPlanned = (userEmail, stateCode) => {
  myFunction.findUser(userEmail).then(user => {
    const userId = user.id;
    myFunction.findState("code", stateCode).then(state => {
      const stateId = state.id;
      db.Planned.create({
        StateId: stateId,
        UserId: userId
      }).then(() => {
        db.Visited.destroy({
          where: {
            StateId: stateId,
            UserId: userId
          }
        });
      });
    });
  });
};

const getStates = (res, states, userEmail) => {
  myFunction.findUser(userEmail).then(user => {
    const userId = user.id;
    myFunction.findVisitedStates(userId).then(data => {
      const dataLength = data.length;
      if (data.length === 0) {
        myFunction.findPlannedStates(userId).then(data => {
          const plannedLength = data.length;
          if (plannedLength === 0) {
            res.json({});
          } else {
            for (i = 0; i < data.length; i++) {
              const stateId = data[i].StateId;
              myFunction.findState(id, stateId).done(state => {
                const code = state.code;
                const stateObj = { [code]: "planned" };
                Object.assign(states, stateObj);
                if (Object.keys(states).length === dataLength + plannedLength) {
                  res.json(states);
                }
              });
            }
          }
        });
      } else {
        for (i = 0; i < data.length; i++) {
          const stateId = data[i].StateId;
          myFunction.findState("id", stateId).done(state => {
            const code = state.code;
            const stateObj = { [code]: "visited" };
            Object.assign(states, stateObj);
            if (Object.keys(states).length === data.length) {
              myFunction.findPlannedStates(userId).then(data => {
                const plannedLength = data.length;
                if (plannedLength === 0) {
                  res.json(states);
                } else {
                  for (i = 0; i < data.length; i++) {
                    const stateId = data[i].StateId;
                    myFunction.findState("id", stateId).done(state => {
                      const code = state.code;
                      const stateObj = { [code]: "planned" };
                      Object.assign(states, stateObj);
                      if (
                        Object.keys(states).length ===
                        dataLength + plannedLength
                      ) {
                        res.json(states);
                      }
                    });
                  }
                }
              });
            }
          });
        }
      }
    });
  });
};

module.exports = {
  markVisited,
  markPlanned,
  getStates
};
