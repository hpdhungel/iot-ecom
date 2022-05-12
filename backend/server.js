const express = require('express');
const cors = require('cors');

const bodyparser = require('body-parser');
require('dotenv').config()

const {authenticateToken} = require('./src/core/jwt')

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
const order = require('./src/routes/transaction/orders');
const editQuantity = require('./src/routes/cart/editQuantity');
const getProductDetails = require('./src/routes/products/getProductDetails');
const getUserById = require('./src/routes/users/getUserById');


const app = express();
app.use(bodyparser.json());

app.use(cors());

app.get('/api/v1/users/', getAllUsers)
app.post('/api/v1/users', createUser);
app.put('/api/v1/users', updateUser);
app.post('/api/v1/login', loginUser);
app.get('/api/v1/user/:userId', getUserById)


app.get('/api/v1/products', getAllProducts)
app.post('/api/v1/product', authenticateToken, createNewProduct);
app.post('/api/v1/delete-product', authenticateToken, deleteProduct);
app.put('/api/v1/product', authenticateToken, updateProduct);
app.get('/api/v1/product/:productId', getProductDetails)


app.post('/api/v1/cart',authenticateToken, addToCart);
app.post('/api/v1/remove-cart', authenticateToken, removeCart);

app.get('/api/v1/carts/:userId', getAllFromCart)
app.post('/api/v1/edit-quantity', editQuantity)

app.post('/api/v1/checkout', authenticateToken, checkout)
app.get('/api/v1/orders/:userId', authenticateToken, order)

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
