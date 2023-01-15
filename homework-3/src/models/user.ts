import { DataTypes } from "sequelize";
import sequelize from "../data-access";

export const UserModel = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
  },
  login: DataTypes.STRING,
  password: DataTypes.STRING,
  age: DataTypes.NUMBER,
  isDeleted: DataTypes.BOOLEAN,
});
