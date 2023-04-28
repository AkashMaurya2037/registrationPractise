const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./database/Connection");
const Register = require("./models/register")

const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "./templates/views");
const registerPartials = path.join(__dirname, "./templates/partials");

app.use(express.static(static_path));
app.use(express.urlencoded({extended:false}));

app.set("view engine", "hbs");
app.set("views", template_path);
// console.log(registerPartials)
hbs.registerPartials(registerPartials);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", async (req, res) => {
  try{
     res.render("login")
  }catch(err){
   res.status(400).send(err)
  } 
 });
 

app.post("/register", async (req, res) => {
 try{
    // const password = req.body.password
    if(req.body.password && req.body.name ){
        const registerEmployee = new Register({
          email:req.body.email,
          name:req.body.name,
          password:req.body.password,
          gender:req.body.gender,
        })
        const registered = await registerEmployee.save()
        res.status(201).render("index")
    }else{
      console.log("Please Enter the password")
    }
 }catch(err){
  res.status(400).send(err)
 } 
});

app.post("/login", async (req, res) => {
  try{
     const email = req.body.email
     const password = req.body.password
     
     const userEmail = await Register.findOne({email:email})
     
     console.log(userEmail)
     res.send(userEmail)
  }catch(err){
   res.status(400).send(err)
  } 
 });
 

app.listen(port, () => {
  console.log(`Server is running at port no. ${port}`);
});