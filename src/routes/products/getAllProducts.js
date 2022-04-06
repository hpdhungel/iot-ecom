const { getAllProducts } = require('../../core/products');

module.exports = async (req, res) => {
    getAllProducts(data => {
        res.status(201).send({product: data})
    }, req.body)
}
