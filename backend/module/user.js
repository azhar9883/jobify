const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
   name:{type:String},
   email:{type:String},
   password:{type:String},
   role:{
    type:String,
    default:"visitor"
   }
})

const userModel = mongoose.model("admin",userSchema)
module.exports = userModel