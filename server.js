const express = require("express");
const routes = require("./routes/api/members");
const path = require('path');
const {pool} = require('./database');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const cors = require ("cors");

const app = express();

//connecting the database 
pool.connect();

const initializePassport = require("./passportConfig");

initializePassport(passport);

const PORT = process.env.PORT || 3000;

//cors header
app.use(cors())


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// members API routes
//app.use('/api', require('./routes/api/members'));


//view engines
app.set("view engine", "ejs");

//Body Parser Middleware
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'secret',

    resave: false,

    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/dashboard", function (req, res) {
    res.render("dashboard", {user: "Best"});
});

app.post('/register', async (req, res) => {
    let {name, username, email, address, phone, password, password2} = req.body;

    console.log({
        name,
        username,
        email,
        address,
        phone,
        password,
        password2
    });

    let errors = []

    if ( !name || !username || !email || !address || !phone || !password || !password2 ) {
        errors.push({message: "Please enter all fields"});
    }

    if (password.length < 6){
        errors.push({message: "Password should be at least 10 characters"});
    }

    if(password != password2){
        errors.push({message: "Passwords do not match"});
    }

    if (errors.length > 0){
        res.render("register", {errors});
    }else {
        // Form validation has passed 

        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        pool.query (
            `SELECT * FROM user_info
            WHERE email = $1`, 
            [email], 
            (err, results) => {
                if (err){
                    throw err;
                }
                console.log(results.rows);

                if (results.rows.length > 0) {
                    errors.push({message: "Email already exist"});
                    res.render("register", {errors});
                }else{
                    pool.query(
                        `INSERT INTO user_info (full_name, user_name, email, address, phone_number, password)
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING user_id, password`,
                        [name, username, email, address, phone, hashedPassword],
                        (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log(results.rows);
                            req.flash("success_msg", "You are now registered, Please log in");
                            res.redirect('/login');
                        } 
                    )
                }
            }
        )
    }
});

app.post("/login", passport.authenticate('local', {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
}));

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});