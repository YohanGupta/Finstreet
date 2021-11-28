const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    user_email : {
        type : String, 
        unique : true, 
        required : true
    },
    user_image : {
        type : String, 
        required : true
    },
    total_orders : {
        type : Number, 
        default : 0
    }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)