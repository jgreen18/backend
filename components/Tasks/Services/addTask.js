const Dal = require("../TaskDal");




const addTask = async (title, descript, start_date, end_date, estado, users_id_user) => {
    let response = {};
    let status = 500;
    let duplicateTask = null;

    try {
        duplicateTask = await Dal.query("SELECT title FROM task WHERE title=?",
            [title
            ]);


    } catch (error) {
        response = {
            message: "Ha ocurrido un error al registrar la tarea ",
            data: null,
        };
        status = 500;
        return {
            status,
            response
        }

    }

    if (duplicateTask?.length === 0) {
        try {
            const result = await Dal.query(
                "INSERT INTO task (title, descript, start_date, end_date, estado, users_id_user) VALUES (?,?,?,?,?,?)",
                [title, descript, start_date, end_date, estado, users_id_user]
            );
            response = {
                message: "Registro de tarea realizado correctamente",
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
            message: `La tarea ${title} ya esta registrada.`,
            data: null,
        };
        status = 400;

    }

    return { 
        status,
        response
    };
};

module.exports = addTask;