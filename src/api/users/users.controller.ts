import { handleLogin, handleSignUp } from "./users.service";
import { Request, Response, NextFunction, Router } from "express";
import { MESSAGES } from "../../shared/constants";
import { getUserbyId } from "./users.service";

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

export const handleUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  try {
    const token = await handleLogin({ username, password });
    res.status(200).json({
      success: true,
      message: MESSAGES.LOGGED_IN,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserInfoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  try {
    const user = await getUserbyId(userId);
    res.status(200).json({
      success: true,
      message: MESSAGES.FETCH_USER,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export default (): Router => {
  const app = Router();
  app.post("/signup", handleUser);
  app.post("/login", handleUserLogin);
  app.get("/:id", getUserInfoById);
  return app;
};
