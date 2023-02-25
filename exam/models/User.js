const { Schema, model, Types:{ ObjectId}} = require('mongoose')


const EMAIL_PATERN=/^([a-z]+)@([a-z]+)\.([a-z]+)$/

//TODO change user model 
const userSchema= new Schema({
    email: {type: String, required: [true, 'Email is required'], validate: {
        validator(value){
            return EMAIL_PATERN.test(value)
        },
        message: 'Email must be valid and may contain only english letters'
    }},
    hashedPassword: {type: String, required: true},
    desctiption:{type:String, required:true , maxlength:[40,'The description cannot be longer than 40 characters']},
    myAds: {type: [ObjectId], ref:'Ad', default:[]}
})

userSchema.index({ email: 1} , {
    unique: true,
    collation:{
        locale:'en',
        strength:2
    }
})

const User= model('User', userSchema)

module.exports = User