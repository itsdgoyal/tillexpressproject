const express = require('express')
const app = express()
const pagerouter = require('./router/pages')
const adminrouter = require('./router/admin')
const mongoose = require('mongoose')
app.use(express.urlencoded({extended:false}))

const session = require('express-session')
const mongodbsession = require('connect-mongodb-session')(session)



dburl='mongodb://127.0.0.1:27017/tillexpressproject'
mongoose.connect(dburl,()=>{
    console.log('connected to database tillexpressproject')
})

const store = new mongodbsession({
    uri: dburl,
    collection: 'mySessions'
})

app.use(session({
    secret: 'kanha',
    resave: false,
    saveUninitialized: false,
    store: store
}))


app.set('view engine','ejs')
app.use(express.static('public'))
app.use(pagerouter)
app.use('/admin',adminrouter)




app.listen(5000,(req,res)=>{
    console.log('server is running on port 5000')
})




//npm install express-session
//npm install connect-mongodb-session