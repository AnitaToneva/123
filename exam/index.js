const express = require('express');

const expressConfig= require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig=require('./config/routes');
//const homeController = require('./controllers/homeController');




start()
async function start(){
    const app=express();

   expressConfig(app)
   await databaseConfig(app)
   routesConfig(app)


  
 
    app.listen(5000, ()=> console.log('server running on port 5000'))
}




