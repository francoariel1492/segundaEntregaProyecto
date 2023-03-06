// const express = require("express");
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const MongoStore = require('connect-mongo')
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
// const router = require("../router");

// const { ChatManager } = require("../dao/Chat.dao");
// const chatManager = new ChatManager()

// // app.use(express.json());
// // app.use(morgan('dev'));
// // app.use(express.urlencoded({extended: true}));
// // app.use(express.static(__dirname + "/../public"));
// // app.use(cookieParser('MiCookie'))
// // //Se crea la session con MongoStore/connect-mongo
// // app.use(session({
// //   // store: new fileStorage({ path: __dirname + '/sessions', ttl: 100, retries: 0 }),
// //   store: MongoStore.create({
// //     mongoUrl: 'mongodb+srv://admin:admin@cluster0.tmygvvr.mongodb.net/sessions?retryWrites=true&w=majority',
// //     mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
// //   }),
// //   secret: 'loqueQuier4',
// //   resave: false,
// //   saveUninitialized: false
// // }))
// global.io = io;

// router;

// io.on('connection', socket => {
//     console.log(`New client with id ${socket.id}`);

//     socket.on('newUser', async user => {
//         //console.log(user)
//         socket.emit('bienvenida', user);
//         const mesagges = await chatManager.getMesagges()
//         io.emit("messageLogs", mesagges)

//       })

//     socket.on('message', async data => {
//         chatManager.saveMesagge(data)
//         const mesagges = await chatManager.getMesagges()
//         io.emit("messageLogs", mesagges)
//       })

//     socket.on('disconnect', () => {
//         console.log('socket disconnected');
//       });
// });

// module.exports = { server, io, app };