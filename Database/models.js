import mongoose from "mongoose";
const usersSchema=new mongoose.Schema({
    userId: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
      email: {
        type: "string",
        required: true,
      },
      dob: {
        type: "string",
        required: true,
      },
      imageUrl: {
        type: "string",
        required: true,
      },
      password: {
        type: "string",
        required: true,
      },
      
});

const userModelPwd=new mongoose.model("users",usersSchema,"userschemaPwd");

export {userModelPwd};



// u8KUtoA82noiOkGT


//  mongodb+srv://shafeerazahur3:<password>@cluster0.q9qxwbe.mongodb.net/?retryWrites=true&w=majority