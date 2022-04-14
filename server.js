const express = require('express');
const cors = require('cors');

const bodyparser = require('body-parser');
require('dotenv').config()

const getAllUsers = require('./src/routes/users/getAllUsers')
const createUser = require('./src/routes/users/createUser');
const updateUser = require('./src/routes/users/updateUser');
const loginUser = require('./src/routes/users/loginUser');

const getAllProducts = require('./src/routes/products/getAllProducts');
const createNewProduct = require('./src/routes/products/addProduct');
const deleteProduct = require('./src/routes/products/deleteProduct');
const updateProduct = require('./src/routes/products/updateProduct');

const addToCart = require('./src/routes/cart/addToCart');
const getAllFromCart = require('./src/routes/cart/getAllFromCart');
const removeCart = require('./src/routes/cart/removeCart');

const checkout = require('./src/routes/transaction/checkout');


const app = express();
app.use(bodyparser.json());

app.use(cors());

app.get('/api/v1/users/', getAllUsers)
app.post('/api/v1/users', createUser);
app.put('/api/v1/users', updateUser);
app.post('/api/v1/login', loginUser);

app.get('/api/v1/products', getAllProducts)
app.post('/api/v1/product', createNewProduct);
app.post('/api/v1/delete-product', deleteProduct);
app.put('/api/v1/product', updateProduct);

app.post('/api/v1/cart', addToCart);
app.post('/api/v1/remove-cart', removeCart);

app.get('/api/v1/carts/:userId', getAllFromCart)

app.post('/api/v1/checkout', checkout)

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))