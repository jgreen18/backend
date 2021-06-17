const Dal = require("../TaskDal");
const f = require("../../Middleware/Middleware");


const allTask = async (id) => {
   
    
      
    let response = {};
    let status = 500;

    try {

        const result = await Dal.query("SELECT * FROM tasks where users_id_user =?",
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
module.exports = allTask;