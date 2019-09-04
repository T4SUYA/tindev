const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
require("dotenv").config();
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var path = require('path');
const port = process.env.PORT || 8080;

const connectedUsers = {}

io.on('connection', socket => {
  const { user } = socket.handshake.query
  console.log(`Registrei o user ${user} com id ${socket.id}`)
  connectedUsers[user] = socket.id;
})

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers
  return next()
})

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname + "/../../frontend/build")));
/*app.use("/", express.static(__dirname + "/../../frontend/build"));*/
app.use(routes);

server.listen(port, function () {
  console.log(`Servidor executando em ${port}`)
});