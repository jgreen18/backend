/**
 * Este archivo centraliza funciones a las que todos los componentes deben/pueden acceder.
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const utils = {


  /**
   * Esta función se encarga de encriptar un string
  * @param {String} password Contraseña a encriptar
  * @returns {String} Contraseña encriptada 
   */
  hashPassword: (password) =>
    bcrypt.hashSync(password, parseInt(process.env.COST_FACTOR)),

  /**
 * Esta función verifica que las contraseñas coincidan
 * @param {string} password Contraseña sin encriptar
 * @param {string} encryptedPassword Contraseña encriptada
 * @returns {boolean} True = si la comparación es correcta
 */
  verifyPassword: (password, encryptedPassword) =>
    bcrypt.compareSync(password, encryptedPassword),


  /**
    * Genera un nuevo JWT
    * @param {object} data
    * @returns {string} JWT
   */
  generateJwt: (data) =>
    jwt.sign(data, process.env.JWT_PASSWORD, { expiresIn: "7d" }),



  /**
   * Verifica que el token sea valido
   * @param {string} token Web Token
   * @returns JWT desencriptado o un error que se debe catchear
   */
  verifyJwt: (token) => jwt.verify(token, process.env.JWT_PASSWORD)

};

module.exports = utils;

