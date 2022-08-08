import dotenv from 'dotenv';
dotenv.config();

export default  {
  PORT: process.env.PORT || 8080,
  MONGO_ATLAS_SRV : process.env.MONGO_ATLAS_SRV,
  MONGO_ATLAS_SRV_TEST : process.env. MONGO_ATLAS_SRV_TEST,
  MAIL_ACCOUNT : process.env.MAIL_ACCOUNT,
  MAIL_PASSWORD : process.env.MAIL_PASSWORD,
};
