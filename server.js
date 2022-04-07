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

const app = express();
app.use(bodyparser.json());
app.use(cors())


app.get('/api/v1/users/', getAllUsers)
app.post('/api/v1/users', createUser);
app.put('/api/v1/users', updateUser);
app.post('/api/v1/login', loginUser);

app.get('/api/v1/products', getAllProducts)
app.post('/api/v1/product', createNewProduct);
app.post('/api/v1/delete-product', deleteProduct);
app.post('/api/v1/product', updateProduct);

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))


