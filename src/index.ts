import express from 'express';
import path from 'path';
import { createServer } from 'http'


import mainRouter from './routes/index';
import env from './config/index';
import socketIoServer from './services/chat';

const viewPath = path.resolve(__dirname, '../src/views');
const app = express();
const PORT = env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));
app.set('view engine', 'pug');
app.set('views', viewPath);
app.use('/', mainRouter);

const server = createServer(app);
socketIoServer(server)


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
