require("dotenv").config({ path: "./mongo.env" });
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const User = require("./models/user");

//set up passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const session = require("express-session");
const flash = require("connect-flash");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

//passport local strategy
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: "Username or password is incorrect",
        });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) throw err;
        else if (!isMatch) {
          return done(null, false, {
            message: "Username or password is incorrect",
          });
        }
        return done(null, user, { message: `Hello ${username}` });
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//favicon
const favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

//set morgan logging
const morgan = require("morgan");
app.use(morgan("dev"));

// use mongoose file
require("./database/mongoose_connection.js");

//bodyparser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//serve static files
app.use("/public", express.static("public"));

//set views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("view engine", "ejs");

//set routes
const router = require("./routes/routes");
app.use("/", router);

//handle 404 errors
app.use(function (req, res, next) {
  res.status(404).render("404.ejs", { title: "Sorry, page not found" });
});

//run server
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
