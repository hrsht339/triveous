const jwt = require("jsonwebtoken")

const authentication =(req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        try{
            const decoded = jwt.verify(token,"secret")
            if(decoded){
                req.body.id = decoded.id
                next()
            }
            else{
                res.status(401).send({
                    "msg":"login again"
                })
            }
        }
        catch(err){
            res.status(401).send({
                "msg":"login again",
                err
            })
        }
    }
    else{
        res.status(401).send({
            "msg":"login again"
        })
    }
}

module.exports={
    authentication
}