import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 1440,
  mongodb_url: process.env.MONGODB_URL,
  node_env: process.env.NODE_ENV,
};
