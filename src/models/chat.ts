import { Schema, model } from 'mongoose';
import MongoDB from '../services/mongodb';

export interface IChat {
  mail : string,
  type : string,
  message: string,
  date : string
}

const ChatSchema = new Schema<IChat>(
  { 
    mail : {type: String, required : true},
    type : {type: String, required : true},
    message :{type: String, required : true},
    date: { type: String, required: true}
  },
  { timestamps: false , versionKey:false}
  
);

const ChatModel = model ('chat', ChatSchema);

class ChatDAO {
  constructor(){
    MongoDB.getConnection();
  }

  newMessage = async ( data : IChat) => await ChatModel.create(data)

  getMessages = async () => await ChatModel.find()
}

export default new ChatDAO; 