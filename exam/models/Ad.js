const { Schema, model, Types: {ObjectId}} = require('mongoose')

const URL_PATTERN= /^https?:\/\/(.+)/;

const adSchema=new Schema({
   headline:{type:String, required:true, minlength:[4,'Headline must be at least 4 characters long']},
   location:{type:String, required:true,minlength:[8,'Location must be at least 8 characters long']},
   nameCom:{type:String, required:true, minlength:[3,'Company name  must be at least 3 characters long']},
   descriptionComp:{type:String, required:true , maxlength:[40, 'The Company description should be a maximum of 40 characters long' ]},
   author:{type: ObjectId, required:true, ref:'User'},
    applied:{type: [ObjectId], ref:'User', default:[]}

})

const Ad= model('Ad', adSchema)

module.exports=Ad