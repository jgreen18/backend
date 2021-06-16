const express = require("express");
const cors = require("cors");
const Services = require("./Services/taskServices");

const Task = express.Router();


Task.use(express.urlencoded({ extended: true }));
Task.use(express.json());
Task.use(cors());



Task.get("/all", async (req, res) => {
    const { status,response} = await Services.allTask();
    res.status(status).json(response);
  });
  
Task.get("/ViewCompleteTask", async (req, res) => {
  const { status,response} = await Services.ViewCompleteTask();
  res.status(status).json(response);
  
});

Task.get("/ViewIncompleteTask", async (req, res) => {
  const { status,response} = await Services.ViewIncompleteTask();
  res.status(status).json(response);
  
});

  Task.post("/addTask", async(req,res) =>{
    let { title, descript, start_date, end_date, estado, users_id_user} = req.body;
    const {status,response} = await Services.addTask(title, descript, start_date, end_date, estado, users_id_user);
    res.status(status).json(response);
  });

  Task.delete("/deleteTask", async(req,res)=> {
    let{title} = req.body;
    
    const{status,response} = await Services.deleteTask(title);
    res.status(status).json(response);
  });

  Task.put("/updateTask", async ( req , res) => { 
    let { title, descript, start_date, end_date, estado, users_id_user} = req.body;
    const {status,response} = await Services.updateTask(title, descript, start_date, end_date, estado, users_id_user);
    res.status(status).json(response);
  });

 
  module.exports = Task;