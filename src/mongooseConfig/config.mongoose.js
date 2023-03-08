const mongoose = require("mongoose");
const {db} = require('../config');
const {userDb, passDb} = db

const mongooseConfig = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(`mongodb+srv://${userDb}:${passDb}@cluster0.tmygvvr.mongodb.net/?retryWrites=true&w=majority`)
      .then(() => {
        console.log('Conectado a la base de datos')
      })
      .catch((error) => {
        console.log('Error al conectar a la base de datos:', error.message)
    })
};

module.exports = mongooseConfig;