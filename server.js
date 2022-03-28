const express = require('express');
require('dotenv').config()

const getAllUsers = require('./src/routes/users/getAllUsers')
const createUser = require('./src/routes/users/createUser');
const updateUser = require('./src/routes/users/updateUser');

const app = express();

app.get('/api/v1/users/', getAllUsers)
app.post('/api/v1/users', createUser);
app.put('/api/v1/users', updateUser);

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
