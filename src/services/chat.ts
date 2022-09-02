import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

import { apigGetMessages, apiNewChatMessage } from '../apis/chat';
import { IChat } from '../models/chat';
import { apiGetProducts } from '../apis/product';
import { IProduct } from '../models/products';
import { apiGetOrder } from '../apis/order';
import env from '../config/index';

const socketIoServer = (server: any) => {
  const io = new Server(server);

  io.on('connection', async (socket: Socket) => {
    const data = await apigGetMessages();
    socket.emit('chat', data);

    // Chat new message handler

    socket.on('new-message', async (data) => {
      // Function to send message to client
      const sendReply = async (msg: string) => {
        const date = new Date();
        const msgOrder: IChat = {
          mail: 'Bot',
          type: 'server',
          message: msg,
          date: date.toDateString(),
        };
        await apiNewChatMessage(msgOrder);
        const data = await apigGetMessages();
        io.emit('chat', data);
      };

      try {

        const user = jwt.verify(
          data.token as string,
          env.JWT_KEY as string
        ) as jwt.JwtPayload;

        const message = data.message.toLowerCase();

        if (message.includes('order')) {
          const order = await apiGetOrder(user.mail);
          let msg: string ='';

          order.forEach((order) => {
            msg += `Order: ${order.orderNumber} - Status:${order.status}`;
          });

          sendReply(msg)

        } else if (message.includes('product')) {
          const products = (await apiGetProducts()) as IProduct[];
          let msg ='';

          products.forEach((prod) => {
            msg += ` \n Product: ${prod.name} - Stock:${prod.stock}\n `;
          });

          sendReply(msg);
        } else {
          sendReply(
            'Ups! I dont understand, please try with order or products'
          );
        }
      } catch (err) {
        sendReply('Enter a valid token');
      }
    });
  });
};

export default socketIoServer;
