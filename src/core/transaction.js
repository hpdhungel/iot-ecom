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

    let product =  req.products

    console.log(product)
    let userId = parseInt(req.user_id)
    let total = parseInt(req.total)
    try {
        client.connect()
        const removeAllFromCart = {
            text: 'DELETE FROM carts WHERE user_id=$1 RETURNING *;',
            values: [userId]
        }

        const addToTransaction = {
            text: 'insert into transaction(products, user_id, total) VALUES($1, $2, $3) RETURNING *;',
            values: [{product}, userId, total]
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

async function getAllFromOrder(callback, userId) {
    const client = new Client(options);
    console.log(userId)
    try {
        client.connect()
        const data = {
            text: 'SELECT * FROM transaction WHERE user_id=$1',
            values: [userId]
        }
        client.query(data, (err, res) => {
            if (err) {
                throw err;
            }
            let data = JSON.parse(JSON.stringify(res.rows))
            callback(data);
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
    checkout,
    getAllFromOrder
}
