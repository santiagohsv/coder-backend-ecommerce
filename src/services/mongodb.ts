import { connect, disconnect } from "mongoose";

import env from "../config/index";

const connectionString = env.MONGO_ATLAS_SRV as string;

export default class MongoDB {
  
  private static instance: MongoDB;

  private constructor() {}

  public static async getConnection(): Promise<MongoDB> {
    if (!MongoDB.instance) {
      try{
        await connect(connectionString);
        console.log("Connection to database succeeded");
        MongoDB.instance = new MongoDB();
      }  catch (error : any){
        console.log("Connection to database failed", error.menssage);
      }
    }
    return MongoDB.instance;
  }

  public async dbDisconnection() {
    try {
      await disconnect();
      console.log(`Database disconnection succeded`);
    } catch (error : any) {
      console.log(`Disconnection to database failed. ${error.menssage}`);
    }
  }
}
