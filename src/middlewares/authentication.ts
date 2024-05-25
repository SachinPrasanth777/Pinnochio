import { Request, Response, NextFunction } from "express";
import { ERRORS } from "../shared/constants";
import { verifyToken } from "./jwt";
import db from "../loaders/db";
import { ObjectId } from "mongodb";

export function verifyUser() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader?.split(" ")[1];
      if (!token) {
        throw {
          statusCode: ERRORS.MISSING_ACCESS_TOKEN.statusCode,
          message: ERRORS.MISSING_ACCESS_TOKEN.message.error,
        };
      }
      const { data } = verifyToken(token);
      const user = await (await db())
        .collection("users")
        .findOne({ _id: new ObjectId(data) });
      if (!user) {
        throw {
          statusCode: ERRORS.USER_NOT_FOUND.statusCode,
          message: ERRORS.USER_NOT_FOUND.message.error,
        };
      }
      res.locals.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}
