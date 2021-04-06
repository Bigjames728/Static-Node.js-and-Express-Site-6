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
        const err = new Error();
        err.status = 404;
        err.message = `Looks like the project you requested doesn't exist.`
        next(err);
    }
});

/**
 * Error Handlers
 */

/* 404 handler to catch undefined or non-existent route requests */
app.use((req, res, next) => {
    console.log('404 error handler called');
    
    /* TODO 1: Send a response to the client
        -Set the response status to 404
        -Render the 'page-not-found' view
    */
    res.status(404).render('page-not-found');
});

/* Global error handler */

app.use((err, req, res, next) => {
    
    if (err) {
        console.log('Global error handler called', err);
    }
    
    /* TODO 2: Handle errors caught by your route handlers
        -If the error status is 404:
            * Set the response status to 404
            * Render the 'page-not-found' view and pass the error object to the view
        - Else:
            * Set the error message to the given message, or specify a general, default error message
            * Set response status to the given error status OR, set it to 500 by default if no
            * Render the 'error' view, passing it the error object
    */
    if (err.status === 404) {
        res.status(404).render('page-not-found', { err });
    } else {
        err.message = err.message || 'Oops! It looks like something went wrong on the server.';
        res.status(err.status || 500).render('error', { err });
    }
});

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`The app is running on localhost:${port}`);
});