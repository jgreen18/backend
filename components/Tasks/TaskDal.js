/**
 * Capa de acceso de datos (Data Access Layer)
 */
const Database = require("../Database/Database");

const TaskDal = {
  query: Database.query,
};
module.exports = TaskDal;

