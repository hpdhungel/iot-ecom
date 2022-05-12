const { createNewProduct } = require('../../core/products');

module.exports = async (req, res) => {
    createNewProduct(data => {
        res.status(201).send({product: data})
    }, req.body)
}