const express = require('express')
const Router = express.Router()
const multer = require("multer")

const { registerAdmin , loginAdmin , AddProduct ,UpdateProduct,deleteProduct,getAllProduct,getProductById} = require('../Controller/AdminController')
const {protectAdmin} =require('../Middleware/AdminMiddleware')

const Storege = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null , 'uploads')
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer ({storage:Storege})
Router.post('/Register',registerAdmin).post('/login',loginAdmin).post('/AddProduct',upload.single('testImage'),AddProduct).put('/UpdateProduct/:_id',upload.single('testImage'),UpdateProduct).delete('/deleteProduct/:_id',deleteProduct).get('/AllProduct',getAllProduct).get('/ProductByID/:_id',getProductById)
// .post('/updateAmount/:idClient',protectAdminClient,depo)
module.exports = Router 