const Dal = require("../TaskDal");


const deleteTask = async (title) => {
let response = {};
let status = 500;
let Task;

try {
    
    Task= await Dal.query("SELECT title FROM task WHERE title=?",
        [title
        ]);


} catch (error) {
   
    response = {
        message: "Ha ocurrido un error  ",
        data: null,
    };
    status = 500;
    return {
        status,
        response
    }

}


if (Task?.length) {
    try {
        const result = await Dal.query(
            "DELETE FROM task WHERE title = ?",
            [title]
        );
        response = {
            message:`La tarea ${title} se elimino correctamente.`,
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
        message: `La tarea ${title} no existe.`,
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