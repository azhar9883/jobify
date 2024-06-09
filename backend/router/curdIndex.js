const express = require('express')
const {companyGetData,companyFormData,curdDelete,curdUpdate}  = require('./../controller/curdController')
const route = express.Router()
route.get('/apiData',companyGetData)
route.post('/apiCurd',companyFormData)
route.delete('/apiDelete/:id',curdDelete)
route.put('/apiUpdate/:id',curdUpdate)
module.exports = route