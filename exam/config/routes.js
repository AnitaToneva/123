const authController=require('../controllers/auth');
const itemController=require('../controllers/itemController')
const homeControlles=require('../controllers/homeController')

module.exports=(app)=>{
    app.use(authController)
    app.use(itemController)
    app.use(homeControlles)

    app.get('*', (req,res)=>{
        res.render('404', {title: 'Page not found'})
    })
}

