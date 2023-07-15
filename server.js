const express = require("express");
const app = express();
const path = require('path');
const {pool} = require('./database'); 
const env = process.env.NODE_ENV || "development";
//const members = require('./routes/api/members');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const cors = require ("cors");
const {Sequelize} = require ('sequelize');


const User = require('./models/User');
const initializePassport = require("./passportConfig");

initializePassport(passport);

/**module.exports = {
    config: path.resolve('./config', 'config.js'),
    'models-path': path.resolve('./models'),
    'seeders-path': path.resolve('./seeders'),
    'migrations-path': path.resolve('./migrations'),
}*/

//creating a new Sequelize instance 
const dbConfig = new Sequelize (
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env,DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
});
async function testConnection() {
    try{
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) { 
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();


//connecting the database 
pool.connect();

const PORT = process.env.PORT || 4000;

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

app.get("/register", checkAuthenticated, (req, res) => {
    res.render("register");
});

app.get("/login", checkAuthenticated, (req, res) => {
    res.render("login");
});

app.get("/dashboard", checkNotAuthenticated, (req, res) => {
    res.render("dashboard", { user: req.body.name });
});

app.get('/deposit', (req, res) => {
    res.render('deposit');
})

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
          console.error(err);
          // Handle error if needed
        }
        req.flash("success_msg", "You have logged out");
        res.redirect("/");
      });
})

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

    // FOR FORM VALIDATION 
    let errors = [];

    if ( !name || !username || !email || !address || !phone || !password || !password2 ) {
        errors.push({message: "Please enter all fields"});
    }

    if (password.length < 6){
        errors.push({message: "Password should be at least 6 characters"});
    }

    if(password != password2){
        errors.push({message: "Passwords do not match"});
    }

    if (errors.length > 0){
        res.render("register", {errors});
    }else {
        // Form validation has passed 
        //hashed passwords
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
                    errors.push({message: "email already exist"});
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

function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});