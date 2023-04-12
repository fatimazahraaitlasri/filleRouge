const mongoose = require('mongoose')
const clientSchema = mongoose.Schema({
   
    email:{
        type:String,
        required:[true,"Please add a email field"],
        unique:true 
    },
    password:{
        type:String,
        required:[true,"Please add a password field"]
    },
    
})
module.exports = mongoose.model("Client",clientSchema)