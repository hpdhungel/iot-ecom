require('dotenv').config()
const { query } = require('express');
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
            text: 'SELECT cart.cart_id, cart.quantity, products.product_id as product_id, products.name, products.description, products.price FROM products INNER JOIN cart ON cart.product_id = products.product_id WHERE cart.user_id=$1',
            values: [userId]
        }
        client.query(data, (err, res) => {
            if (err) {
                throw err;
            }
            callback(res.rows);
            console.log(res.rows)
            client.end(err => {
                if (err) {
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
    let userId = req.user_id
    let productId = req.product_id
    let quantity = 2

//     EXISTS IF (SELECT FROM cart WHERE user_id=${userId} AND product_id= ${productId}; )
         
//     UPDATE cart SET quantity= ${quantity} WHERE user_id=${userId} AND product_id= ${productId}; 
    
//   ELSE
    // INSERT INTO carts (user_id, product_id, quantity) 
    //  VALUES  (${userId}, ${productId}, ${quantity}) 
    //  ON CONFLICT (product_id, user_id) 
    //  DO UPDATE SET quantity= ${quantity} RETURNING *;     

    try {
        client.connect()

        client.query(` 
  
        

    INSERT INTO cart (user_id, product_id, quantity) 
     VALUES  (${userId}, ${productId}, ${quantity}) 

     
     `, (err, res) => {
            if (err) {
                throw err;
            }
            callback(res.rows);
            console.log(res.rows)
            client.end(err => {
                if (err) {
                    console.log(err)
                }
            })
        });
    } 
    catch (error) {
        console.log(error)

    }

}


async function removeCart(callback, request) {
    const client = new Client(options);
    console.log(request.product_id, request.user_id)


    try {
        client.connect()
        const data = {
            text: 'DELETE FROM cart WHERE user_id=$1 AND product_id=$2 AND id=$3 RETURNING *;',
            values: [request.user_id, request.product_id, request.cartId]
        }
        client.query(data, (err, res) => {
            if (err) {
                throw err;
            }
            callback(res.rows);
            client.end(err => {
                if (err) {
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