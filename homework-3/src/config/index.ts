import dotenv from "dotenv";

const envFound = dotenv.config({ path: `.env.local`, override: true });

if (envFound.error) {
  throw new Error("Environment file not found");
}

export default {
  port: process.env.PORT,
  api: {
    prefix: "/",
  },
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    login: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD,
  },
};
