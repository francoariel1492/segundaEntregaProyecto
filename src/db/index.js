const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongo')
const {dbUser,dbPassword,dbHost,dbName} = require('../config/db.mongo.config');

const mongoConfig = async (app) => {
  try {
    app.use(session({
      store: MongoStore.create({
        mongoUrl: `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      }),
      secret: 'loqueQuier4',
      resave: false,
      saveUninitialized: false
    }))
  mongoose.set('strictQuery', false)
  await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`)
  console.log(`db is connected`)
  } catch (error) {
    console.log(error)
  }
    
};

module.exports = mongoConfig;