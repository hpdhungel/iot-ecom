const { getUsers } = require('../core/user')

module.exports =  (req , res) => {
    const users =  getUsers()
    console.log(users)
    res.status(200).send({message: users})
}
