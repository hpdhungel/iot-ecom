const { updateProduct } = require('../../core/products');

module.exports = async (req, res) => {
    updateProduct(data => {
        res.status(200).send({product: data})
    }, req.body)
}