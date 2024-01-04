import express from "express";
import signupRouter from "./Routes/Signup.js";
import loginRouter from "./Routes/Login.js";
import connectToDb from "./Database/mongooseconnection.js";
import cors from "cors";
import forgotpwdRouter from "./Routes/Forgotpwd.js";
//import resetpwdRouter from "./Routes/Resetpwd.js";
import { userModelPwd } from "./Database/models.js";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

const server = express();
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: false }));

// await in the top-level / global scope is allowed
await connectToDb();

// middleware to process the body of the request
server.use(express.json()); // used to parse the body of the request

server.use(cors());//middleware used to make the api cors (cross-origin resource sharing) compatible
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: false }));

server.use("/api/signup",signupRouter);
server.use("/api/login",loginRouter);
server.use("/api/forgotpwd",forgotpwdRouter);
//server.use("/api/resetpwd",resetpwdRouter);

const port = 3000;

server.listen(port, () => {
  console.log("listening on port " + port);
});


server.get("/api/resetpwd/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await userModelPwd.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("resetUI", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

server.post('/api/resetpwd/:id/:token',async(req,res)=>{
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
          res.render("resetUI", { email: verify.email, status: "verified" });

      }
  })
});
