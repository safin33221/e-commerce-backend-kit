import { z } from "zod";
import { NextFunction, Request, Response } from "express";

const validateRequest =
  <T extends z.ZodType>(schema: T) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
      });

      next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;