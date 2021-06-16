const express = require("express");
const cors = require("cors");
const Services = require("./Services/UserServices");
const Middleware = require("../Middleware/Middleware");
const Dal = require("./UserDal");




const User = express.Router();



//configuracion de express

User.use(express.urlencoded({ extended: true }));
User.use(express.json());
User.use(cors());




User.get("/all", async (req, res) => {
  try {
   

    const result = await Dal.query("SELECT id_user, email FROM Users");
    res.status(200).json({
      message: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
});


User.post("/sign-up", async (req, res) => {

  let { user_name, email, pass, date_birth, address } = req.body;
  const { status, response } = await Services.signUp(user_name, email, pass, date_birth, address);
  res.status(status).json(response);
});

User.post("/login", async (req, res) => {
  let { email, pass } = req.body;
  const { status, response } = await Services.login(email, pass);
  res.status(status).json(response);
});

User.post("/ruta-secreta", Middleware, (req, res) => {

  res.status(200).json({
    hola: "mundo",
    data: req.jwtData,
  })
});

module.exports = User;

