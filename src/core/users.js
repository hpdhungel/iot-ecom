require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants')
const bodyParser = require('body-parser')


const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}
const client = new Client(options)

async function getAllUsers() {
    try {
        client.connect()
        const data = await client.query(`SELECT * FROM ${TABLE_NAME.users}`)
        client.end()
        return data.rows
    }
    catch (err) {
        throw err
    }

}

async function createUser(resp, req) {
    try {
        client.connect()
        const data = {
            text: 'INSERT INTO users(name, password, email, street, city, state, zip) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
            values: [req.name, req.password, req.email, req.street, req.city, req.state, req.zip]
        }
        client.query(data, (err, res) => {
            if (err) {
                throw err;
            }
            resp(res.rows);
        });
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllUsers,
    createUser
}