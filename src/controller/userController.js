require('dotenv').config()
const generatorToken = require('../helper/generatorToken')
const userService = require('../services/userService')
const jwt = require('jsonwebtoken')
module.exports = {
    getAllUser: async (req, res) => {
        try {
            const data = await userService.findAllUser()
            res.status(200).json({
                message: 'đã truy cập thành công !',
                data
            })

        } catch (error) {
            res.status(500).json({
                message: 'server err',
                error

            })
        }
    },

    resgister: async (req, res) => {
        try {
            const body = req.body

            // check email
            const userExist = await userService.findAUser(body.email)
            if (userExist) {
                return res.status(400).json({
                    message: 'Email đã tồi tại',
                })
            }

            //check role nhập từ phía clinet !
            if (body.admin != "1" && body.admin != "0") {
                return res.status(400).json({
                    message: 'chỉ được nhập trường admin 0 hoặc 1 !'
                })
            }

            //tạo User 
            const data = await userService.createUser(body)

            //loại bỏ trường password ra data !
            const findData = await userService.findAUser(data.email)
            const newUser = {}
            for (let i in findData) {
                if (i !== "password") {
                    newUser[i] = findData[i]
                }
            }

            // accessToken
            const accessToken = generatorToken(newUser, process.env.JWT_SECRETKEY, '30s')
            const refreshToken = generatorToken(newUser, process.env.JWT_REFRESHTOKEN, '365d')

            res.json({
                message: 'đã đăng ký thành công !',
                data: newUser,
                accessToken,
                refreshToken
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'server err',
                error

            })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const emailUser = await userService.findAUser(email)
            if (emailUser === null) {
                return res.status(404).json({
                    message: 'ko tìm thấy email này'
                })
            }

            const data = await userService.authPasword(emailUser, password)
            if (!data) {
                return res.status(404).json({
                    message: 'bạn nhập sai password ! '
                })
            }

            const newUser = {}
            for (let i in emailUser) {
                if (i !== "password") {
                    newUser[i] = emailUser[i]
                }
            }
            const accessToken = generatorToken(newUser, process.env.JWT_SECRETKEY, '30s')
            const refreshToken = generatorToken(newUser, process.env.JWT_REFRESHTOKEN, '365d')


            res.status(200).json({
                message: 'Bạn đã đăng nhập thành công !',
                accessToken,
                refreshToken
            })


        } catch (error) {
            res.status(500).json({
                message: 'server err',
                error

            })
        }
    },

    deleteAUser: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(404).json({
                    message: 'bạn chưa chuyền id !'
                })
            }
            await userService.deleteOneUser(req.params.id)
            res.json({
                message: 'đã xoá thành công !'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'server err',
                error
            })
        }
    },

    upLoadSingleImg: (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                message: 'Ko gửi được ảnh !',    
            })
        }
        res.status(200).json({
            message: 'Đã tải ảnh thành công !',
            data: req.file.filename
        })
    },

    upLoadMutiImg: (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: 'Ko gửi được ảnh !',
            })
        }
        const data = req.files.map((el)=>{
            return el.filename
        })

        res.status(200).json({
            message: 'Đã tải ảnh thành công !',
            data
        })
    }

}