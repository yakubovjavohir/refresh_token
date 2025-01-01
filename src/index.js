const express = require("express")
const cors = require("cors")
const { config } = require("./common/config/index")
const {keySchema} = require("./common/schema/index")
const {validate} = require("./lib/validate")
validate(keySchema, config)
const {mongoDb} = require("./lib/mongoDb")
mongoDb()
const {router} = require("./modules/module.routes")






const app = express()
app.use(cors())
app.use(express.json())

app.use("/api", router)
app.use((err, req, res, next) => {
    console.log(err);
    
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal server error",
    });
});
 


app.listen(config.PORT, ()=>{
    console.log("http://localhost:", config.PORT);  
})