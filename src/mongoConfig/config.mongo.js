const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongo')
const {db} = require('../config');
const {userDb, passDb} = db

const mongoConfig = (app) => {
    app.use(session({
        store: MongoStore.create({
          mongoUrl: `mongodb+srv://${userDb}:${passDb}@cluster0.tmygvvr.mongodb.net/?retryWrites=true&w=majority`,
          mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        }),
        secret: 'loqueQuier4',
        resave: false,
        saveUninitialized: false
      }))
    mongoose.set('strictQuery', false)
    mongoose.connect(`mongodb+srv://${userDb}:${passDb}@cluster0.tmygvvr.mongodb.net/?retryWrites=true&w=majority`)
      .then(() => {
        console.log('Conectado a la base de datos')
      })
      .catch((error) => {
        console.log('Error al conectar a la base de datos:', error.message)
    })
};

module.exports = mongoConfig;