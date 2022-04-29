//models store database as table
const mongoose = require('mongoose')

const adminschema = mongoose.Schema({
    username:String,
    password: String
})

module.exports = mongoose.model('admin',adminschema)
