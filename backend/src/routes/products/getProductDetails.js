const { getProductDetails } = require('../../core/products');

module.exports = async (req, res) => {
    getProductDetails(data => {
        res.status(200).send(data)
    }, req.params['productId']);
}

