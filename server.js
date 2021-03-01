// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");

// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
const app = express();
//const { Router } = require("express");
// Set Handlebars.
const exphbs = require("express-handlebars");
const router = require("./controllers/handleRoutes");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(router);

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// db.State.bulkCreate([
//   {
//     name: 'Alabama',
//     code: 'US-AL'
//   },
//   {
//     name: 'Alaska',
//     code: 'US-AK'
//   },
//   {
//     name: 'Arizona',
//     code: 'US-AZ'
//   },
//   {
//     name: 'Arkansas',
//     code: 'US-AR'
//   },
//   {
//     name: 'California',
//     code: 'US-CA'
//   },
//   {
//     name: 'Colorado',
//     code: 'US-CO'
//   },
//   {
//     name: 'Connecticut',
//     code: 'US-CT'
//   },
//   {
//     name: 'Delaware',
//     code: 'US-DE'
//   },
//   {
//     name: 'Florida',
//     code: 'US-FL'
//   },
//   {
//     name: 'Georgia',
//     code: 'US-GA'
//   },
//   {
//     name: 'Hawaii',
//     code: 'US-HI'
//   },
//   {
//     name: 'Idaho',
//     code: 'US-ID'
//   },
//   {
//     name: 'Illinois',
//     code: 'US-IL'
//   },
//   {
//     name: 'Indiana',
//     code: 'US-IN'
//   },
//   {
//     name: 'Iowa',
//     code: 'US-IA'
//   },
//   {
//     name: 'Kansas',
//     code: 'US-KS'
//   },
//   {
//     name: 'Kentucky',
//     code: 'US-KY'
//   },
//   {
//     name: 'Louisiana',
//     code: 'US-LA'
//   },
//   {
//     name: 'Maine',
//     code: 'US-ME'
//   },
//   {
//     name: 'Maryland',
//     code: 'US-MD'
//   },
//   {
//     name: 'Massachusetts',
//     code: 'US-MA'
//   },
//   {
//     name: 'Michigan',
//     code: 'US-MI'
//   },
//   {
//     name: 'Minnesota',
//     code: 'US-MN'
//   },
//   {
//     name: 'Mississippi',
//     code: 'US-MS'
//   },
//   {
//     name: 'Missouri',
//     code: 'US-MO'
//   },
//   {
//     name: 'Montana',
//     code: 'US-MT'
//   },
//   {
//     name: 'Nebraska',
//     code: 'US-NE'
//   },
//   {
//     name: 'Nevada',
//     code: 'US-NV'
//   },
//   {
//     name: 'New Hampshire',
//     code: 'US-NH'
//   },
//   {
//     name: 'New Jersey',
//     code: 'US-NJ'
//   },
//   {
//     name: 'New Mexico',
//     code: 'US-NM'
//   },
//   {
//     name: 'New York',
//     code: 'US-NY'
//   },
//   {
//     name: 'North Carolina',
//     code: 'US-NC'
//   },
//   {
//     name: 'North Dakota',
//     code: 'US-ND'
//   },
//   {
//     name: 'Ohio',
//     code: 'US-OH'
//   },
//   {
//     name: 'Oklahoma',
//     code: 'US-OK'
//   },
//   {
//     name: 'Oregon',
//     code: 'US-OR'
//   },
//   {
//     name: 'Pennsylvania',
//     code: 'US-PA'
//   },
//   {
//     name: 'Rhode Island',
//     code: 'US-RI'
//   },
//   {
//     name: 'South Carolina',
//     code: 'US-SC'
//   },
//   {
//     name: 'South Dakota',
//     code: 'US-SD'
//   },
//   {
//     name: 'Tennessee',
//     code: 'US-TN'
//   },
//   {
//     name: 'Texas',
//     code: 'US-TX'
//   },
//   {
//     name: 'Utah',
//     code: 'US-UT'
//   },
//   {
//     name: 'Vermont',
//     code: 'US-VT'
//   },
//   {
//     name: 'Virginia',
//     code: 'US-VA'
//   },
//   {
//     name: 'Washington',
//     code: 'US-WA'
//   },
//   {
//     name: 'West Virginia',
//     code: 'US-WV'
//   },
//   {
//     name: 'Wisconsin',
//     code: 'US-WI'
//   },
//   {
//     name: 'Wyoming',
//     code: 'US-WY'
//   },
//   {
//     name: 'District of Columbia',
//     code: 'US-DC'
//   }
// ]);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
