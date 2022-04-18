require('dotenv').config()
const { Client } = require('pg')
const { rows } = require('pg/lib/defaults')
const { TABLE_NAME } = require('../constants/constants')


const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

async function getAllUsers() {
    const client = new Client(options)

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
    const client = new Client(options)
    let zip = parseInt(req.zip)
    try {
        client.connect()
        const data = {
            text: 'INSERT INTO users(name, password, email, street, city, state, zip) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
            values: [req.name, req.password, req.email, req.street, req.city, req.state, zip]
        }
        client.query(data, (err, res) => {
            if (err) {
                throw err;
            }
            resp(res.rows[0].id);
            client.end(err=>{
                if(err){
                    console.log(err)
                }
            })
        });
    }
    
    catch (err) {
        console.log(err)
    }
}

async function updateUser(resp, req) {
    const client = new Client(options)

    try {
        client.connect()
        const data = {
            text: 'UPDATE users SET name=$1, password=$2, email=$3, street=$4, city=$5, state=$6, zip=$7 WHERE id=$8 RETURNING *;',
            values: [req.name, req.password, req.email, req.street, req.city, req.state, req.zip, req.id]
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

function loginUser(resp, req) {
    const client = new Client(options);
    client.connect(err => {
        if (err) {
            console.log('error connecting', err.stack);
        } else {
           
            const data = {
                text: 'SELECT id, name, password, email, street, city, state, zip FROM users WHERE email = $1',
                values: [req.email]
            }

            client.query(data, (err, res) => {
                var user_id = parseInt(res.rows[0].id)
                if (err) {      
                    console.log(err)
                }
                if (res.rows[0] != null && req.password === res.rows[0].password ) {
                    resp(user_id)
            
                } else {
                    resp(false)
                    console.log('err')
                }
            });
        }
    });

}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    loginUser
}
