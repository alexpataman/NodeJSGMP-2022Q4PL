import { Sequelize } from "sequelize";
import config from "../config";

const sequelizeInstance = new Sequelize(
  `postgres://${config.db.login}:${config.db.password}@${config.db.host}/${config.db.name}`
);

export default sequelizeInstance;
