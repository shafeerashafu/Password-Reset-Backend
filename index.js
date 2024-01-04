import express from "express";
import signupRouter from "./Routes/Signup.js";
import loginRouter from "./Routes/Login.js";
import connectToDb from "./Database/mongooseconnection.js";
import cors from "cors";
import forgotpwdRouter from "./Routes/Forgotpwd.js";
import resetpwdRouter from "./Routes/Resetpwd.js";
const server = express();

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
server.use("/api/resetpwd",resetpwdRouter);

const port = 3000;

server.listen(port, () => {
  console.log("listening on port " + port);
});



