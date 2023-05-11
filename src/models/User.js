const mongoose = require('mongoose')
const mogoose_delete = require('mongoose-delete')

const { Schema } = mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    username: {
        type: String,
        maxlength: 50,
        minlength: 6,
        required: true
    },
    rePassword: String,
    admin: {
        type: String,
        default: '0'  // 1 là admin 0 là user
    }

}, { collection: 'user', timestamps: true })

UserSchema.plugin(mogoose_delete,{overrideMethods:'all'})

const User = mongoose.model('user', UserSchema)

module.exports = User
