const router = require('express').Router()
const Banner = require('../models/banner')
const About = require('../models/about')
const Contact = require('../models/contact')
const Reg = require('../models/reg') 
const reg = require('../models/reg')
const { redirect } = require('express/lib/response')

router.get('/',async(req,res)=>{
    const bannerdata = await Banner.findOne()
    const aboutrecord = await About.findOne()
    res.render('index.ejs',{bannerdata:bannerdata,aboutrecord:aboutrecord})
})
router.get('/banner',async(req,res)=>{
    const bannerdata = await Banner.findOne()
    res.render('banner.ejs',{bannerdata:bannerdata})
})
router.get('/about',async(req,res)=>{
    const aboutrecord = await About.findOne()
    res.render('about.ejs',{aboutrecord:aboutrecord})
    
})
router.get('/adminabout',async(req,res)=>{
    const aboutrecord = await About.findOne()
    res.render('admin/about.ejs',{aboutrecord:aboutrecord})
    
})
router.get('/contactformdetails',async(req,res)=>{
    res.render('admin/contactform.ejs')
})



router.post('/contact',async(req,res)=>{
    //console.log(req.body)
    const email = req.body.email
    const query = req.body.query
    const status = 'unread'
    const posteddate = new Date()
    const contactRecord = new Contact({email:email,query:query,status:status,posteddate:posteddate})
    await contactRecord.save()
    res.redirect('/')
})
router.get('/reg',(req,res)=>{
    res.render('registration.ejs')
})
router.post('/reg',async(req,res)=>{
    //console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email 
    const status = 'inactive'   
    const regrecord = new Reg({username:username,password:password,email:email,status:status})
    await regrecord.save()
    res.redirect('/')
})
router.get('/login',(req,res)=>{
    res.render('login.ejs')
})
router.post('/loginCheck',async(req,res)=>{
    const username =req.body.username
    const password =req.body.password
   const regData= await Reg.findOne({username:username})
   if(regData !== null){
       if(regData.password ==password ){
           if(regData.status =='active'){
               res.redirect('/')
           }else{
               console.log("your account is suspended")
           }
           
       }else{
           res.redirect('/login')
       }
      
   }else{
       res.redirect('/login')
   }
   
   
   })
   

module.exports = router;