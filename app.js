require("dotenv").config({ path: "./mongo.env" });
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const session = require("express-session");
const flash = require("connect-flash");

app.use(
  session({
    secret: "happy dog",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

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
  res.status(404).render("404.pug", { title: "Sorry, page not found" });
});

//run server
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
