const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:String,
    password:String,
    orders:[],
    cart:[]
})

const userModel = mongoose.model("users",userSchema)

module.exports={
    userModel
}