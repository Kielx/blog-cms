require("dotenv").config({ path: "./mongo.env" });
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

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

//set routes
const router = require("./routes/routes");
app.use("/", router);

//run server
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
