const express = require("express");
const routes = require("./routes/api/members");
const path = require('path');
const cors = require ("cors")

const app = express();

//cors header
app.use(cors())


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// members API routes
app.use('/api', require('./routes/api/members'));


//view engines
app.set("view engine", "ejs");

//Body Parser Middleware
app.use(express.urlencoded({extended: false}));

app.get("/signup", function (req, res) {
    res.render("signup")
});


app.listen(3000, function () {
    console.log("Server is running on localhost3000");
});