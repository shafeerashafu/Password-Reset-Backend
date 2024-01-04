import express from "express";
import {userModelPwd} from "../Database/models.js";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

const resetpwdRouter=express.Router();

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";



resetpwdRouter.get("/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await userModelPwd.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    console.log(secret)
    try {
      const verify=jwt.verify(token, secret);
      console.log("token while verifying",verify)
      res.send("Verified");
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  });

resetpwdRouter.post('/:id/:token',async(req,res)=>{
    const {id, token} = req.params
    const {password} = req.body
    const oldUser = await userModelPwd.findOne({ _id: id });
    if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try{
    const verify=jwt.verify(token, secret);
    const hashedPassword = bcrypt.hashSync(password, 10);
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
    catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
    }
});

export default resetpwdRouter;