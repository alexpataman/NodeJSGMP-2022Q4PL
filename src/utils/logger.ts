import { Logger } from "winston";

const winston = require("winston");

export const LOGGER_LEVEL = {
  ERROR: "error",
  INFO: "info",
};

export const logger: Logger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
