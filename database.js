const {Pool} = require('pg');

const pool = new Pool ({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'richard031',
    database: 'eddy'
}) 


module.exports = pool;