
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return console.log( 'null erroo')
  
    jwt.verify(token, process.env.JWT_KEY, (err) => {
      console.log(err)
  
      if (err) console.log(err)
      next()
    })
  }


module.exports = {
   authenticateToken
}
