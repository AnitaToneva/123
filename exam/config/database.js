const mongoose = require('mongoose');
require('../models/User');
require('../models/Ad');
//TODO change database

//TODO change database
dbName = 'ad'
//const connectionString = `mongodb://localhost:27017/${dbName}`;
const connectionString = `mongodb://127.0.0.1/${dbName}`;




module.exports = async (app) => {
    try {
        mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            //autoIndex: false,
        });
        console.log('Database connected')

       mongoose.connection.on('error', (err)=>{
             console.error('Database error');
             console.log(err)
         })


        } catch (err) {
        console.error('Error connecting to database');
        process.exit(1)
    }
}
    
