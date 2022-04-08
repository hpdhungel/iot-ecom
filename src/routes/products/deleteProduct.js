const { deleteProduct } = require('../../core/products');

module.exports = async (req, res) => {
    deleteProduct(()=>{
        res.status(201)
    }, req.body)
}