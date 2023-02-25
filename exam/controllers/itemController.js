const { isUser } = require('../middleware/guards');
const { createItem, getAll, getById, updateById, deleteById, apply, } = require('../services/itemServices');
const mapErrors = require('../util/mappers');

const router = require('express').Router()

//CREATE
router.get('/create', isUser(), (req,res)=>{
    res.render('create', {title:'Create page'})
})
//
router.post('/create', isUser(), async (req,res)=>{

    const post={
        headline: req.body.headline,
        location: req.body.location,
        nameCom:req.body.nameCom,
        descriptionComp:req.body.descriptionComp,
        author:req.session.user._id,

    }
    try{
        await createItem(post)
        res.redirect('/catalog')
    }catch(err){
        console.error(err)
        const errors=mapErrors(err)
        res.render('create', {title:'Create',post, errors})
    }
})



//CATALOG
router.get('/catalog', async (req,res)=>{
    try{
       
         let posts = await getAll()
         res.render('all-ads', {title: 'Catalog', posts })
           
    }catch(err){
        console.error(err)
        const errors=mapErrors(err)
        res.render('home', {title:'Home page', errors})
    }
})

//DETAILS
router.get('/details/:id', async (req,res)=>{
    const id= req.params.id;
    const post = await getById(id)
  
  if(req.session.user){
        post.hasUser=true;
        if (req.session.user._id == post.author._id){
            post.isAuthor=true;
        }else{
           post.hasVoted = post.applied.find( v=> v._id == req.session.user._id) != undefined;
        }
        //TODO check votes
        if(post.applied.length >0){
            post.isApl=true
            post.list= post.applied.map( e => {e.email , e.description} )
        }
    }

    res.render('details', {title:post.title , post })
})

//EDIT
router.get('/edit/:id', isUser(),async (req,res)=>{
    const id= req.params.id;
    const post = await getById(id)

    if (req.session.user._id != post.author._id) {
        return res.redirect('/login')
    }
    res.render('edit', { title: 'Edit offer', post })
})


//
router.post('/edit/:id',  async (req,res)=>{
    const id = req.params.id
    const existing= await getById(id)
    if (req.session.user._id != existing.author._id){
        return res.redirect('/login')
     }
     const post = {
        headline: req.body.headline,
        location: req.body.location,
        nameCom: req.body.nameCom,
        descriptionComp: req.body.descriptionComp,
               
    }

    try{
        await updateById(id, post)
        res.redirect('/details/'+id)
    }catch(err){
        console.error(err)
        const errors=mapErrors(err)
        post._id=id
        res.render('edit', {title:'Edit Item', post, errors})
    }
})

//DELETE
router.get('/delete/:id',isUser(), async (req,res)=>{
    let id= req.params.id;
    let post= await getById(id)
    if (req.session.user._id != post.author._id){
        return res.redirect('/login')
     }
    await deleteById(id)
    res.redirect('/catalog')
})




router.get('/apply/:id', isUser(), async (req,res)=>{
    let id= req.params.id
    try{
       await apply(id, req.session.user._id)
      
    }catch(err){
        console.error(err)
        const errors = mapErrors(err);
        
    }finally{
        res.redirect('/details/'+id)
    }
   
})

/*router.get('/search', async (req,res)=>{
    let posts= await search(req.query)
    res.render('search', {title:'Search', posts , query: req.query})
})*/


module.exports=router;










