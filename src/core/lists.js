require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants')


const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}
const client = new Client(options)

async function getAllLists() {
    try {
        client.connect()
        const data = await client.query(`SELECT * FROM ${TABLE_NAME.lists}`)
        client.end()
        return data.rows
    }
    catch (err) {
        throw err
    }

}

async function createList(resp, req) {
    try {
        client.connect()
        const data = {
            text: 'INSERT INTO lists(name, description, price, quantity) VALUES($1, $2, $3, $4) RETURNING *;',
            values: [req.name, req.description, req.price, req.quantity]
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

async function updateList(resp, req) {
    try {
        client.connect()
        const data = {
            text: 'UPDATE lists SET name=$1, description=$2, price=$3, quantity=$4 WHERE id=$5 RETURNING *;',
            values: [req.name, req.description, req.price, req.quantity, req.id]
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
    getAllLists,
    createList,
    updateList
}