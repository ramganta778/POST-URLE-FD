let mongoose = require("mongoose");
let express = require("express");
let multer = require("multer");


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null,`${Date.now()}_${file.originalname}`);
    }
  })
  
  let upload = multer({ storage: storage })

let cors = require("cors");

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

let userSchema = new mongoose.Schema({

firstName : String,
lastName : String,
age : Number,
email :String,
password : String,
mobile : String,
profilePic:String,




});

let user = new mongoose.model("user",userSchema);

app.post("/register", upload.single("profilePic"), async (req,res) =>{


    console.log(req.file);
    console.log(req.body);

    try{

        let newUser = await new user({

            firstName : req.body.firstName,
            lastName : req.body.lastName,
            age : req.body.age,
            email : req.body.email,
            password : req.body.password,
            mobile : req.body.mobile,
            profilePic : req.file.path,
          
          
          
          });
        await  user.insertMany([newUser]);
    res.json({status: "Success", msg:"User Created Successfully"})          

    }catch(err){
    res.json({status:"failure",msg:"Unable to create user",err:err});
    }

console.log("recieved request from client");


console.log(req.body);

// res.json(["user created successfully"]);



})

app.listen(9441,()=>{

    console.log("Port Number Is Ready");
});




let connectToMDB = async() =>{

try{

   await mongoose.connect("mongodb://localhost:27017/registerForm");

   console.log("Connected to MDB Successfully");



}catch(err){
    console.log("Unable to connect to MDB");
}
};


connectToMDB();
