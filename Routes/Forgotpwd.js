import express from "express";
import {userModelPwd} from "../Database/models.js";
import jwt  from "jsonwebtoken";
import  {transporter,mailOptions} from "./Mail.js";
// import  dotenv  from "dotenv";
// dotenv.config(); //It loads the varible from .env file into process.env
const forgotpwdRouter = express.Router();
const feUrl="https://dapper-boba-1da3fd.netlify.app" 
//const feUrl="http://localhost:5174";
//const feUrl = process.env.frontendUrl || "";


//api for creating a forgot password

forgotpwdRouter.post("/",async(req,res)=>{
    const {email} = req.body;
    try{
       const existingUser = await userModelPwd.findOne({email: email});
       if (!existingUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET || "", 
      {
        expiresIn: "1h"
      })
      await transporter.sendMail({
        ...mailOptions,
        to: email,
        subject: 'Reset Password Link',
        text: `Hi, 
        This is your link for resetting the password,
        ${feUrl}/resetpwd/${existingUser._id}/${token}`,
      });
      res.send({ msg: "Mail sent successfully", code: 1});

    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Error Occured" });
    }

});

export default forgotpwdRouter;

