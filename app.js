// app.js

/**
 * Required External Modules
 */

const express = require("express");
const favicon = require('serve-favicon');
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
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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
    err = new Error('Not found');
    err.status = 404;
    err.message = 'Not found';
    next(err);
});

app.use((err, req, res, next) => {
    res.status = err.status || 500;
    res.message = err.message || "Server error";
    if (res.status === 404) {
        res.render("page-not-found", { err: err });
    } else {
        res.render('error', { err: err });
        console.log(err.status, err.message);
    }
});

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`The app is running on localhost:${port}`);
});