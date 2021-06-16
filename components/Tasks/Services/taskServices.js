const addTask = require("./addTask");
const deleteTask = require("./deleteTask");
const allTask = require("./allTask");
const ViewCompleteTask = require("./ViewCompleteTask");
const ViewIncompleteTask = require("./viewIncompleteTask");
const updateTask = require("./updateTask");


const Services = {
    addTask,
    deleteTask,
    allTask,
    ViewCompleteTask,
    ViewIncompleteTask,
    updateTask,

};
module.exports = Services;