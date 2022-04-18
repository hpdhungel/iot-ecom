const { getAllFromOrder } = require('../../core/transaction');

module.exports = async (req, res) => {
    getAllFromOrder(data => {
        res.status(200).send(data)
    }, req.params['userId']);
}

