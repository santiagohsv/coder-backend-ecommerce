import express from 'express';
import path from 'path';

import mainRouter from './routes/index';
import env from './config/index';

const viewPath = path.resolve(__dirname, '../src/views');
const app = express();
const PORT = env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));
app.set('view engine', 'pug');
app.set('views', viewPath);
app.use('/', mainRouter);

// socket io

import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { apigGetMessages, apiNewChatMessage } from './apis/chat';

const server = createServer(app);
const io = new Server(server);

//socket: Socket y agregar Socket en el import

io.on('connection', (socket: Socket) => {

  apigGetMessages().then((data) => {
    io.sockets.emit('chat', data);
  });

 

  socket.on('new-message', (data) => {
    apiNewChatMessage(data);
    apigGetMessages().then((data) => {
      io.sockets.emit('chat', data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
