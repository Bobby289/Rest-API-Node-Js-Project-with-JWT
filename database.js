const { createPool } = require('mysql'); 
const pool = createPool({
    host: process.env.DB_HOST,
    user: "root",
    password: "password",
    database: "test node",
    connectionLimit: 10
})

module.exports=pool;

