require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const nodemailer= require("nodemailer")
const app = express();
/////testingg
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render('home')
})

app.get("/login", function(req, res){
    res.render('login')
})


app.get("/about", function(req, res){
    res.render('about')
})

app.get("/contact", function(req, res){
    res.render('contact')
})

app.post("/contact", function(req, res){
    const contactInput = {
        firstName: req.body.txtName,
        email: req.body.txtEmail,
        phone: req.body.txtPhone,
        message: req.body.txtMsg
    }


    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth:{
            user: process.env.SECRETBUCKET,
            pass: process.env.SECRET
        }

    });

    const mailOptions ={
        from: contactInput.email,
        to: 'epokishishop@gmail.com',
        subject: contactInput.firstName,
        text: contactInput.message  + " Phone contact: " + contactInput.phone
    }

    transporter.sendMail(mailOptions, function(error, info ){
        if(error){
            console.log(error)
        }
        else{
            console.log('Email sent: ' + info.response)
        }
    })
})

// const transporter = nodemailer.createTransport({
//     service: 'outlook',
//     auth:{
//         user: 'stevesg@outlook.com',
//         pass: 'ryuujinbahamut26@'
//     }

// });

// const mailOptions ={
//     from: 'stevesg@outlook.com',
//     to: 'ryumarukurozaki@gmail.com',
//     subject: "TEST",
//     text: `testing HELP`
// }

// transporter.sendMail(mailOptions, function(error, info ){
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log('Email sent: ' + info.response)
//     }
// })



app.listen(3000, function(){
    console.log("Server started on port 3000")
})

    // "netlify-cli": "14.1.0",
    // "netlify-lambda": "2.0.16"