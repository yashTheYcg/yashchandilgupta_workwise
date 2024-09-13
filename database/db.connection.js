const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// path to config.env file
dotenv.config({ path: path.join(__dirname ,"../config.env")});

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    ssl: {
        rejectUnauthorized: false, // Use this if your database requires SSL
      },
});

pool.connect()
    .then(client => {
        console.log("Postgres connected");
        client.release(); // Release the client back to the pool
    })
    .catch(err => console.error('Connection error', err.stack));


module.exports = pool;
