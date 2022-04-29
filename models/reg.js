const mongoose = require('mongoose')
const regschema = mongoose.Schema({
    username:String,
    password:String,
    email:String,
    status:String
})
module.exports = mongoose.model('reg',regschema)