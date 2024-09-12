const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "workwise",
    password: "yash",
    port: 5432,
});

pool.connect()
    .then(client => {
        console.log("Postgres connected");
        client.release(); // Release the client back to the pool
    })
    .catch(err => console.error('Connection error', err.stack));


module.exports = pool;
