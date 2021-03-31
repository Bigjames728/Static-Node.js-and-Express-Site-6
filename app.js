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
});

app.get("/projects/:id", (req, res) => {
    const project = projects[req.params.id];
    res.render('project', { project });
});

/**
 * Error Handlers
 */

app.use((req, res, next) => {
    console.log("It looks like this page doesn't exist!");
    res.status(404).render('page-not-found');
});

app.use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || "Server error";
    if (err.status === 404) {
        res.status(404).render("page-not-found", { err });
    } else {
        err.message = err.message || `Oops! It looks like something went wrong on the server.`
        console.log("It looks like this page doesn't exist!");
        res.status(err.status || 500).render('error', { err });
    }
});

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`The app is running on localhost:${port}`);
});