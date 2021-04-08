const express = require("express");
const router = express.Router();
const data = require("./data.json");
const projects = data.data.projects;


// Index route to render the home page

router.get("/", (req, res) => {
    res.render("index", { projects });
});

// About route to render the about page

router.get("/about", (req, res) => {
    res.render("about");
});

// Project route that renders a customized version of the project.pug template based on which ID was selected

router.get("/projects/:id", (req, res, next) => {
    const project = projects[req.params.id];
    if (project) {
        res.render('project', { project });
    } else {
        console.log("The page your looking for doesn't exist");
        res.status(404).render('page-not-found');
    }
});

module.exports = router;