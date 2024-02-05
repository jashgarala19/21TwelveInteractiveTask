import dotenv from "dotenv";
dotenv.config();
export default {
  PORT: process.env.PORT || 8080,
  mongodb_uri: process.env.MONGODB_URI,
  BASE_API_URL: process.env.BASE_APi_URl,
};
