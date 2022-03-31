const { createList } = require('../../core/lists');

module.exports = async (req, res) => {
    createList(data => {
        res.status(201).send({user: data})
    }, req.body)
}