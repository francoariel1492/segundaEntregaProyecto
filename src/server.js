const express = require('express')
const morgan = require('morgan');
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const router = require('./router')
const handlebarsConfig = require('./handlebarsConfig/config.handlebars');

const port = 3000
const app = express()

// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

app.use(express.json())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser('LoQueQuieras'))
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://admin:admin@cluster0.tmygvvr.mongodb.net/?retryWrites=true&w=majority',
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: 'loqueQuier4',
  resave: false,
  saveUninitialized: false
}))


mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://admin:admin@cluster0.tmygvvr.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Conectado a la base de datos')
  })
  .catch((error) => {
    console.log('Error al conectar a la base de datos:', error.message)
  })


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

// global.io = io;
router(app)
handlebarsConfig(app);

app.listen(port, () => {
  console.log(`listening on ${port}`)
})

// io.on('connection', socket => {
//   console.log(`New client with id ${socket.id}`);

//   socket.on('newUser', async user => {
//       //console.log(user)
//       socket.emit('bienvenida', user);
//       const mesagges = await chatManager.getMesagges()
//       io.emit("messageLogs", mesagges)

//     })

//   socket.on('message', async data => {
//       chatManager.saveMesagge(data)
//       const mesagges = await chatManager.getMesagges()
//       io.emit("messageLogs", mesagges)
//     })

//   socket.on('disconnect', () => {
//       console.log('socket disconnected');
//     });
// });

// module.exports = { server, io, app };