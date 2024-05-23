import { handleSignUp } from "./users.service";
import { Request, Response, NextFunction, Router } from "express";
import { MESSAGES } from "../../shared/constants";
export const handleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  try {
    await handleSignUp({ username, password });
    res.status(200).json({
      success: true,
      message: MESSAGES.SIGNED_IN,
    });
  } catch (error) {
    next(error);
  }
};

export default (): Router => {
  const app = Router();
  app.post("/login", handleUser);
  return app;
};
