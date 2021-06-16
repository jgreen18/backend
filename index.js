require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User = require("./components/User/User");
const Task = require("./components/Tasks/Task");
//componentes

//configuracion de express
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Registrar componentes


app.use("/usuarios", User.api);
app.use("/task" , Task.api);




//levantar servidor
app.listen(3000, () => {
    console.clear();
    console.log("Task corriendo en puerto 3000");
    

});