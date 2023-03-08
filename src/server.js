const express = require('express')
const morgan = require('morgan');
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const router = require('./router')
const handlebarsConfig = require('./handlebarsConfig/config.handlebars');
const mongoConfig = require('./mongoConfig/config.mongo');
const {port} = require('./config');
const app = express()

app.use(express.json())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser('LoQueQuieras'))

mongoConfig(app)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

router(app)
handlebarsConfig(app);

app.listen(port, () => {
  console.log(`listening on ${port}`)
})