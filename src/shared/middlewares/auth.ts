import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import AppError from "../errors/AppError.js";

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // TODO:
      // 1. Read Access Token
      // 2. Verify JWT
      // 3. Get User
      // 4. Attach User to req.user

      const user = null;

      if (!user) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          "Unauthorized access."
        );
      }

      if (
        requiredRoles.length &&
        !requiredRoles.includes((user as any).role)
      ) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "You are not permitted to perform this action."
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };