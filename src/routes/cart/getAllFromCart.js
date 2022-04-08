const { getAllFromCart } = require('../../core/carts');

module.exports = async (req, res) => {
    getAllFromCart(data => {
        res.status(201).send({carts: data})
    }, req.body)
}

