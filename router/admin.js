const router = require('express').Router()
const Admin = require('../models/admin') //model table page
const session = require('express-session');

const Banner = require('../models/banner');
const res = require('express/lib/response');

const About = require('../models/about')
const Contact = require('../models/contact')
const Reg = require('../models/reg')

const auth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/admin/')
    }
}

router.get('/', (req, res) => {
    res.render('admin/login.ejs')
})
router.get('/dashboard',async(req,res)=>{
    const bannerRecord = await Banner.findOne()
    res.render('admin/dashboard', {bannerRecord: bannerRecord})
})

router.post('/dashboard', auth, async (req, res) => {
    const bannerRecord = await Banner.findOne()
    res.render('admin/dashboard', {bannerRecord: bannerRecord})
    const title= 'About'
    const sdesc= 'hello'
    const desc= 'welcome to banner section'
    const banner = new Banner({title:title,sdesc:sdesc,desc:desc})
    await banner.save()
})

router.post('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/admin/')
})

router.post('/', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const admin = await Admin.findOne({ username: username })
    if (admin != null) {
        if (admin.password == password) {
            req.session.isAuth = true;
            res.redirect('/admin/dashboard/')
        } else {
            res.redirect('/admin/')
        }
    }
    else {
        res.redirect('/admin/')
    }
})

//router.get('/banner',async(req,res)=>{
// res.send('hi')

//const title= 'Banner'
//const sdesc= 'hello'
//const desc= 'welcome to banner section'
//const banner = new Banner({title:title,sdesc:sdesc,desc:desc})
//await banner.save()
//})

router.post('/bannerupdate',async(req,res)=>{
    const bannerdata = await Banner.findOne()
    res.render('admin/bannerupdate.ejs',{bannerdata:bannerdata})
})
router.post('/bannerupdaterecords/:id',async (req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const sdesc = req.body.sdesc
    const desc = req.body.desc
    await Banner.findByIdAndUpdate(id,{title:title,sdesc:sdesc,desc:desc})
    res.redirect('/admin/dashboard')
    //console.log(id)

})

router.get('/adminabout',async(req,res)=>{
    const aboutrecord = await About.findOne()
    res.render('admin/about.ejs',{aboutrecord:aboutrecord})
})
router.get('/test',async(req,res)=>{
    const title = 'About'
    const sdesc = 'hello'
    const desc = 'welcome to about section'
    const about = new About({title:title,sdesc:sdesc,desc:desc})
    await about.save()
})
router.get('/aboutupdate/:id',async(req,res)=>{
    const id = req.params.id
    const aboutupdate = await About.findById(id)
    res.render('admin/aboutupdate.ejs',{aboutupdate:aboutupdate})
})
router.post('/aboutupdaterecords/:id',async(req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const sdesc = req.body.sdesc
    const desc = req.body.desc
    await About.findByIdAndUpdate(id,{title:title,sdesc:sdesc,desc:desc})
    res.redirect('/admin/adminabout')
})
router.get('/contactformdetails',async(req,res)=>{
    const ContactRecord = await Contact.find().sort({postdate:-1})
    //console.log(ContactRecord)
    res.render('admin/contactform.ejs',{ContactRecord:ContactRecord})
    
})
router.post('/contactsearch',async(req,res)=>{
    //console.log(req.body)
    const searchparams = req.body.contactsearch
    const ContactRecord = await Contact.find({status:searchparams}).sort({postdate:-1})  
    res.render('admin/contactform.ejs',{ContactRecord:ContactRecord})
})
router.post('/contactstatusupdate/:id',async(req,res)=>{
    const id = req.params.id
    const contactupdate = await Contact.findById(id)
    const email = contactupdate.email
    const query = contactupdate.query
    const status = contactupdate.status
    let status1 = null
    if(status == 'read'){
        status1 = 'unread'
    }else{
        status1 = 'read'
    }
    //const status = 'read'
    await Contact.findByIdAndUpdate(id,{email:email,query:query,status:status1})
    res.redirect('/admin/contactformdetails')
})
router.get('/contactdelete/:id',async(req,res)=>{
    const id = req.params.id
    await Contact.findByIdAndDelete(id)
    res.redirect('/admin/contactformdetails')
})
router.get('/reg',async(req,res)=>{
    const regrecord = await Reg.find()
    res.render('admin/reg.ejs',{regrecord:regrecord})
})
router.post('/regstatusupdate/:id',async(req,res)=>{
    const id = req.params.id
    const regrecord = await Reg.findById(id)
    const username = regrecord.username
    const password = regrecord.password
    const email = regrecord.email
    let statuschange = null
    if(regrecord.status == 'inactive'){
        statuschange= 'active'
    }
    else{
        statuschange= 'inactive'
    }
    await Reg.findByIdAndUpdate(id,{username:username,password:password,email:email,status:statuschange})
    res.redirect('/admin/reg')
})


module.exports = router;