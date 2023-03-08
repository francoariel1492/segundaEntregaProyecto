const express = require('express')
const morgan = require('morgan');
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const router = require('./router')
const handlebarsConfig = require('./handlebarsConfig/config.handlebars');

const {port, db} = require('./config');
const mongooseConfig = require('./mongooseConfig/config.mongoose');
const {userDb, passDb} = db
const app = express()

app.use(express.json())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser('LoQueQuieras'))
app.use(session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${userDb}:${passDb}@cluster0.tmygvvr.mongodb.net/?retryWrites=true&w=majority`,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: 'loqueQuier4',
  resave: false,
  saveUninitialized: false
}))

mongooseConfig()


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

router(app)
handlebarsConfig(app);

app.listen(port, () => {
  console.log(`listening on ${port}`)
})