const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser')



const getAllUsers = require('./src/routes/users/getAllUsers')
const createUser = require('./src/routes/users/createUser');

const app = express();
app.use(bodyParser.json()) // for parsing application/json

app.get('/api/v1/users/', getAllUsers)
app.post('/api/v1/users', createUser);

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
