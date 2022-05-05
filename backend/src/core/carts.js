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
            text: 'SELECT cart.cart_id, cart.quantity, products.product_id as product_id, products.name, products.description, products.price FROM products INNER JOIN cart ON cart.product_id = products.product_id WHERE cart.user_id=$1',
            values: [userId]
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


async function addToCart(callback, req) {
    const client = new Client(options);
   
    let userId = req.user_id
    let productId = req.product_id
    let quantity = 2+1
    console.log(userId, productId)


    try {
        client.connect()

        client.query(
            `
            INSERT INTO cart (user_id, product_id, quantity)
            VALUES ( ${userId}, ${productId}, ${quantity})
        `
, 
     (err, res) => {
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
    console.log(request)


    try {
        client.connect()
        const data = {
            text: 'DELETE FROM cart WHERE user_id=$1 AND product_id=$2 AND cart_id=$3 RETURNING *;',
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

async function editQuantity(callback, req) {
    const client = new Client(options);
    console.log(req)


    try {
        client.connect()
        const data = {
            text: 'UPDATE cart SET quantity=$1 WHERE user_id=$2 AND product_id=$3',
            values: [req.quantity, req.user_id, req.product_id]
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
    removeCart, 
    editQuantity
}