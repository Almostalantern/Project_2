const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("/index");
});

router.get("/hotel", (req, res) => {
  res.render("hotels");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/map", (req, res) => {
  res.render("map");
});

module.exports = router;
