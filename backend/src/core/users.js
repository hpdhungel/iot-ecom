require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants')
const jwtoken = require('jsonwebtoken');

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
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
        console.log( err.stack);
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
                console.log( err.stack);
            }

            const key = process.env.JWT_KEY;
            const token = jwtoken.sign({}, key, {
                expiresIn: '7day'
            })
            resp({id:res.rows[0].user_id, token})
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
                console.log( err.stack);
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
                text: 'SELECT user_id, name, password, email, street, city, state, zip, user_role FROM users WHERE email = $1',
                values: [req.email]
            }

            client.query(data, (err, res) => {
               console.log(res.rows[0])
                var user_id = parseInt(res.rows[0].user_id)
                if (err) {      
                    console.log(err)
                }
                if (res.rows[0] != null && req.password === res.rows[0].password ) {
                    const key = process.env.JWT_KEY;
                    const token = jwtoken.sign({}, key, {
                        expiresIn: '7day'
                    })
                    resp({id:user_id, admin: res.rows[0].user_role, name: res.rows[0].name, email:res.rows[0].email, token})
                } else {
                    resp(false)
                    console.log('err')
                }
            });
        }
    });
}

async function getUserById(callback, userId) {
    const client = new Client(options);
    try {
        client.connect()
        const data = {
            text: 'SELECT * FROM users WHERE user_id=$1',
            values: [userId]
        }
        client.query(data, (err, res) => {
            if (err) {
                console.log( err.stack);

            }else{
                let data = JSON.parse(JSON.stringify(res.rows))
                callback(data);
            }
         
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

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    loginUser,
    getUserById
}
