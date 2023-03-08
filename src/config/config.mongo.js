const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongo')
const {db} = require('./config.env');
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
        console.log('DB is connected')
      })
      .catch((error) => {
        console.log('Cannot connect with the DB', error.message)
    })
};

module.exports = mongoConfig;