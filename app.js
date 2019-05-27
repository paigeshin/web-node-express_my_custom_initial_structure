//모듈
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
  expressSession = require("express-session"),
  connectFlash = require("connect-flash"),
  request = require("request"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
//모델
var User = require("./models/user");
//라우트
var authRoutes = require("./routes/index");

//Basic Setting
mongoose.connect("mongodb://127.0.0.1/example_app", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(
  expressSession({
    secret: "Demo Application",
    resave: false,
    saveUninitialized: false
  })
);
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = flash("success");
  res.locals.error = flash("error");
});

app.use("/", authRoutes);

app.listen(3000, "127.0.0.1", function() {
  console.log("Server has started");
});
