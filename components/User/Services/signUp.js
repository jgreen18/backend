const Dal = require("../UserDal");
const { hashPassword, generateJwt } = require("../../../libs/utils");

/**
 * signUp crea un nuevo usuario
 * @param {string} user_name
 * @param {string} email
 * @param {string} pass
 * @param {} date_birth
 * @param {string} address
 * @returns {object} {status: int, response: object}
 */

const signUp = async (user_name, email, pass, date_birth, address) => {

    let response = {};
    let status = 500;
    let duplicateUsers = null;

    //buscar si el usuario ya esta registrado 
    try {
      

        duplicateUsers = await Dal.query("SELECT email FROM users WHERE email=?", [
            email,
        ]);
    } catch (error) {
        console.log(error);

        response = {
            message: "Ha ocurrido un error al registra al usuario ",
            data: null,
        };
        status = 500;
        return {
            status,
            response
        }

    }


    //insertar usuario a la base de datos si no existe
    if (duplicateUsers?.length === 0) {
        try {

            const result = await Dal.query(
                "INSERT INTO users (user_name,email, pass,date_birth,address) VALUES (?,?,?,?,?)",

                [user_name, email, hashPassword(pass), date_birth, address]
            );
            response = {
                message: "Registro de usuario realizado correctamente. ",
                data: {
                    id_user: result.insertId,
                    user_name: user_name,
                    email: email,
                    date_birth: date_birth,
                    address: address,
                    token: generateJwt({
                        id: result.insertId,
                        id2: '4',
                        email: email,
                    }),
                },
            };
            status = 200;

        } catch (error) {
            console.log(error);
            response = {
                message: error.message,
                data: null,
            };
            status = 500;

        }
    } else {
        response = {
            message: `EL email ${email} ya esta en uso.`,
            data: null,
        };
        status = 400;
    }


    return {
        status, response,
    };

};

module.exports = signUp;







