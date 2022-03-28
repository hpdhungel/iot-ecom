const { getAllUsers } = require('../../core/user')

module.exports =  (req , res) => {
    const users =  getAllUsers()
    console.log(users)
    res.status(200).send({message: users})
}

