const Dal = require("../TaskDal");


const deleteTask = async (id_task,id) => {
let response = {};
let status = 500;
let Task;

try {
    
    Task= await Dal.query("SELECT * FROM tasks WHERE id_task = ? and users_id_user = ?",
        [id_task, id
        ]);

 console.log(Task);
} catch (error) {
   
    // console.log("fdf");
    response = {
        message: "Ha ocurrido un error ",
        data: null,
    };
    status = 500;
    return {
        status,
        response
    }

}

var {title} = Task;
console.log(Task.title);

if (Task?.length) {
    try {
        const result = await Dal.query(
            "DELETE FROM tasks WHERE id_task = ? and users_id_user = ?",
            [id_task,id]
        );
        console.log(result);
        response = {
            message:`La tarea  se elimino correctamente.`,
            data: null,
            
            
        };
        status = 200;
    } catch (error) {
       
        response = {
            message: error.message,
            data: null,
        };
        status = 500;
    }
}else{
    response = {
        message: `La tarea no existe`,
        data: null,
    };
    status = 400;

}

return { 
    status,
    response
};



};
module.exports = deleteTask;