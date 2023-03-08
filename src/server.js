const express = require('express')
const morgan = require('morgan');
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const handlebarsConfig = require('./config/config.handlebars');
const mongoConfig = require('./config/config.mongo');
const passport = require('passport');
const initializePassport = require('./config/config.passport');
const router = require('./router')


const {port} = require('./config/config.env');
const app = express()


app.use(express.json())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser('LoQueQuieras'))

mongoConfig(app)

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

router(app)
handlebarsConfig(app);

app.listen(port, () => {
  console.log(`listening on ${port}`)
})