const { getAllFromCart } = require('../../core/carts');

module.exports = async (req, res) => {
    getAllFromCart(data => {
        res.status(200).send(data)
    }, req.params['userId']);
}

