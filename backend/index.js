const express=require("express");
const cookieParser = require('cookie-parser');
const {connectToMongoDB}=require("../backend/models/connection.js")
const {userSignup,userLogin,isProtected}=require("../backend/controllers/userControllers.js")
require("dotenv").config()
const app=express();
const path=require("path");
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
connectToMongoDB();
app.get('/home',isProtected,(req,res)=>{
   res.sendFile(path.join(__dirname,"/public/home.html"));
})
app.get('/user-Login',(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/userLogin.html"));
})
app.get('/user-Signup',(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/userSignup.html"));
})
app.post('/userLogin',userLogin);
app.post('/userSignup',userSignup)
app.listen(process.env.PORT,()=>{
    console.log(`server is listening at port ${process.env.PORT}`);
})

