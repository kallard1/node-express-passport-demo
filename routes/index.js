const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

// Home page
router.get("/", (req, res) => {
    res.render('home');
});

// Dashboard page
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    console.log(req.user);
    res.render('dashboard', {
        user: req.user
    });
});

module.exports = router;