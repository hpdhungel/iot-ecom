require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}
const client = new Client(options);


function getAllProducts(list) {
    const client = new Client(options);
    client.connect(err => {
        if (err) {
            console.log('connection error', err.stack);
        } else {
            client.query('SELECT * FROM products;', (err, res) => {
                if (err) {
                    throw err;
                }
                list(res.rows);
                client.end(err => {
                   
                        console.log('client  disconnect successful')
                    
                })
            })
        }
    })
}


async function createNewProduct(callback, req) {

    try {
        client.connect()
        const data = {
            text: 'INSERT INTO products(name, description, price, quantity) VALUES($1, $2, $3, $4) RETURNING *;',
            values: [req.name, req.description, req.price, req.quantity]
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
  getAllProducts,
  createNewProduct
}