const express = require('express')
const {companyGetDataJob,companyFormDataJob,curdDeleteJob,curdUpdateJob}  = require('./../controller/curdControllerJob')
const route1 = express.Router()
route1.get('/apiDataJob',companyGetDataJob)
route1.post('/apiCurdJob',companyFormDataJob)
route1.delete('/apiDeleteJob/:id',curdDeleteJob)
route1.put('/apiUpdateJob/:id',curdUpdateJob)
module.exports = route1