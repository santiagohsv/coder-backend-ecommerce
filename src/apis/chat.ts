import ChatDAO, { IChat } from '../models/chat';

export const apiNewChatMessage = (data: IChat) => {
  return ChatDAO.newMessage(data);
};

export const apigGetMessages = () => {
  return ChatDAO.getMessages();
};
