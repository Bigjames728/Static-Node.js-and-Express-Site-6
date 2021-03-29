// app.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const data = require("data.json");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "3000";

/**
 *  App Configuration
 */

app.set("view engine", "pug");
app.use(express.static('public'));

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
    req.app.locals = data.projects;
});

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`The app is running on localhost:${port}`);
});