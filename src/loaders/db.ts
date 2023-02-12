import config from "../config";
import { DataSource } from "typeorm";
import { Group, User } from "../models";

export const dbLoader = async () => {
  const AppDataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.login,
    password: config.db.password,
    database: config.db.name,
    synchronize: true,
    logging: config.db.logging,
    entities: [Group, User],
  });

  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error(error);
  }
};

export default dbLoader;
