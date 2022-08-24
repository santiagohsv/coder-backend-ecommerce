import { Server, Socket } from 'socket.io';
import { apigGetMessages, apiNewChatMessage } from '../apis/chat';
import logger from './logger';

const socketIoServer = (server : any) => {

    const io = new  Server(server);

    io.on('connection', async (socket: Socket) => {

        try{
          const chatData = await apigGetMessages()
          io.emit('chat', chatData);
        } catch(err : any){
          logger.info(`Error, ${err.message}`);
        };
      
        socket.on('new-message', async (newMessage) => {
          try{ 
            await apiNewChatMessage(newMessage);
            const newData = await apigGetMessages();
            io.emit('chat', newData)
          }catch(err : any){
            logger.info(`Error, ${err.message}`);
          };
        });
      });

};

export default socketIoServer