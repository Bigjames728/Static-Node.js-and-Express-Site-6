// app.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const data = require("./data.json");
const projects = data.data.projects;

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
    res.render("index", { projects });
});

app.get("/about", (req, res) => {
    res.render("about");
})

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`The app is running on localhost:${port}`);
});