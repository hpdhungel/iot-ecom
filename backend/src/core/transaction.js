require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
}

async function checkout(callback, req) {
    const client = new Client(options);

    let product =  req.products
    let userId = parseInt(req.user_id)
    let total = parseInt(req.total)

    try {
        client.connect()
        const removeAllFromCart = {
            text: 'DELETE FROM cart WHERE user_id=$1 RETURNING *;',
            values: [userId]
        }

        const addToTransaction = {
            text: 'insert into transaction(products, user_id, total) VALUES($1, $2, $3) RETURNING *;',
            values: [{product}, userId, total]
        }
        client.query(addToTransaction, (err, res) => {
            if (err) {
                console.log( err.stack);
            }
            callback(res.rows)

        });
        
        client.query(removeAllFromCart, () => {
            console.log('remove from cart done')
            client.end(err => {
                console.log('client close')
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
    try {
        client.connect()
        const data = {
            text: 'SELECT * FROM transaction WHERE user_id=$1',
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
    checkout,
    getAllFromOrder
}
