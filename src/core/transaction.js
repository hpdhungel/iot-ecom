require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}


async function checkout(callback, req) {
    const client = new Client(options);

    let product_id = req.product_id
    let userId = parseInt(req.user_id)
    console.log(userId)
    try {
        client.connect()
        const removeAllFromCart = {
            text: 'DELETE FROM carts WHERE user_id=$1 RETURNING *;',
            values: [userId]
        }

        const addToTransaction = {
            text: 'insert into transaction(product_id, user_id) VALUES($1, $2) RETURNING *;',
            values: [product_id, userId]
        }
        client.query(addToTransaction, (err, res) => {
            if (err) {
                throw err;
            }
            callback(res.rows)

        });

        client.query(removeAllFromCart, () => {
            console.log('done')
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
    checkout
}
