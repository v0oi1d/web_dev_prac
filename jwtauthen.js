const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = '123456';

const app = express();

app.use(express.json());

const ALLuSers = [
    {
        username: "anishkarar4@gmail.com",
        password: "123",
        name: "ANISH KARAR",
    },
    {
        username: "KLULLU@gmail.com",
        password: "123dfd3",
        name: "AVANEESH KULLU",
    },
    {
        username: "anshkarar4@gmail.com",
        password: "1234645",
        name: "ANSH RASTOGI",
    }
];

function exisUser(username , password){
let exists = false;
for(i=0;i<ALLuSers.length;i++){
    if(username == ALLuSers[i].username && password == ALLuSers[i].password){
        exists = true;
    }
    
}
return exists;
}

app.post('/signi',(req,res)=>{
const user = req.body.username;
const pass = req.body.password;

if(exisUser(user,pass) == false){
    return res.status(403).json({
        msg : "Username or password does not match",
    });
}else{
    var token = jwt.sign({username : user}, jwtPassword);
    return res.json({
    token,
});
}


});

app.get('/users',(req,res)=>{
    const token = req.headers.authorization;
    console.log(token);
    try{
     const decode = jwt.verify(token, jwtPassword);
     try{
        console.log(decode);
     }catch(err){
        res.status(403).json({
            msg: "Console of decode failed"
        });
     }
     try{
        console.log("before initialization");
        const userNig = decode.username;
        console.log(userNig)
        console.log("After initialization");
        res.send({
            users: ALLuSers.filter(function(value){
                console.log("Inside res send before if");
               if(value.username == userNig){
                console.log("inside if block");
                return false;
               } else{
                console.log("inside else block");
                return true;
               }
            })
         });
     }catch(err){
        res.status(403).json({
            msg: "Username was not passed for token creation"
        })
     }
    
     
    }
    catch(err){
     res.status(403).json({
        msg: "invalid token",
     });
    }
    
})

app.listen(3000);