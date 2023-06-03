const express = require('express');
const members = require('../../Members');
const {pool} = require('../../database');
const router = express.Router();


//connecting the database 
pool.connect();

// ROUTES 

//Gets all MEMBERS 
router.get('/', (req, res) => res.json(members));

//Get single member
router.get('/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: `No member with id of ${req.params.id}`});
    }
});


//Create Member 
router.post('/register', async (req, res) => {
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

    if (password.length < 10){
        errors.push({message: "Password should be at least 10 characters"});
    }

    if(password != password2){
        errors.push({message: "Passwords do not match"});
    }

    if (errors.length > 0){
        res.render("register", {errors});
    }else {
        // Form validation has passed 
        pool.query (
            `SELECT * FROM user_info
            WHERE email = $1`, [email], (err, results) =>{
                if (err){
                    throw err
                }
                console.log('reaches here');
                console.log(results.rows);
            }
        )
    }
});


// update  member

// Delete member 

module.exports = router