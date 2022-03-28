const { getAllUsers } = require('../../core/users')

module.exports = async (req , res) => {
    const users = await getAllUsers()
    res.status(200).send({users: users})
}