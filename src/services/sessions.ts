import MongoStore from "connect-mongo";
import env from "../config/index";

const connectionString = env.MONGO_ATLAS_SRV as string;

const sessionConfig = {
  store: MongoStore.create({ mongoUrl: connectionString }),
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 180 * 1000,
  },
};

export default sessionConfig;
