const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
   
    name:{
        type:String,
        required:[true,"Please add a email field"],
        unique:true 
    },
    description:{
        type:String,
        required:[true,"Please add a password field"]
    },
    price:{
        type:String,
        required:[true,"Please add a password field"]
    },
  
    testImage:{
        data:Buffer,
        contentType:String,
        
    },
    category:{
        type:String,
        required:[true,"Please add a password field"]
    },
    
})
module.exports = mongoose.model("Product",productSchema)