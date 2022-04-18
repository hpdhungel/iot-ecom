const { updateUser } = require('../../core/users');

module.exports = async (req, res) => {
    updateUser(data => {
        res.status(200).send({ user: data })
    }, req.body)
}