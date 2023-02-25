const {  getAllByDate } = require("../services/itemServices")
const mapErrors = require("../util/mappers")
let router = require('express').Router()

router.get('/', async (req, res)=>{
  
    
   try{
        let posts= await getAllByDate()
        res.render('home', {title:'Home Page', posts})

    }catch(err){
        console.error(err)
        let errors=mapErrors(err)
        res.render('home', {title:'Home Page',  errors })
    }
})


module.exports=router
