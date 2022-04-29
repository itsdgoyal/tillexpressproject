const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    title: String,
    sdesc: String,
    desc: String 
})
module.exports = mongoose.model('banner',bannerSchema)