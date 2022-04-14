const { loginUser } = require('../../core/users');

module.exports = async (req, res) => {

    try {
        loginUser(data => {
            res.status(200).send({ id: data });
        }, req.body)

    } catch (error) {
        console.log(error)
    }

}

