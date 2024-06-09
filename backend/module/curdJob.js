

const mongoose = require('mongoose')

const curdCompanyJob = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    company:{type:String},
    location:{type:String},
    salary:{type:Number}
})

const curdCompanyModelJob = mongoose.model('userJob',curdCompanyJob)
module.exports = curdCompanyModelJob