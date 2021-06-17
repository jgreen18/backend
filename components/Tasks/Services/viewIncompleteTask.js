const Dal = require("../TaskDal");

const ViewIncompleteTask = async (id) => {
    let response = {};
    let status = 500;

    try {

        const result = await Dal.query("SELECT * FROM tasks WHERE estado = 'incomplete' and users_id_user = ?",
        [id]);
        response = {
            Mesage: "Lista completa",
            data: result,
        };

        status = 200;

    } catch (error) {
        response = {
            message: error.message,
            data: null,
        };
        status = 500;
    }

    return{
        status,response
    }




};
module.exports = ViewIncompleteTask;