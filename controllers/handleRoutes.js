const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/hotel", (req, res) => {
  res.render("hotel");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/members", (req, res) => {
  res.render("members");
});

module.exports = router;
