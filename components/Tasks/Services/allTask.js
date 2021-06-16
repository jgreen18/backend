const Dal = require("../TaskDal");


const allTask = async () => {
    let response = {};
    let status = 500;

    try {

        const result = await Dal.query("SELECT * FROM task ");
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