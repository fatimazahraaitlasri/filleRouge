const express = require('express')
const Router = express.Router()
const { addOrder,getAllComande} = require('./CommandeController')
const {protectClient} =require('../Client/Middleware/ClientMiddleware')


Router.post('/addCommande',protectClient,addOrder)
Router.post('/getAllComande',protectClient,getAllComande)
// .post('/updateAmount/:idClient',protectClient,depo)
module.exports = Router