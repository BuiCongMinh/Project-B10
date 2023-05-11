const User = require('../models/User')
const bcryptjs = require('bcryptjs')
module.exports = {
    findAllUser: async () => {
        const data = await User.find()
        return data
    },

    createUser: async (body) => {
        const { email, password, username, admin } = body
        const salt = bcryptjs.genSaltSync(10);
        const passWordHasalt = bcryptjs.hashSync(password, salt);
        const data = await User.create({ email, password: passWordHasalt, username, admin })
        return data
    },

    findAUser: async (email) => {
        const data = await User.findOne({ email: email }).lean()
        return data
    },

    authPasword: async (emailUser, password) => {

        const result = await bcryptjs.compare(password, emailUser.password)
        return result
    },

    deleteOneUser: async (id)=>{
        const result =  await User.deleteById(id)
        return result
    }

}

