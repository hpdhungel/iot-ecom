const { checkout } = require('../../core/transaction');

module.exports = async (req, res) => {
    checkout(data => {
        res.status(201).send({id: data})
    }, req.body)
}