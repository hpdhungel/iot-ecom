const { editQuantity } = require('../../core/carts');

module.exports = async (req, res) => {
    editQuantity(data => {
        res.status(201).send({data})
    }, req.body)
}
