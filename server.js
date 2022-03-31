const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config()

const getAllUsers = require('./src/routes/users/getAllUsers')
const createUser = require('./src/routes/users/createUser');
const updateUser = require('./src/routes/users/updateUser');
const loginUser = require('./src/routes/users/loginUser');

const getAllLists = require('./src/routes/lists/getAllLists');
const createList = require('./src/routes/lists/createList');
const updateList = require('./src/routes/lists/updateList');

const app = express();
app.use(bodyparser.json());
app.use(cors());

app.get('/api/v1/users/', getAllUsers)
app.post('/api/v1/users', createUser);
app.put('/api/v1/users', updateUser);
app.post('/api/v1/login', loginUser);

app.get('/api/v1/lists', getAllLists)
app.post('/api/v1/list', createList);
app.put('/api/v1/list', updateList);


app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
