import config from "../config";
import { DataSource } from "typeorm";
import { Group, User } from "../models";
import { logger, LOGGER_LEVEL } from "../utils/logger";

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
    const { message } = error as Error;
    logger.log({
      level: LOGGER_LEVEL.ERROR,
      message,
    });
  }
};

export default dbLoader;
