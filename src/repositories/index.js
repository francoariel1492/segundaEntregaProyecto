const UsersRepository = require("./Users.repository");

//aca llega la clase completa segun la persistencia elegida
const UsersDao = require('../dao/factory')

//y aca la instanciamos, ATENCION A ESTO

const usersRepository = new UsersRepository(new UsersDao())

module.exports = usersRepository