require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

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
                    if(err){
                        console.log('unable to close the connection' + err)
                    }
                    console.log('client  disconnect successful from getAllProduct')    
                })
            })
        }
    })
}

async function createNewProduct(callback, req) {
const client = new Client(options);

    let price = parseInt(req.price);
    let quantity = parseInt(req.quantity);

    try {
        client.connect()
        const data = {
            text: 'INSERT INTO products(name, description, price, quantity) VALUES($1, $2, $3, $4) RETURNING *;',
            values: [req.name, req.description, price, quantity]
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

async function deleteProduct(callback, req) {
    const client = new Client(options);
    let productId = parseInt(req.id);
    try {
        client.connect()
        const data = {
            text: 'DELETE FROM products WHERE id=$1 RETURNING *;',
            values: [productId]
            
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

async function updateProduct(callback, req) {
    const client = new Client(options);
    price = parseInt(req.price)
    quantity = parseInt(req.quantity)
    id = parseInt(req.id)

    try {
        client.connect()
        const data = {
            text: 'UPDATE products SET name=$1, description=$2, price=$3, quantity=$4 WHERE id=$5 RETURNING *;',
            values: [req.name, req.description, price, quantity, id]
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
  createNewProduct,
  updateProduct,
  deleteProduct
}