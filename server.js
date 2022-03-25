const express = require('express');
require('dotenv').config()
const getAllUsers = require('./src/routes/getAllUsers')

const app = express();



app.get('/api/v1/users/', getAllUsers)

app.listen(process.env.PORT, () => console.log(`server has started ${process.env.PORT}`))
