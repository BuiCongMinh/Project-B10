const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization
        if (!token) {
            res.status(401).json({
                message: 'bạn chưa được xác thực ! '
            })
        }
        else {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_SECRETKEY, (err, user) => {
                if (err) {
                    res.status(403).json({
                        message: 'token ko còn giá trị nữa !'
                    });
                } else {
                    req.User = user
                    next();
                }
            });
        }
    },
    verifyTokenAdmin: (req, res, next) => {
        const token = req.headers.authorization
        if (!token) {
            res.status(401).json({
                message: 'bạn chưa được xác thực ! '
            })
        }
        else {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_SECRETKEY, (err, user) => {
                if (err) {
                    res.status(403).json({
                        message: 'token ko còn giá trị nữa !'
                    });
                } else {
                    if(user.admin=== '1'){
                        req.User = user
                        next();
                    }else{
                        res.status(401).json({
                            message: 'bạn ko phải là admin'
                        })
                    }
                        
                }
            });
        }
    }

}
