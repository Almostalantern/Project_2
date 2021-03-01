// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
// const { Router } = require("express");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/visited/:email/:code", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise add the state visited and user id to the visited table and send back the user's email and id
      db.User.findOne({ where: { email: req.params.email } }).then(user => {
        const userId = user.id;
        db.State.findOne({ where: { code: req.params.code } }).then(state => {
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
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/planned/:email/:code", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise add the state visited and user id to the visited table and send back the user's email and id
      db.User.findOne({ where: { email: req.params.email } }).then(user => {
        const userId = user.id;
        db.State.findOne({ where: { code: req.params.code } }).then(state => {
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
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/states/:email", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      let states = {};
      db.User.findOne({ where: { email: req.params.email } }).then(user => {
        console.log("User ID: " + user.id);
        const userId = user.id;
        db.Visited.findAll({ where: { UserId: userId } }).then(data => {
          const dataLength = data.length;
          console.log("Data Length: " + dataLength);
          for (i = 0; i < data.length; i++) {
            // console.log(data[i].StateId);
            db.State.findOne({ where: { id: data[i].StateId } }).done(state => {
              // console.log(state.code);
              let code = state.code;
              let stateObj = { [code]: "visited" };
              // console.log(stateObj);
              Object.assign(states, stateObj);
              // console.log(states);
              // console.log("State Length: " + Object.keys(states).length);
              if (Object.keys(states).length === data.length) {
                db.Planned.findAll({ where: { UserId: userId } }).then(data => {
                  const plannedLength = data.length;
                  console.log("Planned Length: " + plannedLength);
                  if (plannedLength === 0){
                    res.json(states);
                  } else {
                    for (i = 0; i < data.length; i++) {
                      // console.log(data[i].StateId);
                      db.State.findOne({ where: { id: data[i].StateId } }).done(
                        state => {
                          // console.log(state.code);
                          let code = state.code;
                          let stateObj = { [code]: "planned" };
                          // console.log(stateObj);
                          Object.assign(states, stateObj);
                          // console.log(states);
                          // console.log(
                          //   "State Length: " + Object.keys(states).length
                          // );
                          if (
                            Object.keys(states).length ===
                            dataLength + plannedLength
                          ) {
                            res.json(states);
                          }
                        }
                      );
                    }
                  }
                });
              }
            });
          }

          // db.Planned.findAll({ where: { UserId: userId } }).then(data => {
          //   Object.keys(data).forEach(
          //     db.State.findOne({ where: { id: data.id } }).then(state => {
          //       Object.assign(states, { state.code: "planned" });
          //       res.json(states);
          //     })
          //   );
          // });
        });
      });
    }
  });
};
