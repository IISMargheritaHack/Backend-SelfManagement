import express from 'express'
import User from '../models/User.js'
const router = express.Router();
import jwt from 'jsonwebtoken'

import {verifyToken} from '../verifyToken.js'

//login user
router.post("/login", async (req,res) => {
    const {name, email} = req.body
    try {

        let user = await User.find({name: name})

        if(user.length < 1){
            user = await User.create({name, email})
        } else {
            user = user[0]
        }
        
        const token = jwt.sign({
            data: name
        }, process.env.SECRET, { expiresIn: '30d' });


        res.status(200).json({user, token})
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
})


//verify token
router.post("/verify", verifyToken)

export default router;