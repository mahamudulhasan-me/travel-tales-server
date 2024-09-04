import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 1440,
  mongodb_url: process.env.MONGODB_URL,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 10,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  store_id: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
};
