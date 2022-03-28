require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

function getAllUsers( cb ) {
    const client = new Client(options)
    client.connect()
    client.query("SELECT * from users", (err, res) => {
        if (err) throw err;
        console.log(res)
        cb(res.rows)
    })
}


module.exports = {
    getAllUsers
    
}