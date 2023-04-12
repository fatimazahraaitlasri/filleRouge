const express = require('express')
const Router = express.Router()
const { registerClient , loginCLient} = require('../Controller/ClientController')
// const {protectClient} =require('../Middleware/ClientMiddleware')


Router.post('/Register',registerClient).post('/login',loginCLient)
// .post('/updateAmount/:idClient',protectClient,depo)
module.exports = Router