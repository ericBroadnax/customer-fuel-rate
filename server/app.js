const dotenv = require('dotenv');
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
//const multer = require("multer");
//const bodyParser = require("body-parser");

const app = express();

//configure env file and require connection
dotenv.config({path : './config.env'});
require('./db/conn');

const port = process.env.PORT;
//console.log(port);

const Users = require('./models/userSchema');

//used to get data from cookies and frontend
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieparser());

app.get('/', (req, res)=>{
    res.send("Hello");
})





//registration
app.post('/register', async (req, res)=>{
    try{
        //get data
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const createUser = new Users({
            username : username,
            email : email,
            password : password
        });

        const created = await createUser.save();
       // const user = await users.findOne({username : username});
        console.log(created);
        res.status(200).send("Registered");
       /* if(user){
            const isMatch = await bcryptjs.compare(password, user.password);
            if(isMatch){
                res.status(200).send("Logged in");
            }else{
                res.status(400).send("Invalid credentials");
            }
        }else{
            res.status(400).send("Invalid credentials");

        }*/
    }catch(error){
        res.status(400).send(error);
    }

})

//login
app.post('/login', async (req, res)=>{
    try{
        //get data
        const username = req.body.username;
        const password = req.body.password;
        //if user exists
        const user = await Users.findOne({username : username});

       if(user){
            const isMatch = await bcryptjs.compare(password, user.password);
            if(isMatch){
                const token = await user.generateToken();
                res.cookie("jwt", token, {
                    expires : new Date(Date.now() + 86400000),
                    httpOnly : true
                })
                res.status(200).send("Logged in");
            }else{
                res.status(400).send("Invalid credentials");
            }
        }else{
            res.status(400).send("Invalid credentials");

        }
    }catch(error){
        res.status(400).send(error);
    }

})

//run server
app.listen(port, ()=>{
    console.log("Server is listening")
})

