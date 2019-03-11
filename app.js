const express = require('express');
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require('connect-flash');
const session = require('express-session');

// Passport config
const passport = require("passport");
require('./config/passport')(passport);

const app = express();

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log(err));

// EJS
app.use(expressLayout);
app.set("view engine", "ejs");

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: "scret",
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));