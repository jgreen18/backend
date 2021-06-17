const Dal = require("../UserDal");
const { generateJwt, verifyPassword } = require("../../../libs/utils");

const login = async (email, password) => {
    let response = {};
    let status = 500;
    let users;

    
    try {

        users = await Dal.query("SELECT * From users WHERE  email=?", [email]);
    } catch (error) {


       

        response = {
            message: "ha ocurrido un error al iniciar sesión",
            data: null,
        };
        status = 500;
        return {
            status, response,
        }

    }

    //validar constraseña nueva con la vieja 
    if (users?.length) {
        // const abc =
        const user = users[0];
        if (verifyPassword(password, user.pass)) {
            response = {
                message: "usuario autenticado correctamente.",
                data: {
                    id: user.id_user,
                    email: user.email,
                    token: generateJwt({
                        id: user.id_user,
                        email: user.email,

                    }),
                },
            }
            status = 200;
        } else {
            response = {
                message: "Usuario o contraseña incorrecta",
                data: null,
            };
            status = 400;

        };


    } else {
        response = {
            message: "Usuario o contraseña incorrecta.",
            data: null,
        };
        status = 400;

    };



    return {
        status,
        response
    }
};

module.exports = login;