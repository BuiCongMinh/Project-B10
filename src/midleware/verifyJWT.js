const jwt = require('jsonwebtoken')
const generatorToken = require('../helper/generatorToken')
module.exports = {
    verifyRefreshToken: (req, res, next) => {
        const token = req.headers.authorization
        if (!token) {
            res.status(401).json({
                message: 'bạn chưa được xác thực ! '
            })
        }
        else {
            const refreshToken = token.split(" ")[1]
            jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN, (err, user) => {
                if (err) {
                    res.status(403).json({
                        message: 'token ko còn giá trị nữa !'
                    });

                } else {
                    
                    delete user.iat
                    delete user.exp
                    const accessToken = generatorToken(user, process.env.JWT_SECRETKEY, '30s')
                    const refreshToken = generatorToken(user, process.env.JWT_REFRESHTOKEN, '365d')

                    res.json({
                        message: 'đã refresh token thành công !',
                        accessToken,
                        refreshToken
                    })

                }
            });
        }
    }
}

