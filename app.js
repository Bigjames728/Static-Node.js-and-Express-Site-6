// app.js

/**
 * Required External Modules
 */

const express = require("express");
const router = express.Router();
const favicon = require('serve-favicon');
const path = require("path");
const data = require("./data.json");
const { exists } = require("fs");
const projects = data.data.projects;
const projectRouter = require('./routes/index');


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
app.use(require('./routes'));


/**
 * Routes Definitions
 */

app.use('/', projectRouter);





/**
 * Error Handlers
 */

/* 404 handler to catch undefined or non-existent route requests */
app.use((req, res, next) => {
    

    /* TODO 1: Send a response to the client
        - Set the response status to 404
        - Render the 'page-not-found'view
    */
   res.status(404).render('page-not-found');
   console.log("It looks like this page doesn't exist.")
    
});

/* Global error handler */

app.use((err, req, res, next) => {

    if (err) {
        console.log('Global error handler called', err);
    }

    /* TODO 2: Handle errors caught by your route handlers
        - If the error status is 404:
            * Set the response status to 404
            * Render the 'page-not-found' view and pass the error object to the view
        - Else:
            * Set the error message to the given message, or specify a general, defalut error message
            * Set response status to the given error status OR, set it to 500 by default if no error status is set
            * Render the 'error' view, passing it the error object
    */
    if (err.status === 404) {
        res.status(404).render('page-not-found', { err });
    } else {
        err.message = err.message || 'Oops! It looks like something went wrong with the server.';
        res.status(err.status || 500).render('error', { err });
    }
});

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`The app is running on localhost:${port}`);
});

module.exports = app;