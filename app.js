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