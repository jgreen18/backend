const Dal = require("../TaskDal");

const updateTask = async (id_task,title, descript, start_date, end_date, estado,id) => {
    let response = {};
    let status = 500;
    let Task;


    try {
        Task = await Dal.query("SELECT * FROM tasks WHERE id_task =? and users_id_user =? ",
            [id_task, id
            ]);
            console.log(Task);
    } catch (error) {

        console.log(error)
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
            const result = await Dal.query("UPDATE tasks set title =? , descript =? , start_date =?, end_date=?, estado =? where id_task =?",
            [ title, descript, start_date, end_date, estado,id_task] 
        );

            response = {
                message: "Actualizacion realizada correctamente",
                data: {
                    title: title,
                    descript: descript,
                    start_date: start_date,
                    end_date: end_date,
                    estado: estado,
                   
                },
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
            message: "No se pudo actualizar la tarea",
            data: null,
        }
        status=400;
    }
    return{
        status,
        response
    }

};

module.exports = updateTask;