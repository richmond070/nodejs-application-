const {env} = require('dotenv/config');
const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

const database = async () => {
    return await prisma 
    .$connect()
    .then(() => console.log("Connected!"))
    .catch(() => console.log('Error!' + err));
};

module.exports = {database, prisma}