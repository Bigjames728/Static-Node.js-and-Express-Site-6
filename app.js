// app.js

/**
 * Required External Modules
 */

const express = require("express");
const favicon = require('serve-favicon');
const path = require("path");
const data = require("./data.json");
const { exists } = require("fs");
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

app.get("/projects/:id", (req, res, next) => {
    const project = projects[req.params.id];
    if (project) {
        res.render('project', { project });
    } else {
        res.status(404).render('page-not-found');
    }
});

/**
 * Error Handlers
 */

/* 404 handler to catch undefined or non-existent route requests */
app.use((req, res, next) => {
    console.log('404 error handler called');
    const err = new Error();
    err.message = `Oops! It looks like this page doesn't exist.`;
    err.status = 404;
    console.log(err.message);
    res.render('page-not-found', { err });
});

// /* Global error handler */

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).render('page-not-found', { err });
    } else {
        err.message = 'Oops! It looks like something went wrong on the server.';
        err.status = 500;
        res.render('error', { err });
        console.log(err.message);
    }
});

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`The app is running on localhost:${port}`);
});