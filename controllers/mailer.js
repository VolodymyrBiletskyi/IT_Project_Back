//
require("dotenv").config();
const nodemailer = require("nodemailer");
const sendgrid = require ("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})



module.exports = transporter;
