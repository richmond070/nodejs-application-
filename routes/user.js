const express = require("express");
const app = express();
const {prisma} = require('../utils/db')

app.get('/login:id', async (req, res) => {
    const userId = req.params.user_id;
    
})



module.exports = app