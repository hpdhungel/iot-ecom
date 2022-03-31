const { loginUser } = require('../../core/users');

module.exports = async (req, res) => {
    loginUser(data => {
        res.status(200).send({user: data})
    }, req.body)
}

