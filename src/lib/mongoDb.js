const mongoose = require("mongoose")
const {config} = require("../common/config/index")

function mongoDb(){
    return mongoose.connect(config.URL).then(()=>{
        console.log("mongoDb connected");
    }).catch((error)=>{
        console.log("error : ", error);
    })
}

module.exports = {mongoDb}