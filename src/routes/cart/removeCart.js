const { removeCart } = require('../../core/carts');

module.exports = async (req, res) => {
    removeCart(()=>{
        res.status(201).send({message: 'Deleted'})
    }, req.body)
}