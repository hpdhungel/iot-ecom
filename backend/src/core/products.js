require('dotenv').config()
const { Client } = require('pg')
const { TABLE_NAME } = require('../constants/constants')

const options = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
}
function getAllProducts(list) {
    const client = new Client(options);
    client.connect(err => {
        if (err) {
            console.log('connection error', err.stack);
        } else {
            client.query('SELECT * FROM products;', (err, res) => {
                if (err) {
                    console.log( err.stack);
                }else{
                list(res.rows);
                    
                }
                client.end(err => {
                    if(err){
                        console.log('unable to close the connection' + err)
                    }
                })
            })
        }
    })
}



function getProductDetails(cb, productId) {
    const client = new Client(options);
    console.log(productId)
    try {
        client.connect()
        const data = {
            text: 'SELECT * FROM products where product_id=$1',
            values: [productId]
        }
        client.query(data, (err, res) => {
            if (err) {
                console.log( err.stack);

            }else{
                cb(res.rows);
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


async function createNewProduct(callback, req) {
const client = new Client(options);

    let price = parseInt(req.price);
    let quantity = parseInt(req.quantity);

    try {
        client.connect()
        const data = {
            text: 'INSERT INTO products(name, description, img_url, price, quantity ) VALUES($1, $2, $3, $4, $5) RETURNING *;',
            values: [req.name, req.description, req.imgUrl, price, quantity]
        }
        client.query(data, (err, res) => {
            if (err) {
                console.log( err.stack);
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
            text: 'DELETE FROM products WHERE product_id=$1 RETURNING *;',
            values: [productId]
            
        }
        client.query(data, (err, res) => {
            if (err) {
                console.log( err.stack);
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
    id = parseInt(req.product_id)

    try {
        client.connect()
        const data = {
            text: 'UPDATE products SET name=$1, description=$2, img_url=$3, price=$4, quantity=$5 WHERE product_id=$6 RETURNING *;',
            values: [req.name, req.description, req.imgUrl, price, quantity, id ]
        }
        client.query(data, (err, res) => {
            if (err) {
                console.log( err.stack);
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
  deleteProduct,
  getProductDetails
}