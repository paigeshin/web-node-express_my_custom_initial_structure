var express = require("express");
var router = express.Router({ mergeParams: true });
var passport = require("passport");
var User = require("../models/user");
//middleware
var isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", function(req, res) {
  res.render("landing");
});

module.exports = router;
