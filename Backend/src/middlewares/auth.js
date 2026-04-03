import jwt from "jsonwebtoken"

const userAuth = async (req , res , next) => {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            success: false,
            message : "token not provided"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(400)
        .json({
            success : false,
            message : "invalid token"
        })
    }
}


export default userAuth