const mongoose = require('mongoose')

const aboutschema = mongoose.Schema({
    title:String,
    sdesc:String,
    desc:String
})
module.exports = mongoose.model('about',aboutschema)