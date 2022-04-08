require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}




function getAllFromCart(list) {
    const client = new Client(options);
    client.connect(err => {
        if (err) {
            console.log('connection error', err.stack);
        } else {
            client.query('SELECT * FROM carts;', (err, res) => {
                if (err) {
                    throw err;
                }
                list(res.rows);
                client.end(err => {
                    if(err){
                        console.log('unable to close the connection' + err)
                    }
                    console.log('client  disconnect successful from getAllProduct')    
                })
            })
        }
    })
}



async function addToCart(callback, req) {
    const client = new Client(options);

    try {
        client.connect()
        const data = {
            text: 'INSERT INTO carts(user_id, product_id) VALUES($1, $2) RETURNING *;',
            values: [req.user_id, req.product_id]
        }
        client.query(data, (err, res) => {
            if (err) {
                throw err;
            }
            callback(res.rows);
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
  addToCart,
  getAllFromCart
  }