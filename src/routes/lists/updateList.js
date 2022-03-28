const { updateList } = require('../../core/lists');

module.exports = async (req, res) => {
    updateList(data => {
        res.status(201).send({user: data})
    }, req.body)
}