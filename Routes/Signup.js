import express from "express";
import bcrypt from "bcrypt";
import {userModelPwd} from "../Database/models.js";

const signupRouter = express.Router();


//api for registering/creating a user


signupRouter.post("/",async(req,res)=>{
    const {body}=req;
    const {email} =body;
    try{
        const existingUser= await userModelPwd.findOne({email:email});
        if (existingUser) {
            res.status(409).send({ msg: "User already exists" });
            return;
        }

        //body before encryption
        const objectBody={
            ...body,
            userId:Date.now().toString(),
        }
        const user = new userModelPwd(objectBody);
        await user.validate();

        //encrypting the password
        const hashedPassword = bcrypt.hashSync(body.password,10);
        await userModelPwd.create({...objectBody,password:hashedPassword});

        res.send({ msg: "User Created Successfully for registration",hashedPassword});

    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Error Occured while registering a user" });
    }
});


export default signupRouter;