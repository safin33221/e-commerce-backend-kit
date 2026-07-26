import { Response } from "express";

type TMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
};

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, payload: TResponse<T>) => {
  const { statusCode, ...rest } = payload;

  return res.status(statusCode).json(rest);
};

export default sendResponse;