const express = require('express');
require('dotenv').config()

const getAllUsers = require('./src/routes/users/getAllUsers')
const createUser = require('./src/routes/users/createUser');
const updateUser = require('./src/routes/users/updateUser');
const loginUser = require('./src/routes/users/loginUser');
// const logoutUser = require('./src/routes/users/logoutUser');

const getAllLists = require('./src/routes/lists/getAllLists');
const createList = require('./src/routes/lists/createList');
const updateList = require('./src/routes/lists/updateList');

const app = express();

app.get('/api/v1/users/', getAllUsers)
app.post('/api/v1/users', createUser);
app.put('/api/v1/users', updateUser);
app.post('/api/v1/users', loginUser);
// app.post('/api/v1/users', logoutUser);

app.get('/api/v1/list/', getAllLists)
app.post('/api/v1/list', createList);
app.put('/api/v1/list', updateList);


app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
