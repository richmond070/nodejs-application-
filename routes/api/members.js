const express = require('express');
const members = require('../../Members');
const pool = require('../../database');
const router = express.Router();

const app = express();

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
app.post('/member', async (req, res) => {
    try {
        // save the data
        const {full_name, user_name, email, address, phone, password} = req.body;
        const newUser = await pool.query("INSERT into user_info (full_name, user_name, email, address, phone, password)VALUES ($1, $2, $3, $4, $5, $6) RETURNING * "
         [full_name, user_name, email, address, phone, password]
        );

        res.json(newUser.rows[0]);

        //Release the client from the connection pool 
        pool.end();
        
        //send a response indicating success
        res.status(201).json({message: 'Data was saved successfully'})

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});


// update  member

// Delete member 

module.exports = router