import config from "../config";
import { DataSource } from "typeorm";
import { Group, User } from "../models";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.login,
  password: config.db.password,
  database: config.db.name,
  synchronize: true,
  logging: true,
  entities: [Group, User],
});

export default AppDataSource;
