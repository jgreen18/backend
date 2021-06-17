const express = require("express");
const cors = require("cors");
const Services = require("./Services/taskServices");
const Middleware = require("../Middleware/Middleware");


const Task = express.Router();


Task.use(express.urlencoded({ extended: true }));
Task.use(express.json());
Task.use(cors());



Task.get("/all",Middleware, async (req, res ) => {

  let {id} = req.jwtData;
  
    const { status,response} = await Services.allTask(id);
    res.status(status).json(response);
  });
  
Task.get("/ViewCompleteTask",Middleware, async (req, res) => {
  let {id} = req.jwtData;
  const { status,response} = await Services.ViewCompleteTask(id);
  res.status(status).json(response);
  
});

Task.get("/ViewIncompleteTask",Middleware, async (req, res) => {
  let {id} = req.jwtData;
  const { status,response} = await Services.ViewIncompleteTask(id);
  res.status(status).json(response);
  
});

  Task.post("/addTask", Middleware, async(req,res) =>{
    let {id} = req.jwtData;
    let { title, descript, start_date, end_date, estado} = req.body;
    const {status,response} = await Services.addTask(title, descript, start_date, end_date, estado,id);
    res.status(status).json(response);
  });

  Task.delete("/deleteTask",Middleware, async(req,res)=> {
    let{id_task} = req.body;
    let {id} = req.jwtData;
    
    const{status,response} = await Services.deleteTask(id_task,id);
    res.status(status).json(response);
  });

  Task.put("/updateTask",Middleware, async ( req , res) => { 
    let {id} = req.jwtData;
    let { id_task,title, descript, start_date, end_date, estado} = req.body;
    const {status,response} = await Services.updateTask(id_task,title, descript, start_date, end_date, estado,id);
    res.status(status).json(response);
  });

 
  module.exports = Task;