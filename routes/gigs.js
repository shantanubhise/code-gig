const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

const Sequelize = require('sequelize');
const { raw } = require('body-parser');
const Op = Sequelize.Op;

// get gigs list
router.get('/', (req, res) => {
    Gig.findAll()
        .then((gigs) => {
            res.render('gigs', { gigs });
        })
        .catch(err => {
            console.log('Error: ', err);
        });
});

router.get('/add', (req, res) => { res.render('add') });

// add a gig
router.post('/add', (req, res) => {

    let { title, technologies, budget, description, contact_email } = req.body;

    let errors = [];

    if (!title.trim().length > 0) {
        errors.push({ text: "Please add a title." });
    };
    if (!technologies.trim().length > 0) {
        errors.push({ text: "Please add technologies." });
    };
    if (!description.trim().length > 0) {
        errors.push({ text: "Please add a description." });
    };
    if (!contact_email.trim().length > 0) {
        errors.push({ text: "Please add a contact email." });
    };

    // Check for errors
    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        });

    } else {
        if (!budget.trim().length > 0) {
            budget = "unknown"
        } else {
            budget = `$${budget}`
        };

        technologies = technologies.toLowerCase().trim().replace(/, /g, ',');
        // Insert into table
        Gig.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        }).then((gig) => {
            res.redirect('/gigs');
        }).catch(err => {
            console.log("Error: ", err);
        });
    }
});

router.get('/search', async (req, res) => {
    const { term } = req.query;

    Gig.findAll({
        where: { technologies: { [Op.like]: '%' + term.toLowerCase() + '%' } }
    }).then((gigs) => {
        res.render('gigs', { gigs });
    }).catch(err => { console.log("Error: ", err) })
});

module.exports = router;