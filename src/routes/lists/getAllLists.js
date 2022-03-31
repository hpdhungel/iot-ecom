const { getAllLists } = require('../../core/lists');

module.exports = async (req, res) => {
    getAllLists(data => {
        res.status(201).send({user: data})
    }, req.body)
}