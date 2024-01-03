import express from "express";
import {userModelPwd} from "../Database/models.js";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";


const resetpwdRouter=express.Router();

resetpwdRouter.post('/:id/:token',async(req,res)=>{
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, process.env.JWT_SECRET || "", async (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            //await userModelPwd.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
            await userModelPwd.updateOne(
                {
                    _id: id,
                },
                { $set: {
                    password: hashedPassword
                }}
            )
            res.send({ msg: "Password Changed Successfully", password });
        }
    })
});

export default resetpwdRouter;