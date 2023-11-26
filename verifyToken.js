import  jwt  from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
    const {token} = req.body
    if(!token) return res.statis(401).json('You are not authenticated');

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.status(403).json("token not valid")

        return res.status(200).json("token valid")

    })
}