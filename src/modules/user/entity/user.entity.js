const { required } = require("joi")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName : {type:String, required:true},
    phone : {type:String, required:true},
    password : {type:String, required:true},
})

const UserModel = mongoose.model("User", userSchema, "users")

module.exports = {UserModel}