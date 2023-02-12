import { logger, LOGGER_LEVEL } from "../utils/logger";

export default () => {
  ["uncaughtException", "unhandledRejection"].forEach((event) =>
    process.on(event, (error: Error) => {
      const { name, message, stack } = error;
      logger.log({
        level: LOGGER_LEVEL.ERROR,
        message: "Unhandled Error",
        meta: {
          name,
          message,
          stack,
        },
      });
    })
  );
};
