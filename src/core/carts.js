require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants');

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}



async function getAllFromCart(callback, userId) {
    const client = new Client(options);
        try {
            client.connect()
            const data = {
                text: 'SELECT carts.id,products.id as product_id, products.name, products.description, products.price FROM products INNER JOIN carts ON carts.product_id = products.id WHERE carts.user_id=$1',
                values: [userId]
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



async function addToCart(callback, req) {
    const client = new Client(options);
    console.log(req)
    try {
        client.connect()
        const data = {
            text: 'INSERT INTO carts(user_id, product_id) VALUES($1, $2) RETURNING *;',
            values: [req.user_id, req.product_id ]
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

async function removeCart(callback, request){
        const client = new Client(options);
        console.log(request.product_id, request.user_id)


        try {
            client.connect()
            const data = {
                text: 'DELETE FROM carts WHERE user_id=$1 AND product_id=$2 AND id=$3 RETURNING *;',
                values: [request.user_id, request.product_id, request.cartId]
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
  getAllFromCart, 
  removeCart
  }