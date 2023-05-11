const jwt = require('jsonwebtoken')

module.exports = generatorToken = (newUser, SECRETKEY, expiresIn) => {
    return jwt.sign(newUser, SECRETKEY, { expiresIn })
}
