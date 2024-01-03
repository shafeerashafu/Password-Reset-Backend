import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kit.23.19bec102@gmail.com",
      pass: process.env.MAIL_PASSKEY || "",
    },
});

const mailOptions = {
    from: "kit.23.19bec102@gmail.com",
    to: "shafeerazahur3@gmail.com",
    subject: "Email Testing for B49WEENG",
    text: "Was it Easy or Tough",
};

export {transporter,mailOptions};

