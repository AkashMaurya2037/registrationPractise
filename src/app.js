require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./database/Connection");
const Register = require("./models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const auth = require("./Middleware/auth")

const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "./templates/views");
const registerPartials = path.join(__dirname, "./templates/partials");

app.use(express.static(static_path));
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(registerPartials);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/cookie", auth ,(req, res)=>{
  console.log(`This is the cookie : ${req.cookies.jwt}`)
  res.render("cookie")
})

app.post("/register", async (req, res) => {
  try {
    // const password = req.body.password
    if (req.body.password && req.body.name) {
      const registerEmployee = new Register({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        gender: req.body.gender,
      });

      console.log("The success part" + registerEmployee);

      const token = await registerEmployee.generateAuthToken();
      console.log("The token part" + token);

      res.cookie("jwt", token, {
        httpOnly:true,
        expires: new Date(Date.now()+ 60000),
      });

      const registered = await registerEmployee.save();
      console.log("The registered part" + registered);

      res.status(201).render("index");
    } else {
      res.send("Please Enter the password");
    }
  } catch (err) {
    res.status(400).send(err);
    console.log("The error part page " + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({ email: email });
    const token = await userEmail.generateAuthToken();

    res.cookie("jwt", token, {
      httpOnly:true,
      expires: new Date(Date.now()+ 120000),
      secure:true
    });

    console.log(token);
    const isMatching = await bcrypt.compare(password, userEmail.password);

    if (isMatching) {
      res.send(userEmail);
      console.log(userEmail);
    } else {
      res.send(`<h1> Entered Password is wrong ! </h1>`);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running at port no. ${port}`);
});
