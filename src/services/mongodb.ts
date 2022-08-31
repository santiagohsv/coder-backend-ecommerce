
import mongoose from 'mongoose';
import env from '../config/index';
import logger from './logger';

const connectionString = env.MONGO_ATLAS_SRV as string;

class MongoDB {

  static connection: MongoDB;

  private constructor() {

  }

  public static async getConnection() {

    if (!MongoDB.connection) {      
      try {
        MongoDB.connection = new MongoDB();
        await mongoose.connect(connectionString)
        logger.info('Connection to database succeeded');
      } catch (error: any) {
        logger.error('Connection to database failed');
      }
    }
    return MongoDB.connection;
  }

  static async dbDisconnection() {
    try {
      await mongoose.disconnect();
      console.log(`Database disconnection succeded`);
    } catch (error: any) {
      logger.error(`Disconnection to database failed. ${error.menssage}`);
    }
  }
}

export default MongoDB;

