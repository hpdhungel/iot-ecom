const { addToCart } = require('../../core/carts');

module.exports = async (req, res) => {
    addToCart(data => {
        res.status(201).send({cart: data})
    }, req.body)
}