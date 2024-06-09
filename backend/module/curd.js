

const mongoose = require('mongoose')

const curdCompany = new mongoose.Schema({
    name:{type:String},
    address:{type:String},
    email:{type:String},
    phone:{type:Number}
})

const curdCompanyModel = mongoose.model('users',curdCompany)
module.exports = curdCompanyModel