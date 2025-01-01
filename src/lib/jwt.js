const jwt = require("jsonwebtoken")
const {config} = require("../common/config/index")
class JWT {
    constructor(accKey, refKey, accTime, refTime){
        this.accKey = accKey
        this.refKey = refKey
        this.accTime = accTime
        this.refTime = refTime
    }


    generateAccToken(data){
        const token = {
            data,
            exp:Math.trunc(Date.now() / 1000) + 18000
        }
        
        return jwt.sign(token, this.accKey)
    }
    
    generateRefToken(data){
        const token = {
            data,
            exp:Math.trunc(Date.now() / 1000) + 72000
        }
        return jwt.sign(token, this.refKey)
    }

    verifyAccToken(token){
        const {data} = jwt.verify(token, this.accKey)
        console.log("data token : ",data);
        return data
    }

    verifyRefToken(token){
        const {data} = jwt.verify(token, this.refKey)
        return data
    }
}


const jwtInstance = new JWT(
    config.SECRET_ACC_KEY,
    config.SECRET_REF_KEY,
    config.TOKEN_ACC_TIME,
    config.TOKEN_REF_TIME
)

module.exports = {jwtInstance}