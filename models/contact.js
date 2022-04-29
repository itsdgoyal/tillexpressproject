const mongoose = require('mongoose')

const contactschema = mongoose.Schema({
    email:String,
    query:String,
    status:String,
    posteddate:Date
})

module.exports = mongoose.model('contact',contactschema)