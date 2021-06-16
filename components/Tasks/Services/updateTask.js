const Dal = require("../TaskDal");

const updateTask = async (title, descript, start_date, end_date, estado, users_id_user) => {
    let response = {};
    let status = 500;
    let Task;


    try {
        Task = await Dal.query("SELECT title FROM task WHERE title=?",
            [title
            ]);
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
            const result = await Dal.query("UPDATE task set title =? , descript =? , start_date =?, end_date=?, estado =?, users_id_user=? where title =?",
            [ title, descript, start_date, end_date, estado, users_id_user, title] 
        );

            response = {
                message: "Actualizacion realizada correctamente",
                data: {
                    title: title,
                    descript: descript,
                    start_date: start_date,
                    end_date: end_date,
                    estado: estado,
                    users_id_user: users_id_user,
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