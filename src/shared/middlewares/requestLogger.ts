import morgan from "morgan";
import { logger } from "../../config/logger.js";


export const requestLogger = morgan(
  (tokens, req, res) => {

    return JSON.stringify({

      method: tokens.method?.(req, res) ?? "",

      url: tokens.url?.(req, res) ?? "",

      status: Number(tokens.status?.(req, res) ?? 0),

      responseTime:
        `${tokens["response-time"]?.(req, res) ?? 0}ms`,

      ip: req.socket.remoteAddress ?? "",

    });

  },
  {
    stream: {

      write: (message) => {

        logger.info(
          JSON.parse(message)
        );

      },

    },
  }
);